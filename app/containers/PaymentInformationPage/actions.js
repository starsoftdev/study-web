/*
 *
 * PaymentInformationPage actions
 *
 */

import {
  FETCH_CREDIT_CARDS,
  FETCH_CREDIT_CARDS_SUCCESS,
  FETCH_CREDIT_CARDS_ERROR,
  DELETE_CREDIT_CARD,
  DELETE_CREDIT_CARD_SUCCESS,
  DELETE_CREDIT_CARD_ERROR,
  ADD_CREDIT_CARD,
  ADD_CREDIT_CARD_SUCCESS,
  ADD_CREDIT_CARD_ERROR,
} from './constants';

export function fetchCreditCards(payload) {
  return {
    type: FETCH_CREDIT_CARDS,
    client_id: payload,
  };
}

export function creditCardsFetched(payload) {
  return {
    type: FETCH_CREDIT_CARDS_SUCCESS,
    payload,
  };
}

export function creditCardsFetchingError(payload) {
  return {
    type: FETCH_CREDIT_CARDS_ERROR,
    payload,
  };
}

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
