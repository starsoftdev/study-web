/**
 * Created by mike on 10/14/16.
 */

import React from 'react';

class Patient extends React.Component {

  static propTypes = {
    category: React.PropTypes.object,
    connectDragSource: React.PropTypes.func.isRequired,
    currentPatientId: React.PropTypes.number,
    formatPhone: React.PropTypes.func.isRequired,
    isDragging: React.PropTypes.bool.isRequired,
    patient: React.PropTypes.object,
  };


  componentDidMount() {
  }

  render() {
    const { isDragging, connectDragSource, category, formatPhone, patient } = this.props;
    const patientPhone = this.formatPhone(patient.phone);
    return (
      <li key={patient.id} className={classNames({"patient-selected": patient.id === currentPatientId})} onClick={() => {
        this.onPatientClick(category, patient);
      }}>
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
