import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import moment from 'moment-timezone';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import { Calendar } from 'react-date-range';
import { createStructuredSelector } from 'reselect';
import * as Selector from '../selectors';
import ReactSelect from '../../../components/Input/ReactSelect';
import { HOUR_OPTIONS, MINUTES_OPTIONS, AM_PM_OPTIONS } from '../../../common/constants/index';
import CenteredModal from '../../../components/CenteredModal/index';
import Input from '../../../components/Input/index';
import Checkbox from '../../../components/Input/Checkbox';
import validator from './validator';
const fieldName = 'ScheduledPatientModal';

@reduxForm({
  form: fieldName,
  validate: validator,
})

class ScheduledPatientModal extends React.Component {
  static propTypes = {
    onHide: React.PropTypes.func,
    show: React.PropTypes.bool.isRequired,
    currentPatient: React.PropTypes.object,
    handleSubmit: React.PropTypes.func.isRequired,
    handleDateChange: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
    const { onHide, currentPatient, show, handleSubmit, handleDateChange } = this.props;
    if (currentPatient) {
      return (
        <Modal className="datepicker-modal scheduled-patient-modal" show={show} onHide={onHide} dialogComponentClass={CenteredModal}>
          <Modal.Header>
            <Modal.Title>SCHEDULE PATIENT</Modal.Title>
            <a className="lightbox-close close" onClick={onHide}>
              <i className="icomoon-icon_close" />
            </a>
          </Modal.Header>
          <Modal.Body className="lightbox-card form-lightbox">
            <Calendar
              className="calendar custom-calendar"
              onChange={handleDateChange}
            />
            <div className="current-date">
              Today: {moment().format('dddd, MMMM DD, YYYY')}
            </div>
            <form onSubmit={handleSubmit}>
              <div className="text-center">
                <div className="field-row patient-name-field-row">
                  <strong className="label required">
                    <label>PATIENT</label>
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
                    <label>TIME</label>
                  </strong>
                  <div className="field time-field">
                    <div className="col-holder row">
                      <div className="col-small pull-left hours">
                        <Field
                          name="hours"
                          placeholder="Hours"
                          options={HOUR_OPTIONS}
                          component={ReactSelect}
                        />
                      </div>
                      <div className="col-small pull-left minutes">
                        <Field
                          name="minutes"
                          placeholder="Minutes"
                          options={MINUTES_OPTIONS}
                          component={ReactSelect}
                        />
                      </div>
                      <div className="col-small pull-left time-mode">
                        <Field
                          name="amPm"
                          placeholder="AM/PM"
                          options={AM_PM_OPTIONS}
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
                      title="test"
                      className={'reminder-container'}
                    />
                    <label className="reminder-label"> Text Reminder</label>
                  </div>
                </div>
                <input type="submit" className="btn btn-default pull-right" value="Submit" />
              </div>
            </form>
          </Modal.Body>
        </Modal>
      );
    }
    return null;
  }
}
const mapStateToProps = createStructuredSelector({
  currentPatient: Selector.selectCurrentPatient(),
});
// const mapDispatchToProps = dispatch => ({
//
// });
export default connect(mapStateToProps)(ScheduledPatientModal);
