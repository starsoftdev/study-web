/*
 *
 * ProfilePage reducer
 *
 */

import {
  FETCH_STUDY,
  FETCH_STUDY_PATIENTS,
} from 'containers/StudyPage/constants';

const initialState = {
};

function studyPageReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_STUDY:
      return {
        ...state,
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
