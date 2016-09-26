/* eslint-disable prefer-template, react/jsx-no-bind */

import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import Select from 'react-select';
import { Modal } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import _ from 'lodash';
import moment from 'moment';

import { SchedulePatientModalType } from 'common/constants';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-select/dist/react-select.min.css';
import './styles.less';

export const fields = ['siteLocation', 'protocol', 'indication', 'patient', 'date', 'hour', 'minute', 'period'];

function numberSequenceCreator(start, end) {
  return _.range(start, end).map(n => {
    if (n < 10) {
      return {
        label: '0' + n,
        value: n,
      };
    }
    return {
      label: n.toString(),
      value: n,
    };
  });
}
const hourOptions = numberSequenceCreator(1, 13);
const minuteOptions = numberSequenceCreator(0, 60);
const periodOptions = [
  { label: 'AM', value: 'AM' },
  { label: 'PM', value: 'PM' },
];

class SchedulePatientModal extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    sites: PropTypes.array.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleCloseModal: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    modalType: PropTypes.string.isRequired,
    selectedCellInfo: PropTypes.object.isRequired,
    patientsByStudy: PropTypes.object.isRequired,
    fetchPatientsByStudy: PropTypes.func.isRequired,
    fetchingSites: PropTypes.bool,
    fetchingPatientsByStudy: PropTypes.bool.isRequired,
  }

  state = {
    optionStep: 0,
    siteLocation: null,
    protocol: null,
    patient: null,
    protocolOptions: [],
    patientOptions: [],
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedCellInfo.data) {
      this.setState({
        selectedUpdateDate: moment(nextProps.selectedCellInfo.data.time),
      });
    }
    if (nextProps.modalType === SchedulePatientModalType.HIDDEN) {
      this.setState({
        optionStep: 0,
      });
    }

    const patientOptions = _.flatten(this.props.patientsByStudy.data.map(pBS => pBS.patients.map(p => ({
      label: p.firstName + ' ' + p.lastName,
      value: p.id,
    }))));
    this.setState({
      patientOptions,
    });
  }

  handleUpdateDateChange(date) {
    this.setState({
      selectedUpdateDate: date,
    });
  }

  handleSiteLocationChoose(siteLocationOption) {
    if (siteLocationOption) {
      const selectedSite = this.props.sites.filter(s => s.id === siteLocationOption.siteId)[0];
      if (selectedSite === null) {
        throw new Error('SiteLocation options are not properly populated.');
      }
      const protocolOptions = selectedSite.studies.map(study => ({
        label: study.protocolNumber,
        value: study.protocolNumber,
        indication: study.indication,
        studyId: study.id,
      }));
      this.setState({
        optionStep: 1,
        protocolOptions,
      });
      this.props.fields.protocol.onChange(null);
    } else {
      this.setState({
        optionStep: 0,
        protocolOptions: [],
        patientOptions: [],
      });
    }

    this.props.fields.siteLocation.onChange(siteLocationOption);
  }

  handleProtocolChoose(protocolOption) {
    if (protocolOption) {
      this.props.fetchPatientsByStudy(protocolOption.studyId, {
        offset: 0,
        limit: -1,
        category: '*',
      });
      this.setState({
        optionStep: 2,
      });
      this.props.fields.indication.onChange(protocolOption.indication);
      this.props.fields.patient.onChange(null);
    } else {
      this.setState({
        optionStep: 1,
        patientOptions: [],
      });
    }

    this.props.fields.protocol.onChange(protocolOption);
  }

  handlePatientChoose(patientOption) {
    if (patientOption) {
      this.setState({
        optionStep: 3,
      });
    } else {
      this.setState({
        optionStep: 2,
      });
    }

    this.props.fields.patient.onChange(patientOption);
  }

  render() {
    const {
      fields: { siteLocation, protocol, indication, patient, date, hour, minute, period },
      sites,
      handleCloseModal,
      handleDelete,
      handleSubmit,
      submitting,
      modalType,
      selectedCellInfo,
    } = this.props;

    const { optionStep, protocolOptions, patientOptions } = this.state;

    const siteLocationOptions = sites.map(s => ({
      label: s.name,
      value: s.name,
      siteId: s.id,
    }));

    return (
      <Modal show={modalType !== SchedulePatientModalType.HIDDEN} onHide={handleCloseModal}>
        {modalType === SchedulePatientModalType.CREATE &&
          <div id="add-scedule" className="lightbox lightbox-active fixed-popup">
            <div className="lightbox-holder">
              <div className="lightbox-frame">
                <div className="lightbox-content">
                  <div className="head">
                    <strong className="title">SCHEDULE PATIENT</strong>
                    <a className="lightbox-close close" href="#" onClick={handleCloseModal}><i className="icon-icon_close"></i></a>
                  </div>
                  <div className="scroll-holder jcf--scrollable">
                    <form action="#" className="form-lightbox form-add-schedule show-on-select" data-validation-false="no-action" onSubmit={handleSubmit}>
                      <div className="field-row">
                        <strong className="label">* When</strong>
                        <div className="field">
                          <input type="text" className="form-control add-date scheduleTime" readOnly value={selectedCellInfo.selectedDate && moment(selectedCellInfo.selectedDate).format('MM/DD/YY')} />
                        </div>
                      </div>
                      <div className="field-row">
                        <strong className="label required"><label htmlFor="popup-site-location">Site Location</label></strong>
                        <div className="field site-location">
                          <Select
                            {...siteLocation}
                            id="popup-site-location"
                            className="data-search"
                            options={siteLocationOptions}
                            placeholder="--Select Site Location--"
                            disabled={submitting || this.props.fetchingSites}
                            onBlur={() => { siteLocation.onBlur(siteLocation); }}
                            onChange={this.handleSiteLocationChoose.bind(this)}
                          />
                        </div>
                      </div>

                      {optionStep >= 1 &&
                        <div className="field-row">
                          <strong className="label required"><label htmlFor="popup-protocol">protocol</label></strong>
                          <div className="field protocol">
                            <Select
                              {...protocol}
                              className="data-search"
                              id="popup-protocol"
                              options={protocolOptions}
                              placeholder="--Select Protocol--"
                              disabled={submitting}
                              onBlur={() => { protocol.onBlur(protocol); }}
                              onChange={this.handleProtocolChoose.bind(this)}
                            />
                          </div>
                        </div>
                      }
                      {optionStep >= 2 &&
                        <div className="field-row patient-name">
                          <strong className="label required"><label htmlFor="patient">Patient</label></strong>
                          <div className="field">
                            <Select
                              {...patient}
                              className="data-search"
                              id="patient"
                              options={patientOptions}
                              placeholder="--Select Patient--"
                              disabled={submitting || this.props.fetchingPatientsByStudy}
                              onBlur={() => { patient.onBlur(patient); }}
                              onChange={this.handlePatientChoose.bind(this)}
                            />
                          </div>
                          <input {...indication} style={{ display: 'none' }} />
                        </div>
                      }
                      {optionStep === 3 &&
                        <div className="field-row">
                          <strong className="label required"><label htmlFor="patient-time">Time</label></strong>
                          <div className="field">
                            <div className="col-holder row">
                              <div className="col pull-left hours">
                                <Select
                                  {...hour}
                                  id="patient-time"
                                  className="visible-first-del min-height"
                                  options={hourOptions}
                                  placeholder="--Hours--"
                                  disabled={submitting}
                                  onBlur={() => { hour.onBlur(hour); }}
                                />
                              </div>
                              <div className="col pull-left minutes">
                                <Select
                                  {...minute}
                                  id="minutes"
                                  className="visible-first-del min-height"
                                  options={minuteOptions}
                                  placeholder="--Minutes--"
                                  disabled={submitting}
                                  onBlur={() => { minute.onBlur(minute); }}
                                />
                              </div>
                              <div className="col pull-left time-mode">
                                <Select
                                  {...period}
                                  id="time-period"
                                  className="visible-first"
                                  options={periodOptions}
                                  disabled={submitting}
                                  onBlur={() => { period.onBlur(period); }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      }
                      <div className="text-right">
                        <input type="reset" className="btn btn-gray-outline hidden" value="reset" />
                        <input type="submit" className="btn btn-default" value="Submit" disabled={submitting} />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }

        {modalType === SchedulePatientModalType.UPDATE &&
          <div id="edit-scedule" className="lightbox lightbox-active fixed-popup">
            <div className="lightbox-holder">
              <div className="lightbox-frame">
                <div className="lightbox-content">
                  <div className="head">
                    <strong className="title">EDIT SCHEDULE</strong>
                    <a className="close lightbox-close" href="#" onClick={handleCloseModal}><i className="icon-icon_close"></i></a>
                  </div>
                  <div className="scroll-holder">
                    <form action="#" className="form-lightbox form-edit-schedule" onSubmit={handleSubmit}>
                      <strong className="name">{`${selectedCellInfo.data.patient.firstName} ${selectedCellInfo.data.patient.lastName}`}</strong>
                      <span className="site-location">{selectedCellInfo.data.siteLocation}</span>
                      <span className="protocol">{selectedCellInfo.data.protocolNumber}</span>
                      <div className="field-row">
                        <strong className="label">* When</strong>
                        <div className="field append-calendar">
                          <DatePicker {...date} id="start-date" className="form-control datepicker-input" selected={this.state.selectedUpdateDate} onChange={this.handleUpdateDateChange.bind(this)} />
                          {/*
                            <input data-placeholder="mm/dd/yy" id="start-date" class="form-control datepicker-input" type="text" data-datepicker="" data-title="Choose Date" data-href="www.google.com" data-required="true">
                          */}
                        </div>
                      </div>
                      <div className="field-row">
                        <strong className="label required"><label htmlFor="patient-time-edit">Time</label></strong>
                        <div className="field">
                          <div className="col-holder row">
                            <div className="col pull-left hours">
                              <Select
                                {...hour}
                                id="patient-time-edit"
                                className="visible-first-del min-height"
                                options={hourOptions}
                                placeholder="--Hours--"
                                disabled={submitting}
                                onBlur={() => { hour.onBlur(hour); }}
                              />
                            </div>
                            <div className="col pull-left minutes">
                              <Select
                                {...minute}
                                id="minutes2"
                                className="visible-first-del min-height"
                                options={minuteOptions}
                                placeholder="--Minutes--"
                                disabled={submitting}
                                onBlur={() => { minute.onBlur(minute); }}
                              />
                            </div>
                            <div className="col pull-left time-mode">
                              <Select
                                {...period}
                                id="time-period2"
                                className="visible-first"
                                options={periodOptions}
                                disabled={submitting}
                                onBlur={() => { period.onBlur(period); }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="btn-block text-right">
                        <a href="#popup-remover" className="btn btn-gray-outline lightbox-opener" disabled={submitting} onClick={() => handleDelete(selectedCellInfo.data.id)}>
                          {submitting ?
                            'deleting...' : 'delete'
                          }
                        </a>
                        <a href="#" className="btn btn-default btn-update">
                          {submitting ?
                            'updating...' : 'update'
                          }
                        </a>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </Modal>
    );
  }
}

export default reduxForm({
  form: 'schedulePatient',
  fields,
})(SchedulePatientModal);
