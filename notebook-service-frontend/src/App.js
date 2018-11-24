import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import UserLogin from './containers/UserLogin/UserLogIn';
import UserRegister from './containers/UserLogin/UserRegister/UserRegister';
import Redirect from 'react-router-dom/Redirect';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path='/' component={UserLogin} />
            <Route path='/register' component={UserRegister} />
            <UserLogin />
          </Switch>
        </BrowserRouter>
      </div>

    )
  }
}

export default App;
