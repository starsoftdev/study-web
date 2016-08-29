import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { fetchPatientSignUps, fetchPatientMessages, fetchRewardsCount } from 'actions'

import StatsItem from './StatsItem'

import styles from './styles.less'

class StatsBar extends React.Component {
  static propTypes = {
    notification: PropTypes.object,
    fetchPatientSignUps: PropTypes.func,
    fetchPatientMessages: PropTypes.func,
    fetchRewardsCount: PropTypes.func,
  }

  componentWillMount () {
    this.props.fetchPatientSignUps()
  }

  handleRedeemClick = () => {
    console.log ('redeem clicked')
  }

  render () {
    const { notification } = this.props
    console.log (notification)
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
      headerValue: notification.rewards.total,
      firstLabel: 'Refer Sponsor / CRO',
      firstValue: '+300 KIKs',
      secondLabel: 'Refer Site',
      secondValue: '+100 KIKs',
    }

    return (
      <div className="stats-bar">
        <StatsItem data={patientSignUps} />
        <StatsItem data={patientMessages} />
        <StatsItem data={rewards} handleRedeemClick={() => this.handleRedeemClick()} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  notification: state.notification
})
const mapDispatchToProps = {
  fetchPatientSignUps,
  fetchPatientMessages,
  fetchRewardsCount,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatsBar)
