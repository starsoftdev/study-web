import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { fetchPatientSignUps, fetchPatientMessages, fetchStudyListingsCount, fetchRewardsCount } from 'actions'

import StatsItem from './StatsItem'

import styles from './styles.less'

class StatsBar extends React.Component {
  static propTypes = {
    notification: PropTypes.object,
    fetchPatientSignUps: PropTypes.func,
    fetchPatientMessages: PropTypes.func,
    fetchStudyListingsCount: PropTypes.func,
    fetchRewardsCount: PropTypes.func,
  }

  componentWillMount () {
    this.props.fetchPatientSignUps()
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
    const studyListings = {
      headerLabel: 'STUDY LISTINGS',
      headerValue: notification.studyListings.active + notification.studyListings.inactive,
      firstLabel: 'Active',
      firstValue: notification.studyListings.active,
      secondLabel: 'Inactive',
      secondValue: notification.studyListings.inactive,
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
        <div className="row">
          <StatsItem data={patientSignUps} />
          <StatsItem data={patientMessages} />
          <StatsItem data={studyListings} />
          <StatsItem data={rewards} />
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
  fetchPatientMessages,
  fetchStudyListingsCount,
  fetchRewardsCount,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatsBar)
