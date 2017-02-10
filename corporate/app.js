import React from 'react';
import { Router, browserHistory } from 'react-router';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { getItem, removeItem } from 'utils/localStorage';

import '!file?name=[name].[ext]!./manifest.json';

import configureStore from '../app/store';

import { default as Corporate } from './containers/Corporate';
import { default as Home } from './containers/HomePage';
import { default as LoginPage } from '../app/containers/LoginPage';
import { default as ContactPage } from './containers/ContactPage';
import { default as ListYourTrialsPage } from './containers/ListYourTrialsPage';
import { default as TermsAndConditionsPage } from './containers/TermsAndConditionsPage';
import { default as LandingPage } from './containers/LandingPage';
import { default as BillingPage } from './containers/BillingPage';
import { default as OrderPage } from './containers/OrderPage';
import { default as NotFound } from './containers/NotFoundPage';

import './assets/less/main.less';

const initialState = {};
const store = configureStore(initialState, browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

const redirectApp = () => {
  // redirect to nextPathName or to the dashboard page
  const redirectPath = getItem('redirect_path') || '/app';
  removeItem('redirect_path');
  location.href = redirectPath;
};

const routes = {
  path: '/',
  component: Corporate,
  indexRoute: { component: Home },
  childRoutes: [
    { path: '/login', component: LoginPage },
    { path: '/contact', component: ContactPage },
    { path: '/list-your-trials', component: ListYourTrialsPage },
    { path: '/billing', component: BillingPage },
    { path: '/order', component: OrderPage },
    { path: '/terms-and-conditions', component: TermsAndConditionsPage },
    { path: '/app', component: LoginPage, onEnter: redirectApp },
    { path: '/*-:siteLocation', component: LandingPage },
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
