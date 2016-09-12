import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { fetchPatientSignUps, fetchPatientMessages, fetchRewardsPoint } from 'actions'

import styles from './styles.less'

import graph from 'assets/images/graph.svg'

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
      <section className="row infoarea text-uppercase">
        <h2 className="hidden">Statics</h2>
        <article className="col-xs-4">
          <div className="box">
            <div className="img-holder pull-left"><img src={graph} width="141" height="119" alt=" " /></div>
            <div className="textbox">
              <h2>PATIENT <br /> SIGN UPS</h2>
              <span className="counter">TOTAL {notification.patientSignUps.today + notification.patientSignUps.yesterday}</span>
            </div>
          </div>
          <div className="box">
            <div className="col pull-left">
              <span className="sub-title">Yesterday</span>
              <strong className="number">{notification.patientSignUps.yesterday} <span className="caret-holder"><i className="caret"></i></span></strong>
            </div>
            <div className="col pull-right text-center">
              <span className="sub-title">Today</span>
              <strong className="number">{notification.patientSignUps.today} <span className="caret-holder"><i className="caret"></i><i className="caret"></i></span></strong>
            </div>
          </div>
        </article>
        <article className="col-xs-4 msg-info">
          <div className="box">
            <div className="messages-counter pull-left">
              <i className="icon-icon_comment_alt"></i>
              <strong className="number hidden">72</strong>
            </div>
            <div className="textbox">
              <h2>PATIENT<br /> MESSAGES</h2>
              <span className="counter">TOTAL {notification.patientMessages.unreadTexts + notification.patientMessages.unreadEmails}</span>
            </div>
          </div>
          <div className="box">
            <div className="col pull-left">
              <span className="sub-title">UNREAD<br /> EMAILS</span>
              <strong className="number"><i className="icon-envelop"></i> {notification.patientMessages.unreadEmails}</strong>
            </div>
            <div className="col pull-right">
              <span className="sub-title">UNREAD<br /> TEXT</span>
              <strong className="number"><i className="icon-icon_chat_alt"></i> {notification.patientMessages.unreadTexts}</strong>
            </div>
          </div>
        </article>
        <article className="col-xs-4 rewards-info">
          <div className="box">
            <i className="icon-gift pull-left"></i>
            <div className="textbox">
              <h2>REWARDS</h2>
              <a href="#popup-rewards" className="btn btn-info lightbox-opener" data-text="Redeem" data-hovertext="Redeem Now" onClick={() => this.handleRedeemClick()}>Redeem</a>
              <span className="counter">{notification.rewardsPoint} KIK<span className="small text-lowercase">s</span></span>
            </div>
          </div>
          <div className="box">
            <div className="col pull-left">
              <span className="sub-title">REFER CRO/<br />SPONSORS</span>
              <strong className="number">+300 <sub> KIK<span className="small text-lowercase">s</span></sub></strong>
            </div>
            <div className="col pull-right">
              <span className="sub-title">Refer <br /> Site</span>
              <strong className="number">+100 <sub> KIK<span className="small text-lowercase">s</span></sub></strong>
            </div>
          </div>
        </article>
      </section>
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
