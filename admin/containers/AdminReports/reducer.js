/* eslint-disable comma-dangle, no-case-declarations */
import {
  GET_CAMPAIGNS_STATS,
  GET_CAMPAIGNS_STATS_SUCCESS,
  GET_CAMPAIGNS_STATS_ERROR,
  CLEAR_CAMPAIGNS,
} from './constants';

const initialState = {
  campaigns: {
    details: [],
    fetching: false,
    error: null,
  },
  campaignsPaginationOptions: {
    hasMoreItems: true,
    page: 0,
  },
};

export default function adminReportsReducer(state = initialState, action) {
  let newCampaignsList = [];
  switch (action.type) {
    case GET_CAMPAIGNS_STATS:
      return {
        ...state,
        campaigns: {
          details: state.campaigns.details,
          fetching: true,
          error: null,
        },
        campaignsPaginationOptions: {
          hasMoreItems: false,
          page: state.campaignsPaginationOptions.page,
        },
      };
    case GET_CAMPAIGNS_STATS_SUCCESS:
      if (action.page === 1) {
        newCampaignsList = action.payload.campaigns;
      } else {
        const campaignsCopy = [
          ...state.campaigns.details,
        ];
        newCampaignsList = campaignsCopy.concat(action.payload.campaigns);
      }
      return {
        ...state,
        campaigns: {
          details: newCampaignsList,
          fetching: false,
          error: null,
        },
        campaignsPaginationOptions: {
          hasMoreItems: action.hasMoreItems,
          page: action.page,
        },
      };
    case GET_CAMPAIGNS_STATS_ERROR:
      return {
        ...state,
        campaigns: {
          details: [],
          fetching: false,
          error: action.payload,
        },
      };
    case CLEAR_CAMPAIGNS:
      return {
        ...state,
        campaigns: {
          details: [],
          fetching: false,
          error: null,
        },
        campaignsPaginationOptions: {
          hasMoreItems: true,
          page: 0,
        },
      };
    default:
      return state;
  }
}
