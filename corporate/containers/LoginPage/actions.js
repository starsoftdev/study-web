import {
  LOGIN_REQUEST,
} from './constants';

// TODO: all actions from the app/components/LoginPage must be transferred here
export function loginRequest(payload) {
  return {
    type: LOGIN_REQUEST,
    payload,
  };
}
