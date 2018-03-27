import {
  SUBSCRIBE_FROM_LANDING,
  PATIENT_SUBSCRIBED,
  PATIENT_SUBSCRIPTION_ERROR,
} from '../../../app/containers/App/constants';

const initialState = {};

export default function landingPageReducer(state = initialState, action) {
  switch (action.type) {
    case SUBSCRIBE_FROM_LANDING:
      return {
        ...state,
        submitting: true,
      };
    case PATIENT_SUBSCRIBED:
      return {
        ...state,
        submitting: false,
      };
    case PATIENT_SUBSCRIPTION_ERROR:
      return {
        ...state,
        submitting: false,
      };
    default:
      return state;
  }
}