import React from 'react';
import { Redirect } from 'react-router-dom';
import Button from '../common/components/button/button';
//let validation = require('../common/util/validation.js');

class LoginForm extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            redirectToSignUp: false,
            username: null,
            password: null,
            email: null,
            formError: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
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
            .then(res => res.text())
            .then(
                (data)=> {
                this.setState({formError: data})
            },
            (error) => {
                console.log("Error:", error)
            })
    }

    handleSignUp(event){
        event.preventDefault();
        this.setState({redirectToSignUp: true})
    }

    render() {
        const redirectTo = this.state.redirectToSignUp;
        if (redirectTo === true) {
            return <Redirect to="/signUp" />
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
            </form>
        );
    }
}

export default LoginForm;