/*
 *
 * DashboardCouponPage reducer
 *
 */

import _ from 'lodash';
import {
  FETCH_COUPON,
  FETCH_COUPON_SUCCESS,
  FETCH_COUPON_ERROR,
  ADD_COUPON,
  ADD_COUPON_SUCCESS,
  ADD_COUPON_ERROR,
  EDIT_COUPON,
  EDIT_COUPON_SUCCESS,
  EDIT_COUPON_ERROR,
  DELETE_COUPON,
  DELETE_COUPON_SUCCESS,
  DELETE_COUPON_ERROR,
  SET_ACTIVE_SORT,
} from './constants';

const initialState = {
  coupon: {
    details: [],
    fetching: false,
    error: null,
  },
  editCouponProcess: {
    saving: false,
    deleting: false,
    error: null,
  },
  paginationOptions: {
    activeSort: null,
    activeDirection: null,
  },
};

function dashboardCouponPageReducer(state = initialState, action) {
  const newCoupons = _.cloneDeep(state.coupon.details);
  let foundUserIndex = null;

  switch (action.type) {
    case FETCH_COUPON:
      return {
        ...state,
        coupon: {
          details: [],
          fetching: true,
          error: null,
        },
      };
    case FETCH_COUPON_SUCCESS:
      return {
        ...state,
        coupon: {
          details: action.payload,
          fetching: false,
          error: null,
        },
      };
    case FETCH_COUPON_ERROR:
      return {
        ...state,
        coupon: {
          details: [],
          fetching: false,
          error: action.payload,
        },
      };
    case ADD_COUPON:
      return {
        ...state,
        editCouponProcess: {
          saving: true,
          deleting: false,
          error: null,
        },
      };
    case ADD_COUPON_SUCCESS:
      newCoupons.push(action.payload);
      return {
        ...state,
        coupon: {
          details: newCoupons,
          fetching: false,
          error: action.payload,
        },
        editCouponProcess: {
          saving: false,
          deleting: false,
          error: null,
        },
      };
    case ADD_COUPON_ERROR:
      return {
        ...state,
        editCouponProcess: {
          saving: false,
          deleting: false,
          error: action.payload,
        },
      };
    case EDIT_COUPON:
      return {
        ...state,
        editCouponProcess: {
          saving: true,
          deleting: false,
          error: null,
        },
      };
    case EDIT_COUPON_SUCCESS:
      foundUserIndex = _.findIndex(newCoupons, item => (item.id === action.payload.id));
      if (foundUserIndex !== -1) {
        newCoupons.splice(foundUserIndex, 1, action.payload);
      }
      return {
        ...state,
        coupon: {
          details: newCoupons,
          fetching: false,
          error: action.payload,
        },
        editCouponProcess: {
          saving: false,
          deleting: false,
          error: null,
        },
      };
    case EDIT_COUPON_ERROR:
      return {
        ...state,
        editCouponProcess: {
          saving: false,
          deleting: false,
          error: action.payload,
        },
      };
    case DELETE_COUPON:
      return {
        ...state,
        editCouponProcess: {
          saving: false,
          deleting: true,
          error: null,
        },
      };
    case DELETE_COUPON_SUCCESS:
      foundUserIndex = _.findIndex(newCoupons, item => (item.id === action.payload.id));
      if (foundUserIndex !== -1) {
        newCoupons.splice(foundUserIndex, 1);
      }
      return {
        ...state,
        coupon: {
          details: newCoupons,
          fetching: false,
          error: action.payload,
        },
        editCouponProcess: {
          saving: false,
          deleting: false,
          error: null,
        },
      };
    case DELETE_COUPON_ERROR:
      return {
        ...state,
        editCouponProcess: {
          saving: false,
          deleting: false,
          error: action.payload,
        },
      };
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

export default dashboardCouponPageReducer;
