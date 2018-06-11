import { createSelector } from 'reselect';
import { get } from 'lodash';

/**
 * Direct selector to the reportViewPage state domain
 */
const selectReportViewPageDomain = () => state => state.reportPage;

/**
 * Other specific selectors
 */


/**
 * Default selector used by ReportViewPage
 */

const selectReportViewPage = () => createSelector(
  selectReportViewPageDomain(),
  (substate) => substate
);

const selectReportsList = () => createSelector(
  selectReportViewPageDomain(),
  substate => substate.reportsList
);

const selectReportsTotals = () => createSelector(
  selectReportViewPageDomain(),
  substate => substate.totals
);

const selectFormDomain = () => state => state.form;

const selectSearchReportsFormValues = () => createSelector(
  selectFormDomain(),
  (substate) => get(substate, 'searchReports.values', {})
);

const selectTableFormValues = () => createSelector(
  selectFormDomain(),
  (substate) => get(substate, 'reportListForm.values', {})
);

const selectPaginationOptions = () => createSelector(
  selectReportViewPageDomain(),
  substate => substate.paginationOptions
);

const selectChangeProtocolStatusProcess = () => createSelector(
  selectReportViewPageDomain(),
  substate => substate.changeProtocolStatusProcess
);

const selectCategoryNotes = () => createSelector(
  selectReportViewPageDomain(),
  substate => substate.categoryNotes
);

const selectNotesPaginationOptions = () => createSelector(
  selectReportViewPageDomain(),
  substate => substate.notesPaginationOptions
);

const selectDispositionTotals = () => createSelector(
  selectReportViewPageDomain(),
  (substate) => substate.dispositionTotals
);

export default selectReportViewPage;
export {
  selectReportViewPageDomain,
  selectReportsList,
  selectSearchReportsFormValues,
  selectPaginationOptions,
  selectTableFormValues,
  selectChangeProtocolStatusProcess,
  selectReportsTotals,
  selectCategoryNotes,
  selectNotesPaginationOptions,
  selectDispositionTotals,
};
