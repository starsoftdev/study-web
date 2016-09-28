/*
 *
 * PaymentInformationPage actions
 *
 */

import {
  DELETE_CREDIT_CARD,
  DELETE_CREDIT_CARD_SUCCESS,
  DELETE_CREDIT_CARD_ERROR,
  ADD_CREDIT_CARD,
  ADD_CREDIT_CARD_SUCCESS,
  ADD_CREDIT_CARD_ERROR,
} from './constants';

export function deleteCreditCard(payload) {
  return {
    type: DELETE_CREDIT_CARD,
    payload,
  };
}

export function creditCardsDeleted(payload) {
  return {
    type: DELETE_CREDIT_CARD_SUCCESS,
    payload,
  };
}

export function creditCardDeletingError(payload) {
  return {
    type: DELETE_CREDIT_CARD_ERROR,
    payload,
  };
}

export function addCreditCard(payload) {
  return {
    type: ADD_CREDIT_CARD,
    payload,
  };
}

export function creditCardsAdded(payload) {
  return {
    type: ADD_CREDIT_CARD_SUCCESS,
    payload,
  };
}

export function creditCardAddingError(payload) {
  return {
    type: ADD_CREDIT_CARD_ERROR,
    payload,
  };
}
