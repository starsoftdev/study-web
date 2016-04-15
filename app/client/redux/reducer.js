import { combineReducers } from 'redux';
import * as sessionsReducer from '../modules/sessions/ducks';
import * as usersReducer from '../modules/users/ducks';
import * as configReducer from './ducks';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  ...sessionsReducer,
  ...usersReducer,
  ...configReducer,
  routing: routerReducer
});
