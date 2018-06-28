import { createSelector } from 'reselect';

const selectAdminHomeDomain = () => state => state.adminHomePage;

const selectAdminHomePage = () => createSelector(
  selectAdminHomeDomain(),
  substate => substate
);

export default selectAdminHomePage;
