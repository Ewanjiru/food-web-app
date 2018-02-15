import React from 'react';
import { BrowserRouter as Router, Route, } from 'react-router-dom';
import App from '../src/containers/App.js';
import Dashboard from '../src/components/dashboard';
import Test from '../src/components/test';

const routes = () => (
  <Router path="/" component={App}>
  <div>
    <Route component={Dashboard} />
    <Route path="/user" component={Test}/>
    </div>
  </Router>
);
export default routes
