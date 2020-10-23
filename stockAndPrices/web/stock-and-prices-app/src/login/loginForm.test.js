import React from 'react';
import { getByLabelText, getByText, render } from '@testing-library/react';
import LoginForm from './loginForm.js';

describe('renders login form', () => {
    test('test login form rendered has username, password, sign up button, and login button', () => {
        const loginForm = <LoginForm></LoginForm>;
        const loginFormElement = render(loginForm);
        expect(loginFormElement.getByLabelText('Username:')).toBeInTheDocument();
        expect(loginFormElement.getByLabelText('Password:')).toBeInTheDocument();
        expect(loginFormElement.getByText('Sign Up')).toBeInTheDocument();
        expect(loginFormElement.getByText('Login')).toBeInTheDocument();
    });
});