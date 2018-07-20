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
  GET_CATEGORY_NOTES,
  GET_CATEGORY_NOTES_ERROR,
  GET_CATEGORY_NOTES_SUCCESS,
  CLEAR_REPORT_LIST,
  FETCH_DISPOSITION_TOTALS_SUCCESS,
  FETCH_DISPOSITION_TOTALS,
  FETCH_DISPOSITION_TOTALS_ERROR,
  FETCH_MEDIA_SOURCES,
  FETCH_MEDIA_SOURCES_SUCCESS,
  FETCH_MEDIA_SOURCES_ERROR,
  FETCH_TOTAL_SIGNUPS,
  FETCH_TOTAL_SIGNUPS_SUCCESS,
  FETCH_TOTAL_SIGNUPS_ERROR,
  GET_STUDY_REPORTS_TOTALS,
  GET_STUDY_REPORTS_TOTALS_SUCCESS,
  GET_STUDY_REPORTS_TOTALS_ERROR,
  FETCH_STUDY_DISPOSITION_TOTALS_SUCCESS,
  FETCH_STUDY_DISPOSITION_TOTALS,
  FETCH_STUDY_DISPOSITION_TOTALS_ERROR,
  FETCH_STUDY_MEDIA_SOURCES,
  FETCH_STUDY_MEDIA_SOURCES_SUCCESS,
  FETCH_STUDY_MEDIA_SOURCES_ERROR,
} from './constants';

const initialState = {
  patientSignUps: {
    today: 0,
    yesterday: 0,
    total: 0,
  },
  reportsList: {
    details: [],
    fetching: false,
    error: null,
  },
  mediaSources: {
    details: [],
    fetching: false,
    error: null,
  },
  totals: {
    details: {},
    source: 1,
    fetching: false,
    error: null,
  },
  paginationOptions: {
    activeSort: null,
    activeDirection: null,
    hasMoreItems: true,
    page: 1,
  },
  notesPaginationOptions: {
    hasMoreItems: true,
    page: 1,
  },
  changeProtocolStatusProcess: {
    saving: false,
    error: null,
  },
  categoryNotes: {
    details: [],
    fetching: false,
    error: null,
  },
  dispositionTotals: {
    details: {},
    disposition: 1,
    fetching: false,
    error: null,
  },
  studyTotals: {
    details: {},
    source: 1,
    fetching: false,
    error: null,
  },
  studyDispositionTotals: {
    details: {},
    disposition: 1,
    fetching: false,
    error: null,
  },
  studyMediaSources: {
    details: [],
    fetching: false,
    error: null,
  },
};

