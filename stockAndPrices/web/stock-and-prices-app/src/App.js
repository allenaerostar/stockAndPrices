import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import LoginForm from './login/loginForm';

function App() {
  return (
    <div className="App">
      <header>
        <p>Stock and Prices</p>
      </header>
      <Switch>
      <Route exact path="/login" component={LoginForm}>
      </Route>
      <Route exact path="/" render= {() => (<div> Home Page</div>)}>
      </Route>
      </Switch>
    </div>
  );
}

export default App;
