from flask import Flask, Blueprint, request
import requests, json
from pymemcache.client import base
from flask import current_app
from callapi import data
games_blueprint = Blueprint("games", __name__, url_prefix="/games")
api_url = "https://www.cheapshark.com/api/1.0"

# memcache
client = base.Client(('memcached', 11211))


#### Games ####

# /title?name=somename
@games_blueprint.route('/title')
def gamePriceByTitle():
    #return data
    game_title = request.args.get('name')
    url = api_url + f"/games?title={game_title}"
    payload, files, headers = {}, {}, {}
    response = requests.request("GET", url, headers=headers, data=payload, files=files)
    if response.status_code != 200:
        current_app.logger.warning(f"Get request from {url} failed.")
        return {'message': 'Sorry. No Result due to Server Error'}, 500
    resp = json.loads(response.text)
    if not resp:
        return {'message': f'No Result for: {game_title}'}, 200

    count, all_ids, all_prices = 0, '', {}
    # retrieve all gameids from searching that game
    for rs in resp:
        if not all_ids:
            all_ids += rs['gameID']
        else:
            all_ids += ',' + rs['gameID']
        count += 1
        if count == 25:
            findGamePriceById(all_ids, all_prices)
            count, all_ids = 0, ''
    if all_ids:
        findGamePriceById(all_ids, all_prices)
    
    return all_prices


# find prices for each game in each store by gameID. (max 25 game id per API call)
def findGamePriceById(game_ids, prices):
    
    url = api_url + f"/games?ids={game_ids}"
    payload, files, headers = {}, {}, {}
    response = requests.request("GET", url, headers=headers, data=payload, files=files)
    if response.status_code != 200:
        current_app.logger.warning(f"Get request from {url} failed.")
        return
    resp = json.loads(response.text)
    if not resp:
        current_app.logger.warning("no result for gameID:" + game_ids)
        return

    all_stores = get_stores_from_memc()
    for gameid in resp:
        game_name = resp[gameid]['info']['title']
        game_deals = resp[gameid]['deals']

        game_info = {}
        game_info["name"] = game_name
        game_info['stores'] = []
        for deal in game_deals:
            if deal['storeID'] not in all_stores:
                current_app.logger.warning("there is error with store id:" + deal['storeID'])
                continue
            elif all_stores[deal['storeID']][1] == '0':
                continue
            store_info = {}
            store_info['store_id'] = deal['storeID']
            store_info["store"] = all_stores[deal['storeID']][0]
            store_info["cur_price"] = deal['price']
            store_info["org_price"] = deal['retailPrice']
            store_info["saving"] = "{:.2f}".format(float(deal['savings'])) + '%'
            game_info["stores"].append(store_info)

        if game_info["stores"]:
            prices[gameid] = game_info
    return


# /ids?gameids=someids
@games_blueprint.route('/ids')
def fetch_by_game_id():
    game_ids = request.args.get('gameids')
    url = api_url + f"/games?ids={game_ids}"
    payload, files, headers = {}, {}, {}
    response = requests.request("GET", url, headers=headers, data=payload, files=files)
    resp = json.loads(response.text)
    return resp


#### Stores ####

def fetch_stores_info():
    url = api_url + "/stores"
    payload, files, headers = {}, {}, {}
    response = requests.request("GET", url, headers=headers, data=payload, files=files)
    if response.status_code != 200:
        current_app.logger.error(f"Get request from {url} failed.")
        return {}
    resp = json.loads(response.text)
    if not resp:
        current_app.logger.warning('Fetch stores info from API is empty.')
        return {}
        
    stores = {}
    for rs in resp:
        stores[rs["storeID"]] = [rs["storeName"], rs["isActive"]]
    return stores


def updated_stores_info():
    result = fetch_stores_info()
    client.set('games_stores', result, 7200) # expired every 7200 seconds, 2 hours
    return


def get_stores_from_memc():
    try:
        result = client.get('games_stores')
        if not result:
            updated_stores_info()
            result = client.get('games_stores')
        res = json.loads(result.decode('utf-8').replace("'", '"'))
        return res
    except Exception as e:
        current_app.logger.warning('Memcached error, fetching stores from API')
        current_app.logger.warning(e)
        return fetch_stores_info()