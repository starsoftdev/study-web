/* eslint-disable comma-dangle */

import {
  FETCH_PATIENT_SIGN_UPS_SUCCEESS,
  FETCH_PATIENT_MESSAGES_SUCCEESS,
  FETCH_REWARDS_POINT_SUCCEESS,
} from './constants';

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
    default:
      return state;
  }
}
