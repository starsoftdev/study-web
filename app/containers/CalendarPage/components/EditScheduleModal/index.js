/* eslint-disable prefer-template, react/jsx-no-bind */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm, change } from 'redux-form';
import { Link } from 'react-router';
import { Modal } from 'react-bootstrap';
import moment from 'moment-timezone';
import { Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css';

import { SchedulePatientModalType } from '../../../../common/constants';

import ReactSelect from '../../../../components/Input/ReactSelect';
import DatePickerDisplay from '../../../../components/Input/DatePickerDisplay';
import Checkbox from '../../../../components/Input/Checkbox';
import CenteredModal from '../../../../components/CenteredModal';
import { selectCurrentUser } from '../../../App/selectors';
import { translate } from '../../../../../common/utilities/localization';

import validator from './validator';
import { getMomentFromDate } from '../../../../utils/time';

function getTimeComponents(strTime, timezone) {
  const localTime = moment(strTime).tz(timezone);
  return {
    hour: (((localTime.hour() + 11) % 12) + 1).toString(),
    minute: localTime.minute().toString(),
    period: localTime.hour() >= 12 ? translate('common.constants.pm') : translate('common.constants.am'),
  };
}

const formName = 'editSchedule';

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
});

const mapDispatchToProps = (dispatch) => ({
  change: (name, value) => dispatch(change(formName, name, value)),
});

@reduxForm({
  form: formName,
  validate: validator,
})
@connect(mapStateToProps, mapDispatchToProps)
export default class EditScheduleModal extends Component {
  static propTypes = {
    change: PropTypes.func.isRequired,
    currentUser: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    modalType: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    selectedCellInfo: PropTypes.object.isRequired,
    initialize: PropTypes.func.isRequired,
    hourOptions: PropTypes.array,
    minuteOptions: PropTypes.array,
    periodOptions: PropTypes.array,
  }

