/*
 *
 * adminHome actions
 *
 */

import {
  GET_CAMPAIGNS_STATS,
  GET_CAMPAIGNS_STATS_ERROR,
  GET_CAMPAIGNS_STATS_SUCCESS,
  CLEAR_CAMPAIGNS,
} from './constants';

export function getCampaignsStats(params, limit, offset) {
  return {
    type: GET_CAMPAIGNS_STATS,
    params,
    limit,
    offset,
  };
}

export function getCampaignsStatsSuccess(payload, hasMoreItems, page) {
  return {
    type: GET_CAMPAIGNS_STATS_SUCCESS,
    payload,
    hasMoreItems,
    page,
  };
}

export function getCampaignsStatsError(payload) {
  return {
    type: GET_CAMPAIGNS_STATS_ERROR,
    payload,
  };
}

export function clearCampaigns() {
  return {
    type: CLEAR_CAMPAIGNS,
  };
}
