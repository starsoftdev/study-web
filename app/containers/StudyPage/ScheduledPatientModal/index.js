import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';
import moment from 'moment-timezone';
import Modal from 'react-bootstrap/lib/Modal';
import { Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import { createStructuredSelector } from 'reselect';
import * as Selector from '../selectors';
import { getMomentFromDate } from '../../../utils/time';
import ReactSelect from '../../../components/Input/ReactSelect';
import CenteredModal from '../../../components/CenteredModal/index';
import Input from '../../../components/Input/index';
import Checkbox from '../../../components/Input/Checkbox';
import validator from './validator';
import { setScheduledFormInitialized } from '../actions';
import { selectCurrentUser, selectSites } from '../../App/selectors';
import { translate } from '../../../../common/utilities/localization';

const fieldName = 'ScheduledPatientModal';

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

function getTimeComponents(strTime, timezone) {
  const localTime = moment(strTime).tz(timezone);

  return {
    hour: (((localTime.hour() + 11) % 12) + 1).toString(),
    minute: localTime.minute().toString(),
    period: localTime.hour() >= 12 ? translate('common.constants.pm') : translate('common.constants.am'),
  };
}

@reduxForm({
  form: fieldName,
  validate: validator,
})
class ScheduledPatientModal extends React.Component {
  static propTypes = {
    onHide: React.PropTypes.func,
    show: React.PropTypes.bool.isRequired,
    currentPatient: React.PropTypes.object,
    sites: React.PropTypes.array,
    currentUser: React.PropTypes.object,
    handleSubmit: React.PropTypes.func.isRequired,
    handleDateChange: React.PropTypes.func.isRequired,
    submittingSchedule: React.PropTypes.object.isRequired,
    initialize: React.PropTypes.func.isRequired,
    scheduledFormInitialized: React.PropTypes.bool,
    setScheduledFormInitialized: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.navigateToday = this.navigateToday.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.state = {
      date: moment(),
    };
    this.timezone = null;
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    const { currentPatient, currentUser, sites } = nextProps;
    let initialValues = {};

    if (!(nextProps.scheduledFormInitialized) && nextProps.show && currentPatient &&
        currentPatient.appointments && currentPatient.appointments.length > 0) {
      const { time, textReminder } = currentPatient.appointments[0];
      const patientSite = _.find(sites, site => site.id === currentPatient.site_id);
      if (currentUser.roleForClient.isAdmin) {
        this.timezone = patientSite ? patientSite.timezone : currentUser.timezone;
      } else {
        this.timezone = patientSite ? patientSite.timezone : currentUser.roleForClient.site.timezone;
      }
      initialValues = {
        ...getTimeComponents(time, this.timezone),
        textReminder,
      };
      this.props.setScheduledFormInitialized(true);
      this.setState({
        date: moment.tz(currentPatient.appointments[0].time, this.timezone).startOf('date'),
      });
      nextProps.initialize(initialValues);
    }
  }

  navigateToday() {
    const today = new Date();

    this.calendar.focusToDate(today);
    this.setState({
      date: getMomentFromDate(today, this.timezone),
    });
    this.props.handleDateChange(getMomentFromDate(today, this.timezone));
  }

  handleSelect(date) {
    const chosenDate = getMomentFromDate(date, this.timezone);
    this.setState({ date: chosenDate });
    this.props.handleDateChange(chosenDate);
  }


  render() {
    const { onHide, currentPatient, show, handleSubmit, submittingSchedule } = this.props;

    if (currentPatient) {
      const calendarDate = this.state.date ? this.state.date.toDate() : this.state.date;

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
            <Modal.Title>{translate('client.component.scheduledPatientModal.title')}</Modal.Title>
            <a className="lightbox-close close" onClick={onHide} disabled={submittingSchedule.submitting}>
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
              {translate('client.component.scheduledPatientModal.today')} {moment().format(translate('client.component.scheduledPatientModal.todayDateMask'))}
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
                      className="reminder-container"
                    />
                    <label className="reminder-label">{translate('client.component.scheduledPatientModal.textReminder')}</label>
                  </div>
                </div>
                <input type="submit" className="btn btn-default pull-right" value={translate('client.component.scheduledPatientModal.submit')} disabled={submittingSchedule.submitting} />
              </div>
            </form>
          </Modal.Body>
        </Modal>
      );
    }
    return null;
  }
}

const hourOptions = numberSequenceCreator(1, 13);
const minuteOptions = numberSequenceCreator(0, 60);
const periodOptions = [
  { label: translate('common.constants.am'), value: 'AM' },
  { label: translate('common.constants.pm'), value: 'PM' },
];

const mapStateToProps = createStructuredSelector({
  currentPatient: Selector.selectCurrentPatient(),
  currentUser: selectCurrentUser(),
  sites: selectSites(),
  submittingSchedule: Selector.selectSubmittingSchedule(),
  scheduledFormInitialized: Selector.selectScheduledFormInitialized(),
});
const mapDispatchToProps = dispatch => ({
  setScheduledFormInitialized: (formInitialized) => dispatch(setScheduledFormInitialized(formInitialized)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ScheduledPatientModal);
