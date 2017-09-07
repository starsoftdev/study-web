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

const initialState = {};

export default function editDashboardStudyReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_STUDY_INDICATION_TAG_SUCCESS: {
      let taggedIndicationsForStudy;
      if (state.values.taggedIndicationsForStudy) {
        taggedIndicationsForStudy = [
          ...state.values.taggedIndicationsForStudy,
          {
            label: action.indication.name,
            value: action.indication.id,
          },
        ];
      } else {
        taggedIndicationsForStudy = [
          {
            label: action.indication.name,
            value: action.indication.id,
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
