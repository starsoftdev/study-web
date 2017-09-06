/**
 * Created by mike on 08/22/17.
 */

import {
  FETCHED_USER_EMAIL_NOTIFICATIONS,
} from './constants';
import {
  ADD_STUDY_INDICATION_TAG_SUCCESS,
  REMOVE_STUDY_INDICATION_TAG_SUCCESS,
} from '../../containers/HomePage/AdminDashboard/constants';

export default function editDashboardStudyReducer(state, action) {
  switch (action) {
    case ADD_STUDY_INDICATION_TAG_SUCCESS: {
      let taggedIndicationsForStudy;
      if (state.values.taggedIndicationsForStudy) {
        taggedIndicationsForStudy = [
          ...state.values.taggedIndicationsForStudy,
          {
            label: action.indication.label,
            value: action.indication.value,
          },
        ];
      } else {
        taggedIndicationsForStudy = [
          {
            label: action.indication.label,
            value: action.indication.value,
          },
        ];
      }
      return {
        ...state,
        values: {
          ...state.values,
          taggedIndicationsForStudy,
        },
      };
    }
    case REMOVE_STUDY_INDICATION_TAG_SUCCESS:
      console.log(state.values.taggedIndicationsForStudy);
      return {
        ...state,
        values: {
          ...state.values,
          taggedIndicationsForStudy: state.values.taggedIndicationsForStudy.filter(taggedIndication => (
            taggedIndication.value !== action.indication.value
          )),
        },
      };
    case FETCHED_USER_EMAIL_NOTIFICATIONS:
      return state;
    default:
      return state;
  }
}
