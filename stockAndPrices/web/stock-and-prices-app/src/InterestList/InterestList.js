import React, { useEffect, useState } from 'react';
import { useAuth, logout, authFetch } from '../auth/auth';


function InterestList() {
    const [message, setMessage] = useState('')

    const [logged] = useAuth();

    useEffect(() => {
        authFetch("/interest_list").then(response => {
            if (response.status === 401){
                setMessage("Sorry you aren't authorized!")
                return null
            }
            return response.json()
        }).then(response => {
            if (response && response.message){
                setMessage(response.message)
            }
        })
    }, [])
    return (
        <div>
            {logged? <button onClick={() => logout()}>Logout</button>
            :<button>Login</button>
            }
            <h2>Secret: {message}</h2>
        </div>
        
    )   
  }

export default InterestList;