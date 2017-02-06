/* eslint-disable camelcase */
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { getLocalTime } from 'utils/time';

import defaultImage from 'assets/images/Default-User-Img-Dr.png';

class RewardListItem extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    id: PropTypes.number,
    points: PropTypes.number,
    balance: PropTypes.number,
    reward_data: PropTypes.string,
    rewardData: PropTypes.object,
    userImageURL: PropTypes.string,
    created: PropTypes.string,
    timezone: PropTypes.string,
  };

  render() {
    const { balance, points, userImageURL, reward_data, created, timezone } = this.props;
    let { rewardData } = this.props;
    const localTime = getLocalTime(created, timezone);
    const date = localTime.format('MM/DD/YYYY');
    const time = localTime.format('hh:mm A');
    if (reward_data) {
      rewardData = JSON.parse(reward_data);
    }
    console.log('---rewardData', rewardData);
    let content = null;
    content = (
      <tr>
        <td>
          <div className="info clearfix">
            <div className="img-holder">
              <img src={userImageURL || defaultImage} alt="" />
            </div>
            { points > 0 ?
              <div className="desc">
                <p><strong>{rewardData.siteLocationName}</strong> Earned {points} KIKs</p>
                <p>{rewardData.description}</p>
              </div>
              :
              <div className="desc">
                <p><strong>{rewardData.userName}</strong> {rewardData.description}</p>
              </div>
            }
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
