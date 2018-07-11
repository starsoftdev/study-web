/**
 * Created by mike on 3/20/17.
 */

import {
  HIDE_SCHEDULED_MODAL,
  SUBMIT_SCHEDULE_SUCCEEDED,
  SHOW_SCHEDULED_MODAL,
} from '../constants';
import { SchedulePatientModalType } from '../../../common/constants/index';

export default function ScheduledPatientModal(state, action) {
  switch (action.type) {
    case SHOW_SCHEDULED_MODAL:
      if (action.modalType === SchedulePatientModalType.CREATE) {
        const initialValues = { textReminder: false };
        return {
          ...state,
          modalType: action.modalType,
          initial: initialValues,
          values: initialValues,
        };
      }
      return {
        ...state,
        modalType: action.modalType,
      };

    case HIDE_SCHEDULED_MODAL:
    case SUBMIT_SCHEDULE_SUCCEEDED:
      return undefined;
    default:
      return state;
  }
}
