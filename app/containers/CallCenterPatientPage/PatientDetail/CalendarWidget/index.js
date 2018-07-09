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
          selectable
          defaultView="day"
          events={[]}
          defaultDate={this.currentDate}
          culture="en"
          timezone={calendarTimezone}
          messages={calendarMessages}
          onSelectSlot={({ start, end, slots }) => {
            if (slots.length === 1) {
              const selectedDate = this.getTimezoneDate(start);
              this.props.handleOpenModal(SchedulePatientModalType.CREATE, { selectedDate });
            }
          }}
          onSelectDate={(label, date) => {
            this.props.handleOpenModal(SchedulePatientModalType.CREATE, { selectedDate: date });
          }}
          ref={(c) => { this.bigCalendar = c; }}
        />
      </div>
    );
  }
}

export default CalendarWidget;
