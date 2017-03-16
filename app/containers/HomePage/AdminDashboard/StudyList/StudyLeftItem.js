import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';

import Toggle from '../../../../components/Input/Toggle';

class StudyLeftItem extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    item: PropTypes.object,
    onSelectStudy: PropTypes.func,
    onStatusChange: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      hover: false,
    };
    this.showHover = this.showHover.bind(this);
    this.hideHover = this.hideHover.bind(this);
  }

  showHover() {
    this.setState({ hover: true });
  }

  hideHover() {
    this.setState({ hover: false });
  }

  render() {
    const { item, onSelectStudy, onStatusChange } = this.props;

    const lastLoginTime = item.last_login_time ? moment(item.last_login_time).format('MM/DD/YY [at] h:mm A') : 'N/A';

    return (
      <tr>
        <td>
          <span className={(item.selected) ? 'sm-container checked' : 'sm-container'}>
            <span className="input-style" onClick={() => { onSelectStudy(item.study_id, !item.selected); }}>
              <input name="all" type="checkbox" />
            </span>
          </span>
        </td>
        <td>
          <Field
            name={`status-${item.study_id}`}
            component={Toggle}
            className="field"
            onChange={(value) => { console.log(123); onStatusChange([item.study_id], value); }}
            initValue={status === 'active'}
          />
        </td>
        <td></td>
        <td className="list">
          <ul className="list-unstyled">
            <li><span>{item.study_id}</span></li>
            <li><span>{`${item.percent ? `${item.percent}%` : ''}`}</span></li>

            <li><span>{item.sm_user_first_name ? `SM: ${item.sm_user_first_name} ${item.sm_user_last_name}` : 'SM: N/A'}</span></li>
            <li><span>{item.bd_user_first_name ? `BD: ${item.bd_user_first_name} ${item.bd_user_last_name}` : 'BD: N/A'}</span></li>
            <li><span>{item.ae_user_first_name ? `AE: ${item.ae_user_first_name} ${item.ae_user_last_name}` : 'AE: N/A'}</span></li>

            {/* <li><span className={`color ${studyInfo.color.toLowerCase()}`}>{studyInfo.color}</span></li>*/}
            <li><span className={`color ${item.color || ''}`}>{`${item.color ? item.color.toUpperCase() : ''}`}</span></li>
          </ul>
        </td>
        <td>
          <span className="site-location">{ item.site_name }</span>
          <ul className="list-unstyled">
            <li className="site-number">Site Number: <span>{item.site_location}</span></li>
            <li className="protocol">Protocol: <span>{item.protocol_number || 'N/A'}</span></li>
            <li className="sponsor">Sponsor: <span>{item.sponsor_name || 'N/A'}</span></li>
            <li className="cro">CRO: <span>{item.cro_name || 'N/A'}</span></li>
            <li className="login-info">Last Login: <span>{lastLoginTime}</span></li>
          </ul>
        </td>
        <td>
          <ul className="list-unstyled">
            <li><span>{item.indication_name}</span></li>
            <li><span>{item.tier_number}</span></li>
          </ul>
        </td>
      </tr>
    );
  }
}

const mapStateToProps = createStructuredSelector({
});

export default connect(mapStateToProps)(StudyLeftItem);
