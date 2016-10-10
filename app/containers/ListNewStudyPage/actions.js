/*
 *
 * ListNewStudyPage actions
 *
 */

import {
  SHOW_ADD_SITE_LOCATION_MODAL,
  HIDE_ADD_SITE_LOCATION_MODAL,
  SHOW_ADD_EMAIL_MODAL,
  HIDE_ADD_EMAIL_MODAL,
} from './constants';

export function showSiteLocationModal() {
  return {
    type: SHOW_ADD_SITE_LOCATION_MODAL,
  };
}

export function hideSiteLocationModal() {
  return {
    type: HIDE_ADD_SITE_LOCATION_MODAL,
  };
}

export function showAddEmailModal() {
  return {
    type: SHOW_ADD_EMAIL_MODAL,
  };
}

export function hideAddEmailModal() {
  return {
    type: HIDE_ADD_EMAIL_MODAL,
  };
}
