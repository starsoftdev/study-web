/* eslint-disable prefer-template, react/jsx-no-bind */

import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Modal } from 'react-bootstrap';
import moment from 'moment';

import { SchedulePatientModalType } from 'common/constants';

import ReactSelect from '../../../../components/Input/ReactSelect';
import DatePicker from '../../../../components/Input/DatePicker';
import Checkbox from '../../../../components/Input/Checkbox';
import CenteredModal from '../../../../components/CenteredModal';

import validator from './validator';

function getTimeComponents(strTime) {
  return {
    hour: (((moment(strTime).hour() + 11) % 12) + 1).toString(),
    minute: moment(strTime).minute().toString(),
    period: moment(strTime).hour() >= 12 ? 'PM' : 'AM',
  };
}

@reduxForm({form: 'editSchedule', validate: validator})
export default class EditScheduleModal extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleCloseModal: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    modalType: PropTypes.string,
    selectedCellInfo: PropTypes.object.isRequired,
    initialize: PropTypes.func.isRequired,
    hourOptions: PropTypes.array,
    minuteOptions: PropTypes.array,
    periodOptions: PropTypes.array,
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.modalType === SchedulePatientModalType.HIDDEN && nextProps.modalType === SchedulePatientModalType.UPDATE) {
      const initialValues = {
        ...getTimeComponents(nextProps.selectedCellInfo.data.time),
        textReminder: true,
      };

      nextProps.initialize(initialValues);
    }
  }

  render() {
    const {
      handleCloseModal,
      handleDelete,
      handleSubmit,
      submitting,
      modalType,
      selectedCellInfo,
      hourOptions,
      minuteOptions,
      periodOptions,
    } = this.props;

    if (modalType === SchedulePatientModalType.UPDATE) {
      return (
        <Modal
          dialogComponentClass={CenteredModal}
          show={modalType === SchedulePatientModalType.UPDATE}
          onHide={handleCloseModal}
          id="edit-schedule-modal"
        >
          <Modal.Header>
            <Modal.Title>EDIT SCHEDULE</Modal.Title>
            <a className="lightbox-close close" onClick={handleCloseModal}>
              <i className="icomoon-icon_close"/>
            </a>
          </Modal.Header>
          <Modal.Body>
            <form className="form-lightbox form-edit-schedule" onSubmit={handleSubmit}>
              <strong
                className="name"
              >{`${selectedCellInfo.data.patient.firstName} ${selectedCellInfo.data.patient.lastName}`}</strong>
              <span className="site-location">{selectedCellInfo.data.siteLocation}</span>
              <span className="protocol">{selectedCellInfo.data.protocolNumber}</span>
              <div className="field-row">
                <strong className="label">* When</strong>
                <div className="field append-calendar">
                  <Field
                    id="start-date"
                    name="date"
                    component={DatePicker}
                    className="form-control datepicker-input"
                    initialDate={moment(this.props.selectedCellInfo.data.time)}
                  />
                </div>
              </div>
              <div className="field-row">
                <strong className="label required"><label htmlFor="patient-time-edit">Time</label></strong>
                <div className="field">
                  <div className="col-holder row">
                    <div className="col pull-left hours">
                      <Field
                        id="patient-time-edit"
                        name="hour"
                        component={ReactSelect}
                        placeholder="Hours"
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
                        placeholder="Minutes"
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
                        placeholder="AM/PM"
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
                <label className="text-reminder-label" htmlFor="text-reminder">Text Reminder</label>
              </div>
              <div className="btn-block text-right">
                <input
                  type="button"
                  className="btn btn-gray-outline lightbox-opener"
                  disabled={submitting}
                  value={submitting ? 'deleting...' : 'delete'}
                  onClick={() => handleDelete(selectedCellInfo.data.id)}
                />
                <input
                  type="submit"
                  className="btn btn-default btn-update"
                  value={submitting ? 'updating...' : 'update'}
                />
              </div>
            </form>
          </Modal.Body>
        </Modal>
      );
    }
    return null;
  }
}
