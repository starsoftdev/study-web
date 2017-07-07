import { createSelector } from 'reselect';

const selectCalendarPageDomain = () => state => state.calendarPage;

const selectPatientsByStudy = () => createSelector(
  selectCalendarPageDomain(),
  (substate) => substate.patientsByStudy,
);

const selectSchedules = () => createSelector(
  selectCalendarPageDomain(),
  (substate) => substate.schedules,
);

const selectSponsorSchedules = () => createSelector(
  selectCalendarPageDomain(),
  (substate) => substate.sponsorSchedules,
);

const selectSponsorProtocols = () => createSelector(
  selectCalendarPageDomain(),
  substate => substate.sponsorProtocols
);

const selectPaginationOptions = () => createSelector(
  selectCalendarPageDomain(),
  (substate) => substate.paginationOptions,
);

export default selectCalendarPageDomain;
export {
  selectPatientsByStudy,
  selectSchedules,
  selectSponsorSchedules,
  selectSponsorProtocols,
  selectPaginationOptions,
};
