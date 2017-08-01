import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';
import { selectHoverRowIndex } from '../selectors';

class StudyItem extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    item: PropTypes.object,
    mouseOverRow: PropTypes.func,
    mouseOutRow: PropTypes.func,
    hoverRowIndex: PropTypes.any,
    setHoverRowIndex: PropTypes.func,
    filtersFormValues: PropTypes.object,
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
    const { item } = this.props;

    const campaignDateFrom = moment(item.campaign_datefrom);
    const campaignDateTo = moment(item.campaign_dateto);

    const totalDays = campaignDateTo.diff(campaignDateFrom, 'days');
    let daysRan = moment.utc().diff(campaignDateFrom, 'days');
    let daysLeft = campaignDateTo.diff(moment.utc(), 'days');

    if (daysLeft < 0) {
      daysLeft = 0;
    }

    if (daysRan < 0) {
      daysRan = 0;
    }

    if (daysRan > totalDays) {
      daysRan = totalDays;
    }

    const startDate = item.campaign_datefrom ? campaignDateFrom.format('MM/DD/YY') : 'TBD';
    const endDate = item.campaign_dateto ? campaignDateTo.format('MM/DD/YY') : 'TBD';

    let campaignName = this.props.filtersFormValues.campaign ? this.props.filtersFormValues.campaign.toString() : '1';
    campaignName = campaignName.charAt(0).toUpperCase() + campaignName.slice(1);

    return (
      <tr
        onMouseEnter={(e) => this.mouseOverRow(e, item.study_id)}
        onMouseLeave={this.mouseOutRow}
        onFocus={(e) => this.mouseOverRow(e, item.study_id)}
        onBlur={this.mouseOutRow}

        className={(this.props.hoverRowIndex === item.study_id) ? 'active-table-row' : ''}
      >
        <td><span className="location">{`${item.site_address ? item.site_address : ''} ${item.site_city ? item.site_city : ''}${(item.site_city && item.site_state) ? ',' : ''} ${item.site_state ? item.site_state : ''} ${item.site_zip ? item.site_zip : ''}`}</span></td>
        <td><span className="exposure-level">{item.level_name}</span></td>
        <td>
          <ul className="list-unstyled">
            <li>Goal: <span>{item.goal || 'N/A'}</span></li>
            <li>Custom: <span>{item.custom_patient_goal || 'N/A'}</span></li>
          </ul>
        </td>
        <td>
          <ul className="list-unstyled">
            <li>Today: <span>{item.today_count || 0}</span></li>
            <li>Yesterday: <span>{item.yesterday_count || 0}</span></li>
            <li>Campaign: <span>{item.campaign_count || 0}</span></li>
            <li>Grand Total: <span>{item.count_total || 0}</span></li>
          </ul>
        </td>
        <td>
          <ul className="list-unstyled">
            <li>Total Days: <span>{totalDays || 0}</span></li>
            <li>Days Ran: <span>{daysRan || 0}</span></li>
            <li>Days Left: <span>{daysLeft || 0}</span></li>
          </ul>
        </td>
        <td>
          <ul className="list-unstyled">
            {/* <li><span>{item.campaign_name}</span></li> */}
            <li><span>{campaignName}</span></li>
            <li>Start Date: <span>{startDate}</span></li>
            <li>End Date: <span>{endDate}</span></li>
          </ul>
        </td>
        <td>{item.views_count || 0}</td>
        <td>{0}</td>
        <td><a href="#popup-rewards-list" className="lightbox-opener">{item.reward_balance || 0}</a></td>
        <td><a href="#popup-credits-list" className="lightbox-opener">{item.customer_credits || 0}</a></td>
        <td>
          <ul className="list-unstyled">
            <li className="sent">Text Sent: <a href="#popup-text-sent-list" className="lightbox-opener">{item.outbound_text}</a></li>
            <li className="received">Text Received: <a href="#popup-text-received-list" className="lightbox-opener">{item.inbound_text}</a></li>
            <li className="unread">Unread Texts: <a href="#popup-text-unread-list" className="lightbox-opener">{item.unread_text}</a></li>
          </ul>
        </td>
        <td>
          <ul className="list-unstyled">
            <li>{item.count_not_contacted_campaign || 0}</li>
            <li>{item.count_not_contacted || 0}</li>
          </ul>
        </td>
        <td>
          <ul className="list-unstyled">
            <li>{item.call_attempted_campaign || 0}</li>
            <li>{item.call_attempted || 0}</li>
          </ul>
        </td>
        <td>
          <ul className="list-unstyled">
            <li>{item.dnq_campaign || 0}</li>
            <li>{item.dnq || 0}</li>
          </ul>
        </td>
        <td>
          <ul className="list-unstyled">
            <li>{item.action_needed_campaign || 0}</li>
            <li>{item.action_needed || 0}</li>
          </ul>
        </td>
        <td>
          <ul className="list-unstyled">
            <li>{item.scheduled_campaign || 0}</li>
            <li>{item.scheduled || 0}</li>
          </ul>
        </td>
        <td>
          <ul className="list-unstyled">
            <li>{item.consented_campaign || 0}</li>
            <li>{item.consented || 0}</li>
          </ul>
        </td>
        <td>
          <ul className="list-unstyled">
            <li>{item.screen_failed_campaign || 0}</li>
            <li>{item.screen_failed || 0}</li>
          </ul>
        </td>
        <td>
          <ul className="list-unstyled">
            <li>{item.randomized_campaign || 0}</li>
            <li>{item.randomized || 0}</li>
          </ul>
        </td>
      </tr>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  hoverRowIndex: selectHoverRowIndex(),
});

export default connect(mapStateToProps)(StudyItem);
