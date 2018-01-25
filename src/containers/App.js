import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Home from '../Components/home';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  render() {
    return (
      <div className="login">
          <Router>
            <div>
              <Route path="/" component={Home} />
            </div>
          </Router>
      </div>
    );
  }
}

export default App;
