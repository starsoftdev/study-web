import { createSelector } from 'reselect';
import { get } from 'lodash';
/**
 * Direct selector to the dashboardNotePage state domain
 */
const selectDashboardNotePageDomain = () => state => state.dashboardNotePage;

/**
 * Other specific selectors
 */


/**
 * Default selector used by DashboardNotePage
 */

const selectFormDomain = () => state => state.form;

const selectDashboardNotePage = () => createSelector(
  selectDashboardNotePageDomain(),
  (substate) => substate
);

const selectDashboardNote = () => createSelector(
  selectDashboardNotePageDomain(),
  (substate) => substate.note
);

const selectDashboardEditNoteProcess = () => createSelector(
  selectDashboardNotePageDomain(),
  (substate) => substate.editNoteProcess
);

const selectDashboardClientSites = () => createSelector(
  selectDashboardNotePageDomain(),
  (substate) => substate.clientSites
);

const selectDashboardNoteSearchFormValues = () => createSelector(
  selectFormDomain(),
  (substate) => get(substate, 'dashboardNoteForm.values', {})
);

const selectPaginationOptions = () => createSelector(
  selectDashboardNotePageDomain(),
  (substate) => substate.paginationOptions
);

export default selectDashboardNotePage;
export {
  selectDashboardNotePageDomain,
  selectDashboardNote,
  selectDashboardEditNoteProcess,
  selectDashboardNoteSearchFormValues,
  selectDashboardClientSites,
  selectPaginationOptions,
};
