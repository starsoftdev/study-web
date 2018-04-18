import React from 'react';
import { Router, browserHistory } from 'react-router';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import mixpanel from 'mixpanel-browser';
import LogRocket from 'logrocket';

import { getItem, removeItem } from '../app/utils/localStorage';
import { setBodyClasses } from '../common/utilities/localization';

import configureStore from './store';

import { default as Corporate } from './containers/Corporate';
import { default as Home } from './containers/HomePage';
import { default as Indication } from './containers/IndicationPage';
import { default as LoginPage } from '../app/containers/LoginPage';
import { default as ConfirmResetPasswordPage } from './containers/ConfirmResetPasswordPage';
import { default as ResetPasswordPage } from '../app/containers/ResetPasswordPage';
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
import { default as ThankYouPage2 } from './containers/ThankYouPage2';

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

const redirectLogin = () => {
  location.href = '/login';
};

const redirect404 = () => {
  location.href = '/404';
};

const routes = {
  path: '/',
  component: Corporate,
  indexRoute: { component: Home },
  childRoutes: [
    { path: '/login/', component: LoginPage, onEnter: redirectLogin },
    { path: '/login', component: LoginPage },
    { path: '/dashboard', component: LoginPage, onEnter: redirectLogin },
    { path: '/reset-password', component: ResetPasswordPage },
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
    { path: '/indication/:indication', component: Indication },
    { path: '/br/indication/:indication', component: Indication },
    { path: '/ca/indication/:indication', component: Indication },
    { path: '/cz/indication/:indication', component: Indication },
    { path: '/de/indication/:indication', component: Indication },
    { path: '/fr/indication/:indication', component: Indication },
    { path: '/jp/indication/:indication', component: Indication },
    { path: '/it/indication/:indication', component: Indication },
    { path: '/pl/indication/:indication', component: Indication },
    { path: '/uk/indication/:indication', component: Indication },
    { path: '/hu/indication/:indication', component: Indication },
    { path: '/thankyou', component: ThankYouPage },
    { path: '/thankyou2', component: ThankYouPage2 },
    { path: '/*-:siteLocation', component: LandingPage },
    { path: '/br', component: Home },
    { path: '/ca', component: Home },
    { path: '/cz', component: Home },
    { path: '/de', component: Home },
    { path: '/fr', component: Home },
    { path: '/jp', component: Home },
    { path: '/it', component: Home },
    { path: '/pl', component: Home },
    { path: '/uk', component: Home },
    { path: '/hu', component: Home },
    { path: '/404', component: NotFound },
    { path: '*', component: NotFound, onEnter: redirect404 },
  ],
};

const render = () => {
  // set html body classes
  setBodyClasses();

  // render application
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

if (SENTRY_DSN) {
  Raven.config(SENTRY_DSN).install();
}

if (MIXPANEL_TOKEN) {
  mixpanel.init(MIXPANEL_TOKEN);
}

if (LOG_ROCKET) {
  LogRocket.init(LOG_ROCKET);

  if (MIXPANEL_TOKEN) {
    LogRocket.getSessionURL((sessionURL) => {
      mixpanel.track('LogRocket', { sessionURL });
    });
  }

  if (SENTRY_DSN) {
    Raven.setDataCallback((data) => {
      // eslint-disable-next-line no-param-reassign
      data.extra.sessionURL = LogRocket.sessionURL;
      return data;
    });
  }
}


render();
