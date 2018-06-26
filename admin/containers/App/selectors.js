import { createSelector } from 'reselect';
import { get } from 'lodash';
import { translate } from '../../../common/utilities/localization';

/**
 * Direct selector to the app state domain
 */
const selectGlobal = () => state => state.global;
const selectFormDomain = () => state => state.form;

const selectAuthState = () => createSelector(
  selectGlobal(),
  (substate) => substate.loggedIn
);

const selectCurrentUser = () => createSelector(
  selectGlobal(),
  (substate) => substate.userData
);

const selectCurrentUserEmail = () => createSelector(
  selectGlobal(),
  (substate) => substate.userData.email
);

const selectCurrentUserFullName = () => createSelector(
  selectGlobal(),
  (substate) => `${substate.userData.firstName} ${substate.userData.lastName}`
);

const selectCurrentUserId = () => createSelector(
  selectGlobal(),
  (substate) => substate.userData.id
);

const selectLoginError = () => createSelector(
  selectGlobal(),
  (substate) => substate.loginError
);

const selectLoginFormSubmitState = () => createSelector(
  selectGlobal(),
  (substate) => substate.submittingLoginForm
);

const selectUserRoleType = () => createSelector(
  selectGlobal(),
  (substate) => substate.userRoleType
);

const selectEvents = () => createSelector(
  selectGlobal(),
  (substate) => substate.pageEvents
);

const selectCurrentUserClientId = () => createSelector(
  selectGlobal(),
  (substate) => get(substate, 'userData.roleForClient.client.id', null)
);

const selectCurrentUserStripeCustomerId = () => createSelector(
  selectGlobal(),
  (substate) => get(substate, 'userData.roleForClient.client.stripeCustomerId', null)
);

const selectIndications = () => createSelector(
  selectGlobal(),
  (substate) => {
    const indications = get(substate, 'baseData.indications', []);
    return indications.map(e => ({ ...e, originalName: e.name, name: translate(`common.indication.id${e.id}`) }));
  }
);

const selectSources = () => createSelector(
  selectGlobal(),
  (substate) => get(substate, 'baseData.sources', [])
);

const selectLevels = () => createSelector(
  selectGlobal(),
  (substate) => get(substate, 'baseData.levels', [])
);

const selectProtocols = () => createSelector(
  selectGlobal(),
  (substate) => get(substate, 'baseData.protocols', {})
);

const selectSponsors = () => createSelector(
  selectGlobal(),
  (substate) => get(substate, 'baseData.sponsors', {})
);

const selectCro = () => createSelector(
  selectGlobal(),
  (substate) => get(substate, 'baseData.cro', {})
);

const selectUsersByRoles = () => createSelector(
  selectGlobal(),
  (substate) => get(substate, 'baseData.usersByRoles', {})
);

const selectFilterFormValues = () => createSelector(
  selectFormDomain(),
  substate => get(substate, 'adminDashboardFilters.values', {})
);

const selectStudies = () => createSelector(
  selectGlobal(),
  (substate) => get(substate, 'baseData.studies', {})
);

const selectTotals = () => createSelector(
  selectGlobal(),
  (substate) => get(substate, 'baseData.totals', {})
);

const selectCustomFilters = () => createSelector(
  selectGlobal(),
  (substate) => get(substate, 'baseData.customFilters', {})
);

const selectStudiesPaginationOptions = () => createSelector(
  selectGlobal(),
  (substate) => get(substate, 'baseData.studiesPaginationOptions', {})
);

const selectLocationState = () => state => state.routing.locationBeforeTransitions;

export {
  selectGlobal,
  selectAuthState,
  selectEvents,
  selectCurrentUser,
  selectLoginError,
  selectLoginFormSubmitState,
  selectUserRoleType,
  selectCurrentUserClientId,
  selectCurrentUserEmail,
  selectCurrentUserFullName,
  selectCurrentUserId,
  selectCurrentUserStripeCustomerId,

  selectIndications,
  selectSources,
  selectLevels,
  selectProtocols,
  selectSponsors,
  selectCro,
  selectUsersByRoles,

  selectLocationState,
  selectFilterFormValues,
  selectStudies,
  selectTotals,
  selectCustomFilters,
  selectStudiesPaginationOptions,
};