function reportViewPageReducer(state = initialState, action) {
  const reports = [];
  let newReportsList = [];
  let newNotesList = [];
  const reportsCopy = _.cloneDeep(state.reportsList.details);
  const notesCopy = _.cloneDeep(state.categoryNotes.details);
  let page = null;
  let hasMoreItems = null;

  let foundIndex = null;
  let copy = null;
  const details = _.cloneDeep(state.totals.details);
  const studyDetails = _.cloneDeep(state.studyTotals.details);
  switch (action.type) {
    case GET_REPORTS_LIST:
      if (action.offset === 0) {
        newReportsList = [];
      } else {
        newReportsList = state.reportsList.details;
      }

      return {
        ...state,
        reportsList: {
          details: newReportsList,
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
      page = action.page;
      hasMoreItems = action.hasMoreItems;
      if (action.payload.length > 0) {
        _.forEach(action.payload, (item, index) => {
          const level = item.current_level ? item.current_level : item.last_level;
          const levelDateFrom = item.date_from ? moment(item.date_from).tz(item.timezone).format('MM/DD/YY') : '';
          const levelDateTo = item.date_to ? moment(item.date_to).tz(item.timezone).format('MM/DD/YY') : '';

          reports.push({ ...item, level, levelDateFrom, levelDateTo, count_index: index });
        });

        if (action.page === 1) {
          newReportsList = reports;
        } else {
          newReportsList = reportsCopy.concat(reports);
        }
      } else {
        page = 1;
        hasMoreItems = false;
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
          hasMoreItems,
          page,
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
          details: state.totals.details,
          source: state.totals.source,
          fetching: true,
          error: null,
        },
      };
    case GET_REPORTS_TOTALS_SUCCESS:
      console.log('GET_REPORTS_TOTALS_SUCCESS', action.source);
      details[action.source] = action.payload;
      return {
        ...state,
        totals: {
          details,
          source: state.totals.source,
          fetching: false,
          error: null,
        },
      };
    case GET_REPORTS_TOTALS_ERROR:
      return {
        ...state,
        totals: {
          details: {},
          source: state.totals.source,
          fetching: false,
          error: action.payload,
        },
      };
    case FETCH_MEDIA_SOURCES:
      return {
        ...state,
        mediaSources: {
          details: [],
          fetching: true,
          error: null,
        },
      };
    case FETCH_MEDIA_SOURCES_SUCCESS:
      return {
        ...state,
        mediaSources: {
          details: action.payload,
          fetching: false,
          error: null,
        },
      };
    case FETCH_MEDIA_SOURCES_ERROR:
      return {
        ...state,
        mediaSources: {
          details: [],
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
    case GET_CATEGORY_NOTES:
      if (action.offset === 0) {
        newNotesList = [];
      } else {
        newNotesList = state.categoryNotes.details;
      }
      return {
        ...state,
        categoryNotes: {
          details: newNotesList,
          fetching: true,
          error: null,
        },
        notesPaginationOptions: {
          hasMoreItems: false,
          page: state.notesPaginationOptions.page,
        },
      };
    case GET_CATEGORY_NOTES_SUCCESS:
      if (action.page === 1) {
        newNotesList = action.payload;
      } else {
        newNotesList = notesCopy.concat(action.payload);
      }
      return {
        ...state,
        categoryNotes: {
          details: newNotesList,
          fetching: false,
          error: null,
        },
        notesPaginationOptions: {
          hasMoreItems: action.hasMoreItems,
          page: action.page,
        },
      };
    case GET_CATEGORY_NOTES_ERROR:
      return {
        ...state,
        categoryNotes: {
          details: [],
          fetching: false,
          error: action.payload,
        },
      };
    case CLEAR_REPORT_LIST:
      return {
        ...state,
        reportsList: {
          details: [],
          fetching: false,
          error: null,
        },
      };
    case FETCH_DISPOSITION_TOTALS:
      return {
        ...state,
        dispositionTotals: {
          details: state.dispositionTotals.details,
          fetching: true,
          error: null,
        },
      };
    case FETCH_DISPOSITION_TOTALS_SUCCESS:
      return {
        ...state,
        dispositionTotals: {
          details: action.payload,
          fetching: false,
          error: null,
        },
      };
    case FETCH_DISPOSITION_TOTALS_ERROR:
      return {
        ...state,
        dispositionTotals: {
          details: {},
          fetching: false,
          error: action.payload,
        },
      };
    case FETCH_TOTAL_SIGNUPS:
      return {
        ...state,
        patientSignUps: {
          today: 0,
          yesterday: 0,
          total: 0,
        },
      };
    case FETCH_TOTAL_SIGNUPS_SUCCESS:
      return {
        ...state,
        patientSignUps: {
          today: action.payload.today,
          yesterday: action.payload.yesterday,
          total: action.payload.total,
        },
      };
    case FETCH_TOTAL_SIGNUPS_ERROR:
      return {
        ...state,
        patientSignUps: {
          today: 0,
          yesterday: 0,
          total: 0,
        },
      };
    case GET_STUDY_REPORTS_TOTALS:
      return {
        ...state,
        studyTotals: {
          details: state.studyTotals.details,
          source: state.studyTotals.source,
          fetching: true,
          error: null,
        },
      };
    case GET_STUDY_REPORTS_TOTALS_SUCCESS:
      studyDetails[action.source] = action.payload;
      return {
        ...state,
        studyTotals: {
          details: studyDetails,
          source: state.studyTotals.source,
          fetching: false,
          error: null,
        },
      };
    case GET_STUDY_REPORTS_TOTALS_ERROR:
      return {
        ...state,
        studyTotals: {
          details: {},
          source: state.studyTotals.source,
          fetching: false,
          error: action.payload,
        },
      };
    case FETCH_STUDY_MEDIA_SOURCES:
      return {
        ...state,
        studyMediaSources: {
          details: [],
          fetching: true,
          error: null,
        },
      };
    case FETCH_STUDY_MEDIA_SOURCES_SUCCESS:
      return {
        ...state,
        studyMediaSources: {
          details: action.payload,
          fetching: false,
          error: null,
        },
      };
    case FETCH_STUDY_MEDIA_SOURCES_ERROR:
      return {
        ...state,
        studyMediaSources: {
          details: [],
          fetching: false,
          error: action.payload,
        },
      };
    case FETCH_STUDY_DISPOSITION_TOTALS:
      return {
        ...state,
        studyDispositionTotals: {
          details: state.studyDispositionTotals.details,
          fetching: true,
          error: null,
        },
      };
    case FETCH_STUDY_DISPOSITION_TOTALS_SUCCESS:
      return {
        ...state,
        studyDispositionTotals: {
          details: action.payload,
          fetching: false,
          error: null,
        },
      };
    case FETCH_STUDY_DISPOSITION_TOTALS_ERROR:
      return {
        ...state,
        studyDispositionTotals: {
          details: {},
          fetching: false,
          error: action.payload,
        },
      };
    default:
      return state;
  }
}

export default reportViewPageReducer;
