import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import PatientColItem from './PatientColItem'

import { fetchPatientCategories, fetchPatients, updatePatientCategory } from 'actions'

import ActivityIcon from 'components/ActivityIcon'
import LoadingResults from 'components/LoadingResults'

import _ from 'lodash'

import './styles.less'

export default class PatientBoard extends Component {

  static propTypes = {
    isFetchingPatientCategories: PropTypes.bool,
    fetchPatientCategories: PropTypes.func,
    patientCategories: PropTypes.array,

    isFetchingPatients: PropTypes.bool,
    fetchPatients: PropTypes.func,
    patients: PropTypes.array,

    isUpdatingPatientCategory: PropTypes.bool,
    updatePatientCategory: PropTypes.func
  }

  constructor (props) {
    super(props)

    // this.state = {
      // patientCategories: []
    // }
  }

  componentWillMount () {
    // Redux store keeps `studies` reducer, so need to clear them
    // Not sure we actually need this behavior
    this.props.fetchPatientCategories()
    this.props.fetchPatients()
  }

  handleDragAndDrop = (item, category) => {
    this.props.updatePatientCategory(item.id, category)
  }

  render () {
    const { patientCategories, patients } = this.props

    const patientArr = _.groupBy(patients, (item) => (
      item.studyPatientCategoryId
    ))

    const contentList = patientCategories.map((item, index) => (
      <PatientColItem
            key={index}
            items={patientArr[item.id] ? patientArr[item.id] : []}
            category={item.name}
            categoryId={item.id}
            onDragAndDrop={this.handleDragAndDrop}
        />
    ))
    console.log(patientCategories)
    return (
      <div className="patient-board">
        {contentList}

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isFetchingPatientCategories: state.fetchingPatientCategories,
  patientCategories: state.patientCategories,

  isFetchingPatients: state.fetchingPatients,
  patients: state.patients,

  isUpdatingPatientCategory: state.updatingPatientCategory
})
const mapDispatchToProps = {
  fetchPatientCategories,
  fetchPatients,
  updatePatientCategory
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientBoard)
