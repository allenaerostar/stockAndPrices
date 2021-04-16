import React from 'react';
import Button from '../common/components/button/button';
import { useAuth, authFetch } from '../auth/auth';

const Game = (props) => {

    const [logged] = useAuth();
    //const logged = true;
    
    const handleAddInterest = (storeID, orgPrice) =>{
        let data = {
            'sid' : storeID,
            'gid' : props.gameid,
            'gname' : props.gameName,
            'gprice' : orgPrice,
            'discount' : '5'
        }
        console.log(data)
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(data)
        };
        authFetch("/addInterest", requestOptions)
        .then(response => {
            if (response.status === 401){
                console.log("Sorry you aren't authorized")
                return null
            }
            return response.json()
        }).then(response => {
            console.log(response)
            if (response && response.message){
                console.log(response.message)
            }
        })
    }

    const games = props.stores.map((store) => {
        return (

        <tr key={store.store_id}>
            <td>{props.gameName}</td>    
            <td>{store.store}</td>
            <td>{store.org_price}</td>
            <td>{store.cur_price}</td>
            <td>{store.saving}</td>
            <td>{logged? <Button labelText="Interest" onClick={
                    ()=> handleAddInterest(store.store_id, store.org_price)} /> 
                : ""}</td>
        </tr>
        )
    });
    return  (
        <tbody>
            {games}
        </tbody>
    )

    
}

export default Game;