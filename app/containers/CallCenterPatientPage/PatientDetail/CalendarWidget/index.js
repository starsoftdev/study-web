/* eslint-disable prefer-template, no-unused-vars */

import React, { PropTypes } from 'react';
import Calendar from 'cc-react-big-calendar';
import moment from 'moment-timezone';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import classnames from 'classnames';
import _ from 'lodash';
import 'cc-react-big-calendar/lib/less/styles.less';
import { SchedulePatientModalType } from '../../../../common/constants';
import { translate } from '../../../../../common/utilities/localization';


// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
Calendar.setLocalizer( // or globalizeLocalizer
  Calendar.momentLocalizer(moment)
);

const CustomToolbar = (toolbar) => {
  const goToBack = () => { toolbar.onNavigate('PREV'); };
  const goToNext = () => { toolbar.onNavigate('NEXT'); };
  const goToCurrent = () => { toolbar.onNavigate('TODAY'); };
  const selectMonth = () => { toolbar.onViewChange('month'); };
  const label = () => {
    const date = moment(toolbar.date);
    return (
      <span><b>{date.format(translate('container.page.callCenterPatient.modal.scheduledPatientModal.todayDateMask'))}</b></span>
    );
  };

  return (
    <div className="calendar-toolbar-wrapper">
      <div className="btns">
        <button type="button" className="btn btn-primary" onClick={goToBack}>prev</button>
        <button type="button" className="btn btn-primary" onClick={goToCurrent}>today</button>
        <button type="button" className="btn btn-primary" onClick={goToNext}>next</button>
      </div>
      <div><label>{label()}</label></div>
      <div className="btns">
        <button type="button" className="btn btn-primary" onClick={selectMonth}>month</button>
      </div>
    </div>
  );
};

class CalendarWidget extends React.Component {
  static propTypes = {
    currentUser: PropTypes.object,
    schedules: PropTypes.array.isRequired,
    handleOpenModal: PropTypes.func.isRequired,
    handleShowAll: PropTypes.func.isRequired,
    patient: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      view: 'day',
      day: new Date(),
    };
  }


  render() {
    const { currentUser, schedules, patient } = this.props;
    const calendarTimezone = currentUser ? currentUser.timezone : 'UTC';
    const eventsList = schedules.map(s => {
      const localTime = s.time;
      const browserTime = moment()
        .year(localTime.year())
        .month(localTime.month())
        .date(localTime.date())
        .hour(localTime.hour())
        .minute(localTime.minute())
        .seconds(0);
      return {
        data: s,
        title: `${patient.firstName} ${patient.lastName || ''} ${moment.tz(localTime, calendarTimezone).format(translate('portals.component.calendarPage.calendarWidget.patientDateMask'))}`,
        start: browserTime,
        end: browserTime,
      };
    });

    this.currentDate = moment().toDate();

    window.requestAnimationFrame(() => {
      const evWrap = document.getElementsByClassName('rbc-event-content');
      const evWrapNum = evWrap.length;

      for (let i = 0; i < evWrapNum; i++) {
        evWrap[i].removeAttribute('title');
      }
    });
    const calendarMessages = {
      showMore: function showMore(total) {
        return translate('portals.component.calendarPage.calendarWidget.nMore', { total });
      },
    };

    return (
      <div>
        <Calendar
          className="schedule-calendar"
          selectable
          view={this.state.view}
          onView={view => {
            this.setState({
              view,
            });
          }}
          events={eventsList}
          date={new Date(moment(this.state.day).format())}
          culture="en"
          timezone={calendarTimezone}
          messages={calendarMessages}
          components={{
            toolbar: CustomToolbar,
          }}
          onSelectSlot={({ start, end, slots }) => {
            if (this.state.view === 'month') {
              const day = slots[0];
              this.setState({
                day,
                view: 'day',
              });
            }
          }}
          onSelectDate={(day) => {
            this.setState({
              day,
              view: 'day',
            });
          }}
          onNavigate={(day) => {
            this.setState({
              day,
            });
          }}
          ref={(c) => { this.bigCalendar = c; }}
        />
      </div>
    );
  }
}

export default CalendarWidget;
