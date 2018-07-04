import {
  FETCH_STUDY_CAMPAIGNS_STATS,
  FETCH_STUDY_CAMPAIGNS_STATS_SUCCESS,
  FETCH_STUDY_CAMPAIGNS_STATS_ERROR,

  FETCH_CAMPAIGN_DETAIL_STATS,
  FETCH_CAMPAIGN_DETAIL_STATS_SUCCESS,
  FETCH_CAMPAIGN_DETAIL_STATS_ERROR,
} from './constants';

export function fetchStudyCampaignsStats(studyId) {
  return {
    type: FETCH_STUDY_CAMPAIGNS_STATS,
    studyId,
  };
}

export function fetchStudyCampaignsStatsSuccess(payload) {
  return {
    type: FETCH_STUDY_CAMPAIGNS_STATS_SUCCESS,
    payload,
  };
}

export function fetchStudyCampaignsStatsError(payload) {
  return {
    type: FETCH_STUDY_CAMPAIGNS_STATS_ERROR,
    payload,
  };
}

export function fetchCampaignDetailStats(studyId, campaignId) {
  return {
    type: FETCH_CAMPAIGN_DETAIL_STATS,
    studyId,
    campaignId,
  };
}

export function fetchCampaignDetailStatsSuccess(payload) {
  return {
    type: FETCH_CAMPAIGN_DETAIL_STATS_SUCCESS,
    payload,
  };
}

export function fetchCampaignDetailStatsError(payload) {
  return {
    type: FETCH_CAMPAIGN_DETAIL_STATS_ERROR,
    payload,
  };
}
