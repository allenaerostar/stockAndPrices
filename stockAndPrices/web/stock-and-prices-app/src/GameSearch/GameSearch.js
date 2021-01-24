import React from 'react';
import Game from '../Game/Game'


class GameSearch extends React.Component{

    constructor(props){
        super(props); 
        this.state = {
            games: {}        
        }
    }

    getGameDataByName(name){
        const gameSearchUrl = "http://localhost:5000/games/title?name="+name;
        fetch(gameSearchUrl)
        .then(response => response.json())
        .then(result => this.setState({games: result}));
    }

    render(){
        let listGames = Object.entries(this.state.games).map(
            (gameEntry) => <Game gameName={gameEntry[1].name} stores={gameEntry[1].stores} key={gameEntry[0]}></Game>);
        return <div>
                <label>Search game:</label>
                <input type="text" id="searchInput" name="searchInput" placeholder="Game Name" required></input>
                <button onClick={()=>this.getGameDataByName(document.getElementById("searchInput").value)}>Search</button>   
                {listGames}                
            </div>;
    }
}

export default GameSearch;