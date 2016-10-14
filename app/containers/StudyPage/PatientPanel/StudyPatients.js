/**
 * Created by mike on 9/20/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import classNames from 'classnames';
import moment from 'moment-timezone';
import libPhoneNumber from 'google-libphonenumber';
import { createStructuredSelector } from 'reselect';
import * as Selector from '../selectors';
import { selectCurrentUser } from 'containers/App/selectors';

import Patient from './Patient';
import PatientDetailModal from '../PatientDetail/PatientDetailModal';
import { fetchPatientDetails, setCurrentPatientCategoryId, setCurrentPatientId } from '../actions';

const PNF = libPhoneNumber.PhoneNumberFormat;
const phoneUtil = libPhoneNumber.PhoneNumberUtil.getInstance();

class StudyPatients extends React.Component {
  static propTypes = {
    currentUser: React.PropTypes.object.isRequired,
    currentPatientId: React.PropTypes.number,
    fetchPatientDetails: React.PropTypes.func.isRequired,
    patientCategories: React.PropTypes.array.isRequired,
    setCurrentPatientCategoryId: React.PropTypes.func.isRequired,
    setCurrentPatientId: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      openPatientModal: false,
    };
    this.onPatientClick = this.onPatientClick.bind(this);
    this.renderPatientCategory = this.renderPatientCategory.bind(this);
    this.renderPatientTextMessageSummary = this.renderPatientTextMessageSummary.bind(this);
    this.formatPhone = this.formatPhone.bind(this);
  }

  onPatientClick(category, patient) {
    const { fetchPatientDetails, setCurrentPatientCategoryId, setCurrentPatientId } = this.props;
    const show = patient && (this.state.selectedPatientId !== patient.id);
    setCurrentPatientCategoryId(show ? category.id : false);
    setCurrentPatientId(show ? patient.id : false);
    fetchPatientDetails(patient.id);
    this.setState({
      openPatientModal: show,
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

  renderPatientCategory(category) {
    const { currentPatientId } = this.props;
    return (
      <li key={category.id}>
        <span className="opener">
          <strong className="number">{category.patients.length}</strong>
          <span className="text">{category.name}</span>
        </span>
        <div className="slide">
          <div className="slide-holder">
            <ul className="list-unstyled">
              {category.patients.map(patient => (
                <Patient formatPhone={this.formatPhone} category={category} currentPatientId={currentPatientId} patient={patient} />
              ))}
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
          <PatientDetailModal currentUser={currentUser} formatPhone={this.formatPhone} openPatientModal={this.state.openPatientModal} />
        </div>
        <div className="patients-form-closer" onClick={this.onPatientClick} />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
  currentPatientId: Selector.selectCurrentPatientId(),
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPatientDetails: (categoryId, patient) => dispatch(fetchPatientDetails(categoryId, patient)),
    setCurrentPatientId: (id) => dispatch(setCurrentPatientId(id)),
    setCurrentPatientCategoryId: (id) => dispatch(setCurrentPatientCategoryId(id)),
  };
}

StudyPatients = DragDropContext(HTML5Backend)(StudyPatients);
export default connect(mapStateToProps, mapDispatchToProps)(StudyPatients);