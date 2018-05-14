/* eslint-disable prefer-template, react/jsx-no-bind */

import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm, change } from 'redux-form';
import { Link } from 'react-router';
import { Modal } from 'react-bootstrap';
import moment from 'moment-timezone';
import { Calendar } from 'react-date-range';

import { SchedulePatientModalType } from '../../../../common/constants';

import ReactSelect from '../../../../components/Input/ReactSelect';
import DatePickerDisplay from '../../../../components/Input/DatePickerDisplay';
import Checkbox from '../../../../components/Input/Checkbox';
import CenteredModal from '../../../../components/CenteredModal';
import { selectCurrentUser } from '../../../App/selectors';
import { translate } from '../../../../../common/utilities/localization';

import validator from './validator';

function getTimeComponents(strTime, timezone) {
  const localTime = moment(strTime).tz(timezone);

  return {
    hour: (((localTime.hour() + 11) % 12) + 1).toString(),
    minute: localTime.minute().toString(),
    period: localTime.hour() >= 12 ? 'PM' : 'AM',
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
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.modalType === SchedulePatientModalType.HIDDEN && nextProps.modalType === SchedulePatientModalType.UPDATE) {
      let timezone;
      if (nextProps.currentUser.roleForClient.isAdmin) {
        timezone = nextProps.selectedCellInfo.timezone || nextProps.currentUser.timezone;
      } else {
        timezone = nextProps.selectedCellInfo.timezone || nextProps.currentUser.roleForClient.site.timezone;
      }

      const initialValues = {
        date: moment(nextProps.selectedCellInfo.data.time).tz(timezone),
        ...getTimeComponents(nextProps.selectedCellInfo.data.time, timezone),
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

  handleDateSelect(momentDate) {
    this.setState({
      initDate: momentDate,
    });
    const { change } = this.props;
    change('date', momentDate);
    this.handleDatePickerClose(false);
  }

  navigateToday() {
    const today = moment();
    const todayYear = today.year();
    const todayMonth = today.month();
    const calendarYear = this.calendar.getShownDate().year();
    const calendarMonth = this.calendar.getShownDate().month();
    const monthDiff = ((todayYear - calendarYear) * 12) + (todayMonth - calendarMonth);

    this.calendar.changeMonth(monthDiff, { preventDefault: _.noop });

    if (moment(this.state.minDate).isSameOrBefore(today, 'day')) {
      this.setState({
        initDate: today,
      });
      const { change } = this.props;
      change('date', today);
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
      currentUser,
    } = this.props;
    let timezone;
    if (currentUser.roleForClient.isAdmin) {
      timezone = selectedCellInfo.timezone || currentUser.timezone;
    } else {
      timezone = selectedCellInfo.timezone || currentUser.roleForClient.site.timezone;
    }

    if (modalType === SchedulePatientModalType.UPDATE) {
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
                      {translate('portals.component.calendarPage.editScheduleModal.timeLabel')} {`(${moment.tz(this.state.initDate, timezone).format(translate('portals.component.calendarPage.editScheduleModal.timezoneMask'))})`}
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
                date={this.state.initDate}
                onChange={this.handleDateSelect}
                className="calendar custom-calendar"
                ref={(calendar) => { this.calendar = calendar; }}
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
