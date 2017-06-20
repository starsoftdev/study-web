/*
 *
 * ReportViewPage reducer
 *
 */

import _ from 'lodash';
import moment from 'moment-timezone';

import {
  GET_REPORTS_LIST,
  GET_REPORTS_LIST_SUCCESS,
  GET_REPORTS_LIST_ERROR,
  SET_ACTIVE_SORT,
  SORT_REPORTS_SUCCESS,
  CHANGE_PROTOCOL_STATUS,
  CHANGE_PROTOCOL_STATUS_SUCCESS,
  CHANGE_PROTOCOL_STATUS_ERROR,
  GET_REPORTS_TOTALS,
  GET_REPORTS_TOTALS_SUCCESS,
  GET_REPORTS_TOTALS_ERROR,
} from './constants';

const initialState = {
  reportsList: {
    details: [],
    fetching: false,
    error: null,
  },
  totals: {
    details: {},
    fetching: false,
    error: null,
  },
  paginationOptions: {
    activeSort: null,
    activeDirection: null,
    hasMoreItems: true,
    page: 1,
  },
  changeProtocolStatusProcess: {
    saving: false,
    error: null,
  },
};

function reportViewPageReducer(state = initialState, action) {
  const reports = [];
  let newReportsList = [];
  const reportsCopy = _.cloneDeep(state.reportsList.details);

  let foundIndex = null;
  let copy = null;
  switch (action.type) {
    case GET_REPORTS_LIST:
      return {
        ...state,
        reportsList: {
          details: state.reportsList.details,
          fetching: true,
          error: null,
        },
        paginationOptions: {
          activeSort: state.paginationOptions.activeSort,
          activeDirection: state.paginationOptions.activeDirection,
          hasMoreItems: false,
          page: state.paginationOptions.page,
        },
      };
    case GET_REPORTS_LIST_SUCCESS:
      _.forEach(action.payload, (item, index) => {
        let level = '';
        let levelDateFrom = '';
        let levelDateTo = '';

        if (item.current_level) {
          level = item.current_level;
          levelDateFrom = moment(item.currrent_date_from).tz(item.timezone).format('MM/DD/YY');
          levelDateTo = moment(item.currrent_date_to).tz(item.timezone).format('MM/DD/YY');
        } else {
          level = null;
          levelDateFrom = null;
          levelDateTo = null;
        }
        reports.push({ ...item, level, levelDateFrom, levelDateTo, count_index: index });
      });

      if (action.page === 1) {
        newReportsList = reports;
      } else {
        newReportsList = reportsCopy.concat(reports);
      }

      return {
        ...state,
        reportsList: {
          details: newReportsList,
          fetching: false,
          error: null,
        },
        paginationOptions: {
          activeSort: state.paginationOptions.activeSort,
          activeDirection: state.paginationOptions.activeDirection,
          hasMoreItems: action.hasMoreItems,
          page: action.page,
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
    case GET_REPORTS_TOTALS:
      return {
        ...state,
        totals: {
          details: {},
          fetching: true,
          error: null,
        },
      };
    case GET_REPORTS_TOTALS_SUCCESS:
      return {
        ...state,
        totals: {
          details: action.payload,
          fetching: false,
          error: null,
        },
      };
    case GET_REPORTS_TOTALS_ERROR:
      return {
        ...state,
        totals: {
          details: {},
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
          hasMoreItems: state.paginationOptions.hasMoreItems,
          page: state.paginationOptions.page,
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
    case CHANGE_PROTOCOL_STATUS:
      foundIndex = _.findIndex(state.reportsList.details, (o) => (o.study_id === action.payload.studyId));
      copy = _.cloneDeep(state.reportsList.details);
      copy.splice(foundIndex, 1, { ...copy[foundIndex], is_active: action.payload.status });
      return {
        ...state,
        reportsList: {
          details: copy,
          fetching: false,
          error: null,
        },
        changeProtocolStatusProcess: {
          saving: true,
          error: null,
        },
      };
    case CHANGE_PROTOCOL_STATUS_SUCCESS:
      return {
        ...state,
        changeProtocolStatusProcess: {
          saving: false,
          error: null,
        },
      };
    case CHANGE_PROTOCOL_STATUS_ERROR:
      return {
        ...state,
        changeProtocolStatusProcess: {
          saving: false,
          error: action.payload,
        },
      };
    default:
      return state;
  }
}

export default reportViewPageReducer;
