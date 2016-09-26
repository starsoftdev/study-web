import { createSelector } from 'reselect';
import { get, map, pick } from 'lodash';

/**
 * Direct selector to the globalNotifications state domain
 */
const selectGlobalNotificationsDomain = () => state => state.globalNotifications;

/**
 * Other specific selectors
 */


/**
 * Default selector used by GlobalNotifications
 */

const selectGlobalNotifications = () => createSelector(
  selectGlobalNotificationsDomain(),
  (substate) => substate
);

const selectSocket = () => createSelector(
  selectGlobalNotificationsDomain(),

  (substate) => substate.socket
);

export default selectGlobalNotifications;
export {
  selectGlobalNotificationsDomain,
  selectGlobalNotifications,
  selectSocket,
};
