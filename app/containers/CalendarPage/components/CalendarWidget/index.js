/* eslint-disable prefer-template, no-unused-vars */

import React, { PropTypes } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

import { SchedulePatientModalType } from 'common/constants';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer
import 'react-big-calendar/lib/css/react-big-calendar.css';

class CalendarWidget extends React.Component {
  static propTypes = {
    currentUser: PropTypes.object,
    schedules: PropTypes.array.isRequired,
    handleOpenModal: PropTypes.func.isRequired,
    handleShowAll: PropTypes.func.isRequired,
  }

  currentDate = new Date()

  render() {    
    const { currentUser } = this.props;

    const eventsList = this.props.schedules.map(s => {      
      const localTime = moment(s.time);
      const browserTime = moment()
        .utcOffset(-new Date().getTimezoneOffset())
        .year(localTime.year())
        .month(localTime.month())
        .day(localTime.day())
        .hour(localTime.hour())
        .minute(localTime.minute());
      console.log('******', localTime.format(), browserTime.format());

      return {
        data: s,
        title: s.patient.firstName + ' ' + s.patient.lastName + ' ' + localTime.format('h:mm A'),
        start: browserTime,
        end: browserTime,
      }
    });

    return (
      <div className="calendar-box calendar-slider">
        <BigCalendar
          selectable
          events={eventsList}
          defaultDate={this.currentDate}
          onNavigate={(date) => {
            this.currentDate = date;
          }}
          eventPropGetter={(event, start, end, isSelected) => ({
          })}
          onSelectSlot={({ start, end, slots }) => {
            if (slots.length === 1) {
              this.props.handleOpenModal(SchedulePatientModalType.CREATE, { selectedDate: start });
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
