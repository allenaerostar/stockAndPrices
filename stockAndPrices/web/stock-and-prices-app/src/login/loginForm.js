import React from 'react';
import Button from '../common/components/button/button';
let validation = require('../common/util/validation.js');

class LoginForm extends React.Component{

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        if(validation.validateFormFields()) {
            const loginUrl = "/login";
            const formData = new FormData(event.target);
            const requestOptions = {
                // don't need header for FormData
                method: 'POST',
                body: formData,
            };
            fetch(loginUrl, requestOptions)
                .then(
                    (result) => {
                        alert("login successful");
                    },
                    (error) => { 
                        alert("Error occurred when submitting login credentials");
                    }
                );
        }
        else {
            alert("Failed login validation");
        }
    }

    handleSignUp(event){
        event.preventDefault();
        const signUpUrl = "/signUp";
        fetch(signUpUrl)
            .then(
                (result) => {
                    alert("Redirect to sign up page");
                },
                (error) => {
                    alert("Failed to redirect to sign up page");
                }
            );
    }

    render() {
        return (
            <form name="loginForm" onSubmit={this.handleSubmit}>
                <label>
                    Username:
                    <input type="text" name="username" minLength="8" maxLength="12" placeholder="Username" required>
                    </input>
                </label>
                <br></br>
                <label>
                    Password:
                    <input type="password" name="password" minLength="8" maxLength="12" placeholder="Password" required>
                    </input>
                </label>
                <br></br>
                <Button labelText="Sign Up" onClick={this.handleSignUp}>
                </Button>
                <Button labelText="Login" buttonType="submit">
                </Button>
            </form>
        );
    }
}

export default LoginForm;