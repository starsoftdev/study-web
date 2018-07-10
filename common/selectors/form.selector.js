/**
 * Created by mike on 10/20/16.
 */

import { createSelector } from 'reselect';
import { get, isEqual, map } from 'lodash';

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

export const selectInitialValues = (formName) => createSelector(
  selectFormDomain(),
  (substate) => get(substate, `${formName}.initial`, {})
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

export const selectAsyncErrors = (formName) => createSelector(
  selectFormDomain(),
  (substate) => get(substate, `${formName}.asyncErrors`, undefined)
);

export const selectAsyncErrorBool = (formName) => createSelector(
  selectFormDomain(),
  (substate) => {
    const errors = get(substate, `${formName}.asyncErrors`, undefined);
    return typeof errors === 'object' && Object.keys(errors).length > 0;
  }
);

// returns boolean for easy async validation boolean checking
export const selectAsyncValidatingBool = (formName) => createSelector(
  selectFormDomain(),
  (substate) => {
    const validating = get(substate, `${formName}.asyncValidating`, undefined);
    return typeof validating === 'string';
  }
);

export const selectFormFieldNames = (formName) => createSelector(
  selectFormDomain(),

  (substate) => {
    const regFieldsArr = get(substate, `${formName}.registeredFields`, []);
    return map(regFieldsArr, (item) => {
      return item.name;
    });
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
