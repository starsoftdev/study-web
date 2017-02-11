/* eslint-disable prefer-template, no-unused-vars */

import React, { PropTypes } from 'react';
import Calendar from 'react-big-calendar';
import moment from 'moment-timezone';

import { SchedulePatientModalType } from 'common/constants';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
Calendar.momentLocalizer(moment); // or globalizeLocalizer
import 'react-big-calendar/lib/less/styles.less';

class CalendarWidget extends React.Component {
  static propTypes = {
    currentUser: PropTypes.object,
    schedules: PropTypes.array.isRequired,
    handleOpenModal: PropTypes.func.isRequired,
    handleShowAll: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.getTimezoneDate = this.getTimezoneDate.bind(this);
  }

  getTimezoneDate(date) {
    const { currentUser } = this.props;
    // we need to compensate for big calendar using a local date offset instead of an international one
    const offset = moment().local().utcOffset() - moment().tz(currentUser.timezone).utcOffset();
    let selectedDate;
    if (offset > 0) {
      selectedDate = moment(date).add(offset, 'minute');
    } else if (offset === 0) {
      selectedDate = moment(date);
    } else {
      selectedDate = moment(date).subtract(-offset, 'minute');
    }
    return selectedDate;
  }

  render() {
    const { currentUser, schedules } = this.props;

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
        title: s.patient.firstName + ' ' + s.patient.lastName + ' ' + localTime.format('h:mm A'),
        start: browserTime,
        end: browserTime,
      };
    });

    this.currentDate = moment().toDate();

    return (
      <div className="calendar-box calendar-slider">
        <Calendar
          selectable
          events={eventsList}
          defaultDate={this.currentDate}
          culture="en"
          timezone={currentUser.timezone}
          onNavigate={(date) => {
            this.currentDate = date;
          }}
          eventPropGetter={(event, start, end, isSelected) => ({
          })}
          eventOffset={300}
          onSelectSlot={({ start, end, slots }) => {
            if (slots.length === 1) {
              const selectedDate = this.getTimezoneDate(start);
              this.props.handleOpenModal(SchedulePatientModalType.CREATE, { selectedDate });
            }
          }}
          onSelectDate={(label, date) => {
            this.props.handleOpenModal(SchedulePatientModalType.CREATE, { selectedDate: date });
          }}
          onSelectEvent={(event) => {
            this.props.handleOpenModal(SchedulePatientModalType.UPDATE, event);
          }}
          onShowMore={(events, date) => {
            this.props.handleShowAll(true, events, date);
          }}
          ref={(c) => { this.bigCalendar = c; }}
        />
      </div>
    );
  }
}

export default CalendarWidget;
