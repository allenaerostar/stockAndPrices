import React from 'react';
import Game from '../Game/Game'

class GameSearch extends React.Component{

    constructor(props){
        super(props); 
        this.state = {
            games: {},
            searchResult: ''
        }
    }

    getGameDataByName(name){
        this.setState({searchResult: ""})
        const gameSearchUrl = "http://localhost:5000/games/title?name="+name;
        fetch(gameSearchUrl)
        .then(response => {
            if (response.status === 500){
                this.setState({searchResult: "Sorry, Server Error"})
                return null
            }
            return response.json()
        }).then(response => {
            if (response && response.message) {
                console.log(response)
                this.setState({searchResult:response.message})
            }
            else if (response) {
                this.setState({games: response})
                console.log(this.state.games)
            }
        });
    }
    render(){
        
        let listGames = Object.entries(this.state.games).map(
            (gameEntry) => <Game gameName={gameEntry[1].name} stores={gameEntry[1].stores} 
                                 gameid={gameEntry[0]} key={gameEntry[0]}></Game> );
            
        return (
        <div>
            <div>
            <label>Search game:</label>
            <input type="text" id="searchInput" name="searchInput" placeholder="Game Name" required></input>
            <button onClick={()=>this.getGameDataByName(document.getElementById("searchInput").value)}>Search</button>  
            </div> 
            <div>
                {this.state.searchResult}
            </div>
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Store</th>
                            <th>MSRP</th>
                            <th>Price</th>
                            <th>Saving</th>
                        </tr>
                    </tbody>
                    {listGames}
                </table>
            </div>
                        
        </div>
        )
    }
}

export default GameSearch;