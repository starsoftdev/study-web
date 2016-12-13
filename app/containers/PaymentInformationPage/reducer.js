/*
 *
 * PaymentInformationPage reducer
 *
 */
import {
  SET_ACTIVE_SORT,
} from './constants';

const initialState = {
  paginationOptions: {
    activeSort: null,
    activeDirection: null,
  },
};

function paymentInformationPageReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ACTIVE_SORT:
      return {
        ...state,
        paginationOptions: {
          activeSort: action.sort,
          activeDirection: action.direction,
        },
      };
    default:
      return state;
  }
}

export default paymentInformationPageReducer;
