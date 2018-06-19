import { createSelector } from 'reselect';
import { get } from 'lodash';

const selectHomePageDomain = () => state => state.homePage;

const selectHomePage = () => createSelector(
  selectHomePageDomain(),
  substate => substate
);

const selectPatientSignUps = () => createSelector(
  selectHomePageDomain(),
  substate => substate.patientSignUps
);

const selectPatientMessagesCount = () => createSelector(
  selectHomePageDomain(),
  substate => substate.patientMessagesCount
);

const selectPrincipalInvestigatorTotals = () => createSelector(
  selectHomePageDomain(),
  substate => substate.principalInvestigatorTotals
);

const selectStudies = () => createSelector(
  selectHomePageDomain(),
  substate => substate.studies
);

const selectProtocols = () => createSelector(
  selectHomePageDomain(),
  substate => substate.protocols
);

const selectProtocolNumbers = () => createSelector(
  selectHomePageDomain(),
  substate => substate.protocolNumbers
);

const selectIndications = () => createSelector(
  selectHomePageDomain(),
  substate => substate.indications
);

const selectSelectedIndicationLevelPrice = () => createSelector(
  selectHomePageDomain(),
  substate => substate.selectedIndicationLevelPrice
);

const selectRenewedStudy = () => createSelector(
  selectHomePageDomain(),
  substate => substate.renewedStudy
);

const selectUpgradedStudy = () => createSelector(
  selectHomePageDomain(),
  substate => substate.upgradedStudy
);

const selectEditedStudy = () => createSelector(
  selectHomePageDomain(),
  substate => substate.editedStudy
);

const selectPaginationOptions = () => createSelector(
  selectHomePageDomain(),
  substate => substate.paginationOptions
);

const selectHomePageClientAdmins = () => createSelector(
  selectHomePageDomain(),
  substate => substate.clientAdmins
);

const selectQueryParams = () => createSelector(
  selectHomePageDomain(),
  (substate) => substate.queryParams
);

const selectEditStudyEmailNotifications = () => createSelector(
  selectHomePageDomain(),
  (substate) => substate.emailNotifications
);

const selectFormDomain = () => state => state.form;

const selectSearchProtocolsFormValues = () => createSelector(
  selectFormDomain(),
  (substate) => get(substate, 'searchProtocols.values', {})
);

const selectMediaTypes = () => createSelector(
  selectHomePageDomain(),
  (substate) => substate.mediaTypes
);


export default selectHomePage;
export {
  selectHomePageDomain,
  selectPatientSignUps,
  selectPatientMessagesCount,
  selectPrincipalInvestigatorTotals,
  selectStudies,
  selectProtocols,
  selectProtocolNumbers,
  selectIndications,
  selectSelectedIndicationLevelPrice,
  selectRenewedStudy,
  selectUpgradedStudy,
  selectEditedStudy,
  selectPaginationOptions,
  selectSearchProtocolsFormValues,
  selectHomePageClientAdmins,
  selectQueryParams,
  selectEditStudyEmailNotifications,
  selectMediaTypes,
};
