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
    if (currentPatient) {
      return (
        <Modal className="custom-modal datepicker-modal" show={show} onHide={onHide}>
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
                  <div className="scroll-holder jcf--scrollable modal-body holder">
                    <Calendar
                      className="calendar custom-calendar"
                    />
                    <div className="current-date">
                      Today: {moment().format('dddd, MMMM DD, YYYY')}
                    </div>
                    <div className="text-center">
                      <div className="row">
                        <div className="col pull-left">
                          <label>*PATIENT</label>
                        </div>
                        <div className="col pull-right">
                          <label>{currentPatient.firstName}</label>
                          <label>{currentPatient.lastName}</label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col pull-left">
                          <label>*TIME</label>
                        </div>
                        <div className="col pull-right">
                          <div className="time-selects">
                            <Field
                              name="hours"
                              options={HOUR_OPTIONS}
                              component={ReactSelect}
                            />
                            <Field
                              name="minutes"
                              options={MINUTES_OPTIONS}
                              component={ReactSelect}
                            />
                            <Field
                              name="amPm"
                              options={AM_PM_OPTIONS}
                              component={ReactSelect}
                            />
                          </div>
                          <div className="reminder-container">
                            <Field
                              name="text-reminder"
                              component={Checkbox}
                              title="test"
                            />
                            <label> Text Reminder</label>
                          </div>
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
