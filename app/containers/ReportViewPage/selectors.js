import { createSelector } from 'reselect';

/**
 * Direct selector to the reportViewPage state domain
 */
const selectReportViewPageDomain = () => state => state.reportViewPage;

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

export default selectReportViewPage;
export {
  selectReportViewPageDomain,
};
