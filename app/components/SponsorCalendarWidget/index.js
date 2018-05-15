/* eslint-disable prefer-template, no-unused-vars */

import React, { PropTypes } from 'react';
import Calendar from 'react-big-calendar';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import moment from 'moment-timezone';
import classnames from 'classnames';
import _ from 'lodash';
import 'react-big-calendar/lib/less/styles.less';
import { translate } from '../../../common/utilities/localization';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
Calendar.momentLocalizer(moment); // or globalizeLocalizer

class CalendarWidget extends React.Component {
  static propTypes = {
    currentUser: PropTypes.object,
    currentSite: PropTypes.object,
    sites: PropTypes.object,
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
    const { currentUser, currentSite, sponsorSchedules, protocols, sites } = this.props;
    const eventsList = [];
    let currDate = null;
    let counter = 0;
    const calendarTimezone = currentUser ? currentUser.timezone : 'UTC';

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
      const site = _.find(sites.details, item => item.site_id === s.siteLocation);
      const timezone = site ? site.timezone : calendarTimezone;
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

      result.title = `${translate('portals.component.sponsorCalendarWidget.patientNo', { counter })} ${moment.tz(s.time, timezone).format(translate('portals.component.sponsorCalendarWidget.patientDateMask'))}`;
      result.tooltipTitle = result.title;
      result.numberName = translate('portals.component.sponsorCalendarWidget.patientNo', { counter });
      if (s.principalInvestigator) {
        result.tooltipTitle = (<div>{s.principalInvestigator}<br /> {translate('portals.component.sponsorCalendarWidget.patientNo', { counter })} {moment.tz(s.time, timezone).format(translate('portals.component.sponsorCalendarWidget.patientDateMask'))}</div>);
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
    const calendarMessages = {
      showMore: function showMore(total) {
        return translate('portals.component.sponsorCalendarWidget.nMore', { total });
      },
    };

    return (
      <div className={classnames('calendar-box', 'calendar-slider', { 'five-weeks': this.state.fiveWeeks })}>
        <Calendar
          selectable={false}
          events={eventsList}
          defaultDate={this.currentDate}
          culture="en"
          timezone={currentSite ? currentSite.timezone : calendarTimezone}
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
          additionalColumnMarkup={translate('portals.component.sponsorCalendarWidget.scheduledPatientsColumn')}
          totalString={translate('portals.component.sponsorCalendarWidget.totalText')}
          messages={calendarMessages}
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
