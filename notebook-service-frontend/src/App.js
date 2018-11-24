import React, { Component } from 'react';
import './App.css';
import './UserLogin/UserLogIn';
import UserLogin from './UserLogin/UserLogIn';

class App extends Component {
  render() {
    return (
      <div>
        <UserLogin />
      </div>
    )
  }
}

export default App;
