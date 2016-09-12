import { fork } from 'redux-saga/effects';

import fetchMeSaga from './fetchMe.saga';
import loginSaga from './login.saga';

// ALl sagas to be loaded
// @ref: https://github.com/mxstbr/react-boilerplate/issues/537
// exporting array of individual sagas doesn't work
// middleware run only accepts one saga
export default function* globalSagas() {
  yield fork(fetchMeSaga);
  yield fork(loginSaga);

  /*
  const watcherA = yield fork(fetchMeSaga);
  const watcherB = yield fork(loginSaga);
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcherA);
  yield cancel(watcherB);
  */
}
