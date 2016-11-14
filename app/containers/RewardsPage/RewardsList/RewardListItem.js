import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';

class RewardListItem extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    index: PropTypes.number,
    reward_data: PropTypes.object,
    points: PropTypes.number,
    created: PropTypes.string,
    entity_id: PropTypes.number,
    client_id: PropTypes.number,
    referral_id: PropTypes.number,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { index, reward_data, points, created, entity_id, client_id, referral_id } = this.props;
    let content = null;
    content = (
      <tr>
        <td>
          <div className="info clearfix">
            <div className="img-holder">
              <img src="images/patient1.jpg" alt="" />
            </div>
            <div className="desc">
              <p><strong>Alan Walker</strong> Earned 150 KIKs<br /> Fill Out Enrollment Data: Acne Study (Platinum Listing)</p>
            </div>
          </div>
        </td>
        <td>{ created }</td>
        <td>12:30 PM</td>
        <td>{ points }</td>
        <td>225</td>
      </tr>
    );
    return content;
  }
}

export default connect(null, null)(RewardListItem);
