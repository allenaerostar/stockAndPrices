import React from 'react';
import { getByLabelText, getByText, render, fireEvent, screen } from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect'
import App from '../App';
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

describe('Redirect buttons functionality', () => {
    test('test Sign In button will redirect to Login Page', async () => {
        const signUpFormElement = render(<MemoryRouter initialEntries={['/signup']}><App /></MemoryRouter>);
        fireEvent.click(signUpFormElement.getByText("Sign In"));
        expect(screen.getByText('Sign Up')).toBeInTheDocument();
        expect(screen.getByText('Login')).toBeInTheDocument();
        expect(screen.queryByText('Email:')).not.toBeInTheDocument();
    })
});

