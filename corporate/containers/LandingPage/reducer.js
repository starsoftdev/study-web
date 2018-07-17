import {
  SUBSCRIBE_FROM_LANDING,
  PATIENT_SUBSCRIBED,
  PATIENT_SUBSCRIPTION_ERROR,
} from '../../../app/containers/App/constants';

const initialState = {
  surveyRequired: false,
  surveyComplete: false,
  surveyUrl: '',
};

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
    case 'SURVEY_REQUIRED':
      return displaySurvey(state, action);
    case 'SURVEY_COMPLETE':
      return completeSurvey(state, action);
    default:
      return state;
  }
}

function displaySurvey(state, payload) {
  return {
    ...state,
    surveyRequired: true,
    surveyUrl: payload.payload,
  };
}

function completeSurvey(state) {
  return {
    ...state,
    surveyComplete: true,
  };
}
