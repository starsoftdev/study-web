/**
 * Created by mike on 08/22/17.
 */

import {
  FETCHED_USER_EMAIL_NOTIFICATIONS,
} from './constants';

export default function editDashboardStudyReducer(state, action) {
  switch (action) {
    case FETCHED_USER_EMAIL_NOTIFICATIONS:
      return state;
    default:
      return state;
  }
}
