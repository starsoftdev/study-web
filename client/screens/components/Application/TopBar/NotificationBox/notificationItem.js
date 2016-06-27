import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { setNotificationAsRead } from 'actions'

export default class NotificationItem extends React.Component {
  static propTypes = {
    itemData: PropTypes.object,
    setNotificationAsRead: PropTypes.func,
  }

  handleItemClick = (itemData) => {
    if (!itemData.read) {
      this.props.setNotificationAsRead(itemData.id)
    }
  }

  render () {
    const { itemData } = this.props
    const readClassName = itemData.read ? 'read' : 'unread'

    return (
      <div className={`notification-item ${readClassName}`} onClick={() => this.handleItemClick(itemData)}>
        {itemData.notification.message}
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
