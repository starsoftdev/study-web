import { take } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

// Bootstrap sagas
export default [
  adminHomePageSaga,
];

export function* adminHomePageSaga() {
  const options = yield take(LOCATION_CHANGE);
  if (options.payload.pathname !== '/admin/home') {
    console.log('options.payload.pathname: ', options.payload.pathname);
  }
}
