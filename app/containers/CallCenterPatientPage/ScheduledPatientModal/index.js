import _ from 'lodash';
import moment from 'moment-timezone';
import React, { Component } from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import { Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import { Field, reduxForm } from 'redux-form';

import { translate } from '../../../../common/utilities/localization';
import { getMomentFromDate } from '../../../utils/time';

import CenteredModal from '../../../components/CenteredModal';
import Input from '../../../components/Input';
import ReactSelect from '../../../components/Input/ReactSelect';
import Checkbox from '../../../components/Input/Checkbox';

import validator from './validator';

const fieldName = 'CallCenterScheduledPatientModal';

@reduxForm({
  form: fieldName,
  validate: validator,
})
class ScheduledPatientModal extends Component {
  static propTypes = {
    onHide: React.PropTypes.func,
    show: React.PropTypes.bool.isRequired,
    currentPatient: React.PropTypes.object,
    currentUser: React.PropTypes.object,
    handleSubmit: React.PropTypes.func.isRequired,
    handleDateChange: React.PropTypes.func.isRequired,
    submittingSchedule: React.PropTypes.bool,
  };

  static defaultProps = {
    submittingSchedule: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      date: moment(),
    };
    this.timezone = props.currentUser.timezone;
  }

  handleSelect = (date) => {
    const chosenDate = getMomentFromDate(date, this.timezone);
    this.setState({ date: chosenDate });
    this.props.handleDateChange(chosenDate);
  }

  navigateToday = () => {
    const today = new Date();

    this.calendar.focusToDate(today);
    this.setState({
      date: getMomentFromDate(today, this.timezone),
    });
    this.props.handleDateChange(getMomentFromDate(today, this.timezone));
  }

  render() {
    const { show, onHide, submittingSchedule, handleSubmit, currentPatient } = this.props;
    const calendarDate = this.state.date ? this.state.date.toDate() : this.state.date;
    const reminderDisabled = false;

    if (!currentPatient) return null;

    return (
      <Modal
        className="datepicker-modal scheduled-patient-modal"
        show={show}
        onHide={onHide}
        dialogComponentClass={CenteredModal}
        backdrop
        keyboard
      >
        <Modal.Header>
          <Modal.Title>{translate('container.page.callCenterPatient.modal.scheduledPatientModal.title')}</Modal.Title>
          <a className="lightbox-close close" onClick={onHide} disabled={submittingSchedule}>
            <i className="icomoon-icon_close" />
          </a>
        </Modal.Header>
        <Modal.Body className="lightbox-card form-lightbox">
          <Calendar
            className="calendar custom-calendar"
            onChange={this.handleSelect}
            showMonthAndYearPickers={false}
            date={calendarDate}
            ref={(calendar) => { this.calendar = calendar; }}
          />
          <div className="current-date" onClick={this.navigateToday}>
            {translate('client.component.scheduledPatientModal.today')} {moment().format(translate('container.page.callCenterPatient.modal.scheduledPatientModal.todayDateMask'))}
          </div>
          <form className="clearfix schedule-form" onSubmit={handleSubmit}>
            <div className="text-center">
              <div className="field-row patient-name-field-row">
                <strong className="label required">
                  <label>{translate('client.component.scheduledPatientModal.labelPatient')}</label>
                </strong>
                <div className="field">
                  <div className="row">
                    <div className="col pull-left">
                      <Field
                        isDisabled
                        name="firstName"
                        placeholder={currentPatient.firstName}
                        component={Input}
                      />
                    </div>
                    <div className="col pull-left">
                      <Field
                        isDisabled
                        name="lastName"
                        placeholder={currentPatient.lastName}
                        component={Input}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="field-row time-field-row">
                <strong className="label required">
                  <label>{translate('client.component.scheduledPatientModal.time')} {`(${moment.tz(this.timezone).format('z')})`}</label>
                </strong>
                <div className="field time-field">
                  <div className="col-holder row">
                    <div className="col-small pull-left hours">
                      <Field
                        name="hour"
                        placeholder={translate('client.component.scheduledPatientModal.placeholderHours')}
                        options={hourOptions}
                        component={ReactSelect}
                      />
                    </div>
                    <div className="col-small pull-left minutes">
                      <Field
                        name="minute"
                        placeholder={translate('client.component.scheduledPatientModal.placeholderMinutes')}
                        options={minuteOptions}
                        component={ReactSelect}
                      />
                    </div>
                    <div className="col-small pull-left time-mode">
                      <Field
                        name="period"
                        placeholder={translate('client.component.scheduledPatientModal.placeholderAmPm')}
                        options={periodOptions}
                        component={ReactSelect}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="field-row">
                <strong className="label">&nbsp;</strong>
                <div className="field reminder-field">
                  <Field
                    name="textReminder"
                    type="checkbox"
                    component={Checkbox}
                    disabled={reminderDisabled}
                    className="reminder-container"
                  />
                  <label className="reminder-label">{translate('client.component.scheduledPatientModal.textReminder')}</label>
                </div>
              </div>
              <input type="submit" className="btn btn-default pull-right" value={translate('client.component.scheduledPatientModal.submit')} disabled={submittingSchedule} />
            </div>
          </form>
        </Modal.Body>
      </Modal>
    );
  }
}

function numberSequenceCreator(start, end) {
  return _.range(start, end).map(n => {
    if (n < 10) {
      return {
        label: `0${n}`,
        value: n.toString(),
      };
    }
    return {
      label: n.toString(),
      value: n.toString(),
    };
  });
}

const hourOptions = numberSequenceCreator(1, 13);
const minuteOptions = numberSequenceCreator(0, 60);
const periodOptions = [
  { label: translate('common.constants.am'), value: 'AM' },
  { label: translate('common.constants.pm'), value: 'PM' },
];

export default ScheduledPatientModal;
