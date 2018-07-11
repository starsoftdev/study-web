import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import moment from 'moment-timezone';

import Toggle from '../../../../components/Input/Toggle';
import { selectHoverRowIndex } from '../selectors';
class StudyLeftItem extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    id: PropTypes.number,
    item: PropTypes.object,
    onSelectStudy: PropTypes.func,
    changeStudyStatusDashboard: PropTypes.func,
    hoverRowIndex: PropTypes.any,
    setHoverRowIndex: PropTypes.func,
    submitToClientPortal: PropTypes.func,
    showNoteModal: PropTypes.func,
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
    this.showNote = this.showNote.bind(this);
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

  showNote(studyId) {
    this.props.showNoteModal(studyId);
  }

  render() {
    const { item, onSelectStudy, id } = this.props;

    const lastLoginTime = item.last_login_time ? moment(item.last_login_time).tz(`${DASHBOARD_TIMEZONE}`).format('MM/DD/YY [at] h:mm A') : 'N/A';

    const landingHref = item.landingPageUrl ? `/${item.study_id}-${item.landingPageUrl.toLowerCase().replace(/ /ig, '-')}` : '';
    const facebookHref = item.facebookUrl;

    const maxLength = (str, len) => {
      const clearStr = str.replace(/<\/?[^>]+>/gi, '');
      if (clearStr.length > len) {
        return `${str.substr(0, len)}...`;
      }
      return str;
    };

    const sm = item.sm_user_first_name ? `AO: ${item.sm_user_first_name} ${item.sm_user_last_name}` : 'AO: N/A';
    const bd = item.bd_user_first_name ? `BD: ${item.bd_user_first_name} ${item.bd_user_last_name}` : 'BD: N/A';
    const cc = item.cc_user_first_name ? `CC: ${item.cc_user_first_name} ${item.cc_user_last_name}` : 'CC: N/A';

    // campaign_datefrom and campaign_dateto can be null, if it set to TBD
    const campaignDateFrom = moment(item.campaign_datefrom).tz(item.timezone);
    const campaignDateTo = moment(item.campaign_dateto).tz(item.timezone);
    const totalDays = campaignDateTo.diff(campaignDateFrom, 'days');
    let daysRan = moment.utc().diff(campaignDateFrom, 'days');
    if (daysRan < 0) {
      daysRan = 0;
    }
    if (daysRan > totalDays) {
      daysRan = totalDays;
    }

    // handle case when campaign dates is set to TBD or when campaign_count is null
    let percent;
    if (item.campaign_datefrom === null || item.campaign_dateto === null) {
      percent = null;
    } else if (item.campaign_count === null) {
      percent = 0;
    } else {
      percent = ((item.campaign_count || 0) / (item.goal || 1)) * (totalDays / daysRan) * 100;
    }
    percent = isFinite(percent) ? percent : 0;

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
            initValue={item.isPublic}
          />
        </td>
        <td>
          {
            facebookHref ? <a href={facebookHref} className="landing-link" target="_blank">{id + 1}</a> : `${id + 1}`
          }
        </td>
        <td className="list">
          <ul className="list-unstyled">
            <li><span><a href={landingHref} className="landing-link" target="_blank">{item.study_id}</a></span></li>
            <li><span>{(percent !== null) ? `${percent.toFixed(2)}%` : 'N/A'}</span></li>
            <li><span>{maxLength(sm, 15)}</span></li>
            <li><span>{maxLength(bd, 15)}</span></li>
            <li><span>{maxLength(cc, 15)}</span></li>
            <li><span className={`color ${item.color || ''}`}>{`${item.color ? item.color.toUpperCase() : 'N/A'}`}</span></li>
          </ul>
        </td>
        <td>
          <div><div className="site-location special_ellipsis_link_container"><a className="special_ellipsis_link landing-link" onClick={() => { this.props.submitToClientPortal(item.siteAdminUserId); }}>{ item.site_name }</a></div></div>
          <ul className="list-unstyled">
            <li className="site-number">Site Number: <span>{item.site_id}</span></li>
            <li className="protocol"><div className="special_ellipsis_div">Protocol: <span>{item.protocol_number || 'N/A'}</span></div></li>
            <li className="sponsor"><div className="special_ellipsis_div">Sponsor: <span>{item.sponsor_name || 'N/A'}</span></div></li>
            <li className="cro">CRO: <span>{item.cro_name || 'N/A'}</span></li>
            <li className="login-info">Last Login: <span>{lastLoginTime}</span></li>
            <li className="login-info"><span><a className="special_ellipsis_link landing-link" onClick={() => { this.showNote(item.study_id); }}>Notes</a></span></li>
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
