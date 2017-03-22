/**
 * Created by mike on 3/20/17.
 */

import {
  SHOW_SCHEDULED_MODAL,
} from '../constants';

export default function ScheduledPatientModal(state, action) {
  switch (action.type) {
    case SHOW_SCHEDULED_MODAL:
      return undefined;
    default:
      return state;
  }
}
