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
export const fields = [ 'siteLocation', 'protocol', 'patient', 'date', 'hour', 'minute', 'period' ]

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
  { label: 'AM', value: 'AM'  },
  { label: 'PM', value: 'PM' },
]

class SchedulePatientModal extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    siteLocationOptions: PropTypes.array.isRequired,
    protocolOptions: PropTypes.array.isRequired,
    patientOptions: PropTypes.array.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleCloseModal: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    modalType: PropTypes.string.isRequired,
    selectedCellInfo: PropTypes.object.isRequired,
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.selectedCellInfo.data) {
      this.setState({
        selectedUpdateDate: moment(nextProps.selectedCellInfo.data.time)
      })
    }
  }

  handleUpdateDateChange (date) {
    this.setState ({
      selectedUpdateDate: date
    })
  }

  render () {
    const {
      fields: { siteLocation, protocol, patient, date, hour, minute, period },
      siteLocationOptions,
      protocolOptions,
      patientOptions,
      handleCloseModal,
      handleDelete,
      handleSubmit,
      submitting,
      loading,
      modalType,
      selectedCellInfo
      } = this.props

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
                    {...period}
                    options={periodOptions}
                    disabled={submitting || loading}
                    onBlur={() => { period.onBlur(am) }}
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
                    disabled={submitting || loading}
                    onBlur={() => { hour.onBlur(hour) }}
                  />
                </div>
                <div className="col-sm-3">
                  <Select
                    {...minute}
                    options={minuteOptions}
                    placeholder="--Minutes--"
                    disabled={submitting || loading}
                    onBlur={() => { minute.onBlur(minute) }}
                  />
                </div>
                <div className="col-sm-3">
                  <Select
                    {...period}
                    options={periodOptions}
                    disabled={submitting || loading}
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
