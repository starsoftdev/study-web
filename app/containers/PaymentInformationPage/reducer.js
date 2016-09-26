/*
 *
 * PaymentInformationPage reducer
 *
 */

import {
  FETCH_CREDIT_CARDS_SUCCESS,
  DELETE_CREDIT_CARD_SUCCESS,
} from 'containers/PaymentInformationPage/constants';
import _ from 'lodash';

const initialState = {
  creditCards: [],
};

function paymentInformationPageReducer(state = initialState, action) {
  const newState = _.cloneDeep(state);
  switch (action.type) {
    case FETCH_CREDIT_CARDS_SUCCESS:
      return {
        ...state,
        creditCards: action.payload,
      };
    case DELETE_CREDIT_CARD_SUCCESS:
      _.remove(newState.creditCards, { id: action.payload.id });
      return {
        ...state,
        creditCards: newState.creditCards,
      };
    default:
      return state;
  }
}

export default paymentInformationPageReducer;
