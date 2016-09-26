/*
 *
 * ProfilePage reducer
 *
 */

import {
  FETCH_STUDY_SUCCESS,
  FETCH_STUDY_ERROR,
  FETCH_STUDY_PATIENTS,
} from './constants';

const initialState = {
};

function studyPageReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_STUDY_SUCCESS:
      return {
        ...state,
        study: action.payload,
      };
    case FETCH_STUDY_ERROR:
      return {
        ...state,
        study: false,
      };
    case FETCH_STUDY_PATIENTS:
      return {
        ...state,
        changePasswordResult: {
          success: false,
          info: action.payload,
        },
      };
    default:
      return state;
  }
}

export default studyPageReducer;
