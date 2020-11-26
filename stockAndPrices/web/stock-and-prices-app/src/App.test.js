import React from 'react';
import {MemoryRouter} from 'react-router-dom'
import { getByLabelText, getByText, render } from '@testing-library/react';
import App from './App';
import LoginForm from './login/loginForm';

describe('renders elements on App Page', () => {
  test('going to main page renders Stock and Prices', () => {
    const { getByText } = render(<MemoryRouter initialEntries={['/']}><App /></MemoryRouter>);
    const linkElement = getByText('Home Page');
    expect(linkElement).toBeInTheDocument();
  });
  
  test('renders LoginForm', () => {
    const { getByLabelText } = render(<MemoryRouter initialEntries={['/login']}><App /></MemoryRouter>);
    const username  = getByLabelText('Username:');
    const password = getByLabelText('Password:');
    expect(username).toBeInTheDocument();
    expect(password).toBeInTheDocument();
  });

  test('renders only Stock and Prices Header', () => {
    const {getByText, queryByText} = render(<MemoryRouter initialEntries={['/test']}><App /></MemoryRouter>);
    const header = getByText('Stock and Prices');
    const homePage = queryByText('Home Page');
    const username  = queryByText('Username:');
    expect(header).toBeInTheDocument();
    expect(homePage).toBe(null);
    expect(username).toBe(null);
  });

  test('renders SignUpForm', () => {
    const { getByLabelText } = render(<MemoryRouter initialEntries={['/signup']}><App /></MemoryRouter>);
    const username  = getByLabelText('Username:');
    const password = getByLabelText('Password:');
    const email = getByLabelText('Email:');
    expect(username).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  });
  
});
