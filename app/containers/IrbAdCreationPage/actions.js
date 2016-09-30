/*
 *
 * IrbAdCreationPage actions
 *
 */

import {
  SUBMIT_FORM,
  SUBMIT_FORM_SUCCESS,
  SUBMIT_FORM_ERROR,
} from 'containers/IrbAdCreationPage/constants';

export function submitForm(cartValues, formValues) {
  return {
    type: SUBMIT_FORM,
    cartValues,
    formValues,
  };
}

export function formSubmitted(payload) {
  return {
    type: SUBMIT_FORM_SUCCESS,
    payload,
  };
}

export function formSubmissionError(payload) {
  return {
    type: SUBMIT_FORM_ERROR,
    payload,
  };
}
