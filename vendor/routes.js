// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from '../app/utils/asyncInjectors';

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
      path: '/app/vendor',
      name: 'vendorHome',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('./containers/VendorHome/reducer'),
          System.import('./containers/VendorHome/sagas'),
          System.import('./containers/VendorHome'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('vendorHome', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      onEnter: redirectToLogin,
      path: '/app/vendor/study/:id',
      name: 'vendorStudyPage',
      getComponent(nextState, cb) {
        if (isNaN(nextState.params.id)) {
          System.import('./containers/NotFoundPage')
            .then(loadModule(cb))
            .catch(errorLoading);
        } else {
          const importModules = Promise.all([
            System.import('./containers/VendorStudyPage/reducer'),
            System.import('./containers/VendorStudyPage/sagas'),
            System.import('./containers/VendorStudyPage'),
          ]);

          const renderRoute = loadModule(cb);

          importModules.then(([reducer, sagas, component]) => {
            injectReducer('vendorStudyPage', reducer.default);
            injectSagas(sagas.default);
            renderRoute(component);
          });

          importModules.catch(errorLoading);
        }
      },
    },
    {
      path: '/app/vendor*',
      name: 'notfound',
      getComponent(nextState, cb) {
        System.import('./containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
