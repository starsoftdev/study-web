import { createSelector } from 'reselect';

/**
 * Direct selector to the callCenterHomePage state domain
 */
const selectCallCenterHomePageDomain = () => state => state.callCenterHomePage;

export const selectFetchedPatients = () => createSelector(
  selectCallCenterHomePageDomain(),
  (substate) => substate.fetchedPatients.details.sort((a, b) => {
    if (Number(a.count_unread)) {
      const lastMessageDateForA = new Date(a.last_message_date).getTime();
      const lastMessageDateForB = new Date(b.last_message_date).getTime();
      if (!Number(b.count_unread) || lastMessageDateForA > lastMessageDateForB) {
        return -1;
      }
      return 1;
    } else {
      const lastDateForA = Math.max(
        new Date(a.updated_at).getTime(),
        new Date(a.last_message_date).getTime(),
        new Date(a.last_email_date).getTime(),
      );
      const lastDateForB = Math.max(
        new Date(b.updated_at).getTime(),
        new Date(b.last_message_date).getTime(),
        new Date(b.last_email_date).getTime(),
      );
      if (Number(b.count_unread) || lastDateForA > lastDateForB) {
        return 1;
      }
      return -1;
    }
  })
);

export const selectSchedules = () => createSelector(
  selectCallCenterHomePageDomain(),
  (substate) => substate.schedules,
);

export const selectPatients = () => createSelector(
  selectCallCenterHomePageDomain(),
  (substate) => substate.patients.data,
);

export const selectIsFetchingPatients = () => createSelector(
  selectCallCenterHomePageDomain(),
  (substate) => substate.patients.isFetching,
);

export const selectShowPatientsListModal = () => createSelector(
  selectCallCenterHomePageDomain(),
  (substate) => substate.showPatientsListModal,
);
