import React, { PropTypes } from 'react';

const NotificationItem = ({ notification }) => {
  const { event_log, date, time } = notification;

  return (
    <tr className="">
      <td>
        <div className="info clearfix">
          <div className="img-holder">
            <img alt="description" src="images/patient1.jpg" />
          </div>
          <div className="desc">
            <p>
              <span dangerouslySetInnerHTML={{ __html: event_log.eventMessage }} />
            </p>
          </div>
        </div>
      </td>
      <td>{date}</td>
      <td>{time}</td>
    </tr>
  );
};

NotificationItem.propTypes = {
  notification: PropTypes.object,
};

export default NotificationItem;
