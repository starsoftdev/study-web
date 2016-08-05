import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import CalendarWidget from './components/CalendarWidget'
import SchedulePatientModal from './components/SchedulePatientModal'
import FilterBar from './components/FilterBar'

import moment from 'moment'

import { fetchSites, fetchProtocols, fetchPatients, fetchSchedules, schedulePatient } from 'actions'

import './styles.less'

class Calendar extends React.Component {
  static propTypes = {
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
  }

  state = {
    isModalVisible: true,
  }

  componentWillMount () {
    const { fetchSites, fetchProtocols, fetchPatients, fetchSchedules } = this.props

    // fetchSites()
    // fetchProtocols()
    fetchPatients()
    fetchSchedules()
  }

  handleModalVisibility (visible, selectedDate) {
    this.setState({
      isModalVisible: visible,
    })
    if (visible) {
      this.selectedDate = selectedDate
    }
  }

  handleSubmit (data) {
    this.handleModalVisibility (false)

    const submitData = {
      // siteLocation: data.siteLocation,
      // indication:
      siteLocation: '1',
      indication: '1',
      protocolNumber: data.protocol,
      patient_id: data.patient,
      time: moment(this.selectedDate).add(data.am==='AM'?data.hour:data.hour+12, 'hours').add(data.minute, 'minutes').toDate()
    }

    this.props.schedulePatient(null, submitData)
  }

  render () {
    const { fetchingSites, sites, patients, protocols, schedules, fetchSchedules } = this.props

    const siteLocationOptions = sites.map(s => {
      return {
        label: s.location,
        value: s.location,
      }
    })
    const protocolOptions = [{label:'aa', value: 'aa'}, {label:'bb', value:'bb'}]
    const patientOptions = patients.map(p => {
      return {
        label: p.firstName + ' ' + p.lastName,
        value: p.id,
      }
    })
    const indicationOptions = [{label:'bleeding', value:'bleeding'}, {label:'acne', value:'acne'}]

    return (
      <div className="calendar-page">
        <FilterBar
          siteLocationOptions={siteLocationOptions}
          indicationOptions={indicationOptions}
          protocolOptions={protocolOptions}
          fetchSchedules={fetchSchedules}
        />
        <CalendarWidget
          schedules={schedules}
          handleOpenModal={this.handleModalVisibility.bind(this, true)}
        />
        <SchedulePatientModal
          siteLocationOptions={siteLocationOptions}
          protocolOptions={protocolOptions}
          patientOptions={patientOptions}
          onSubmit={this.handleSubmit.bind(this)}
          handleCloseModal={this.handleModalVisibility.bind(this, false)}
          submitting={false}
          loading={false}
          visible={this.state.isModalVisible}
          initialValues={{am: 'AM'}}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
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
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calendar)
