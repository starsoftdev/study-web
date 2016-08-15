import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import CalendarWidget from './components/CalendarWidget'
import SchedulePatientModal from './components/SchedulePatientModal'
import FilterBar from './components/FilterBar'

import moment from 'moment'

import { fetchSites, fetchPatientsByStudy, fetchSchedules, schedulePatient, deleteSchedule } from 'actions'

import { SchedulePatientModalType } from 'constants'

import './styles.less'

class Calendar extends React.Component {
  static propTypes = {
    authorization: PropTypes.object.isRequired,
    fetchingSites: PropTypes.bool.isRequired,
    sites: PropTypes.array.isRequired,
    fetchingPatientsByStudy: PropTypes.bool.isRequired,
    patientsByStudy: PropTypes.array.isRequired,
    schedules: PropTypes.object.isRequired,
    fetchSites: PropTypes.func.isRequired,
    fetchPatientsByStudy: PropTypes.func.isRequired,
    fetchSchedules: PropTypes.func.isRequired,
    schedulePatient: PropTypes.func.isRequired,
    deleteSchedule: PropTypes.func.isRequired,
  }

  state = {
    filter: {
      patientName: '',
      siteLocation: null,
      indication: null,
      protocol: null,
    },
    modalType: SchedulePatientModalType.HIDDEN,
    filteredSchedules: []
  }
  selectedCellInfo = {}

  componentWillMount () {
    const { fetchSites, fetchSchedules, authorization } = this.props

    fetchSites(authorization.authData, {})
    fetchSchedules({ userId: authorization.authData.userId })
  }

  componentWillReceiveProps (nextProps) {
    if ((this.props.schedules.isFetching && !nextProps.schedules.isFetching) ||
      (this.props.schedules.schedulingPatient && !nextProps.schedules.schedulingPatient) ||
      (this.props.schedules.isDeleting && !nextProps.schedules.isDeleting)) {
      this.filterSchedules (nextProps.schedules, this.state.filter)
    }
  }

  filterSchedules (schedules, filter) {
    this.setState({
      filteredSchedules: schedules.schedules.filter(s => {
        return (s.patient.firstName+' '+s.patient.lastName).toLowerCase().indexOf(filter.patientName.toLowerCase()) > -1 &&
          (!filter.siteLocation || s.siteLocation === filter.siteLocation) &&
          (!filter.indication || s.indication === filter.indication) &&
          (!filter.protocol || s.protocolNumber === filter.protocol)
      })
    })
  }

  updateFilter (field, newValue) {
    const newFilter = {
      ...this.state.filter,
      [field]: newValue
    }

    this.setState({
      filter: newFilter
    })

    this.filterSchedules (this.props.schedules, newFilter)
  }

  getTimeComponents (strTime) {
    return {
      hour: moment(strTime).hour() % 12 + 1,
      minute: moment(strTime).minute(),
      period: moment(strTime).hour() >= 12 ? 'PM' : 'AM'
    }
  }

  handleModalVisibility (modalType, data) {
    this.setState({
      modalType,
    })

    if (modalType!==SchedulePatientModalType.HIDDEN) {
      this.selectedCellInfo = data
    }
  }

  handleSubmit (data) {
    let submitData
    console.log (data)
    if (data.siteLocation && data.protocol) { // CREATE
      submitData = {
        siteLocation: data.siteLocation,
        indication: data.indication,
        protocolNumber: data.protocol,
        // patientId: data.patient,
        patientId: 1,
        userId: this.props.authorization.authData.userId,
        time: moment(this.selectedCellInfo.selectedDate).add(data.period==='AM'?data.hour:data.hour+12, 'hours').add(data.minute, 'minutes').toDate()
      }
    }
    else {  // UPDATE
      let updatedDate
      if (data.date) {
        updatedDate = moment(new Date(data.date))
      }
      else {  // React Datepicker doesn't submit its initial value
        updatedDate = moment(new Date(this.selectedCellInfo.data.time)).startOf('day')
      }

      submitData = {
        id: this.selectedCellInfo.data.id,
        time: updatedDate.add(data.period==='AM'?data.hour:data.hour+12, 'hours').add(data.minute, 'minutes').toDate()
      }
    }

    this.handleModalVisibility (SchedulePatientModalType.HIDDEN)

    this.props.schedulePatient(submitData)
  }

  handleDelete (scheduleId) {
    this.handleModalVisibility (SchedulePatientModalType.HIDDEN)

    this.props.deleteSchedule(scheduleId, this.props.authorization.authData.userId)
  }

  render () {
    const { fetchingSites, sites, fetchPatientsByStudy, fetchingPatientsByStudy, patientsByStudy, schedules, fetchSchedules } = this.props

    return (
      <div className="container-fluid">
        <FilterBar
          sites={sites}
          fetchingSites={this.props.fetchingSites}
          filter={this.state.filter}
          updateFilter={this.updateFilter.bind(this)}
        />
        <CalendarWidget
          schedules={this.state.filteredSchedules}
          handleOpenModal={this.handleModalVisibility.bind(this)}
        />
        <SchedulePatientModal
          sites={sites}
          onSubmit={this.handleSubmit.bind(this)}
          handleCloseModal={this.handleModalVisibility.bind(this, SchedulePatientModalType.HIDDEN)}
          handleDelete={this.handleDelete.bind(this)}
          submitting={false}
          selectedCellInfo={this.selectedCellInfo}
          modalType={this.state.modalType}
          initialValues={this.selectedCellInfo.data?this.getTimeComponents(this.selectedCellInfo.data.time):{ period: 'AM' }}
          patientsByStudy={patientsByStudy}
          fetchingSites={fetchingSites}
          fetchingPatientsByStudy={fetchingPatientsByStudy}
          fetchPatientsByStudy={fetchPatientsByStudy}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  authorization: state.authorization,
  fetchingSites: state.fetchingSites,
  sites: state.sites,
  fetchingPatientsByStudy: state.fetchingPatientsByStudy,
  patientsByStudy: state.patientsByStudy,
  schedules: state.schedules,
})
const mapDispatchToProps = {
  fetchSites,
  fetchPatientsByStudy,
  fetchSchedules,
  schedulePatient,
  deleteSchedule,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calendar)
