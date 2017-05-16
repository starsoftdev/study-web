import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import moment from 'moment-timezone';

import Toggle from '../../../../components/Input/Toggle';
import { selectHoverRowIndex } from '../selectors';
class StudyLeftItem extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    item: PropTypes.object,
    onSelectStudy: PropTypes.func,
    onStatusChange: PropTypes.func,
    changeStudyStatusDashboard: PropTypes.func,
    hoverRowIndex: PropTypes.any,
    setHoverRowIndex: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      hover: false,
    };
    this.mouseOverRow = this.mouseOverRow.bind(this);
    this.mouseOutRow = this.mouseOutRow.bind(this);
    this.showHover = this.showHover.bind(this);
    this.hideHover = this.hideHover.bind(this);
  }

  mouseOverRow(e, index) {
    this.props.setHoverRowIndex(index);
  }

  mouseOutRow() {
    this.props.setHoverRowIndex(null);
  }

  showHover() {
    this.setState({ hover: true });
  }

  hideHover() {
    this.setState({ hover: false });
  }

  render() {
    const { item, onSelectStudy } = this.props;

    const lastLoginTime = item.last_login_time ? moment(item.last_login_time).tz(item.timezone).format('MM/DD/YY [at] h:mm A') : 'N/A';

    const landingHref = item.landing_page_url ? `/${item.study_id}-${item.landing_page_url.toLowerCase().replace(/ /ig, '-')}` : '';

    return (
      <tr
        onMouseEnter={(e) => this.mouseOverRow(e, item.study_id)}
        onMouseLeave={this.mouseOutRow}
        onFocus={(e) => this.mouseOverRow(e, item.study_id)}
        onBlur={this.mouseOutRow}

        className={(this.props.hoverRowIndex === item.study_id) ? 'active-table-row' : ''}
      >
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
            onChange={(value) => { this.props.changeStudyStatusDashboard([item.study_id], value ? 'active' : 'inactive', false); }}
            initValue={item.is_active}
          />
        </td>
        <td></td>
        <td className="list">
          <ul className="list-unstyled">
            <li><span><a href={landingHref} className="landig-link" target="_blank">{item.study_id}</a></span></li>
            <li><span>{`${(item.percent || item.percent === 0) ? `${item.percent}%` : ''}`}</span></li>

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
            <li className="site-number">Site Number: <span>{item.site_id}</span></li>
            <li className="protocol">Protocol: <span>{item.protocol_number || 'N/A'}</span></li>
            <li className="sponsor">Sponsor: <span>{item.sponsor_name || 'N/A'}</span></li>
            <li className="cro">CRO: <span>{item.cro_name || 'N/A'}</span></li>
            <li className="login-info">Last Login: <span>{lastLoginTime}</span></li>
          </ul>
        </td>
        <td>
          <ul className="list-unstyled">
            <li><span>{item.indication_name}</span></li>
            <li><span>{item.tier_number ? `Tier ${item.tier_number}` : ''}</span></li>
          </ul>
        </td>
      </tr>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  hoverRowIndex: selectHoverRowIndex(),
});

export default connect(mapStateToProps)(StudyLeftItem);
