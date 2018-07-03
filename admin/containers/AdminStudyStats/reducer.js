/* eslint-disable comma-dangle, no-case-declarations */

import {
  FETCH_STUDIES_FOR_ADMIN, FETCH_STUDIES_FOR_ADMIN_ERROR, FETCH_STUDIES_FOR_ADMIN_SUCCESS,
} from '../App/constants';

import {
  FETCH_STUDY_CAMPAIGNS_STATS, FETCH_STUDY_CAMPAIGNS_STATS_ERROR, FETCH_STUDY_CAMPAIGNS_STATS_SUCCESS,
  FETCH_CAMPAIGN_DETAIL_STATS_SUCCESS,
} from './constants';

const initialState = {
  studyInfo: {
    details: null,
    fetching: false,
    error: null,
  },
  studyCampaigns: {
    details: [],
    fetching: false,
    error: null,
  },
};

export default function adminStudyStatsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_STUDIES_FOR_ADMIN:
      return {
        ...state,
        studyInfo: {
          details: null,
          fetching: true,
          error: null,
        },
      };
    case FETCH_STUDIES_FOR_ADMIN_SUCCESS:
      return {
        ...state,
        studyInfo: {
          details: action.payload.studies ? action.payload.studies[0] : {},
          fetching: false,
          error: null,
        },
      };
    case FETCH_STUDIES_FOR_ADMIN_ERROR:
      return {
        ...state,
        studies: {
          details: null,
          fetching: false,
          error: action.payload,
        },
      };
    case FETCH_STUDY_CAMPAIGNS_STATS:
      return {
        ...state,
        studyCampaigns: {
          details: [],
          fetching: true,
          error: null,
        },
      };
    case FETCH_STUDY_CAMPAIGNS_STATS_SUCCESS:
      return {
        ...state,
        studyCampaigns: {
          details: action.payload,
          fetching: false,
          error: null,
        },
      };
    case FETCH_STUDY_CAMPAIGNS_STATS_ERROR:
      return {
        ...state,
        studyCampaigns: {
          details: [],
          fetching: false,
          error: action.payload,
        },
      };
    case FETCH_CAMPAIGN_DETAIL_STATS_SUCCESS:
      return {
        ...state,
        studyCampaigns: {
          details: state.studyCampaigns.details.map((item) => {
            if (item.id === action.payload[0].id) {
              return action.payload[0];
            }
            return item;
          }),
          fetching: false,
          error: null,
        },
      };
    default:
      return state;
  }
}
