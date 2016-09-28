import { createSelector } from 'reselect';

const selectCalendarPageState = (state) => state.calendarPage;

const selectPatientsByStudy = () => createSelector(
  selectCalendarPageState,
  (substate) => substate.patientsByStudy,
);

const selectSchedules = () => createSelector(
  selectCalendarPageState,
  (substate) => substate.schedules,
);

export {
  selectPatientsByStudy,
  selectSchedules,
};
