// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from './utils/asyncInjectors';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = cb => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const {
    injectReducer,
    injectSagas,
    redirectToLogin,
  } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars

  return [
    {
      onEnter: redirectToLogin,
      path: '/admin/home',
      name: 'adminHomePage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('./containers/AdminHome/reducer'),
          System.import('./containers/AdminHome/sagas'),
          System.import('./containers/AdminHome'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('adminHomePage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      onEnter: redirectToLogin,
      path: '/admin/reports',
      name: 'adminReportsPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('./containers/AdminReports/reducer'),
          System.import('./containers/AdminReports/sagas'),
          System.import('./containers/AdminReports'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('adminReportsPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      onEnter: redirectToLogin,
      path: '/admin/studyStats/:studyId',
      name: 'AdminStudyStatsPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('./containers/AdminStudyStats/reducer'),
          System.import('./containers/AdminStudyStats/sagas'),
          System.import('./containers/AdminStudyStats'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('AdminStudyStatsPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/admin*',
      name: 'notfound',
      getComponent(nextState, cb) {
        System.import('./containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
