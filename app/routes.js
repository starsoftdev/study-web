// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from 'utils/asyncInjectors';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const {
    injectReducer,
    injectSagas,
    redirectToDashboard,
    redirectToLogin,
  } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars

  return [
    {
      path: '/',
      name: 'home',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/HomePage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([component]) => {
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      onEnter: redirectToDashboard,
      path: '/login',
      name: 'loginPage',
      getComponent(nextState, cb) {
        System.import('containers/LoginPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      onEnter: redirectToDashboard,
      path: '/reset-password',
      name: 'resetPasswordPage',
      getComponent(nextState, cb) {
        System.import('containers/ResetPasswordPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      onEnter: redirectToLogin,
      path: '/refer',
      name: 'referPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/ReferPage/reducer'),
          System.import('containers/ReferPage/sagas'),
          System.import('containers/ReferPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('referPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      onEnter: redirectToLogin,
      path: '/request-proposal',
      name: 'requestProposalPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/RequestProposalPage/reducer'),
          System.import('containers/RequestProposalPage/sagas'),
          System.import('containers/RequestProposalPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('requestProposalPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      onEnter: redirectToLogin,
      path: '/profile',
      name: 'profilePage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/ProfilePage/reducer'),
          System.import('containers/ProfilePage/sagas'),
          System.import('containers/ProfilePage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('profilePage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        System.import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
