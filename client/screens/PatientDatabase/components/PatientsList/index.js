import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap'
import { clearSelectedPatient, savePatient, fetchPatients, clearPatients,
  fetchIndications, fetchPatientCategories, fetchSources } from 'actions'
import EditPatientForm from 'forms/EditPatient'
import PatientItem from './PatientItem'
import _ from 'lodash'
import './styles.less'

class PatientsList extends Component {

  static propTypes = {
    patients: PropTypes.array,
    fetchPatients: PropTypes.func,
    clearPatients: PropTypes.func,
    selectedPatient: PropTypes.object,
    clearSelectedPatient: PropTypes.func,
    savingPatient: PropTypes.bool,
    savePatient: PropTypes.func,
    fetchIndications: PropTypes.func,
    fetchPatientCategories: PropTypes.func,
    fetchSources: PropTypes.func,
    indications: PropTypes.array,
    patientCategories: PropTypes.array,
    sources: PropTypes.array,
    fetchingIndications: PropTypes.bool,
    fetchingPatientCategories: PropTypes.bool,
    fetchingSources: PropTypes.bool,
  }

  constructor (props) {
    super(props)
    this.props.fetchPatients({})
    this.props.fetchIndications({})
    this.props.fetchPatientCategories({})
    this.props.fetchSources({})
  }

  componentWillUnmount () {
    this.props.clearPatients()
  }

  modalShouldBeShown () {
    return (this.props.selectedPatient !== null)
  }

  closeModal () {
    this.props.clearSelectedPatient()
  }

  updatePatient (patientData) {
    let payload = _.omit(patientData, [ 'indication', 'status', 'source' ])
    payload.indications = _.map(patientData.indication, indicationIterator => indicationIterator.value)
    payload.source_id = patientData.source
    payload.patient_category_id = patientData.status

    this.props.savePatient(this.props.selectedPatient.id, payload)
  }

  render () {
    const { indications, patientCategories, sources,
      fetchingIndications, fetchingPatientCategories, fetchingSources,
      patients, selectedPatient, savingPatient } = this.props
    let selectedPatientInput = {}

    if (selectedPatient) {
      selectedPatientInput = _.omit(selectedPatient, [ 'created', 'indications', 'source_id', 'source', 'lastAction', 'study_patient_category_id', 'studyPatientCategory' ])
      _.assign(selectedPatientInput, {
        indication: _.map(selectedPatient.indications, indicationIterator => {
          return {
            label: indicationIterator.name,
            value: indicationIterator.id,
          }
        }),
        status: parseInt(selectedPatient.studyPatientCategory.patient_category_id),
        source: selectedPatient.source_id,
      })
    }

    const indicationOptions = _.map(indications, indicationIterator => {
      return {
        label: indicationIterator.name,
        value: indicationIterator.id,
      }
    })
    const patientCategoryOptions = _.map(patientCategories, patientCategoryIterator => {
      return {
        label: patientCategoryIterator.name,
        value: patientCategoryIterator.id,
      }
    })
    const sourceOptions = _.map(sources, sourceIterator => {
      return {
        label: sourceIterator.type,
        value: sourceIterator.id,
      }
    })
    const genderOptions = [ { label: 'Male', value: 'Male' }, { label: 'Female', value: 'Female' } ]
    const patientsListContents = patients.map((item, index) => (
      <PatientItem {...item} key={index} index={index} />
    ))

    if (patients.length > 0) {
      return (
        <div className="row">
          <div className="col-sm-12">
            <h4>Total Patients Count: {patients.length}</h4>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>PHONE</th>
                    <th>INDICATION</th>
                    <th>AGE</th>
                    <th>GENDER</th>
                    <th>BMI</th>
                    <th>STATUS</th>
                    <th>SOURCE</th>
                  </tr>
                </thead>
                <tbody>
                  {patientsListContents}
                </tbody>
              </table>
            </div>
            <Modal className="edit-patient" show={this.modalShouldBeShown()} onHide={this.closeModal.bind(this)}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Patient</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <EditPatientForm loading={fetchingIndications || fetchingPatientCategories || fetchingSources}
                                 submitting={savingPatient} indicationOptions={indicationOptions} genderOptions={genderOptions}
                                 patientCategoryOptions={patientCategoryOptions} sourceOptions={sourceOptions}
                                 initialValues={selectedPatientInput} onSubmit={this.updatePatient.bind(this)} />
              </Modal.Body>
            </Modal>
          </div>
        </div>
      )
    } else {
      return <div><h4>No matching patients found</h4></div>
    }
  }
}

const mapStateToProps = (state) => ({
  patients: state.patients,
  selectedPatient: state.selectedPatient,
  savingPatient: state.savingPatient,
  indications: state.indications,
  patientCategories: state.patientCategories,
  sources: state.sources,
  fetchingIndications: state.fetchingIndications,
  fetchingPatientCategories: state.fetchingPatientCategories,
  fetchingSources: state.fetchingSources,
})
const mapDispatchToProps = {
  clearSelectedPatient,
  savePatient,
  fetchPatients,
  clearPatients,
  fetchIndications,
  fetchPatientCategories,
  fetchSources
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientsList)
