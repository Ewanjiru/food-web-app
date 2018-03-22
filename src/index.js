import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App.js';
import AppStore from '../src/store/store';
import { BrowserRouter, Route } from 'react-router-dom';

import Routes from './routes'


const store = AppStore();
render((
  <Provider store={store}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>), document.getElementById('root')
);

