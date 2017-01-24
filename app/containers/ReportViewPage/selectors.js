import { createSelector } from 'reselect';

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

export default selectReportViewPage;
export {
  selectReportViewPageDomain,
  selectReportsList,
};
