import { take } from 'redux-saga/effects';

export function* callCenterHomePageSaga() {
  yield take();
}

// Bootstrap sagas
export default [
  callCenterHomePageSaga,
];
