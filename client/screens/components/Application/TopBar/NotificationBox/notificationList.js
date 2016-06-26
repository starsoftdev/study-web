import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { fetchNotifications } from 'actions'

import NotificationItem from './notificationItem'

export default class NotificationList extends React.Component {
  static propTypes = {
    authorization: PropTypes.any,
    notification: PropTypes.object,
    fetchNotifications: PropTypes.func,
  }

  componentWillMount () {
    const { authorization, notification } = this.props

    if (notification.notifications.length < 10) {
      this.props.fetchNotifications(authorization.authData.userId, { offset: notification.notifications.length, limit: 10 })
    }
  }

  handleSeeAllClick = () => {

  }

  render () {
		const list = this.props.notification.notifications.map((n, index) => {
			return <NotificationItem key={index} itemData={n} />
		})

    return (
      <div className="notification-list">
        {list}
      </div>
    )
  }
}

const mapDispatchToProps = {
  fetchNotifications,
}

export default connect(
  null,
  mapDispatchToProps
)(NotificationList)
