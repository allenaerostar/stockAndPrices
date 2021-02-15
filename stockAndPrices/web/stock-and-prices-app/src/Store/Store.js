import React from 'react';

const Store = (props) =>{
    return (
        <div>
            <p>Store name : {props.name}</p>
            <p>Current price : {props.curPrice}</p>
            <p>Original price : {props.origPrice}</p>
            <p>Savings : {props.savings}</p>
        </div>
    )
};

export default Store;