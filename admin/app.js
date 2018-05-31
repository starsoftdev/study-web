/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */
import 'babel-polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import { applyRouterMiddleware, Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import useScroll from 'react-router-scroll';
// import ServiceWorker and AppCache
import { install } from 'offline-plugin/runtime';

// Import the CSS reset, which HtmlWebpackPlugin transfers to the build folder
import 'sanitize.css/sanitize.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import 'codemirror/lib/codemirror.css';

import configureStore from './store';

import './assets/less/main.less';

// Set up the router, wrapping all Routes in the App component
import App from './containers/App';
import createRoutes from './routes';

// Create redux store with history
// this uses the singleton browserHistory provided by react-router
// Optionally, this could be changed to leverage a created history
// e.g. `const browserHistory = useRouterHistory(createBrowserHistory)();`
console.log('executing admin/app.js!');
const initialState = {};
const store = configureStore(initialState, browserHistory);

// Sync history and store
const history = syncHistoryWithStore(browserHistory, store);

const rootRoute = {
  path: '/',
  component: App,
  childRoutes: createRoutes(store),
};

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <div>
        <Router
          history={history}
          routes={rootRoute}
          render={
            // Scroll to top when going to a new page, imitating default browser
            // behaviour
            applyRouterMiddleware(useScroll())
          }
        />
        <ReduxToastr
          timeOut={4000}
          preventDuplicates
          newestOnTop={false}
          position="top-right"
        />
      </div>
    </Provider>,
    document.getElementById('app')
  );
};


if (SENTRY_DSN) {
  Raven.config(SENTRY_DSN).install();
}

render();

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
install();
