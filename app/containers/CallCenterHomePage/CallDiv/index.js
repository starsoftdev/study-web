import React from 'react';
import _ from 'lodash';

import { translate } from '../../../../common/utilities/localization';
import './style.less';

export default class CallDiv extends React.Component {

  static propTypes = {
    patients: React.PropTypes.object,
    indications: React.PropTypes.array,
  };

  renderNewPatients = () => {
    const { patients, indications } = this.props;
    console.log(patients);
    const output = [];
    _.forEach(patients.details, (patient) => {
      if (patient && patient.patient_category_id === 1) {
        output.push(<div className="cc-box" key={`callDiv_newPatient_${patient.id}`}>
          <span>{patient.first_name} {patient.last_name}</span>
          <span>{indications[patient.study_id].name}</span>
        </div>);
      }
    });
    return output;
  }

  renderCall1 = () => {
    const { patients, indications } = this.props;

    const output = [];
    _.forEach(patients.details, (patient) => {
      if (patient && patient.patient_category_id === 2) {
        output.push(<div className="cc-box" key={`callDiv_call1_${patient.id}`}>
          <span>{patient.first_name} {patient.last_name}</span>
          <span>{indications[patient.study_id].name}</span>
        </div>);
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
          <div className="cc-box">
            <span>Patient Name</span>
            <span>Indication</span>
          </div>
          <div className="cc-box">
            <span>Patient Name</span>
            <span>Indication</span>
          </div>
          <div className="cc-box">
            <span>Patient Name</span>
            <span>Indication</span>
          </div>
        </div>
        <div className="cc-row">
          <div className="cc-box cc-box-heading">
            {translate('container.page.callcenter.heading.call')}3
          </div>
          <div className="cc-box">
            <span>Patient Name</span>
            <span>Indication</span>
          </div>
          <div className="cc-box">
            <span>Patient Name</span>
            <span>Indication</span>
          </div>
          <div className="cc-box">
            <span>Patient Name</span>
            <span>Indication</span>
          </div>
        </div>
        <div className="cc-row">
          <div className="cc-box cc-box-heading">
            {translate('container.page.callcenter.heading.meetings')}
          </div>
          <div className="cc-box">
            <span>Patient Name</span>
            <span>Indication</span>
            <span>Meeting Time</span>
          </div>
          <div className="cc-box">
            <span>Patient Name</span>
            <span>Indication</span>
            <span>Meeting Time</span>
          </div>
          <div className="cc-box">
            <span>Patient Name</span>
            <span>Indication</span>
            <span>Meeting Time</span>
          </div>
        </div>
      </div>
    );
  }
}
