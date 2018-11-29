import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';

import UserLogin from './containers/UserLogin/UserLogIn';
import UserRegister from './containers/UserRegister/UserRegister';
import Service from './containers/Service/Service';
import ManageClients from './containers/ManageClients/ManageClients';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path='/login' exact component={UserLogin} />
          <Route path='/register' exact component={UserRegister} />
          <Route path='/service' exact component={Service} />
          <Route path='/manageclients' exact component={ManageClients}/>
          <Redirect to='/login' />
        </Switch>
      </div>
    )
  }
}

export default App;
