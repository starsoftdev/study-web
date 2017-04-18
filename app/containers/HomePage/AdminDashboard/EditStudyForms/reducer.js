import {
  SET_EDIT_STUDY_FORM_VALUES,
} from '../constants';

export default function editStudyReducer(state = {}, action) {
  switch (action.type) {
    case SET_EDIT_STUDY_FORM_VALUES:
      return {
        ...state,
        values: {
          ...state.values,
          ...action.values,
        },
      };
    default:
      return state;
  }
}
