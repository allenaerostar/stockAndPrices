import React, { useEffect, useState } from 'react';
import { useAuth, logout, authFetch } from '../auth/auth';
import { Redirect } from 'react-router-dom';


const InterestList = () => {
    
    const [logged] = useAuth();
    //const logged = true;
    
    const [message, setMessage] = useState([])
    useEffect(() => {
        authFetch("/interestList").then(response => {
        //fetch("http://localhost:5000/interestList").then(response => {
            if (response.status === 401){
                setMessage(["Sorry you aren't authorized!"])
                return null
            }
            return response.json()
        }).then(response => {
            console.log(response)
            if (response && response.message){
                setMessage([])
            }
            if (response && response.ret) {
                setMessage(response.ret)

            }
        })
    }, [])
    return (
        <div>
            {logged? <button onClick={() => logout()}>Logout</button>
            :<button onClick={() => <Redirect to="/login" />}>Login</button>
            }
            {logged?
                message.length > 0? 
                    <table>
                        <tbody>
                            <tr>
                                <th>Game id</th>
                                <th>Game name</th>
                                <th>Store id</th>
                                <th>Price</th>
                                <th>Discount</th>
                            </tr>
                            {message.map(msg => 
                                <tr key={msg.gid+msg.sid}>
                                    <td>{msg.gid}</td>
                                    <td>{msg.gname}</td>
                                    <td>{msg.sid}</td>
                                    <td>{msg.gprice}</td>
                                    <td>{msg.discount}</td>
                                </tr>
                            )}

                        </tbody>
                    </table>
                :<div> you dont have any interest yet!</div>
            :<div>Login to check your interest list</div>
            }
        </div>
        
    )   
  }

export default InterestList;