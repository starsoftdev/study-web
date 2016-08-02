import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import Select from 'react-select'
import { Modal } from 'react-bootstrap'
import _ from 'lodash'

import 'react-select/less/default.less'
export const fields = [ 'siteLocation', 'protocol', 'patient', 'hour', 'minute', 'am' ]

function numberSequenceCreator(start, end) {
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
const amOptions = [
  {label: 'AM', value: 'AM'},
  {label: 'PM', value: 'PM'},
]

class SchedulePatientModal extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    siteLocationOptions: PropTypes.array.isRequired,
    protocolOptions: PropTypes.array.isRequired,
    patientOptions: PropTypes.array.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleCloseModal: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    visible: PropTypes.bool.isRequired,
  }

  render () {
    const {
      fields: { siteLocation, protocol, patient, hour, minute, am },
      siteLocationOptions,
      protocolOptions,
      patientOptions,
      handleSubmit,
      handleCloseModal,
      submitting,
      loading,
      visible,
      } = this.props

    return (
      <Modal className="modal-schedule-patient" show={visible} onHide={handleCloseModal}>
        <form className="form-schedule-patient form-horizontal" onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>SCHEDULE PAYMENT</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <label className="col-sm-3 control-label">SITE LOCATION *</label>
              <div className="col-sm-9">
                <Select
                  {...siteLocation}
                  options={siteLocationOptions}
                  placeholder="--Select Site Location--"
                  disabled={submitting || loading}
                  onBlur={() => { siteLocation.onBlur(siteLocation) }}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-3 control-label">PROTOCOL *</label>
              <div className="col-sm-9">
                <Select
                  {...protocol}
                  options={protocolOptions}
                  placeholder="--Select Protocol--"
                  disabled={submitting || loading}
                  onBlur={() => { protocol.onBlur(protocol) }}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-3 control-label">PATIENT *</label>
              <div className="col-sm-9">
                <Select
                  {...patient}
                  options={patientOptions}
                  placeholder="--Select Patient--"
                  disabled={submitting || loading}
                  onBlur={() => { patient.onBlur(patient) }}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-4">
                <Select
                  {...hour}
                  options={hourOptions}
                  placeholder="--Hours--"
                  disabled={submitting || loading}
                  onBlur={() => { hour.onBlur(hour) }}
                />
              </div>
              <div className="col-sm-4">
                <Select
                  {...minute}
                  options={minuteOptions}
                  placeholder="--Minutes--"
                  disabled={submitting || loading}
                  onBlur={() => { minute.onBlur(minute) }}
                />
              </div>
              <div className="col-sm-4">
                <Select
                  {...am}
                  options={amOptions}
                  disabled={submitting || loading}
                  onBlur={() => { am.onBlur(am) }}
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
          </Modal.Body>
        </form>
      </Modal>
    )
  }
}

export default reduxForm({
  form: 'schedulePatient',
  fields
})(SchedulePatientModal)
