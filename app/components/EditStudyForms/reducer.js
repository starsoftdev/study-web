/**
 * Created by mike on 08/22/17.
 */

import {
  ADD_EMAIL_NOTIFICATION_USER_SUCCESS,
  ADD_CUSTOM_EMAIL_NOTIFICATION_SUCCESS,
} from '../../containers/App/constants';
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
    case ADD_EMAIL_NOTIFICATION_USER_SUCCESS: {
      let emailNotifications;
      if (state.values.emailNotifications) {
        emailNotifications = [
          ...state.values.emailNotifications,
          {
            email: action.email,
            userId: action.userId,
            isChecked: true,
          },
        ];
      } else {
        emailNotifications = [
          {
            email: action.email,
            userId: action.userId,
            isChecked: true,
          },
        ];
      }
      let initialEmailNotifications;
      if (state.initial.emailNotifications) {
        initialEmailNotifications = [
          ...state.initial.emailNotifications,
          {
            email: action.email,
            userId: action.userId,
            isChecked: true,
          },
        ];
      } else {
        initialEmailNotifications = [
          {
            email: action.email,
            userId: action.userId,
            isChecked: true,
          },
        ];
      }
      return {
        ...state,
        values: {
          ...state.values,
          emailNotifications,
        },
        initial: {
          ...state.initial,
          emailNotifications: initialEmailNotifications,
        },
      };
    }
    case ADD_CUSTOM_EMAIL_NOTIFICATION_SUCCESS: {
      let customEmailNotifications;
      if (state.values.customEmailNotifications) {
        customEmailNotifications = [
          ...state.values.customEmailNotifications,
          {
            email: action.email,
            id: action.id,
            isChecked: true,
          },
        ];
      } else {
        customEmailNotifications = [
          {
            email: action.email,
            id: action.id,
            isChecked: true,
          },
        ];
      }
      let initialCustomEmailNotifications;
      if (state.initial.emailNotifications) {
        initialCustomEmailNotifications = [
          ...state.initial.emailNotifications,
          {
            email: action.email,
            id: action.id,
            isChecked: true,
          },
        ];
      } else {
        initialCustomEmailNotifications = [
          {
            email: action.email,
            userId: action.userId,
            isChecked: true,
          },
        ];
      }
      return {
        ...state,
        values: {
          ...state.values,
          customEmailNotifications,
        },
        initial: {
          ...state.initial,
          customEmailNotifications: initialCustomEmailNotifications,
        },
      };
    }
    default:
      return state;
  }
}
