import { createSelector } from 'reselect';

const selectVendorHomePageDomain = () => state => state.vendorHome;

const selectVendorHomePage = () => createSelector(
  selectVendorHomePageDomain(),
  substate => substate
);

const selectSites = () => createSelector(
  selectVendorHomePageDomain(),
  (substate) => substate.sites,
);

const selectStudies = () => createSelector(
  selectVendorHomePageDomain(),
  (substate) => substate.studies,
);

const selectPatientSignUps = () => createSelector(
  selectVendorHomePageDomain(),
  (substate) => substate.patientSignUps,
);

const selectPatientMessagesCount = () => createSelector(
  selectVendorHomePageDomain(),
  (substate) => substate.patientMessagesCount,
);

const selectPaginationOptions = () => createSelector(
  selectVendorHomePageDomain(),
  (substate) => substate.paginationOptions,
);

const selectQueryParams = () => createSelector(
  selectVendorHomePageDomain(),
  (substate) => substate.queryParams,
);

export default selectVendorHomePage;
export {
  selectSites,
  selectStudies,
  selectPatientSignUps,
  selectPatientMessagesCount,
  selectPaginationOptions,
  selectQueryParams,
};
