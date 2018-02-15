import React from 'react';
import { BrowserRouter as Router, Route, } from 'react-router-dom';
import App from '../src/containers/App.js';
import Dashboard from '../src/components/dashboard';
import Test from '../src/components/test';
import Vendors from './components/vendors/vendors.js';
import Menu from './components/menus/menu.js';

const routes = () => (
  <Router>
    <div>
      <Route exact path="/" component={Dashboard} />
      <Route path="/vendors" component={Vendors} />
      <Route path="/menus" component={Menu} />
      <Route path="/user" component={Test} />
    </div>
  </Router>
);
export default routes
