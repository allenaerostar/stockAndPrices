import React from 'react';
import { getByLabelText, getByText, render, screen, fireEvent } from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom'
import LoginForm from './loginForm.js';
import App from '../App';

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

describe('Redirect buttons functionality', () => {
    test('test Sign In button will redirect to Login Page', async () => {
        const signUpFormElement = render(<MemoryRouter initialEntries={['/login']}><App /></MemoryRouter>);
        fireEvent.click(signUpFormElement.getByText("Sign Up"));
        expect(screen.getByText('Sign In')).toBeInTheDocument();
        expect(screen.getByText('Create Account')).toBeInTheDocument();
    })
});