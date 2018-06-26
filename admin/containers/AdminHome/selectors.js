import { createSelector } from 'reselect';

const selectAdminHomeDomain = () => state => state.adminHomePage;

const selectAdminHomePage = () => createSelector(
  selectAdminHomeDomain(),
  substate => substate
);

const selectMediaTotals = () => createSelector(
  selectAdminHomeDomain(),
  substate => substate.mediaTotals
);

export default selectAdminHomePage;
export {
  selectMediaTotals,
};
