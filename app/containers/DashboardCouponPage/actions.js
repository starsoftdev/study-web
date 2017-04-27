/*
 *
 * DashboardCouponPage actions
 *
 */

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

export function fetchCoupon() {
  return {
    type: FETCH_COUPON,
  };
}

export function fetchCouponSuccess(payload) {
  return {
    type: FETCH_COUPON_SUCCESS,
    payload,
  };
}

export function fetchCouponError(payload) {
  return {
    type: FETCH_COUPON_ERROR,
    payload,
  };
}

export function addCoupon(payload) {
  return {
    type: ADD_COUPON,
    payload,
  };
}

export function addCouponSuccess(payload) {
  return {
    type: ADD_COUPON_SUCCESS,
    payload,
  };
}

export function addCouponError(payload) {
  return {
    type: ADD_COUPON_ERROR,
    payload,
  };
}

export function editCoupon(payload) {
  return {
    type: EDIT_COUPON,
    payload,
  };
}

export function editCouponSuccess(payload) {
  return {
    type: EDIT_COUPON_SUCCESS,
    payload,
  };
}

export function editCouponError(payload) {
  return {
    type: EDIT_COUPON_ERROR,
    payload,
  };
}

export function deleteCoupon(payload) {
  return {
    type: DELETE_COUPON,
    payload,
  };
}

export function deleteCouponSuccess(payload) {
  return {
    type: DELETE_COUPON_SUCCESS,
    payload,
  };
}

export function deleteCouponError(payload) {
  return {
    type: DELETE_COUPON_ERROR,
    payload,
  };
}

export function setActiveSort(sort, direction) {
  return {
    type: SET_ACTIVE_SORT,
    sort,
    direction,
  };
}
