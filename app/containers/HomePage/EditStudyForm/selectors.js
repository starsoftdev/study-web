import { createSelector } from 'reselect';
import { get } from 'lodash';

/**
 * Direct selector to the routing state domain
 */
const selectFormDomain = () => state => state.form;

const selectEditStudyFormRecruitmentPhoneValue = () => createSelector(
  selectFormDomain(),
  substate => get(substate, 'editStudy.values.recruitmentPhone', null)
);

const selectEditStudyFormStudyAdValue = () => createSelector(
  selectFormDomain(),
  substate => get(substate, 'editStudy.values.studyAd', null)
);

export default selectFormDomain;
export {
  selectEditStudyFormRecruitmentPhoneValue,
  selectEditStudyFormStudyAdValue,
};
