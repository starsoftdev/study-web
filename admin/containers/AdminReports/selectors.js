import { createSelector } from 'reselect';

const selectAdminHomeDomain = () => state => state.adminHome;

const selectAdminHomePage = () => createSelector(
  selectAdminHomeDomain(),
  substate => substate
);

export default selectAdminHomePage;
