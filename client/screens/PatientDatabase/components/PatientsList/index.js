import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap'
import { fetchPatients, clearPatients } from 'actions'
import PatientItem from './PatientItem'
import './styles.less'

export default class PatientsList extends Component {

  static propTypes = {
    patients: PropTypes.array,
    fetchPatients: PropTypes.func,
    clearPatients: PropTypes.func,
  }

  constructor (props) {
    super(props)
    this.props.fetchPatients({})
  }

  componentWillUnmount () {
    this.props.clearPatients()
  }

  render () {
    const { patients } = this.props
    const patientsListContents = patients.map((item, index) => (
      <PatientItem {...item} key={index} />
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
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {patientsListContents}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )
    } else {
      return <div />
    }
  }
}

const mapStateToProps = (state) => ({
  patients: state.patients,
})
const mapDispatchToProps = {
  fetchPatients,
  clearPatients,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientsList)
