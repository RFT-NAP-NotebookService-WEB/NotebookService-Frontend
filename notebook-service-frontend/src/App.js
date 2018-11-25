import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import UserLogin from './containers/UserLogin/UserLogIn';
import UserRegister from './containers/UserLogin/UserRegister/UserRegister';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path='/' component={UserLogin} />
            <Route path='/register' component={UserRegister} />
            <UserLogin />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
