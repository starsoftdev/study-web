import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { fetchNotifications, setNotificationAsRead } from 'actions'

import NotificationItem from './notificationItem'

import './styles.less'

export default class NotificationList extends React.Component {
  static propTypes = {
    authorization: PropTypes.any,
    notification: PropTypes.object,
    fetchNotifications: PropTypes.func,
    setNotificationAsRead: PropTypes.func,
    isNotificationPage: PropTypes.bool.isRequired,
  }

  componentWillMount () {
    const { authorization, notification } = this.props

    if (notification.notifications.length < 10) {
      this.props.fetchNotifications(authorization.authData.userId, { offset: notification.notifications.length, limit: 10 })
    }
  }

  handleSeeAllClick = () => {

  }

  handleItemClick = (itemData) => {
    if (!itemData.read) {
      this.props.setNotificationAsRead(itemData.id)
    }
  }

  render () {
		const list = this.props.notification.notifications.map((n, index) => {
			return <NotificationItem key={index} itemData={n} handleItemClick={this.handleItemClick} isNotificationPage={this.props.isNotificationPage} />
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
  setNotificationAsRead,
}

export default connect(
  null,
  mapDispatchToProps
)(NotificationList)
