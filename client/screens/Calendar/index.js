import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import CalendarWidget from './components/CalendarWidget'
import SchedulePatientModal from './components/SchedulePatientModal'

import { fetchSiteLocations, fetchProtocols, fetchPatients, schedulePatient } from 'actions'

import './styles.less'

class Calendar extends React.Component {
  state = {
    isModalVisible: true,
  }

  componentWillMount () {
    const { fetchSiteLocations, fetchProtocols, fetchPatients } = this.props

    fetchSiteLocations()
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
    const { siteLocations, patients, protocols } = this.props
    
    return (
      <div className="calendar-page">
        <CalendarWidget
          handleOpenModal={this.handleModalVisibility.bind(this, true)}
        />
        <SchedulePatientModal
          siteLocationOptions={siteLocations.siteLocations.map(l => {
            return {
              label: l.name,
              value: l.id,
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
  siteLocations: state.siteLocations,
  protocols: state.protocols,
  patients: state.patients,
})
const mapDispatchToProps = {
  fetchSiteLocations,
  fetchProtocols,
  fetchPatients,
  schedulePatient,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calendar)
