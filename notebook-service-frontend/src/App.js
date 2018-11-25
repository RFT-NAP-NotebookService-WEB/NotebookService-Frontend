import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import UserLogin from './containers/UserLogin/UserLogIn';
import UserRegister from './containers/UserLogin/UserRegister/UserRegister';


class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path='/'  exact component={UserLogin} />
          <Route path='/register' exact component={UserRegister} />
        </Switch>
      </div>
    )
  }
}

export default App;
