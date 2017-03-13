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
const fieldName = 'ScheduledPatientModal';

@reduxForm({
  form: fieldName,
})

class ScheduledPatientModal extends React.Component {
  static propTypes = {
    onHide: React.PropTypes.func,
    show: React.PropTypes.bool.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
  }

  changeDate(e) {
    this.setState({ date: e });
  }
  render() {
    const { onHide, currentPatient, show, ...props } = this.props;
    console.log(currentPatient);
    if (currentPatient) {
      return (
        <Modal className="custom-modal datepicker-modal scheduled-patient-modal" show={show} onHide={onHide} dialogComponentClass={CenteredModal}>
          <div className="datepicker-box datepicker-active" style={{ display: 'block' }}>
            <div className="datepicker-holder">
              <div className="datepicker-frame">
                <div className="datepicker-inner lightbox-content">
                  <div className="modal-header head">
                    <strong>SCHEDULE PATIENT</strong>
                    <a className="lightbox-close close" onClick={() => { this.toggleModal(false); }}>
                      <i className="icomoon-icon_close"></i>
                    </a>
                  </div>
                  <div className="scroll-holder jcf--scrollable modal-body holder form-lightbox lightbox-card">
                    <Calendar
                      className="calendar custom-calendar"
                    />
                    <div className="current-date">
                      Today: {moment().format('dddd, MMMM DD, YYYY')}
                    </div>
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
                                placeholder="AM"
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
                            name="text-reminder"
                            component={Checkbox}
                            title="test"
                            className="reminder-container"
                          />
                          <label className="reminder-label"> Text Reminder</label>
                        </div>
                      </div>
                      <Button className="pull-right">Submit</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <a href="#" className="datepicker-overlay"></a>
          </div>
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
