import React from 'react';
import moment from 'moment-timezone';

import { translate } from '../../../../common/utilities/localization';

import './style.less';

export default class CallCalendar extends React.Component {
  static propTypes = {
    currentUser: React.PropTypes.object,
    schedules: React.PropTypes.array,
  };

  static defaultProps = {
    schedules: [],
  };

  constructor(props) {
    super(props);

    this.today = moment().format('dddd, MMMM D');
  }

  render() {
    const { currentUser, schedules } = this.props;

    return (
      <div className="ccCalendar">
        <h3>{translate('container.page.callcenter.heading.calendar')}</h3>
        <h3 className="ccCal-today">{this.today}</h3>
        {schedules.map(schedule => {
          const { time } = schedule;
          if (moment.tz(time, currentUser.timezone).format('D') !== moment().format('D')) return null;
          return (
            <div className="ccCal-box" key={schedule.id}>
              {moment.tz(time, currentUser.timezone).format('hA')} {schedule.first_name} {schedule.last_name}
            </div>
          );
        })}
      </div>
    );
  }
}
