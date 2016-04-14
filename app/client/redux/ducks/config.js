/* global __API_HOST__ */

const GET = 'caiman/config/GET';

export default function reducer(state = {}, { type } = {}) {
  switch (type) {
    case GET: {
      return {
        ...state,
        apiHost: __API_HOST__
      };
    }
    default: return state;
  }
}

export function getConfig() {
  return { type: GET };
}
