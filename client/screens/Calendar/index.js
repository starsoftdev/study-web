import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import CalendarWidget from './components/CalendarWidget'
import SchedulePatientModal from './components/SchedulePatientModal'
import FilterBar from './components/FilterBar'

import moment from 'moment'

import { fetchSites, fetchProtocols, fetchPatients, fetchSchedules, schedulePatient, deleteSchedule } from 'actions'

import { SchedulePatientModalType } from 'constants'

import './styles.less'

class Calendar extends React.Component {
  static propTypes = {
    authorization: PropTypes.object.isRequired,
    fetchingSites: PropTypes.bool.isRequired,
    sites: PropTypes.array.isRequired,
    protocols: PropTypes.object.isRequired,
    patients: PropTypes.array.isRequired,
    schedules: PropTypes.object.isRequired,
    fetchSites: PropTypes.func.isRequired,
    fetchProtocols: PropTypes.func.isRequired,
    fetchPatients: PropTypes.func.isRequired,
    fetchSchedules: PropTypes.func.isRequired,
    schedulePatient: PropTypes.func.isRequired,
    deleteSchedule: PropTypes.func.isRequired,
  }

  state = {
    filter: {
      patientName: '',
      siteLocation: '',
      indication: '',
      protocol: '',
    },
    modalType: SchedulePatientModalType.HIDDEN,
    filteredSchedules: []
  }
  selectedCellInfo = {}

  componentWillMount () {
    const { fetchSites, fetchProtocols, fetchPatients, fetchSchedules, authorization } = this.props

    // fetchSites()
    // fetchProtocols()
    // fetchPatients()
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

    if (data.protocol) { // CREATE
      submitData = {
        // siteLocation: data.siteLocation,
        // indication:
        siteLocation: 'Palmer Tech',
        indication: 'acne',
        protocolNumber: data.protocol,
        patientId: data.patient,
        userId: this.props.authorization.authData.userId,
        time: moment(this.selectedCellInfo.selectedDate).add(data.period==='AM'?data.hour:data.hour+12, 'hours').add(data.minute, 'minutes').toDate()
      }
    }
    else {  // UPDATE
      let updatedDate
      if (data.date) {
        updatedDate = moment(data.date)
      }
      else {  // React Datepicker doesn't submit its initial value
        updatedDate = moment(this.selectedCellInfo.data.time).startOf('day')
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
    const { fetchingSites, sites, patients, protocols, schedules, fetchSchedules } = this.props

    const siteLocationOptions = sites.map(s => {
      return {
        label: s.location,
        value: s.location,
      }
    })
    const protocolOptions = [ { label:'aa', value: 'aa' }, { label:'bb', value:'bb' } ]
    const patientOptions = patients.map(p => {
      return {
        label: p.firstName + ' ' + p.lastName,
        value: p.id,
      }
    })
    const indicationOptions = [ { label:'bleeding', value:'bleeding' }, { label:'acne', value:'acne' } ]

    return (
      <div className="calendar-page">
        <FilterBar
          siteLocationOptions={siteLocationOptions}
          indicationOptions={indicationOptions}
          protocolOptions={protocolOptions}
          filter={this.state.filter}
          updateFilter={this.updateFilter.bind(this)}
        />
        <CalendarWidget
          schedules={this.state.filteredSchedules}
          handleOpenModal={this.handleModalVisibility.bind(this)}
        />
        <SchedulePatientModal
          siteLocationOptions={siteLocationOptions}
          protocolOptions={protocolOptions}
          patientOptions={patientOptions}
          onSubmit={this.handleSubmit.bind(this)}
          handleCloseModal={this.handleModalVisibility.bind(this, SchedulePatientModalType.HIDDEN)}
          handleDelete={this.handleDelete.bind(this)}
          submitting={false}
          loading={false}
          selectedCellInfo={this.selectedCellInfo}
          modalType={this.state.modalType}
          initialValues={this.selectedCellInfo.data?this.getTimeComponents(this.selectedCellInfo.data.time):{ period: 'AM' }}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  authorization: state.authorization,
  fetchingSites: state.fetchingSites,
  sites: state.sites,
  protocols: state.protocols,
  patients: state.patients,
  schedules: state.schedules,
})
const mapDispatchToProps = {
  fetchSites,
  fetchProtocols,
  fetchPatients,
  fetchSchedules,
  schedulePatient,
  deleteSchedule,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calendar)
