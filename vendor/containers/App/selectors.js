import { createSelector } from 'reselect';
import { get } from 'lodash';
import { translate } from '../../../common/utilities/localization';
/**
 * Direct selector to the app state domain
 */
const selectGlobal = () => state => state.global;

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

const selectUserRoleType = () => createSelector(
  selectGlobal(),
  (substate) => substate.userRoleType
);

const selectSites = () => createSelector(
  selectGlobal(),
  (substate) => get(substate, 'baseData.sites.details', [])
);

const selectSources = () => createSelector(
  selectGlobal(),
  (substate) => get(substate, 'baseData.sources', [])
);

const selectSitePatients = () => createSelector(
  selectGlobal(),
  (substate) => get(substate, 'baseData.sitePatients', {})
);

const selectSelectedUser = () => createSelector(
  selectGlobal(),
  (substate) => get(substate, 'baseData.selectedUser', {})
);

const selectIndications = () => createSelector(
  selectGlobal(),
  (substate) => {
    const indications = get(substate, 'baseData.indications', []);

    return indications.map(e => {
      let translatedName = translate(`common.indication.id${e.id}`);
      if (translatedName.startsWith('[TRANSLATE ERR]')) {
        translatedName = e.name;
      }
      return { ...e, originalName: e.name, name: translatedName };
    });
  }
);

const selectClientCredits = () => createSelector(
  selectGlobal(),
  (substate) => get(substate, 'baseData.clientCredits', {})
);

export {
  selectGlobal,
  selectAuthState,
  selectCurrentUser,
  selectUserRoleType,
  selectCurrentUserEmail,
  selectCurrentUserFullName,
  selectCurrentUserId,
  selectSites,
  selectSources,
  selectSitePatients,
  selectSelectedUser,
  selectIndications,
  selectClientCredits,
};
