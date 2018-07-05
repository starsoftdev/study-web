import {
  ADD_EMAIL_NOTIFICATION_USER_SUCCESS,
  ADD_CUSTOM_EMAIL_NOTIFICATION_SUCCESS,
  UPDATE_DASHBOARD_STUDY_SUCCESS,
} from '../../containers/AdminStudyEdit/constants';

const initialState = {};

export default function editAdminStudyReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_EMAIL_NOTIFICATION_USER_SUCCESS: {
      let emailNotifications;
      if (state.values && state.values.emailNotifications) {
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
      if (state.initial && state.initial.emailNotifications) {
        initialEmailNotifications = [
          ...state.initial.emailNotifications,
          {
            email: action.email,
            userId: action.userId,
            isChecked: false,
          },
        ];
      } else {
        initialEmailNotifications = [
          {
            email: action.email,
            userId: action.userId,
            isChecked: false,
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
      if (state.initial.customEmailNotifications) {
        initialCustomEmailNotifications = [
          ...state.initial.customEmailNotifications,
          {
            email: action.email,
            id: action.id,
            isChecked: false,
          },
        ];
      } else {
        initialCustomEmailNotifications = [
          {
            email: action.email,
            userId: action.userId,
            isChecked: false,
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
    case UPDATE_DASHBOARD_STUDY_SUCCESS: {
      let emailNotifications;
      if (state.initial.emailNotifications && action.updatedStudyParams.emailNotifications) {
        emailNotifications = state.initial.emailNotifications.map(emailNotification => {
          const updatedEmailNotification = _.find(action.updatedStudyParams.emailNotifications, { userId: emailNotification.userId });
          if (updatedEmailNotification) {
            const isChecked = updatedEmailNotification ? updatedEmailNotification.isChecked : false;
            return {
              ...emailNotification,
              isChecked,
            };
          } else {
            return emailNotification;
          }
        });
      } else {
        emailNotifications = state.initial.emailNotifications;
      }
      let customEmailNotifications;
      if (state.initial.customEmailNotifications && action.updatedStudyParams.customEmailNotifications) {
        customEmailNotifications = state.initial.customEmailNotifications.map(emailNotification => {
          const updatedEmailNotification = _.find(action.updatedStudyParams.customEmailNotifications, { id: emailNotification.id });
          if (updatedEmailNotification) {
            const isChecked = updatedEmailNotification ? updatedEmailNotification.isChecked : false;
            return {
              ...emailNotification,
              isChecked,
            };
          } else {
            return emailNotification;
          }
        });
      } else {
        customEmailNotifications = state.initial.customEmailNotifications;
      }
      return {
        ...state,
        initial: {
          ...state.initial,
          ...action.updatedStudyParams,
          emailNotifications,
          customEmailNotifications,
        },
      };
    }
    default:
      return state;
  }
}
