import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { fetchPatientSignUps, fetchPatientMessages, fetchRewardsPoint } from 'actions'

import StatsItem from './StatsItem'

import styles from './styles.less'

class StatsBar extends React.Component {
  static propTypes = {
    authorization: PropTypes.object.isRequired,
    notification: PropTypes.object,
    fetchPatientSignUps: PropTypes.func,
    fetchPatientMessages: PropTypes.func,
    fetchRewardsPoint: PropTypes.func,
  }

  componentDidMount () {
    const { authData } = this.props.authorization
    this.props.fetchPatientSignUps(authData)
    this.props.fetchPatientMessages(authData)
    this.props.fetchRewardsPoint(authData)
  }

  handleRedeemClick = () => {
    console.log ('redeem clicked')
  }

  render () {
    const { notification } = this.props

    const patientSignUps = {
      headerLabel: 'PATIENT SIGN UPS',
      headerValue: notification.patientSignUps.today + notification.patientSignUps.yesterday,
      firstLabel: 'Today',
      firstValue: notification.patientSignUps.today,
      secondLabel: 'Yesterday',
      secondValue: notification.patientSignUps.yesterday,
    }
    const patientMessages = {
      headerLabel: 'PATIENT MESSAGES',
      headerValue: notification.patientMessages.unreadTexts + notification.patientMessages.unreadEmails,
      firstLabel: 'Unread Texts',
      firstValue: notification.patientMessages.unreadTexts,
      secondLabel: 'Unread Emails',
      secondValue: notification.patientMessages.unreadEmails,
    }
    const rewards = {
      headerLabel: 'REWARDS',
      headerValue: notification.rewardsPoint,
      firstLabel: 'Refer Sponsor / CRO',
      firstValue: '+300 KIKs',
      secondLabel: 'Refer Site',
      secondValue: '+100 KIKs',
    }

    return (
      <div className="stats-bar">
        <div className="row">
          <StatsItem data={patientSignUps} />
          <StatsItem data={patientMessages} />
          <StatsItem data={rewards} handleRedeemClick={() => this.handleRedeemClick()} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  authorization: state.authorization,
  notification: state.notification
})
const mapDispatchToProps = {
  fetchPatientSignUps,
  fetchPatientMessages,
  fetchRewardsPoint,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatsBar)
