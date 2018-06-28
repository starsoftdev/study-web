import React from 'react';
import _ from 'lodash';
import moment from 'moment-timezone';
import { browserHistory } from 'react-router';

import { translate } from '../../../../common/utilities/localization';
import { formatPhone } from '../../../common/helper/functions';
import './style.less';

class CallDiv extends React.Component {

  static propTypes = {
    patients: React.PropTypes.object,
    indications: React.PropTypes.array,
    timezone: React.PropTypes.string,
  };

  gotoPatientPage = (id) => {
    browserHistory.push(`/app/cc/patient/${id}`);
  }

  renderUnreadMessageCount(patient) {
    if (patient.count_unread > 0) {
      return (
        <span className="counter-circle">{patient.count_unread}</span>
      );
    }
    return null;
  }

  renderTextCreatedDate(patient) {

    const { timezone } = this.props;

    if (patient.last_message_body && patient.last_message_date) {
      return (
        <time dateTime={patient.last_message_date}>{moment.tz(patient.last_message_date, timezone).format(translate('client.component.patient.dateMask'))}</time>
      );
    }
    return null;
  }

  renderPatientTextMessageSummary(patient) {

    if (patient.last_message_body && patient.last_message_date) {
      return (
        <div className="msg-alert">
          <div className="msg">
            <p>{patient.last_message_body ? patient.last_message_body : ''}</p>
          </div>
          <div className="time">
            {this.renderUnreadMessageCount(patient)}
            {this.renderTextCreatedDate(patient)}
          </div>
        </div>
      );
    }
    return null;
  }

  getPatientView = (patient, key) => {
    if (patient.phone) {
      let patientPhone;
      // phone number error will be ignored and the phone number will be displayed regardless, even though formatting is incorrect
      try {
        patientPhone = formatPhone(patient.phone);
      } catch (err) {
        patientPhone = patient.phone;
      }
      return (
        <div className="cc-box" key={key} onClick={() => { this.gotoPatientPage(patient.id); }}>
          <strong className="name">
            <span className="first-name">{patient.first_name}</span>
            <span> </span>
            <span className="last-name">{patient.last_name}</span>
          </strong>
          <span className="email">{patient.email}</span>
          <span className="phone">{patientPhone}</span>
          {(patient.disposition_key === 0 || !patient.disposition_key) && this.renderPatientTextMessageSummary(patient)}
          {patient.disposition_key > 0 ? <span className="disposition">{translate(`common.disposition.id${patient.disposition_key}`)}</span> : ''}
        </div>
      );
    }
    return (
      <div className="cc-box disabled" key={key}>
        <strong className="name">
          <span className="first-name">{patient.first_name}</span>
          <span> </span>
          <span className="last-name">{patient.last_name}</span>
        </strong>
        <span className="email">{patient.email}</span>
        {patient.disposition_key > 0 ? <span className="disposition">{translate(`common.disposition.id${patient.disposition_key}`)}</span> : ''}
      </div>
    );
  }

  renderNewPatients = () => {
    const { patients } = this.props;
    const output = [];
    _.forEach(patients.details, (patient) => {

      if (patient && (patient.call_center_patient_category_id === 1 || !patient.call_center_patient_category_id)) {
        output.push(this.getPatientView(patient, `callDiv_newPatient_${patient.id}`));
      }
    });
    return output;
  }

  renderCall1 = () => {
    const { patients } = this.props;
    const output = [];
    _.forEach(patients.details, (patient) => {
      if (patient && patient.call_center_patient_category_id === 2) {
        output.push(this.getPatientView(patient, `callDiv_call1_${patient.id}`));
      }
    });
    return output;
  }

  renderCall2 = () => {
    const { patients } = this.props;
    const output = [];
    _.forEach(patients.details, (patient) => {
      if (patient && patient.call_center_patient_category_id === 3) {
        output.push(this.getPatientView(patient, `callDiv_call2_${patient.id}`));
      }
    });
    return output;
  }

  renderCall3 = () => {
    const { patients } = this.props;
    const output = [];
    _.forEach(patients.details, (patient) => {
      if (patient && patient.call_center_patient_category_id === 4) {
        output.push(this.getPatientView(patient, `callDiv_call3_${patient.id}`));
      }
    });
    return output;
  }

  renderMeetings = () => {
    const { patients } = this.props;

    const output = [];
    _.forEach(patients.details, (patient) => {
      if (patient && patient.call_center_patient_category_id === 5) {
        output.push(this.getPatientView(patient, `callDiv_meeting_${patient.id}`));
      }
    });
    return output;
  }

  renderArchive = () => {
    const { patients } = this.props;

    const output = [];
    _.forEach(patients.details, (patient) => {
      if (patient && patient.call_center_patient_category_id === 6) {
        output.push(this.getPatientView(patient, `callDiv_archive_${patient.id}`));
      }
    });
    return output;
  }

  render() {
    return (
      <div className="cc-container">
        <div className="cc-row">
          <div className="cc-box cc-box-heading">
            {translate('container.page.callcenter.heading.newpatient')}
          </div>
          { this.renderNewPatients() }
        </div>
        <div className="cc-row">
          <div className="cc-box cc-box-heading">
            {translate('container.page.callcenter.heading.call')}1
          </div>
          { this.renderCall1() }
        </div>
        <div className="cc-row">
          <div className="cc-box cc-box-heading">
            {translate('container.page.callcenter.heading.call')}2
          </div>
          { this.renderCall2() }
        </div>
        <div className="cc-row">
          <div className="cc-box cc-box-heading">
            {translate('container.page.callcenter.heading.call')}3
          </div>
          { this.renderCall3() }
        </div>
        <div className="cc-row">
          <div className="cc-box cc-box-heading">
            {translate('container.page.callcenter.heading.meetings')}
          </div>
          { this.renderMeetings() }
        </div>
        <div className="cc-row">
          <div className="cc-box cc-box-heading">
            {translate('container.page.callcenter.heading.archivepatient')}
          </div>
          { this.renderArchive() }
        </div>
      </div>
    );
  }
}

export default CallDiv;
