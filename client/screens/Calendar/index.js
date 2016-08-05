import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import CalendarWidget from './components/CalendarWidget'
import SchedulePatientModal from './components/SchedulePatientModal'

import { fetchSites, fetchProtocols, fetchPatients, schedulePatient } from 'actions'

import './styles.less'

class Calendar extends React.Component {
  state = {
    isModalVisible: true,
  }

  componentWillMount () {
    const { fetchSites, fetchProtocols, fetchPatients } = this.props

    // fetchSites()
    // fetchProtocols()
    fetchPatients()
  }

  handleModalVisibility (visible) {
    this.setState({
      isModalVisible: visible,
    })
  }

  handleSubmit (data) {
    console.log(data)
    this.handleModalVisibility (false)
  }

  render () {
    const { fetchingSites, sites, patients, protocols } = this.props

    return (
      <div className="calendar-page">
        <CalendarWidget
          handleOpenModal={this.handleModalVisibility.bind(this, true)}
        />
        <SchedulePatientModal
          siteLocationOptions={sites.map(s => {
            return {
              label: s.location,
              value: s.location,
            }
          })}
          protocolOptions={[{label:'aa', value: 'aa'}, {label:'bb', value:'bb'}]}
          patientOptions={patients.map(p => {
            return {
              label: p.firstName + ' ' + p.lastName,
              value: p.id,
            }
          })}
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
})
const mapDispatchToProps = {
  fetchSites,
  fetchProtocols,
  fetchPatients,
  schedulePatient,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calendar)
