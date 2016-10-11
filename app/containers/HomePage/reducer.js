/* eslint-disable comma-dangle */

import {
  FETCH_PATIENT_SIGN_UPS_SUCCEESS,
  FETCH_PATIENT_MESSAGES_SUCCEESS,
  FETCH_REWARDS_POINT_SUCCEESS,
} from './constants';

import {
  RECEIVE_NOTIFICATION,
} from 'containers/GlobalNotifications/constants';

const initialState = {
  patientSignUps: {
    today: 0,
    yesterday: 0,
  },
  patientMessages: {
    unreadTexts: 0,
    unreadEmails: 0,
  },
  rewardsPoint: 0,
};

export default function homePageReducer(state = initialState, action) {
  const { payload } = action;
  let newState;

  switch (action.type) {
    case FETCH_PATIENT_SIGN_UPS_SUCCEESS:
      return {
        ...state,
        patientSignUps: {
          today: payload.today,
          yesterday: payload.yesterday,
        },
      };
    case FETCH_PATIENT_MESSAGES_SUCCEESS:
      return {
        ...state,
        patientMessages: {
          unreadTexts: payload.unreadTexts,
          unreadEmails: payload.unreadEmails,
        },
      };
    case FETCH_REWARDS_POINT_SUCCEESS:
      return {
        ...state,
        rewardsPoint: action.payload.rewardPoints,
      };
    case RECEIVE_NOTIFICATION:
      newState = state;
      switch (action.payload.event) {
        case 'create-patient':
          newState = {
            ...state,
            patientSignUps: {
              today: newState.patientSignUps.today + 1,
              yesterday: newState.patientSignUps.yesterday,
            },
          };
          break;
        case 'twilio-message':
          newState = {
            ...state,
            patientMessages: {
              unreadTexts: newState.patientMessages.unreadTexts + 1,
              unreadEmails: newState.patientMessages.unreadEmails,
            },
          };
          break;
        case 'create-reward':
          newState = {
            ...state,
            rewardsPoint: newState.rewardsPoint + action.payload.event_params.points
          };
          break;
        default:
          break;
      }
      return newState;
    default:
      return state;
  }
}
