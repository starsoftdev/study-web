/*
 *
 * DashboardClientAdminsPage reducer
 *
 */

import {
  DEFAULT_ACTION,
} from './constants';

const initialState = {};

function dashboardClientAdminsPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default dashboardClientAdminsPageReducer;
