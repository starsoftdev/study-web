import React from 'react';

import { translate } from '../../../../common/utilities/localization';

import './style.less';

export default class CallCalendar extends React.Component {
  render() {
    return (
      <div className="ccCalendar">
        <h3>{translate('container.page.callcenter.heading.calendar')}</h3>
        <div className="ccCal-box">
          Agenda
        </div>
        <div className="ccCal-box">
          Agenda
        </div>
        <div className="ccCal-box">
          Agenda
        </div>
        <div className="ccCal-box">
          Agenda
        </div>
      </div>
    );
  }
}
