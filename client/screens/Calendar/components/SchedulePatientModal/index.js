import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import Select from 'react-select'
import { Modal } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import _ from 'lodash'
import moment from 'moment'

import { SchedulePatientModalType } from 'constants'

import 'react-datepicker/dist/react-datepicker.css'
import 'react-select/less/default.less'
export const fields = [ 'siteLocation', 'protocol', 'indication', 'patient', 'date', 'hour', 'minute', 'period' ]

function numberSequenceCreator (start, end) {
  return _.range(start, end).map(n => {
    if (n < 10) {
      return {
        label: '0' + n,
        value: n,
      }
    }
    return {
      label: n.toString(),
      value: n,
    }
  })
}
const hourOptions = numberSequenceCreator(1, 13)
const minuteOptions = numberSequenceCreator(0, 60)
const periodOptions = [
  { label: 'AM', value: 'AM' },
  { label: 'PM', value: 'PM' },
]

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
    patientsByStudy: PropTypes.array.isRequired,
    fetchPatientsByStudy: PropTypes.func.isRequired,
    fetchingSites: PropTypes.bool.isRequired,
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

  componentWillReceiveProps (nextProps) {
    if (nextProps.selectedCellInfo.data) {
      this.setState({
        selectedUpdateDate: moment(nextProps.selectedCellInfo.data.time)
      })
    }
    if (nextProps.modalType === SchedulePatientModalType.HIDDEN) {
      this.setState({
        optionStep: 0,
      })
    }
  }

  handleUpdateDateChange (date) {
    this.setState ({
      selectedUpdateDate: date
    })
  }

  handleSiteLocationChoose (siteLocationOption) {
    if (siteLocationOption) {
      const selectedSite = this.props.sites.filter(s => s.id === siteLocationOption.siteId)[0]
      if (selectedSite === null) {
        throw new Error('SiteLocation options are not properly populated.')
      }
      const protocolOptions = selectedSite.studies.map(study => {
        return {
          label: study.protocolNumber,
          value: study.protocolNumber,
          indication: study.indication,
          studyId: study.id,
        }
      })
      this.setState({
        optionStep: 1,
        siteLocation: siteLocationOption.value,
        protocolOptions,
      })
    }
    else {
      this.setState({
        optionStep: 0,
        siteLocation: null,
        protocolOptions: [],
        patientOptions: [],
      })
    }

    this.props.fields.siteLocation.onChange(siteLocationOption)
  }

  handleProtocolChoose (protocolOption) {
    if (protocolOption) {
      /*
      this.props.fetchPatientsByStudy(protocolOption.studyId, {
        offset: 0,
        limit: -1,
        category: '*'
      })
      */
      const patientOptions = this.props.patientsByStudy.map(p => {
        return {
          label: p.firstName + ' ' + p.lastName,
          value: p.id,
        }
      })
      this.setState({
        optionStep: 2,
        protocol: protocolOption.value,
        patientOptions
      })
      this.props.fields.indication.onChange(protocolOption.indication)
    }
    else {
      this.setState({
        optionStep: 1,
        protocol: null,
        patientOptions: [],
      })
    }

    this.props.fields.protocol.onChange(protocolOption)
  }

  handlePatientChoose (patientOption) {
    if (patientOption) {
      this.setState({
        optionStep: 3,
        patient: patientOption.value
      })
    }
    else {
      this.setState({
        optionStep: 2,
        patient: null
      })
    }

    this.props.fields.patient.onChange(patientOption)
  }

  render () {
    const {
      fields: { siteLocation, protocol, indication, patient, date, hour, minute, period },
      sites,
      handleCloseModal,
      handleDelete,
      handleSubmit,
      submitting,
      modalType,
      selectedCellInfo,
      } = this.props

    const { optionStep, protocolOptions, patientOptions } = this.state

    const siteLocationOptions = sites.map(s => {
      return {
        label: s.name,
        value: s.name,
        siteId: s.id,
      }
    })

    return (
      <Modal className="modal-schedule-patient" show={modalType!==SchedulePatientModalType.HIDDEN} onHide={handleCloseModal}>
        {modalType===SchedulePatientModalType.CREATE &&
          <form className="form-schedule-patient form-horizontal" onSubmit={handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>SCHEDULE PATIENT</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="form-group">
                <label className="col-sm-3 control-label">SITE LOCATION *</label>
                <div className="col-sm-9">
                  <Select
                    {...siteLocation}
                    options={siteLocationOptions}
                    placeholder="--Select Site Location--"
                    disabled={submitting || this.props.fetchingSites}
                    onBlur={() => { siteLocation.onBlur(siteLocation) }}
                    onChange={this.handleSiteLocationChoose.bind(this)}
                  />
                </div>
              </div>
              {optionStep >= 1 &&
                <div className="form-group">
                  <label className="col-sm-3 control-label">PROTOCOL *</label>
                  <div className="col-sm-9">
                    <Select
                      {...protocol}
                      options={protocolOptions}
                      placeholder="--Select Protocol--"
                      disabled={submitting}
                      onBlur={() => { protocol.onBlur(protocol) }}
                      onChange={this.handleProtocolChoose.bind(this)}
                    />
                  </div>
                </div>
              }
              {optionStep >= 2 &&
                <div>
                  <div className="form-group">
                    <label className="col-sm-3 control-label">PATIENT *</label>
                    <div className="col-sm-9">
                      <Select
                        {...patient}
                        options={patientOptions}
                        placeholder="--Select Patient--"
                        disabled={submitting || this.props.fetchingPatientsByStudy}
                        onBlur={() => { patient.onBlur(patient) }}
                        onChange={this.handlePatientChoose.bind(this)}
                      />
                    </div>
                  </div>
                  <input {...indication} style={{ display: 'none' }} />
                </div>
              }
              {optionStep === 2 &&
                <div>
                  <div className="form-group">
                    <div className="col-sm-4">
                      <Select
                        {...hour}
                        options={hourOptions}
                        placeholder="--Hours--"
                        disabled={submitting}
                        onBlur={() => { hour.onBlur(hour) }}
                      />
                    </div>
                    <div className="col-sm-4">
                      <Select
                        {...minute}
                        options={minuteOptions}
                        placeholder="--Minutes--"
                        disabled={submitting}
                        onBlur={() => { minute.onBlur(minute) }}
                      />
                    </div>
                    <div className="col-sm-4">
                      <Select
                        {...period}
                        options={periodOptions}
                        disabled={submitting}
                        onBlur={() => { period.onBlur(period) }}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-sm-12">
                      <button type="submit" className="btn btn-default pull-right" disabled={submitting}>
                        {submitting
                          ? <span>SUBMITTING...</span>
                          : <span>SUBMIT</span>
                        }
                      </button>
                    </div>
                  </div>
                </div>
              }
            </Modal.Body>
          </form>
        }
        {modalType===SchedulePatientModalType.UPDATE &&
          <form className="form-schedule-patient form-horizontal" onSubmit={handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>EDIT SCHEDULE</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="form-group">
                <label className="col-sm-12">{`${selectedCellInfo.data.patient.firstName} ${selectedCellInfo.data.patient.lastName}`}</label>
                <span className="col-sm-12">{selectedCellInfo.data.siteLocation}</span>
                <span className="col-sm-12">{selectedCellInfo.data.protocolNumber}</span>
              </div>
              <hr />
              <div className="form-group">
                <label className="col-sm-3">WHEN *</label>
                <div className="col-sm-9">
                  <DatePicker {...date} selected={this.state.selectedUpdateDate} onChange={this.handleUpdateDateChange.bind(this)} />
                </div>
              </div>

              <div className="form-group">
                <label className="col-sm-3">TIME *</label>
                <div className="col-sm-3">
                  <Select
                    {...hour}
                    options={hourOptions}
                    placeholder="--Hours--"
                    disabled={submitting}
                    onBlur={() => { hour.onBlur(hour) }}
                  />
                </div>
                <div className="col-sm-3">
                  <Select
                    {...minute}
                    options={minuteOptions}
                    placeholder="--Minutes--"
                    disabled={submitting}
                    onBlur={() => { minute.onBlur(minute) }}
                  />
                </div>
                <div className="col-sm-3">
                  <Select
                    {...period}
                    options={periodOptions}
                    disabled={submitting}
                    onBlur={() => { period.onBlur(am) }}
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="col-sm-offset-4 col-sm-3">
                  <div type="button" className="btn btn-default pull-right" disabled={submitting} onClick={() => handleDelete(selectedCellInfo.data.id)}>
                    {submitting
                      ? <span>DELETING...</span>
                      : <span>DELETE</span>
                    }
                  </div>
                </div>
                <div className="col-sm-3">
                  <button type="submit" className="btn btn-default pull-right" disabled={submitting}>
                    {submitting
                      ? <span>UPDATING...</span>
                      : <span>UPDATE</span>
                    }
                  </button>
                </div>
              </div>
            </Modal.Body>
          </form>
        }
      </Modal>
    )
  }
}

export default reduxForm({
  form: 'schedulePatient',
  fields
})(SchedulePatientModal)
