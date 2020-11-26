import React from 'react';
import { getByLabelText, getByText, render} from '@testing-library/react';
import SignUpForm from './signUpForm.js';

describe('renders sign up form', () => {
    test('test sign up form rendered has username, password, email, create account button, and sign in button', () => {
        const signUpForm = <SignUpForm />;
        const signUpFormElement = render(signUpForm);
        expect(signUpFormElement.getByLabelText('Username:')).toBeInTheDocument();
        expect(signUpFormElement.getByLabelText('Password:')).toBeInTheDocument();
        expect(signUpFormElement.getByLabelText('Email:')).toBeInTheDocument();
        expect(signUpFormElement.getByText("Create Account")).toBeInTheDocument();
        expect(signUpFormElement.getByText("Sign In")).toBeInTheDocument();
    });
});



