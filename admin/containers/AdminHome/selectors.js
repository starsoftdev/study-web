import { createSelector } from 'reselect';

const selectAdminHomeDomain = () => state => state.adminHomePage;

const selectAdminHomePage = () => createSelector(
  selectAdminHomeDomain(),
  substate => substate
);

const selectPaginationOptions = () => createSelector(
  selectAdminHomeDomain(),
  substate => substate.paginationOptions
);

export default selectAdminHomePage;
export {
  selectPaginationOptions,
};
