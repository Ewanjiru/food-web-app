import React from 'react';
import { BrowserRouter as Router, Route, } from 'react-router-dom';
import App from '../src/containers/App.js';
import Dashboard from '../src/components/dashboard';
import Vendors from './components/vendors/vendors.js';
import Menu from './components/menus/menu.js';
import Reports from './components/reports.js';

const routes = () => (
  <Router>
    <div>
      <Route exact path="/" component={Dashboard} />
      <Route path="/vendors" component={Vendors} />
      <Route path="/menus" component={Menu} />
      <Route path="/reports" component={Reports} />
    </div>
  </Router>
);
export default routes
