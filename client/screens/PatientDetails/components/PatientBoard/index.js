import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Glyphicon, Button } from 'react-bootstrap'
import ReactDOM from 'react-dom'

import Dispatcher from 'utils/dispatcher'

import PatientColItem from './PatientColItem'
import ChatForm from '../ChatForm'
import BlastForm from '../BlastForm'

import { fetchPatientCategories, fetchPatientsByStudy, updatePatientCategory, fetchStudySources } from 'actions'

import ActivityIcon from 'components/ActivityIcon'
import LoadingResults from 'components/LoadingResults'

import _ from 'lodash'

import './styles.less'

class PatientBoard extends Component {

  static propTypes = {
    isFetchingPatientCategories: PropTypes.bool,
    fetchPatientCategories: PropTypes.func,
    patientCategories: PropTypes.array,

    isFetchingStudySources: PropTypes.bool,
    fetchStudySources: PropTypes.func,
    studySources: PropTypes.array,

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
    this.props.fetchStudySources(this.props.studyId)
    this.props.fetchPatientsByStudy(this.props.studyId, {
      offset: 0,
      limit: PatientBoard.patientsPerPage,
      category: '*'
    })
  }

  handleDragAndDrop = (item, category) => {
    this.props.updatePatientCategory(item.id, category)
  }

  initBlastForm = () => {
    const appDispatcher = new Dispatcher()
    let params = {
      blastType: 'text'
    }

    appDispatcher.dispatch({
      actionType: 'setActiveBlastForm',
      data: params
    })
  }

  render () {
    let scope = this
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
      <div>
        <div className="controls">
          <Button
            type="submit"
            className=""
            bsStyle="primary"
            onClick={scope.initBlastForm.bind(scope)}
          >
            <Glyphicon
              className=""
              glyph="envelope"
            />
            <span>
              Text / Email Blast
            </span>
          </Button>
        </div>
        <div className="patient-board">
          {contentList}
        </div>
        <ChatForm {...this.props} />
        <BlastForm {...this.props} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isFetchingPatientCategories: state.fetchingPatientCategories,
  patientCategories: state.patientCategories,

  isFetchingStudySources: state.fetchingStudySources,
  studySources: state.studySources,

  isFetchingPatients: state.fetchingPatients,
  patientsByStudy: state.patientsByStudy,

  isUpdatingPatientCategory: state.updatingPatientCategory
})
const mapDispatchToProps = {
  fetchPatientCategories,
  fetchStudySources,
  fetchPatientsByStudy,
  updatePatientCategory
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientBoard)
