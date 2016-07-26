import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ActivityIcon from 'components/ActivityIcon'

class PatientItem extends Component {
  static propTypes = {
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
    info_source_id: PropTypes.number,
    infoSource: PropTypes.object,
    study_patient_category_id: PropTypes.number,
    studyPatientCategory: PropTypes.object,
  }

  constructor (props) {
    super(props)
  }

  render () {
    const { id, firstName, lastName, email, phone, age, gender, bmi, indication_id, indication,
      info_source_id, infoSource, study_patient_category_id, studyPatientCategory } = this.props

    return (
      <tr className="patient-container">
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
          <span>{infoSource.type}</span>
        </td>
        <td className="action">
          <button className="btn btn-default btn-edit-patient">Edit</button>
        </td>
      </tr>
    )
  }
}

const mapStateToProps = (state) => ({
})
const mapDispatchToProps = {
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientItem)
