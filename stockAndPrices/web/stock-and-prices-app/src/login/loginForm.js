import React from 'react';
import { Redirect } from 'react-router-dom';
import { login } from '../auth/auth';
import Button from '../common/components/button/button';
//let validation = require('../common/util/validation.js');

class LoginForm extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            redirectToSignUp: false,
            redirectToGame: false,
            redirectToInt: false,
            formError: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.handleGameSearch = this.handleGameSearch.bind(this);
        this.handleIntList = this.handleIntList.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({formError: ""})
        const loginUrl = "/login";
        const formData = new FormData(event.target);
        const requestOptions = {
            // don't need header for FormData
            method: 'POST',
            body: formData,
        };
        fetch(loginUrl, requestOptions)
            .then(res => res.json())
            .then(token =>{
                console.log(token)
                if (token.access_token) {
                    login(token)
                    console.log("Login Successfully")
                }else if (token.validation){
                    this.setState({formError: token.validation})
                }else{
                    this.setState({formError: "Please type in correct username/password"})
                }
            },
            (error) => {
                console.log("Error:", error)
            })
    }

    handleSignUp(event){
        event.preventDefault();
        this.setState({redirectToSignUp: true})
    }

    handleGameSearch(event){
        event.preventDefault();
        this.setState({redirectToGame: true})
    }

    handleIntList(event){
        event.preventDefault();
        this.setState({redirectToInt: true})
    }

    render() {
        let ToSignUp = this.state.redirectToSignUp;
        let ToGame = this.state.redirectToGame;
        let ToInt = this.state.redirectToInt;
        if (true === ToSignUp) {
            return <Redirect to="/signUp" />
        } else if (true === ToGame) {
            return <Redirect to="/gameSearch" />
        } else if (true === ToInt) {
            return <Redirect to='/interest' />
        }

        return (
            <form name="loginForm" onSubmit={this.handleSubmit}>
                <div>
                    Sign In
                </div>
                <br />
                <label>
                    Username:
                    <input type="text" name="username" minLength="8" maxLength="12" placeholder="Username" required>
                    </input>
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" name="password" minLength="8" maxLength="12" placeholder="Password" required>
                    </input>
                </label>
                <div>
                    {this.state.formError}
                </div>
                <Button labelText="Login" buttonType="submit">
                </Button>
                <div> 
                    Create an account?
                    <Button labelText="Sign Up" onClick={this.handleSignUp}>
                    </Button>
                </div>
                <div>
                    Find Games Now!
                    <Button labelText="Games" onClick={this.handleGameSearch}>
                    </Button>
                </div>
                <div>
                    <Button labelText="Interest" onClick={this.handleIntList}>
                    </Button>
                </div>
            </form>
        );
    }
}

export default LoginForm;