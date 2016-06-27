import React, { PropTypes } from 'react'
import moment from 'moment'

const NotificationItem = ({ itemData, handleItemClick, isNotificationPage }) => {
  const readClassName = itemData.read ? 'read' : 'unread'
  const timestamp = moment(itemData.notification.created_date)
  const date = timestamp.format('MM/DD/YY')
  const time = timestamp.format('hh:mm:ss A')

  return (
    <div className={`notification-item ${readClassName}`} onClick={() => handleItemClick(itemData)}>
			{
				isNotificationPage ?
					<div className="row">
            <div className="col-md-8">{itemData.notification.message}</div>
            <div className="col-md-2">{date}</div>
            <div className="col-md-2">{time}</div>
          </div>
          :
          <div>
						<div>
							{itemData.notification.message}
						</div>
						<div>
							{date} at {time}
						</div>
          </div>
			}
    </div>
  )
}

NotificationItem.propTypes = {
  itemData: PropTypes.object.isRequired,
  handleItemClick: PropTypes.func.isRequired,
  isNotificationPage: PropTypes.bool.isRequired,
}

export default NotificationItem
