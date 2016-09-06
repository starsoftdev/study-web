import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchPatient } from 'actions'
import ActivityIcon from 'components/ActivityIcon'

class PatientItem extends Component {
  static propTypes = {
    index: PropTypes.number,
    id: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    age: PropTypes.number,
    gender: PropTypes.string,
    bmi: PropTypes.number,
    indication_id: PropTypes.number,
    indication: PropTypes.object,
    source_id: PropTypes.number,
    source: PropTypes.object,
    study_patient_category_id: PropTypes.number,
    studyPatientCategory: PropTypes.object,
    isFetching: PropTypes.bool,
    fetchPatient: PropTypes.func,
  }

  constructor (props) {
    super(props)
  }

  editPatient () {
    this.props.fetchPatient(this.props.id)
  }

  render () {
    const { index, id, firstName, lastName, email, phone, age, gender, bmi, indication_id, indication,
      source_id, source, study_patient_category_id, studyPatientCategory, isFetching } = this.props

    return (
      <tr className="patient-container">
        <td className="index">
          <span>{index + 1}</span>
        </td>
        <td className="name">
          <span>{firstName} {lastName}</span>
        </td>
        <td className="email">
          <span>{email}</span>
        </td>
        <td className="phone">
          <span>{phone}</span>
        </td>
        <td className="indication">
          <span>{indication.name}</span>
        </td>
        <td className="age">
          <span>{age}</span>
        </td>
        <td className="gender">
          <span>{gender}</span>
        </td>
        <td className="bmi">
          <span>{bmi}</span>
        </td>
        <td className="status">
          <span>{studyPatientCategory.patientCategory.name}</span>
        </td>
        <td className="source">
          <span>{source.type}</span>
        </td>
        <td className="action">
          <button className="btn btn-default btn-edit-patient pull-right" onClick={this.editPatient.bind(this)} disabled={isFetching}>
            {isFetching
              ? <span><ActivityIcon /></span>
              : <span>Edit</span>
            }
          </button>
        </td>
      </tr>
    )
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.fetchingPatient
})
const mapDispatchToProps = {
  fetchPatient
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientItem)
