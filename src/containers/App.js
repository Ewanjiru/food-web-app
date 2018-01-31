import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom'
import '../styles/App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Home from '../Components/home';
import Dashboard from '../components/dashboard';
import './App.css';
// import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
};

export default App;
