import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from '../src/containers/App.js';
import Home from '../src/components/home.js';

const routes = () => (
  <Router path="/" component={App}>
    <Route component={Home} />
  </Router>
);
export default routes