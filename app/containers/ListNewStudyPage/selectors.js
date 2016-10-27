import { createSelector } from 'reselect';

/**
 * Direct selector to the listNewStudyPage state domain
 */
const selectListNewStudyPageDomain = () => state => state.listNewStudyPage;

/**
 * Other specific selectors
 */


/**
 * Default selector used by ListNewStudyPage
 */

const selectListNewStudyPage = () => createSelector(
  selectListNewStudyPageDomain(),
  (substate) => substate
);

const selectAvailPhoneNumbers = () => createSelector(
  selectListNewStudyPageDomain(),
  (substate) => substate.availPhoneNumbers
);

const selectFormSubmissionStatus = () => createSelector(
  selectListNewStudyPageDomain(),
  (substate) => substate.formSubmissionStatus
);

const selectShowSubmitFormModal = () => createSelector(
  selectListNewStudyPageDomain(),
  (substate) => substate.showSubmitFormModal
);

const selectIndicationLevelPrice = () => createSelector(
  selectListNewStudyPageDomain(),
  (substate) => substate.indicationLevelPrice
);

export default selectListNewStudyPage;
export {
  selectListNewStudyPageDomain,
  selectAvailPhoneNumbers,
  selectFormSubmissionStatus,
  selectShowSubmitFormModal,
  selectIndicationLevelPrice,
};
