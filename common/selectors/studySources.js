import { createSelector } from 'reselect';

/**
 * Direct selector to the common state domain
 */
const selectCommonDomain = () => state => state.common;

export const selectStudySources = () => createSelector(
  selectCommonDomain(),
  (substate) => substate.studySources
);
