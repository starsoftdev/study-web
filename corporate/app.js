import React from 'react';
import { Router, browserHistory } from 'react-router';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './store';

import { default as Corporate } from './containers/Corporate';
import { default as Home } from './containers/HomePage';
import { default as LoginPage } from './containers/LoginPage';
import { default as ContactPage } from './containers/ContactPage';
import { default as NotFound } from './containers/NotFoundPage';

import './assets/less/main.less';

const initialState = {};
const store = configureStore(initialState, browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

const routes = {
  path: '/',
  component: Corporate,
  indexRoute: { component: Home },
  childRoutes: [
    { path: '/login', component: LoginPage },
    { path: '/contact', component: ContactPage },
    { path: '*', component: NotFound },
  ],
};

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router
        history={history}
        routes={routes}
      />
    </Provider>,
    document.getElementById('app')
  );
};

render();
