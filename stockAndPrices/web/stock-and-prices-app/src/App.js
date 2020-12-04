import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import LoginForm from './login/loginForm';
import SignUpForm from './login/signUpForm';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Stock and Prices</h1>
      </header>
      <Switch>
      <Route exact path="/login" component={LoginForm}>
      </Route>
      <Route exact path="/signup" component={SignUpForm} />
      <Route exact path="/" render= {() => (<div> Home Page</div>)}>
      </Route>
      </Switch>
    </div>
  );
}

export default App;
