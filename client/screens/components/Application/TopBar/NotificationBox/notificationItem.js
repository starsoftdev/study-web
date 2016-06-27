import React, { PropTypes } from 'react'

const NotificationItem = ({ itemData, handleItemClick }) => {
  const readClassName = itemData.read ? 'read' : 'unread'

  return (
    <div className={`notification-item ${readClassName}`} onClick={() => handleItemClick(itemData)}>
      {itemData.notification.message}
    </div>
  )
}

NotificationItem.propTypes = {
  itemData: PropTypes.object.isRequired,
  handleItemClick: PropTypes.func.isRequired,
}

export default NotificationItem
