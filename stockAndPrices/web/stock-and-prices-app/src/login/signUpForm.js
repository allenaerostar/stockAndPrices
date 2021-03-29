import React from 'react';
import { Redirect } from 'react-router-dom';
import Button from '../common/components/button/button';
let validation = require('../common/util/validation.js');

class SignUpForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            redirectToSignIn: false,
            formError: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSignIn = this.handleSignIn.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({formError: ""})
        let usname = event.target.elements.username.value
        let pwd = event.target.elements.password.value
        let ema = event.target.elements.email.value
        let validate = validation.validateFormFields(usname, pwd, ema)
        if("true" === validate) {
            const signUpUrl = "/signUp";
            const formData = new FormData(event.target);
            const requestOptions = {
                // don't need header for FormData
                method: 'POST',
                body: formData,
            };
            fetch(signUpUrl, requestOptions)
                .then(res => res.text())
                .then(data => {
                    //(data) => {
                    if (data === "Account Created. Please Sign In With Your Credentials.") {
                        this.setState({redirectToSignIn: true})
                    }else{
                        this.setState({formError: data})
                    }
                },
                (error) => {
                    console.log("Error: ", error)
                })
        }
        else {
            this.setState({formError: validate})
        }
        
    }

    handleSignIn(event){
        event.preventDefault();
        this.setState({redirectToSignIn: true})
    }

    render() {
        const redirectTo = this.state.redirectToSignIn;
        if (redirectTo === true) {
            return <Redirect to="/login" />
        }
        return (
            <form name='signUpForm' onSubmit={this.handleSubmit}>
                <div>
                    Sign Up
                </div>
                <br />
                <label>
                    Username:
                    <input type="text" name="username" minLength="8" maxLength="12" placeholder="Username" required />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" name="password" minLength="8" maxLength="12" placeholder="Password" required />
                </label>
                <br />
                <label>
                    Email:
                    <input type="email" name="email" placeholder="Email" required />
                </label>
                <div>
                    {this.state.formError}
                </div>
                <Button labelText="Create Account" buttonType="submit" />
                <div>
                    Already have an account?
                    <Button labelText="Sign In" onClick={this.handleSignIn} />
                </div>
            </form>

        )
    }
}

export default SignUpForm;