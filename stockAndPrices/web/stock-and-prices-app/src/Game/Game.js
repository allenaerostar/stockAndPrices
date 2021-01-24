import React from 'react';
import Store from '../Store/Store'
class Game extends React.Component {

    constructor(props){
        super(props);
    }
    render(){
        let stores = null
        stores =(
            <div>
            {
                this.props.stores.map(store => {
                return <Store name={store.store} 
                    origPrice={store.org_price} 
                    curPrice={store.cur_price} 
                    savings={store.saving}>
                </Store>
                })
           } 
            </div>
        );

        return (
            <div>
                <p>Game Name : {this.props.gameName}</p>
                {stores}
            </div>
        )
    }

}
export default Game;