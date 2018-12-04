import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import './App.css';

import UserLogin from './containers/UserLogin/UserLogIn';
import UserRegister from './containers/UserRegister/UserRegister';
import Service from './containers/Service/Service';
import ManageClients from './containers/ManageClients/ManageClients';
import Brands from './components/Brands/Brands';
import ModificationTable from './components/ModificationTable/ModificationTable';
import UserTable from './components/UserTable/UserTable';
import Products from './containers/Products/Products';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path='/login' exact component={UserLogin} />
          <Route path='/register' exact component={UserRegister} />
          <Route path='/service' exact component={Service} />
          <Route path='/service/brands' exact component={Brands} />
          <Route path='/service/modifications' exact component={ModificationTable} />
          <Route path='/service/users' exact component={UserTable} />
          <Route path='/manageclients' exact component={ManageClients} />
          <Route path='/products' exact component={Products} />
          <Redirect to='/login' />
        </Switch>
      </div>
    )
  }
}

export default App;
