import { createSelector } from 'reselect';
import { get, map } from 'lodash';

/**
 * Direct selector to the routing state domain
 */
const selectFormDomain = () => state => state.form;

/**
 * UpgradeStudyForm -> all values
 */
const selectUpgradeStudyFormValues = () => createSelector(
  selectFormDomain(),
  substate => get(substate, 'upgradeStudy.values', {})
);

/**
 * UpgradeStudyForm -> checking validation error
 */
const selectUpgradeStudyFormError = () => createSelector(
  selectFormDomain(),
  (substate) => {
    const errors = get(substate, 'upgradeStudy.syncErrors', {});
    return Object.keys(errors).length > 0;
  }
);

const selectUpgradeStudyFormLevelValue = () => createSelector(
  selectFormDomain(),
  substate => get(substate, 'upgradeStudy.values.level', null)
);

const selectUpgradeStudyFormPatientMessagingSuiteValue = () => createSelector(
  selectFormDomain(),
  substate => get(substate, 'upgradeStudy.values.patientMessagingSuite', null)
);

const selectUpgradeStudyFormCallTrackingValue = () => createSelector(
  selectFormDomain(),
  substate => get(substate, 'upgradeStudy.values.callTracking', null)
);

const selectUpgradeStudyFormNotesValue = () => createSelector(
  selectFormDomain(),
  substate => get(substate, 'upgradeStudy.values.notes', null)
);

const selectUpgradeStudyFormLeadsCount = () => createSelector(
  selectFormDomain(),
  (substate) => {
    const leads = get(substate, 'upgradeStudy.values.leadSource', []);
    return leads.length;
  }
);

const selectUpgradeStudyFields = () => createSelector(
  selectFormDomain(),
  (substate) => {
    const regFieldsArr = get(substate, 'upgradeStudy.registeredFields', []);
    return map(regFieldsArr, (item) => {
      return item.name;
    });
  }
);

export default selectFormDomain;
export {
  selectUpgradeStudyFormValues,
  selectUpgradeStudyFormError,
  selectUpgradeStudyFormLevelValue,
  selectUpgradeStudyFormPatientMessagingSuiteValue,
  selectUpgradeStudyFormCallTrackingValue,
  selectUpgradeStudyFormNotesValue,
  selectUpgradeStudyFormLeadsCount,
  selectUpgradeStudyFields,
};
