import immutable from 'seamless-immutable';
import { push } from 'react-router-redux';
import { request } from '../../../lib';
import { UNAUTHORIZED } from '../../../ducks';

const CREATING = 'study/users/CREATING';
const CREATED = 'study/users/CREATED';
const CREATE_ERROR = 'study/users/CREATE_ERROR';

const DESTROY = 'study/users/DESTROY';

const defaultState = {
  isCreating: false
};

export default function reducer(state = defaultState, { type, ...payload } = {}) {
  switch (type) {
    case CREATING:
      return { ...state, isCreating: true };

    case CREATED:
      return { ...state, isCreating: false, user: immutable(payload.user) };

    case UNAUTHORIZED:
    case DESTROY:
      return { ...state, user: null };

    case CREATE_ERROR:
      return { ...state, error: payload.error };

    default:
      return state;
  }
}

export function createUser(payload, redirect) {
  return async (dispatch, getState) => {
    dispatch({ type: CREATING });
    try {
      const { apiHost } = getState().config;
      const response = await request.post(`${apiHost}/users`, payload);
      dispatch({ type: CREATED, user: response.body.user });
      dispatch(push(redirect));
    } catch (e) {
      dispatch({ type: CREATE_ERROR, error: e.message });
    }
  };
}
