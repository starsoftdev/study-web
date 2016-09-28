import expect from 'expect';

import {
  deleteCreditCard,
  creditCardsDeleted,
  creditCardDeletingError,
  addCreditCard,
  creditCardsAdded,
  creditCardAddingError,
} from '../actions';

import {
  DELETE_CREDIT_CARD,
  DELETE_CREDIT_CARD_SUCCESS,
  DELETE_CREDIT_CARD_ERROR,
  ADD_CREDIT_CARD,
  ADD_CREDIT_CARD_SUCCESS,
  ADD_CREDIT_CARD_ERROR,
} from '../constants';

describe('PaymentInformationPage actions', () => {
  describe('actions for delete credit card', () => {
    describe('deleteCreditCard', () => {
      it('should return the correct type with form values', () => {
        const values = {
          email: 'test.user@example.com',
          name: 'Test User',
          number: '4242424242424242',
        };
        const expected = {
          type: DELETE_CREDIT_CARD,
          payload: values,
        };
        expect(deleteCreditCard(values)).toEqual(expected);
      });
    });

    describe('creditCardsDeleted', () => {
      it('should return the correct type and the resopnse', () => {
        const response = {};
        const expected = {
          type: DELETE_CREDIT_CARD_SUCCESS,
          payload: response,
        };
        expect(creditCardsDeleted(response)).toEqual(expected);
      });
    });

    describe('creditCardDeletingError', () => {
      it('should return the correct type and the error', () => {
        const error = { status: '', message: '' };
        const expected = {
          type: DELETE_CREDIT_CARD_ERROR,
          payload: error,
        };
        expect(creditCardDeletingError(error)).toEqual(expected);
      });
    });
  });

  describe('actions for create credit card', () => {
    describe('addCreditCard', () => {
      it('should return the correct type with form values', () => {
        const values = {
          email: 'test.user@example.com',
          name: 'Test User',
          number: '4242424242424242',
        };
        const expected = {
          type: ADD_CREDIT_CARD,
          payload: values,
        };
        expect(addCreditCard(values)).toEqual(expected);
      });
    });

    describe('creditCardsAdded', () => {
      it('should return the correct type and the resopnse', () => {
        const response = {};
        const expected = {
          type: ADD_CREDIT_CARD_SUCCESS,
          payload: response,
        };
        expect(creditCardsAdded(response)).toEqual(expected);
      });
    });

    describe('creditCardDeletingError', () => {
      it('should return the correct type and the error', () => {
        const error = { status: '', message: '' };
        const expected = {
          type: ADD_CREDIT_CARD_ERROR,
          payload: error,
        };
        expect(creditCardAddingError(error)).toEqual(expected);
      });
    });
  });
});
