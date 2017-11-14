/* eslint-disable prefer-template, no-unused-vars */

import React, { PropTypes } from 'react';
import Calendar from 'react-big-calendar';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import moment from 'moment-timezone';
import classnames from 'classnames';
import _ from 'lodash';
import 'react-big-calendar/lib/less/styles.less';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
Calendar.momentLocalizer(moment); // or globalizeLocalizer

class CalendarWidget extends React.Component {
  static propTypes = {
    currentUser: PropTypes.object,
    sites: PropTypes.array,
    protocols: PropTypes.array.isRequired,
    sponsorSchedules: PropTypes.array.isRequired,
    handleOpenModal: PropTypes.func.isRequired,
    handleShowAll: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.getTimezoneDate = this.getTimezoneDate.bind(this);
    this.handleFiveWeeksHeight = this.handleFiveWeeksHeight.bind(this);
    this.state = {
      fiveWeeks: false,
    };
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

  handleFiveWeeksHeight(date) {
    const aa = moment(date);
    const start = moment().year(aa.year()).month(aa.month()).date(1).day();
    const end = moment().year(aa.year()).month(aa.month()).date(aa.daysInMonth()).day();
    const visibleDays = aa.daysInMonth() + start + (6 - end);
    const weeks = visibleDays / 7;
    this.setState({ fiveWeeks: weeks > 5 });
  }

  render() {
    const { currentUser, sponsorSchedules, protocols, sites } = this.props;
    const eventsList = [];
    let currDate = null;
    let counter = 0;

    for (const s of sponsorSchedules) {
      let isFindProtocol = false;
      const localTime = s.time;
      const browserTime = moment()
        .year(localTime.year())
        .month(localTime.month())
        .date(localTime.date())
        .hour(localTime.hour())
        .minute(localTime.minute())
        .seconds(0);
      const site = _.find(sites, item => item.id === s.site_id);
      const timezone = site.timezone || currentUser.timezone;
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

      for (const protocol of protocols) {
        if (s.protocolNumber === protocol.protocolNumber) {
          isFindProtocol = true;
        }
      }

      result.title = `Patient #${counter} ${s.time.format('h:mm A (z)')}`;
      result.tooltipTitle = result.title;
      result.numberName = `Patient #${counter}`;
      if (s.principalInvestigator) {
        result.tooltipTitle = (<div>
          {s.principalInvestigator}<br />Patient #{counter} {timezone.tz(s.time, timezone).format('h:mm A (z)')}
        </div>);
      }
      currDate = moment(s.time).startOf('date').date();

      if (isFindProtocol) {
        eventsList.push(result);
      }
    }

    this.currentDate = moment().toDate();

    window.requestAnimationFrame(() => {
      const evWrap = document.getElementsByClassName('rbc-event-content');
      const evWrapNum = evWrap.length;

      for (let i = 0; i < evWrapNum; i++) {
        evWrap[i].removeAttribute('title');
      }
    });

    return (
      <div className={classnames('calendar-box', 'calendar-slider', { 'five-weeks': this.state.fiveWeeks })}>
        <Calendar
          selectable={false}
          events={eventsList}
          defaultDate={this.currentDate}
          culture="en"
          timezone={currentUser.timezone}
          onNavigate={(date) => {
            this.currentDate = date;
            this.handleFiveWeeksHeight(date);
          }}
          eventPropGetter={(event, start, end, isSelected) => ({
          })}
          eventOffset={300}
          onShowMore={(events, date) => {
            this.props.handleShowAll(true, events, date);
          }}
          components={{
            event: (ev) => {
              const tooltip = (
                <Tooltip
                  id={'ms-tooltip'}
                  className="calendar-tooltip"
                >
                  {ev.event.tooltipTitle}
                </Tooltip>
              );

              return (
                <OverlayTrigger placement="top" overlay={tooltip}>
                  <span className="custom-event-block">{ev.title}</span>
                </OverlayTrigger>
              );
            },
          }}
          ref={(c) => { this.bigCalendar = c; }}
        />
      </div>
    );
  }
}

export default CalendarWidget;
