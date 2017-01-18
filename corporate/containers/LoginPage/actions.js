import {
  LOGIN_REQUEST,
} from './constants';

export function loginRequest(payload) {
  console.log('payload', payload);
  return {
    type: LOGIN_REQUEST,
    payload,
  };
}
