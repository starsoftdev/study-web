import React, { PropTypes } from 'react';

import { getAvatarUrl, eventMessage } from '../index';

const NotificationItem = ({ notification, onClick }) => {
  const { event_log, date, time } = notification; //eslint-disable-line
  const url = getAvatarUrl(notification);

  return (
    <tr className="" onClick={onClick}>
      <td>
        <div className="info clearfix">
          <div className="img-holder bg-gray">
            <img alt="description" src={url} />
          </div>
          <div className="desc">
            <p>
              <span dangerouslySetInnerHTML={{ __html: eventMessage(event_log) }} />
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
  onClick: PropTypes.func.isRequired,
};

export default NotificationItem;
