import React, { Component } from 'react';
import './App.css';
import './UserLogin/UserLogIn';
import UserLogin from './UserLogin/UserLogIn';
import Service from './Service/Service';

class App extends Component {
  render() {
    return (
      <div>
        <UserLogin />
        <Service />
      </div>
    )
  }
}

export default App;
