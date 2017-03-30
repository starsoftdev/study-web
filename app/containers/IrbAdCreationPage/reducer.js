/*
 *
 * IrbAdCreationPage reducer
 *
 */

import {
  FETCH_IRB_PRODUCT_LIST_SUCCESS,
  FETCH_IRB_AD_CREATION_SUCCESS,
  SUBMIT_FORM,
  SUBMIT_FORM_SUCCESS,
  SUBMIT_FORM_ERROR,
} from './constants';

const initialState = {
  productList: [],
  irbAdCreation: null,
  formSubmissionStatus: {
    submitting: false,
    error: null,
    response: null,
  },
};

function irbAdCreationPageReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_IRB_PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        productList: action.payload,
      };
    case FETCH_IRB_AD_CREATION_SUCCESS:
      return {
        ...state,
        irbAdCreation: action.payload,
      };
    case SUBMIT_FORM:
      return {
        ...state,
        formSubmissionStatus: {
          submitting: true,
          error: null,
          response: null,
        },
      };
    case SUBMIT_FORM_SUCCESS:
      return {
        ...state,
        formSubmissionStatus: {
          submitting: false,
          error: null,
          response: action.payload,
        },
      };
    case SUBMIT_FORM_ERROR:
      return {
        ...state,
        formSubmissionStatus: {
          submitting: false,
          error: action.payload,
          response: null,
        },
      };
    default:
      return state;
  }
}

export default irbAdCreationPageReducer;
