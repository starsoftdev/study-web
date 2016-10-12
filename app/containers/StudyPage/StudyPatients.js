/**
 * Created by mike on 9/20/16.
 */

import React from 'react';
import { connect } from 'react-redux';

import classNames from 'classnames';
import moment from 'moment-timezone';
import libPhoneNumber from 'google-libphonenumber';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from 'containers/App/selectors';
import PatientDetailModal from './PatientDetailModal';
import { fetchPatientDetails } from './actions';

const PNF = libPhoneNumber.PhoneNumberFormat;
const phoneUtil = libPhoneNumber.PhoneNumberUtil.getInstance();

class StudyPatients extends React.Component {
  static propTypes = {
    patientCategories: React.PropTypes.array.isRequired,
    currentUser: React.PropTypes.object.isRequired,
    fetchPatientDetails: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      openPatientModal: false,
      selectedPatientCategory: null,
      selectedPatient: null,
    };
    this.onPatientClick = this.onPatientClick.bind(this);
    this.renderPatient = this.renderPatient.bind(this);
    this.renderPatientCategory = this.renderPatientCategory.bind(this);
    this.renderPatientTextMessageSummary = this.renderPatientTextMessageSummary.bind(this);
    this.formatPhone = this.formatPhone.bind(this);
  }

  onPatientClick(category, patient) {
    const { fetchPatientDetails } = this.props;
    const show = patient && (!this.state.selectedPatient || this.state.selectedPatient.id !== patient.id);
    fetchPatientDetails(category.id, patient);
    this.setState({
      openPatientModal: show,
      selectedPatientCategory: show ? category : false,
      selectedPatient: show ? patient : false,
    });
  }

  formatPhone(phone) {
    let patientPhone
    const phoneNumber = phoneUtil.parse(phone, '');
    const countryCode = phoneNumber.getCountryCode();
    if (countryCode === 1) {
      patientPhone = phoneUtil.format(phoneNumber, PNF.NATIONAL);
    } else {
      patientPhone = phoneUtil.format(phoneNumber, PNF.INTERNATIONAL);
    }
    return patientPhone;
  }

  renderPatient(category, patient) {
    const patientPhone = this.formatPhone(patient.phone);
    return (
      <li key={patient.id} className={classNames({"patient-selected": this.state.selectedPatient && patient.id === this.state.selectedPatient.id})} onClick={() => {
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

  renderPatientCategory(category) {
    return (
      <li key={category.id}>
        <span className="opener">
          <strong className="number">{category.patients.length}</strong>
          <span className="text">{category.name}</span>
        </span>
        <div className="slide">
          <div className="slide-holder">
            <ul className="list-unstyled">
              {category.patients.map(patient => {
                return this.renderPatient(category, patient);
              })}
            </ul>
          </div>
        </div>
      </li>
    );
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
    } else {
      return null;
    }
  }

  render() {
    const { currentUser, patientCategories } = this.props;
    return (
      <div className="clearfix patients-list-area-holder">
        <div className={classNames("patients-list-area", {"form-active": this.state.openPatientModal})}>
          <nav className="nav-status">
            <ul className="list-inline">
              {patientCategories.map(patientCategory => {
                return this.renderPatientCategory(patientCategory);
              })}
            </ul>
          </nav>
          <PatientDetailModal currentUser={currentUser} formatPhone={this.formatPhone} openPatientModal={this.state.openPatientModal} selectedPatient={this.state.selectedPatient} selectedPatientCategory={this.state.selectedPatientCategory} />
        </div>
        <div className="patients-form-closer" onClick={this.onPatientClick} />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchPatientDetails: (categoryId, patient) => dispatch(fetchPatientDetails(categoryId, patient)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StudyPatients);