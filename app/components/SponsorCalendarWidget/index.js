/* eslint-disable prefer-template, no-unused-vars */

import React, { PropTypes } from 'react';
import Calendar from 'react-big-calendar';
import ReactTooltip from 'react-tooltip';
import moment from 'moment-timezone';

import 'react-big-calendar/lib/less/styles.less';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
Calendar.momentLocalizer(moment); // or globalizeLocalizer

class CalendarWidget extends React.Component {
  static propTypes = {
    currentUser: PropTypes.object,
    sponsorSchedules: PropTypes.array.isRequired,
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
    const { currentUser, sponsorSchedules } = this.props;
    let currDate = null;
    let counter = 0;

    const eventsList = sponsorSchedules.map(s => {
      const localTime = moment(s.time);
      const browserTime = moment()
        .year(localTime.year())
        .month(localTime.month())
        .date(localTime.date())
        .hour(localTime.hour())
        .minute(localTime.minute())
        .seconds(0);

      const result = {
        data: s,
        start: browserTime,
        end: browserTime,
      };

      if (currDate === null || currDate === moment(s.time).startOf('date').date()) {
        counter++;
      } else {
        counter = 1;
      }

      result.title = `Patient #${counter} ${moment(s.time).format('h:mm A')}`;
      currDate = moment(s.time).startOf('date').date();
      return result;
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
          onShowMore={(events, date) => {
            this.props.handleShowAll(true, events, date);
          }}
          components={{
            event: (ev) => {
              return <div>
                <span className="custom-event-block" data-for={`event-${ev.event.data.id}`} data-tip={ev.title}>{ev.title}</span>
                <ReactTooltip id={`event-${ev.event.data.id}`} type="info" class="tooltipClass wide" delayHide={300} effect="solid" />
              </div>
            },
          }}
          ref={(c) => { this.bigCalendar = c; }}
        />
      </div>
    );
  }
}

export default CalendarWidget;
