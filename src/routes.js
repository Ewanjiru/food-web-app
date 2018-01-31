import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from '../src/containers/App.js';
import Dashboard from '../src/components/dashboard';

const routes = () => (
  <Router path="/" component={App}>
    <Route component={Dashboard} />
  </Router>
);
export default routes
