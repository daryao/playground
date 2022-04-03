import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import './input.css';
import HomePage from './pages/home'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App container">
          <Route path="/" component={HomePage} exact />
          <HomePage />
        </div>
      </Router>
    )
  }
}

export default App;
