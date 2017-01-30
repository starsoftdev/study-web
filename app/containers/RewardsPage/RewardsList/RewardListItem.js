import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { getLocalTime } from 'utils/time';

import defaultImage from 'assets/images/Default-User-Img-Dr.png';

class RewardListItem extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    id: PropTypes.number,
    points: PropTypes.number,
    balance: PropTypes.number,
    site_id: PropTypes.number,
    rewardData: PropTypes.string,
    userImageURL: PropTypes.string,
    created: PropTypes.string,
    timezone: PropTypes.string,
  };

  render() {
    const { balance, points, userImageURL, rewardData, created, timezone } = this.props;
    const localTime = getLocalTime(created, timezone);
    const date = localTime.format('MM/DD/YYYY');
    const time = localTime.format('hh:mm A');
    console.log ('---rewardData', rewardData);
    
    let content = null;
    content = (
      <tr>
        <td>
          <div className="info clearfix">
            <div className="img-holder">
              <img src={userImageURL || defaultImage} alt="" />
            </div>
            <div className="desc">
              <p><strong></strong></p>
            </div>
          </div>
        </td>
        <td>{ date }</td>
        <td>{ time } </td>
        <td>{ points > 0 ? `+${points}` : points }</td>
        <td>{ balance }</td>
      </tr>
    );
    return content;
  }
}

export default connect(null, null)(RewardListItem);
