import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { setNotificationAsRead } from 'actions'

export default class NotificationItem extends React.Component {
  static propTypes = {
    itemData: PropTypes.object,
    setNotificationAsRead: PropTypes.func,
  }

  render () {
    return (
      <div className="notification-item">
        {this.props.itemData.notification.message}
      </div>
    )
  }
}

const mapDispatchToProps = {
  setNotificationAsRead,
}

export default connect(
  null,
  mapDispatchToProps
)(NotificationItem)
