/* eslint-disable camelcase */
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment-timezone';
import { findIndex } from 'lodash';

import defaultImage from '../../../assets/images/site_location.png';

class RewardListItem extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    id: PropTypes.number,
    points: PropTypes.number,
    balance: PropTypes.number,
    reward_data: PropTypes.string,
    rewardData: PropTypes.object,
    reward_type_id: PropTypes.number,
    userImageURL: PropTypes.string,
    created: PropTypes.string,
    timezone: PropTypes.string,
    site_id: PropTypes.number,
    siteLocations: PropTypes.array,
  };

  render() {
    const { balance, points, reward_data, created, timezone } = this.props;
    let { rewardData } = this.props;
    const localTime = moment(created).tz(timezone);
    const date = localTime.format('MM/DD/YYYY');
    const time = localTime.format('hh:mm A');
    if (reward_data) {
      rewardData = JSON.parse(reward_data);
    }
    const foundIndex = findIndex(this.props.siteLocations, { id: this.props.site_id });
    if (foundIndex !== -1) {
      if (rewardData) {
        rewardData.siteLocationName = this.props.siteLocations[foundIndex].name;
      } else {
        rewardData = {
          siteLocationName: this.props.siteLocations[foundIndex].name,
        };
      }
    }
    const infoTag = (rewardData.gift) ? <p>{(rewardData && rewardData.siteLocationName) ? rewardData.siteLocationName : null} now has {balance} KIKs</p> : null;

    let content = null;
    content = (
      <tr>
        <td>
          <div className="info clearfix">
            <div className="img-holder bg-gray">
              <img src={defaultImage} alt="" />
            </div>
            { points > 0 ?
              <div className="desc">
                <p><strong>{(rewardData && rewardData.siteLocationName) ? rewardData.siteLocationName : null}</strong> earned {points} KIKs</p>
                <p>{(rewardData && rewardData.description) ? rewardData.description : null}</p>
                {infoTag}
              </div>
              :
              <div className="desc">
                <p><strong>{rewardData.userName}</strong> {(rewardData && rewardData.description) ? rewardData.description : null}</p>
                {infoTag}
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
