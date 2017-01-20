import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

class StudyItem extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    index: PropTypes.number,
    status: PropTypes.string,
    studyInfo: PropTypes.object,
    siteInfo: PropTypes.object,
    indication: PropTypes.array,
    location: PropTypes.string,
    exposureLevel: PropTypes.string,
    goal: PropTypes.number,
    patients: PropTypes.object,
    days: PropTypes.object,
    campaign:PropTypes.object,
    pageViews: PropTypes.number,
    facebookClicks: PropTypes.number,
    rewards: PropTypes.number,
    credits: PropTypes.number,
    texts: PropTypes.object,
    newPatient: PropTypes.number,
    callAttempted: PropTypes.number,
    notQualified: PropTypes.number,
    actionNeeded: PropTypes.number,
    scheduled: PropTypes.number,
    consented: PropTypes.number,
    randomized: PropTypes.number,
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
    const { location, exposureLevel, goal, patients, days, campaign, pageViews, facebookClicks, rewards, credits, texts, newPatient, callAttempted, notQualified, actionNeeded, scheduled, consented, randomized } = this.props;

    return (
      <tr>
        <td><span className="location">{location}</span></td>
        <td><span className="exposure-level">{exposureLevel}</span></td>
        <td><span className="goal">{goal}</span></td>
        <td>
          <ul className="list-unstyled">
            <li>Today: <span>{patients.today}</span></li>
            <li>Yesterday: <span>{patients.yesterday}</span></li>
            <li>Campaign: <span>{patients.campaign}</span></li>
            <li>Grand Total: <span>{patients.grandTotal}</span></li>
          </ul>
        </td>
        <td>
          <ul className="list-unstyled">
            <li>Total Days: <span>{days.totalDays}</span></li>
            <li>Days Ran: <span>{days.daysRan}</span></li>
            <li>Days Left: <span>{days.daysLeft}</span></li>
          </ul>
        </td>
        <td>
          <ul className="list-unstyled">
            <li><span>{campaign.name}</span></li>
            <li>Start Date: <span>{campaign.startDate}</span></li>
            <li>End Date: <span>{campaign.endDate}</span></li>
          </ul>
        </td>
        <td>{pageViews}</td>
        <td>{facebookClicks}</td>
        <td><a href="#popup-rewards-list" className="lightbox-opener">{rewards}</a></td>
        <td><a href="#popup-credits-list" className="lightbox-opener">{credits}</a></td>
        <td>
          <ul className="list-unstyled">
            <li className="sent">Text Sent: <a href="#popup-text-sent-list" className="lightbox-opener">{texts.sent}</a></li>
            <li className="received">Text Received: <a href="#popup-text-received-list" className="lightbox-opener">{texts.received}</a></li>
            <li className="unread">Unread Texts: <a href="#popup-text-unread-list" className="lightbox-opener">{texts.unread}</a></li>
          </ul>
        </td>
        <td><a href="#popup-new-patient-list" className="lightbox-opener">{newPatient}</a></td>
        <td><a href="#popup-call-attempted-list" className="lightbox-opener">{callAttempted}</a></td>
        <td><a href="#popup-not-qualitied-list" className="lightbox-opener">{notQualified}</a></td>
        <td><a href="#popup-action-needed-list" className="lightbox-opener">{actionNeeded}</a></td>
        <td><a href="#popup-scheduled-list" className="lightbox-opener">{scheduled}</a></td>
        <td><a href="#popup-consected-list" className="lightbox-opener">{consented}</a></td>
        <td><a href="#popup-randomized-list" className="lightbox-opener">{randomized}</a></td>
      </tr>
    );
  }
}

const mapStateToProps = createStructuredSelector({
});

export default connect(mapStateToProps)(StudyItem);
