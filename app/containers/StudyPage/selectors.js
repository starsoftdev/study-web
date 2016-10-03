/**
 * Created by mike on 9/27/16.
 */

import { createSelector } from 'reselect';

/**
 * Direct selector to the studyPage state domain
 */
export const selectStudyPageDomain = () => state => state.studyPage;

/**
 * Other selectors
 */

export const selectCampaigns = () => createSelector(
  selectStudyPageDomain(),
  (subState) => subState.campaigns
);

export const selectPatientCategories = () => createSelector(
  selectStudyPageDomain(),
  (subState) => subState.patientCategories
);

export const selectPatients = (id) => createSelector(
  selectStudyPageDomain(),
  (subState) => {
    if (subState.patientCategories) {
      const filteredPatientCategory = subState.patientCategories.filter(patientCategory => (
        patientCategory.id === id
      ))[0];
      return filteredPatientCategory.patients;
    }
    return [];
  }
);

export const selectSites = () => createSelector(
  selectStudyPageDomain(),
  (subState) => subState.sites
);

export const selectSources = () => createSelector(
  selectStudyPageDomain(),
  (subState) => subState.sources
);

export const selectStudy = () => createSelector(
  selectStudyPageDomain(),
  (subState) => subState.study
);

export const selectFetchingStudy = () => createSelector(
  selectStudyPageDomain(),
  (subState) => subState.fetchingStudy
);

export const selectFetchingPatients = () => createSelector(
  selectStudyPageDomain(),
  (subState) => subState.fetchingPatients
);
