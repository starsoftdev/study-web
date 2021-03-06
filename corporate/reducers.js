/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { default as resetPasswordPageReducer } from '../app/containers/ResetPasswordPage/reducer';
import { default as landingPageReducer } from './containers/LandingPage/reducer';
import appReducer from '../app/containers/App/reducer';

/**
 * Creates the main reducer with the asynchronously loaded ones
 */
export default function createReducer(asyncReducers) {
  return combineReducers({
    routing: routerReducer,
    form: formReducer.plugin({
      LandingPage: landingPageReducer,
    }),
    toastr: toastrReducer,
    resetPasswordPage: resetPasswordPageReducer,
    global: appReducer,
    ...asyncReducers,
  });
}
