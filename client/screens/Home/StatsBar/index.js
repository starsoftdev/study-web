import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { fetchPatientSignUps } from 'actions'

import StatsItem from './StatsItem'

import styles from './styles.less'

class StatsBar extends React.Component {
  static propTypes = {
    notification: PropTypes.object,
    fetchPatientSignUps: PropTypes.func,
  }

  componentWillMount () {
    this.props.fetchPatientSignUps()
  }

  render () {
    const { notification } = this.props

    const patientSignUps = {
      headerLabel: 'PATIENT SIGN UPS',
      headerValue: 119,
      firstLabel: 'Today',
      firstValue: notification.patientSignUps.today,
      secondLabel: 'Yesterday',
      secondValue: notification.patientSignUps.yesterday,
    }

    return (
      <div className="stats-bar">
        <div className="row">
          <StatsItem data={patientSignUps} />
          <StatsItem data={patientSignUps} />
          <StatsItem data={patientSignUps} />
          <StatsItem data={patientSignUps} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  notification: state.notification
})
const mapDispatchToProps = {
  fetchPatientSignUps,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatsBar)
