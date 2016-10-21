/**
 * Created by mike on 10/20/16.
 */

import { createSelector } from 'reselect';
import { get } from 'lodash';

/**
 * Form selector to the form state domain
 */
const selectFormDomain = () => state => state.form;

/**
 * Other specific selectors
 */
export const selectSyncErrors = (formName) => createSelector(
  selectFormDomain(),
  (substate) => get(substate, `${formName}.syncErrors`, {})
);
