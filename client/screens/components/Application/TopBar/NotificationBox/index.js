import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { fetchNotifications, fetchUnreadNotificationsCount } from 'actions'

import './styles.less'

export default class NotificationBox extends React.Component {
  static propTypes = {
    authorization: PropTypes.any,
    notification: PropTypes.object,
    fetchNotifications: PropTypes.func,
    fetchUnreadNotificationsCount: PropTypes.func,
  }

  constructor (props) {
    super (props)

    const { authData } = props.authorization

    if (authData) {
      props.fetchUnreadNotificationsCount(authData.userId)
    }
  }

  render () {
    return (
      <div className="notification-box">
        {this.props.notification.unreadNotificationsCount}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  notification: state.notification,
})

const mapDispatchToProps = {
  fetchNotifications,
  fetchUnreadNotificationsCount,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationBox)
