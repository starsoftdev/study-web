import { createSelector } from 'reselect';
import { get } from 'lodash';

/**
 * Direct selector to the dashboardIndicationPage state domain
 */
const selectDashboardIndicationPageDomain = () => state => state.dashboardIndicationPage;
/**
 * Other specific selectors
 */

const selectFormDomain = () => state => state.form;
/**
 * Default selector used by DashboardIndicationPage
 */

const selectDashboardIndicationPage = () => createSelector(
  selectDashboardIndicationPageDomain(),
  (substate) => substate
);

const selectIndications = () => createSelector(
  selectDashboardIndicationPageDomain(),
  (substate) => substate.indications
);

const selectLevels = () => createSelector(
  selectDashboardIndicationPageDomain(),
  (substate) => substate.levels
);

const selectDashboardAddLevelProcess = () => createSelector(
  selectDashboardIndicationPageDomain(),
  (substate) => substate.addLevelProcess
);
const selectDashboardAddIndicationProcess = () => createSelector(
  selectDashboardIndicationPageDomain(),
  (substate) => substate.addIndicationProcess
);

const selectDashboardIndicationSearchFormValues = () => createSelector(
  selectFormDomain(),
  (substate) => get(substate, 'dashboardIndicationForm.values', {})
);

export default selectDashboardIndicationPage;
export {
  selectDashboardIndicationPageDomain,
  selectIndications,
  selectLevels,
  selectDashboardAddLevelProcess,
  selectDashboardAddIndicationProcess,
  selectDashboardIndicationSearchFormValues,
};
