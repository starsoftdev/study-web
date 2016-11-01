/* eslint-disable prefer-template, react/jsx-no-bind */

import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Modal } from 'react-bootstrap';
import _ from 'lodash';
import moment from 'moment';

import { SchedulePatientModalType } from 'common/constants';

import ReactSelect from 'components/Input/ReactSelect';
import DatePicker from 'components/Input/DatePicker';

import './styles.less';

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

@reduxForm({ form: 'schedulePatient' })
export default class SchedulePatientModal extends Component {
  static propTypes = {
    sites: PropTypes.array.isRequired,
    indications: PropTypes.array.isRequired,
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
    if (nextProps.modalType === SchedulePatientModalType.HIDDEN) {
      this.setState({
        optionStep: 0,
      });
    }

    if (!nextProps.fetchingPatientsByStudy && nextProps.patientsByStudy !== this.props.patientsByStudy) {
      const patientOptions = _.flatten(nextProps.patientsByStudy.data.map(pBS => pBS.patients.map(p => ({
        label: p.firstName + ' ' + p.lastName,
        value: p.id,
      }))));
      this.setState({
        patientOptions,
      });
    }
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
        indication: this.props.indications[study.indication_id],
        studyId: study.id,
      }));
      this.setState({
        optionStep: 1,
        siteLocation: siteLocationOption,
        protocol: null,
        protocolOptions,
      });
    } else {
      this.setState({
        optionStep: 0,
        siteLocation: null,
        protocolOptions: [],
        patientOptions: [],
      });
    }
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
        protocol: protocolOption,
        patient: null,
      });
    } else {
      this.setState({
        optionStep: 1,
        protocol: null,
        patientOptions: [],
      });
    }
  }

  handlePatientChoose(patientOption) {
    if (patientOption) {
      this.setState({
        optionStep: 3,
        patient: patientOption,
      });
    } else {
      this.setState({
        optionStep: 2,
        patient: null,
      });
    }
  }

  render() {
    const {
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
                    <a className="lightbox-close close" href="#" onClick={handleCloseModal}><i className="icomoon-icon_close"></i></a>
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
                          <Field
                            name="siteLocation"
                            component={ReactSelect}
                            placeholder="--Select Site Location--"
                            options={siteLocationOptions}
                            className="data-search"
                            disabled={submitting || this.props.fetchingSites}
                            objectValue
                            onChange={this.handleSiteLocationChoose.bind(this)}
                            selectedValue={this.state.siteLocation}
                          />
                        </div>
                      </div>

                      {optionStep >= 1 &&
                        <div className="field-row">
                          <strong className="label required"><label htmlFor="popup-protocol">protocol</label></strong>
                          <div className="field protocol">
                            <Field
                              id="popup-protocol"
                              name="protocol"
                              component={ReactSelect}
                              placeholder="--Select Protocol--"
                              options={protocolOptions}
                              className="data-search"
                              disabled={submitting}
                              objectValue
                              onChange={this.handleProtocolChoose.bind(this)}
                              selectedValue={this.state.protocol}
                            />
                          </div>
                        </div>
                      }
                      {optionStep >= 2 &&
                        <div className="field-row patient-name">
                          <strong className="label required"><label htmlFor="patient">Patient</label></strong>
                          <div className="field">
                            <Field
                              id="patient"
                              name="patient"
                              component={ReactSelect}
                              placeholder="--Select Patient--"
                              options={patientOptions}
                              className="data-search"
                              disabled={submitting || this.props.fetchingPatientsByStudy}
                              objectValue
                              onChange={this.handlePatientChoose.bind(this)}
                              selectedValue={this.state.patient}
                            />
                          </div>
                        </div>
                      }
                      {optionStep === 3 &&
                        <div className="field-row">
                          <strong className="label required"><label htmlFor="patient-time">Time</label></strong>
                          <div className="field">
                            <div className="col-holder row">
                              <div className="col pull-left hours">
                                <Field
                                  id="patient-time"
                                  name="hour"
                                  component={ReactSelect}
                                  placeholder="--Hours--"
                                  options={hourOptions}
                                  className="visible-first-del min-height"
                                  disabled={submitting}
                                />
                              </div>
                              <div className="col pull-left minutes">
                                <Field
                                  id="minutes"
                                  name="minute"
                                  component={ReactSelect}
                                  placeholder="--Minutes--"
                                  options={minuteOptions}
                                  className="visible-first-del min-height"
                                  disabled={submitting}
                                />
                              </div>
                              <div className="col pull-left time-mode">
                                <Field
                                  id="time-period"
                                  name="period"
                                  component={ReactSelect}
                                  placeholder="--Minutes--"
                                  options={periodOptions}
                                  className="visible-first"
                                  disabled={submitting}
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
                    <a className="close lightbox-close" href="#" onClick={handleCloseModal}><i className="icomoon-icon_close"></i></a>
                  </div>
                  <div className="scroll-holder">
                    <form action="#" className="form-lightbox form-edit-schedule" onSubmit={handleSubmit}>
                      <strong className="name">{`${selectedCellInfo.data.patient.firstName} ${selectedCellInfo.data.patient.lastName}`}</strong>
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
                                placeholder="--Hours--"
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
                                placeholder="--Minutes--"
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
                                placeholder="--Minutes--"
                                options={periodOptions}
                                className="visible-first"
                                disabled={submitting}
                              />
                            </div>
                          </div>
                        </div>
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
