import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';

import { default as Corporate } from './containers/Corporate';
import { default as Home } from './containers/HomePage';
import { default as NotFound } from './containers/NotFoundPage';

import './assets/less/main.less';

const routes = {
  path: '/',
  component: Corporate,
  indexRoute: { component: Home },
  childRoutes: [
    { path: '*', component: NotFound },
  ],
};

render(<Router history={browserHistory} routes={routes} />, document.getElementById('app'));
