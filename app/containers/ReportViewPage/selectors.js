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


export default selectReportViewPage;
export {
  selectReportViewPageDomain,
  selectReportsList,
  selectSearchReportsFormValues,
  selectPaginationOptions,
  selectTableFormValues,
};
