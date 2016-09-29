import { createSelector } from 'reselect';

export const selectCalendarPageDomain = (state) => state.calendarPage;

const selectPatientsByStudy = () => createSelector(
  selectCalendarPageDomain,
  (substate) => substate.patientsByStudy,
);

const selectSchedules = () => createSelector(
  selectCalendarPageDomain,
  (substate) => substate.schedules,
);

export {
  selectPatientsByStudy,
  selectSchedules,
};
