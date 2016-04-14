import { combineReducers } from 'redux';
import * as sessionsReducer from '../modules/sessions/ducks';
import * as configReducer from './ducks';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  ...sessionsReducer,
  ...configReducer,
  routing: routerReducer
});
