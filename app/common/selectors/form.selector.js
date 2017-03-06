/**
 * Created by mike on 10/20/16.
 */

import { createSelector } from 'reselect';
import { get, isEqual } from 'lodash';

/**
 * Form selector to the form state domain
 */
const selectFormDomain = () => state => state.form;

/**
 * Other specific selectors
 */
export const selectActiveField = (formName) => createSelector(
  selectFormDomain(),
  (substate) => get(substate, `${formName}.active`, {})
);

export const selectValues = (formName) => createSelector(
  selectFormDomain(),
  (substate) => get(substate, `${formName}.values`, {})
);

export const selectSyncErrors = (formName) => createSelector(
  selectFormDomain(),
  (substate) => get(substate, `${formName}.syncErrors`, {})
);

export const selectSyncErrorBool = (formName) => createSelector(
  selectFormDomain(),
  (substate) => {
    const errors = get(substate, `${formName}.syncErrors`, {});
    return Object.keys(errors).length > 0;
  }
);

export const selectFormDidChange = (formName) => createSelector(
  selectFormDomain(),
  (substate) => {
    const initial = get(substate, `${formName}.initial`, {});
    const current = get(substate, `${formName}.values`, {});
    return !isEqual(initial, current);
  }
);
