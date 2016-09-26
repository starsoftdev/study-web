import { createSelector } from 'reselect';

const selectCalendarPageState = (state) => state.calendarPage;

const getFilteredSchedules = createSelector(
  [schedules => schedules,
  filter => filter],
  (schedules, filter) => schedules.filter(s =>
    `${s.patient.firstName} ${s.patient.lastName}`.toLowerCase().indexOf(filter.patientName.toLowerCase()) > -1 &&
      (!filter.siteLocation || s.siteLocation === filter.siteLocation) &&
      (!filter.indication || s.indication === filter.indication) &&
      (!filter.protocol || s.protocolNumber === filter.protocol)
  )
);

const selectPatientsByStudy = () => createSelector(
  selectCalendarPageState,
  (substate) => substate.patientsByStudy,
);

const selectSchedules = () => createSelector(
  selectCalendarPageState,
  (substate) => substate.schedules,
);

export {
  getFilteredSchedules,
  selectPatientsByStudy,
  selectSchedules,
};
