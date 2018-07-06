import { conformsTo, isEmpty, isFunction, isObject, isString } from 'lodash';
import invariant from 'invariant';
import warning from 'warning';

import authorizedRoutes from '../common/constants/authorizedRoutes';
import createReducer from '../reducers';
import { selectAuthState, selectCurrentUser } from '../containers/App/selectors';
import { setItem } from '../utils/localStorage';

/**
 * Validate the shape of redux store
 */
export function checkStore(store) {
  const shape = {
    dispatch: isFunction,
    subscribe: isFunction,
    getState: isFunction,
    replaceReducer: isFunction,
    runSaga: isFunction,
    asyncReducers: isObject,
  };
  invariant(
    conformsTo(store, shape),
    '(app/utils...) asyncInjectors: Expected a valid redux store'
  );
}

/**
 * Inject an asynchronously loaded reducer
 */
export function injectAsyncReducer(store, isValid) {
  return function injectReducer(name, asyncReducer) {
    if (!isValid) checkStore(store);

    invariant(
      isString(name) && !isEmpty(name) && isFunction(asyncReducer),
      '(app/utils...) injectAsyncReducer: Expected `asyncReducer` to be a reducer function'
    );

    store.asyncReducers[name] = asyncReducer; // eslint-disable-line no-param-reassign
    store.replaceReducer(createReducer(store.asyncReducers));
  };
}

/**
 * Inject an asynchronously loaded saga
 */
export function injectAsyncSagas(store, isValid) {
  return function injectSagas(sagas) {
    if (!isValid) checkStore(store);

    invariant(
      Array.isArray(sagas),
      '(app/utils...) injectAsyncSagas: Expected `sagas` to be an array of generator functions'
    );

    warning(
      !isEmpty(sagas),
      '(app/utils...) injectAsyncSagas: Received an empty `sagas` array'
    );

    sagas.map(store.runSaga);
  };
}

function redirectToLogin(store) {
  return (nextState) => {
    const { location: { pathname } } = nextState;
    if (!selectAuthState()(store.getState())) {
      /**
       * it's necessary to reboot in order to enter into a corporate portal entry point
       * where login page is stored
       */
      setItem('redirect_path', pathname);
      location.href = '/login';
    } else if (pathname !== '/app') {
      // If the user is logged in, but does not have the access to the route, redirect to /app
      // Wait for user data to load
      setTimeout(() => {
        const currentUser = selectCurrentUser()(store.getState());
        let userRole;
        let otherRoles;
        if (currentUser) {
          if (currentUser.roleForClient) {
            userRole = 'client';
            otherRoles = ['sponsor', 'dashboard'];
          } else if (currentUser.roleForSponsor) {
            userRole = 'sponsor';
            otherRoles = ['client', 'dashboard'];
          } else {
            userRole = 'admin';
            otherRoles = ['client', 'sponsor'];
          }

          if (
            authorizedRoutes[userRole].indexOf(pathname) === -1 &&
            (
              authorizedRoutes[otherRoles[0]].indexOf(pathname) > -1 ||
              authorizedRoutes[otherRoles[1]].indexOf(pathname) > -1
            )
          ) {
            location.href = '/app';
          }
        }
      }, 4000);
    }
  };
}

function redirectToDashboard(store) {
  return (nextState, replace) => {
    if (selectAuthState()(store.getState())) {
      replace('/app/');
    }
  };
}

/**
 * Helper for creating injectors
 */
export function getAsyncInjectors(store) {
  checkStore(store);

  return {
    injectReducer: injectAsyncReducer(store, true),
    injectSagas: injectAsyncSagas(store, true),
    redirectToLogin: redirectToLogin(store),
    redirectToDashboard: redirectToDashboard(store),
  };
}
