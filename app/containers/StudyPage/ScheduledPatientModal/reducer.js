/**
 * Created by mike on 3/20/17.
 */

import {
  HIDE_SCHEDULED_MODAL,
  SUBMIT_SCHEDULE_SUCCEEDED,
} from '../constants';

export default function ScheduledPatientModal(state, action) {
  switch (action.type) {
    case HIDE_SCHEDULED_MODAL:
    case SUBMIT_SCHEDULE_SUCCEEDED:
      return undefined;
    default:
      return state;
  }
}
