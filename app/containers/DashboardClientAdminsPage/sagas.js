// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
export function* defaultSaga() {
  console.log('dashboard client admin saga');
}

// All sagas to be loaded
export default [
  defaultSaga,
];
