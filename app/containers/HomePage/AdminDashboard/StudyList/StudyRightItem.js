import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';

class StudyItem extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    item: PropTypes.object,
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
    const { item } = this.props;

    const campaignDateFrom = moment(item.campaign_datefrom);
    const campaignDateTo = moment(item.campaign_dateto);

    const totalDays = campaignDateTo.diff(campaignDateFrom, 'days');
    const daysRan = moment.utc().diff(campaignDateFrom, 'days');
    const daysLeft = campaignDateTo.diff(moment.utc(), 'days');

    const startDate = item.campaign_datefrom ? campaignDateFrom.format('MM/DD/YY') : '';
    const endDate = item.campaign_dateto ? campaignDateTo.format('MM/DD/YY') : '';

    return (
      <tr>
        <td><span className="location">{`${item.site_address ? item.site_address : ''} ${item.site_city ? item.site_city : ''} ${item.site_state ? item.site_state : ''} ${item.site_zip ? item.site_zip : ''}`}</span></td>
        <td><span className="exposure-level">{item.level_name}</span></td>
        <td><span className="goal">{item.goal}</span></td>
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
            {/* <li><span>{item.campaign_name}</span></li>*/}
            <li><span>{'Newest'}</span></li>
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
        <td><a href="#popup-new-patient-list" className="lightbox-opener">{item.count_not_contacted}</a></td>
        <td><a href="#popup-call-attempted-list" className="lightbox-opener">{item.call_attempted}</a></td>
        <td><a href="#popup-not-qualitied-list" className="lightbox-opener">{item.dnq}</a></td>
        <td><a href="#popup-action-needed-list" className="lightbox-opener">{item.action_needed}</a></td>
        <td><a href="#popup-scheduled-list" className="lightbox-opener">{item.scheduled}</a></td>
        <td><a href="#popup-consected-list" className="lightbox-opener">{item.consented}</a></td>
        <td><a href="#popup-randomized-list" className="lightbox-opener">{item.randomized}</a></td>
      </tr>
    );
  }
}

const mapStateToProps = createStructuredSelector({
});

export default connect(mapStateToProps)(StudyItem);
