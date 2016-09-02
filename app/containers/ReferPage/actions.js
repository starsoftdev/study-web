/*
 *
 * ReferPage actions
 *
 */

import {
  REFER_FORM_REQUEST,
  REFER_FORM_SUCCESS,
  REFER_FORM_ERROR,
  COMPANY_TYPES_REQUEST,
  COMPANY_TYPES_SUCCESS,
  COMPANY_TYPES_ERROR,
} from './constants';

export function referFormRequest(payload) {
  return {
    type: REFER_FORM_REQUEST,
    payload,
  };
}

export function referFormSuccess(payload) {
  return {
    type: REFER_FORM_SUCCESS,
    payload,
  };
}

export function referFormError(payload) {
  return {
    type: REFER_FORM_ERROR,
    payload,
  };
}

export function companyTypesRequest() {
  return {
    type: COMPANY_TYPES_REQUEST,
  };
}

export function companyTypesSuccess(payload) {
  return {
    type: COMPANY_TYPES_SUCCESS,
    payload,
  };
}

export function companyTypesError(payload) {
  return {
    type: COMPANY_TYPES_ERROR,
    payload,
  };
}
