/* eslint-disable prefer-template, no-unused-vars */

import React, { PropTypes } from 'react';
import Calendar from 'react-big-calendar';
import moment from 'moment-timezone';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import classnames from 'classnames';
import _ from 'lodash';

import 'react-big-calendar/lib/less/styles.less';

import { SchedulePatientModalType } from '../../../../common/constants';
import { translate } from '../../../../../common/utilities/localization';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
Calendar.setLocalizer( // or globalizeLocalizer
  Calendar.momentLocalizer(moment)
);

class CalendarWidget extends React.Component {
  static propTypes = {
    currentUser: PropTypes.object,
    currentSite: PropTypes.object,
    sites: PropTypes.array,
    schedules: PropTypes.array.isRequired,
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
    const { currentUser, currentSite, schedules, sites } = this.props;
    const calendarTimezone = currentUser ? currentUser.timezone : 'UTC';
    const eventsList = schedules.map(s => {
      const time = moment(s.utcTime);
      const browserTime = moment()
        .year(time.year())
        .month(time.month())
        .date(time.date())
        .hour(time.hour())
        .minute(time.minute())
        .seconds(0);
      const site = _.find(sites, item => item.id === s.site_id);
      const timezone = site ? site.timezone : calendarTimezone;
      return {
        data: s,
        title: `${s.patient.firstName} ${s.patient.lastName || ''} ${time.format(translate('portals.component.calendarPage.calendarWidget.patientDateMask'))} (${moment.tz(timezone).format('z')})`,
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
      <div className={classnames('calendar-box', 'calendar-slider', { 'five-weeks': this.state.fiveWeeks })}>
        <Calendar
          selectable
          events={eventsList}
          defaultDate={this.currentDate}
          culture="en"
          timezone={currentSite ? currentSite.timezone : calendarTimezone}
          additionalColumnMarkup={translate('portals.component.calendarPage.calendarWidget.scheduledPatientsColumn')}
          totalString={translate('portals.component.calendarPage.calendarWidget.totalText')}
          messages={calendarMessages}
          onNavigate={(date) => {
            this.currentDate = date;
            this.handleFiveWeeksHeight(date);
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
            const site = _.find(sites, item => item.id === event.data.site_id);
            const timezone = site.timezone || currentUser.timezone;
            this.props.handleOpenModal(SchedulePatientModalType.UPDATE, { ...event, timezone });
          }}
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
                  {ev.title}
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
