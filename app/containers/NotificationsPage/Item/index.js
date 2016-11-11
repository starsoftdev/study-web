import React, { PropTypes } from 'react';
import moment from 'moment';

const NotificationItem = ({eventLog}) => {
  const { created, eventMessage } = eventLog;

  return (
    <tr className="">
      <td>
        <div className="info clearfix">
          <div className="img-holder">
            <img alt="image description" src="images/patient1.jpg" />
          </div>
          <div className="desc">
            <p>
              <span dangerouslySetInnerHTML={{ __html: eventMessage }} />
            </p>
          </div>
        </div>
      </td>
      <td>{moment(created).format('MM/DD/YY')}</td>
      <td>{moment(created).format('hh:mm A')}</td>
    </tr>
  )
};

NotificationItem.propTypes = {
  created: PropTypes.string,
  eventMessage: PropTypes.string,
}

export default NotificationItem;
