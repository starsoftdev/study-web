import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import NotificationList from '../components/NotificationList'

import './styles.less'

class NotificationsPage extends React.Component {
  static propTypes = {
    authorization: PropTypes.any,
    notification: PropTypes.object,
  }

  render () {
    return (
      <div className="notifications-page">
        <div className="header-label">NOTIFICATIONS</div>
        <div className="notification-item">
          <div className="row">
            <div className="col-md-8">DESCRIPTION</div>
            <div className="col-md-2">DATE</div>
            <div className="col-md-2">TIME</div>
          </div>
        </div>
        <NotificationList authorization={this.props.authorization} notification={this.props.notification} isNotificationPage />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  authorization: state.authorization,
  notification: state.notification,
})

export default connect(
  mapStateToProps,
  null
)(NotificationsPage)
