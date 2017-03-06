import React from 'react';
import { Router, browserHistory } from 'react-router';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { getItem, removeItem } from '../app/utils/localStorage';

import configureStore from '../app/store';

import { default as Corporate } from './containers/Corporate';
import { default as Home } from './containers/HomePage';
import { default as LoginPage } from '../app/containers/LoginPage';
import { default as ConfirmResetPasswordPage } from './containers/ConfirmResetPasswordPage';
import { default as ContactPage } from './containers/ContactPage';
import { default as ListYourTrialsPage } from './containers/ListYourTrialsPage';
import { default as TermsAndConditionsPage } from './containers/TermsAndConditionsPage';
import { default as PrivacyPolicyPage } from './containers/PrivacyPolicyPage';
import { default as LandingPage } from './containers/LandingPage';
import { default as ComingSoon } from './containers/ComingSoon';
import { default as BillingPage } from './containers/BillingPage';
import { default as OrderPage } from './containers/OrderPage';
import { default as AboutPage } from './containers/AboutPage';
import { default as NotFound } from './containers/NotFoundPage';
import { default as ThankYouPage } from './containers/ThankYouPage';

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
    { path: '/confirm-reset-password', component: ConfirmResetPasswordPage },
    { path: '/about', component: AboutPage },
    { path: '/blog', component: ComingSoon },
    { path: '/sitemap', component: ComingSoon },
    { path: '/rss', component: ComingSoon },
    { path: '/contact', component: ContactPage },
    { path: '/list-your-trials', component: ListYourTrialsPage },
    { path: '/billing', component: BillingPage },
    { path: '/order', component: OrderPage },
    { path: '/privacy-policy', component: PrivacyPolicyPage },
    { path: '/terms-and-conditions', component: TermsAndConditionsPage },
    { path: '/app', component: LoginPage, onEnter: redirectApp },
    { path: '/thankyou-page', component: ThankYouPage },
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
