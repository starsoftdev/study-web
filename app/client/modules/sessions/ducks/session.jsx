import immutable from 'seamless-immutable';
import { request } from '../../../lib';
import { UNAUTHORIZED } from '../../../ducks';

const CREATING = 'study/session/CREATING';
const CREATED = 'study/session/CREATED';
const CREATE_ERROR = 'study/session/CREATE_ERROR';

const DESTROY = 'study/session/DESTROY';

const defaultState = {};

export default function reducer(state = defaultState, { type, ...payload } = {}) {
  switch (type) {
    case CREATED:
      return { ...state, user: immutable(payload.user) };

    case UNAUTHORIZED:
    case DESTROY:
      return { ...state, user: null };

    case CREATE_ERROR:
      return { ...state, error: payload.error };

    default:
      return state;
  }
}

export function createSession({ email, password }) {
  return async (dispatch, getState) => {
    dispatch({ type: CREATING });
    try {
      const { apiHost } = getState().config;
      const response = await request.post(`${apiHost}/sessions`, { email, password });
      dispatch({ type: CREATED, user: response.body.user });
    } catch (e) {
      dispatch({ type: CREATE_ERROR, error: e.message });
    }
  };
}

export function destroySession() {
  return (dispatch) => {
    dispatch({ type: DESTROY });
  };
}
