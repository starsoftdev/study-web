import { createSelector } from 'reselect';
import { get } from 'lodash';

const selectRewardForm = () => state => state.form.rewardForm;

const selectSiteId = () => createSelector(
  selectRewardForm(),
  (substate) => get(substate, 'values.siteId', 0)
);

export default selectRewardForm;
export {
  selectSiteId,
};
