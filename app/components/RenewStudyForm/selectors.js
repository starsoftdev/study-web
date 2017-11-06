import { createSelector } from 'reselect';
import { get, map } from 'lodash';

/**
 * Direct selector to the routing state domain
 */
const selectFormDomain = () => state => state.form;

/**
 * RenewStudyForm -> all values
 */
const selectRenewStudyFormValues = () => createSelector(
  selectFormDomain(),
  substate => ({
    condenseTwoWeeks: false,
    ...get(substate, 'renewStudy.values', {}),
  })
);

/**
 * RenewStudyForm -> checking validation error
 */
const selectRenewStudyFormError = () => createSelector(
  selectFormDomain(),
  (substate) => {
    const errors = get(substate, 'renewStudy.syncErrors', {});
    return Object.keys(errors).length > 0;
  }
);

const selectRenewStudyFormExposureLevelValue = () => createSelector(
  selectFormDomain(),
  substate => get(substate, 'renewStudy.values.exposureLevel', null)
);

const selectRenewStudyFormCampaignLengthValue = () => createSelector(
  selectFormDomain(),
  substate => get(substate, 'renewStudy.values.campaignLength', null)
);

const selectRenewStudyFormcondenseTwoWeeksValue = () => createSelector(
  selectFormDomain(),
  substate => get(substate, 'renewStudy.values.condenseTwoWeeks', null)
);

const selectRenewStudyFormPatientMessagingSuiteValue = () => createSelector(
  selectFormDomain(),
  substate => get(substate, 'renewStudy.values.patientMessagingSuite', null)
);

const selectCallTracking = () => createSelector(
  selectFormDomain(),
  substate => get(substate, 'renewStudy.values.callTracking', null)
);

const selectLeadsCount = () => createSelector(
  selectFormDomain(),
  (substate) => {
    const leads = get(substate, 'renewStudy.values.leadSource', []);
    return leads.length;
  }
);

const selectRenewStudyFormStartDateValue = () => createSelector(
  selectFormDomain(),
  substate => get(substate, 'renewStudy.values.startDate', null)
);

const selectRenewStudyFormNotesValue = () => createSelector(
  selectFormDomain(),
  substate => get(substate, 'renewStudy.values.notes', null)
);

const selectRenewStudyFields = () => createSelector(
  selectFormDomain(),
  (substate) => {
    const regFieldsArr = get(substate, 'renewStudy.registeredFields', []);
    return map(regFieldsArr, (item) => {
      return item.name;
    });
  }
);

export default selectFormDomain;
export {
  selectRenewStudyFormValues,
  selectRenewStudyFormError,
  selectRenewStudyFormExposureLevelValue,
  selectRenewStudyFormCampaignLengthValue,
  selectRenewStudyFormcondenseTwoWeeksValue,
  selectRenewStudyFormPatientMessagingSuiteValue,
  selectCallTracking,
  selectRenewStudyFormStartDateValue,
  selectRenewStudyFormNotesValue,
  selectLeadsCount,
  selectRenewStudyFields,
};
