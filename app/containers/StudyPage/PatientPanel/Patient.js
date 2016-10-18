/**
 * Created by mike on 10/14/16.
 */

import React from 'react';
import classNames from 'classnames';
import moment from 'moment-timezone';
import { formatPhone } from '../helper/functions';

class Patient extends React.Component {

  static propTypes = {
    category: React.PropTypes.object.isRequired,
    // connectDragSource: React.PropTypes.func.isRequired,
    currentUser: React.PropTypes.object.isRequired,
    currentPatientId: React.PropTypes.number,
    // isDragging: React.PropTypes.bool.isRequired,
    onPatientClick: React.PropTypes.func.isRequired,
    patient: React.PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.renderPatientTextMessageSummary = this.renderPatientTextMessageSummary.bind(this);
  }

  renderPatientTextMessageSummary(patient) {
    const { currentUser } = this.props;
    if (patient.lastTextMessage) {
      return (
        <a className="bottom">
          <div className="msg-alert">
            <div className="msg">
              <p>{patient.lastTextMessage.body}</p>
            </div>
            <div className="time">
              <span className="counter-circle">{patient.textMessageCount}</span>
              <time dateTime={patient.lastTextMessage.dateUpdated}>{moment.tz(patient.lastTextMessage.dateUpdated, currentUser.timezone).format('MM/DD/YY [at] h:mm A')}</time>
            </div>
          </div>
        </a>
      );
    }
    return null;
  }

  render() {
    const { isDragging, connectDragSource, category, currentPatientId, onPatientClick, patient } = this.props;
    const patientPhone = formatPhone(patient.phone);
    return (
      <li
        className={classNames({ 'patient-selected': patient.id === currentPatientId })}
        onClick={() => {
          onPatientClick(category, patient);
        }}
      >
        <a className="top">
          <strong className="name">
            <span className="first-name">{patient.firstName}</span>
            <span> </span>
            <span className="last-name">{patient.lastName}</span>
          </strong>
          <span className="email">{patient.email}</span>
          <span className="phone">{patientPhone}</span>
        </a>
        {this.renderPatientTextMessageSummary(patient)}
      </li>
    );
  }
}

export default Patient;