  constructor(props) {
    super(props);

    this.handleDateSelect = this.handleDateSelect.bind(this);
    this.navigateToday = this.navigateToday.bind(this);
    this.handleDatePickerClose = this.handleDatePickerClose.bind(this);
    this.state = {
      showDatePicker: false,
      showEditModal: false,
      initDate: moment(),
    };
    this.timezone = null;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.modalType === SchedulePatientModalType.HIDDEN && nextProps.modalType === SchedulePatientModalType.UPDATE) {
      if (nextProps.currentUser.roleForClient.isAdmin) {
        this.timezone = nextProps.selectedCellInfo.timezone || nextProps.currentUser.timezone;
      } else {
        this.timezone = nextProps.selectedCellInfo.timezone || nextProps.currentUser.roleForClient.site.timezone;
      }

      const initialValues = {
        date: moment(nextProps.selectedCellInfo.data.time).tz(this.timezone),
        ...getTimeComponents(nextProps.selectedCellInfo.data.utcTime, this.timezone),
        textReminder: nextProps.selectedCellInfo.data.textReminder,
        patient: {
          value: nextProps.selectedCellInfo.data.patient_id,
        },
      };

      nextProps.initialize(initialValues);
      this.setState({
        showEditModal: true,
        initDate: moment(nextProps.selectedCellInfo.data.time),
      });
    }
  }

  handleDateSelect(date) {
    const chosenDate = getMomentFromDate(date, this.timezone);
    this.setState({
      initDate: chosenDate,
    });
    const { change } = this.props;
    change('date', chosenDate);
    this.handleDatePickerClose(false);
  }

  navigateToday() {
    const today = new Date();

    this.calendar.focusToDate(today);

    if (moment(this.state.minDate).isSameOrBefore(getMomentFromDate(today), 'day')) {
      this.setState({
        initDate: getMomentFromDate(today, this.timezone),
      });
      const { change } = this.props;
      change('date', getMomentFromDate(today, this.timezone));
      this.handleDatePickerClose(false);
    }
  }

  handleDatePickerClose(flag) {
    this.setState({
      showDatePicker: flag,
      showEditModal: !flag,
    });
  }

  render() {
    const {
      handleDelete,
      handleSubmit,
      modalType,
      onClose,
      submitting,
      selectedCellInfo,
      hourOptions,
      minuteOptions,
      periodOptions,
    } = this.props;

    if (modalType === SchedulePatientModalType.UPDATE) {
      const calendarDate = this.state.initDate ? this.state.initDate.toDate() : this.state.initDate;
      const currentDate = moment();
      return (
        <div>
          <Modal
            dialogComponentClass={CenteredModal}
            show={this.state.showEditModal}
            onHide={onClose}
            id="edit-schedule-modal"
          >
            <Modal.Header>
              <Modal.Title>{translate('portals.component.calendarPage.editScheduleModal.title')}</Modal.Title>
              <a className="lightbox-close close" onClick={onClose}>
                <i className="icomoon-icon_close" />
              </a>
            </Modal.Header>
            <Modal.Body>
              <form className="form-lightbox form-edit-schedule" onSubmit={handleSubmit}>
                <strong
                  className="name"
                >{`${selectedCellInfo.data.patient.firstName} ${selectedCellInfo.data.patient.lastName || ''}`}</strong>
                <span className="site-location">{selectedCellInfo.data.sitelocation}</span>
                <span className="protocol"><Link to={`/app/study/${selectedCellInfo.data.studyId}`}>{selectedCellInfo.data.protocolNumber}</Link></span>
                <div className="field-row">
                  <strong className="label">{translate('portals.component.calendarPage.editScheduleModal.whenLabel')}</strong>
                  <div className="field" onClick={() => { this.handleDatePickerClose(true); }}>
                    <Field
                      name="date"
                      component={DatePickerDisplay}
                      className="form-control datepicker-input"
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label required">
                    <label htmlFor="patient-time-edit">
                      {translate('portals.component.calendarPage.editScheduleModal.timeLabel')} {`(${moment.tz(this.state.initDate, this.timezone).format(translate('portals.component.calendarPage.editScheduleModal.timezoneMask'))})`}
                    </label>
                  </strong>
                  <div className="field">
                    <div className="col-holder row">
                      <div className="col pull-left hours">
                        <Field
                          id="patient-time-edit"
                          name="hour"
                          component={ReactSelect}
                          placeholder={translate('portals.component.calendarPage.editScheduleModal.hoursPlaceholder')}
                          options={hourOptions}
                          className="visible-first-del min-height"
                          disabled={submitting}
                        />
                      </div>
                      <div className="col pull-left minutes">
                        <Field
                          id="minutes2"
                          name="minute"
                          component={ReactSelect}
                          placeholder={translate('portals.component.calendarPage.editScheduleModal.minutesPlaceholder')}
                          options={minuteOptions}
                          className="visible-first-del min-height"
                          disabled={submitting}
                        />
                      </div>
                      <div className="col pull-left time-mode">
                        <Field
                          id="time-period2"
                          name="period"
                          component={ReactSelect}
                          placeholder={translate('portals.component.calendarPage.editScheduleModal.amPlaceholder')}
                          options={periodOptions}
                          className="visible-first"
                          disabled={submitting}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">&nbsp;</strong>
                  <Field
                    id="text-reminder"
                    name="textReminder"
                    component={Checkbox}
                    type="checkbox"
                  />
                  <label className="text-reminder-label" htmlFor="text-reminder">{translate('portals.component.calendarPage.editScheduleModal.textReminderLabel')}</label>
                </div>
                <div className="btn-block text-right">
                  <input
                    type="button"
                    className="btn btn-gray-outline lightbox-opener"
                    disabled={submitting}
                    value={submitting ? translate('portals.component.calendarPage.editScheduleModal.deletingBtn') : translate('portals.component.calendarPage.editScheduleModal.deleteBtn')}
                    onClick={() => handleDelete(selectedCellInfo.data.id)}
                  />
                  <input
                    type="submit"
                    className="btn btn-default btn-update"
                    value={submitting ? translate('portals.component.calendarPage.editScheduleModal.updatingBtn') : translate('portals.component.calendarPage.editScheduleModal.updateBtn')}
                  />
                </div>
              </form>
            </Modal.Body>
          </Modal>
          <Modal
            className="datepicker-modal"
            dialogComponentClass={CenteredModal}
            show={this.state.showDatePicker}
            onHide={() => {
              this.handleDatePickerClose(false);
            }}
            backdrop
            keyboard
          >
            <Modal.Header>
              <Modal.Title>{translate('portals.component.calendarPage.editScheduleModal.chooseDateModalTitle')}</Modal.Title>
              <a className="lightbox-close close" onClick={() => { this.handleDatePickerClose(false); }}>
                <i className="icomoon-icon_close" />
              </a>
            </Modal.Header>
            <Modal.Body>
              <Calendar
                date={calendarDate}
                onChange={this.handleDateSelect}
                className="calendar custom-calendar"
                ref={(calendar) => { this.calendar = calendar; }}
                showMonthAndYearPickers={false}
              />
              <div className="current-date" onClick={this.navigateToday}>
                {translate('portals.component.calendarPage.editScheduleModal.today')} {currentDate.format(translate('portals.component.calendarPage.editScheduleModal.displayMask'))}
              </div>
            </Modal.Body>
          </Modal>
        </div>
      );
    }
    return null;
  }
}
