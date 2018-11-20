import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <h>Login Screen</h>
        <p>Please enter your Tracking ID here.</p>
        <input type = "text"/>
        <button>Submit</button>
      </div>
    );
  }
}

export default App;
