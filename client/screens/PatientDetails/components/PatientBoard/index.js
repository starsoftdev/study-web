import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import PatientColItem from './PatientColItem'
import ChatForm from '../ChatForm'

import { fetchPatientCategories, fetchPatientsByStudy, updatePatientCategory } from 'actions'

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
    fetchPatientsByStudy: PropTypes.func,
    patientsByStudy: PropTypes.array,

    isUpdatingPatientCategory: PropTypes.bool,
    updatePatientCategory: PropTypes.func,

    studyId: PropTypes.number.isRequired
  }
  static patientsPerPage = 10

  constructor (props) {
    super(props)

    // this.state = {
      // patientCategories: []
    // }
  }

  componentDidMount () {
    // Redux store keeps `studies` reducer, so need to clear them
    // Not sure we actually need this behavior
    this.props.fetchPatientCategories()
    this.props.fetchPatientsByStudy(this.props.studyId, {
      offset: 0,
      limit: PatientBoard.patientsPerPage,
      category: '*'
    })
  }

  handleDragAndDrop = (item, category) => {
    this.props.updatePatientCategory(item.id, category)
  }

  render () {
    const { patientCategories, patientsByStudy } = this.props
    let patientArr = {}

    _.forEach(patientsByStudy, (pbs) => {
      patientArr[pbs.patientCategory.id] = pbs.patients
    })

    const contentList = patientCategories.map((item, index) => (
      <PatientColItem
            key={index}
            items={patientArr[item.id] ? patientArr[item.id] : []}
            category={item.name}
            categoryId={item.id}
            onDragAndDrop={this.handleDragAndDrop}
        />
    ))

    return (
      <div className="patient-board">
        {contentList}
        <ChatForm {...this.props} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isFetchingPatientCategories: state.fetchingPatientCategories,
  patientCategories: state.patientCategories,

  isFetchingPatients: state.fetchingPatients,
  patientsByStudy: state.patientsByStudy,

  isUpdatingPatientCategory: state.updatingPatientCategory
})
const mapDispatchToProps = {
  fetchPatientCategories,
  fetchPatientsByStudy,
  updatePatientCategory
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientBoard)
