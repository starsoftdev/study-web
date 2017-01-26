/*
 *
 * ReportViewPage reducer
 *
 */

import {
  GET_REPORTS_LIST,
  GET_REPORTS_LIST_SUCCESS,
  GET_REPORTS_LIST_ERROR,
  SET_ACTIVE_SORT,
  SORT_REPORTS_SUCCESS,
} from './constants';

import _ from 'lodash';
import moment from 'moment';

const initialState = {
  reportsList: {
    details: [],
    fetching: false,
    error: null,
  },
  paginationOptions: {
    activeSort: null,
    activeDirection: null,
  },
};

function reportViewPageReducer(state = initialState, action) {
  const reports = [];
  switch (action.type) {
    case GET_REPORTS_LIST:
      return {
        ...state,
        reportsList: {
          details: state.reportsList.details,
          fetching: true,
          error: null,
        },
      };
    case GET_REPORTS_LIST_SUCCESS:
      _.forEach(action.payload, (item, index) => {
        let level = '';
        let levelDateFrom = '';
        let levelDateTo = '';

        if (item.current_level) {
          level = item.current_level;
          levelDateFrom = moment.utc(item.currrent_date_from).format('MM/DD/YY');
          levelDateTo = moment.utc(item.currrent_date_to).format('MM/DD/YY');
        } else if (item.next_level) {
          level = item.next_level;
          levelDateFrom = moment.utc(item.next_date_from).format('MM/DD/YY');
          levelDateTo = moment.utc(item.next_date_to).format('MM/DD/YY');
        } else if (item.past_level) {
          level = item.past_level;
          levelDateFrom = moment.utc(item.past_date_from).format('MM/DD/YY');
          levelDateTo = moment.utc(item.past_date_to).format('MM/DD/YY');
        }
        reports.push({ ...item, level, levelDateFrom, levelDateTo, count_index: index });
      });

      return {
        ...state,
        reportsList: {
          details: reports,
          fetching: false,
          error: null,
        },
      };
    case GET_REPORTS_LIST_ERROR:
      return {
        ...state,
        reportsList: {
          details: state.reportsList.details,
          fetching: false,
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
    case SORT_REPORTS_SUCCESS:
      return {
        ...state,
        reportsList: {
          details: action.reports,
          fetching: false,
          error: null,
        },
      };
    default:
      return state;
  }
}

export default reportViewPageReducer;
