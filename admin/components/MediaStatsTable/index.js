import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { map, isEqual, find } from 'lodash';
const defaultStats = [
  {
    type: 'StudyKIK',
    count_not_contacted: 0,
    call_attempted: 0,
    dnq: 0,
    action_needed: 0,
    scheduled: 0,
    consented: 0,
    screen_failed: 0,
    randomized: 0,
    total: 0,
    campaign_total: 0,
  },
  {
    type: 'Database',
    count_not_contacted: 0,
    call_attempted: 0,
    dnq: 0,
    action_needed: 0,
    scheduled: 0,
    consented: 0,
    screen_failed: 0,
    randomized: 0,
    total: 0,
    campaign_total: 0,
  },
  {
    type: 'TV',
    count_not_contacted: 0,
    call_attempted: 0,
    dnq: 0,
    action_needed: 0,
    scheduled: 0,
    consented: 0,
    screen_failed: 0,
    randomized: 0,
    total: 0,
    campaign_total: 0,
  },
  {
    type: 'Radio',
    count_not_contacted: 0,
    call_attempted: 0,
    dnq: 0,
    action_needed: 0,
    scheduled: 0,
    consented: 0,
    screen_failed: 0,
    randomized: 0,
    total: 0,
    campaign_total: 0,
  },
  {
    type: 'Digital',
    count_not_contacted: 0,
    call_attempted: 0,
    dnq: 0,
    action_needed: 0,
    scheduled: 0,
    consented: 0,
    screen_failed: 0,
    randomized: 0,
    total: 0,
    campaign_total: 0,
  },
  {
    type: 'Print',
    count_not_contacted: 0,
    call_attempted: 0,
    dnq: 0,
    action_needed: 0,
    scheduled: 0,
    consented: 0,
    screen_failed: 0,
    randomized: 0,
    total: 0,
    campaign_total: 0,
  },
  {
    type: 'Other',
    count_not_contacted: 0,
    call_attempted: 0,
    dnq: 0,
    action_needed: 0,
    scheduled: 0,
    consented: 0,
    screen_failed: 0,
    randomized: 0,
    total: 0,
    campaign_total: 0,
  },
  {
    type: 'total',
    count_not_contacted: 0,
    call_attempted: 0,
    dnq: 0,
    action_needed: 0,
    scheduled: 0,
    consented: 0,
    screen_failed: 0,
    randomized: 0,
    total: 0,
    campaign_total: 0,
  },
  {
    type: 'campaign',
    count_not_contacted: 0,
    call_attempted: 0,
    dnq: 0,
    action_needed: 0,
    scheduled: 0,
    consented: 0,
    screen_failed: 0,
    randomized: 0,
    total: 0,
    campaign_total: 0,
  },
];

export class MediaStatsBox extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    studies: PropTypes.object,
    mediaTotals: PropTypes.object,
    sources: PropTypes.array,
    campaign: PropTypes.string,
    campaingSelected: PropTypes.bool,
    fetchMediaTotalsForAdmin: PropTypes.func,
    startDate: PropTypes.any,
    endDate: PropTypes.func,
  };

  constructor() {
    super();

    this.goToReportsPage = this.goToReportsPage.bind(this);
    this.renderLines = this.renderLines.bind(this);
    this.renderCampaignTotalLines = this.renderCampaignTotalLines.bind(this);
    this.renderGrandTotalLines = this.renderGrandTotalLines.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const equal = isEqual(newProps.studies.details, this.props.studies.details);
    const studyIdsArr = [];

    if (newProps.studies.details.length && newProps.sources.length && !equal) {
      for (const study of newProps.studies.details) {
        studyIdsArr.push(study.study_id);
      }

      this.props.fetchMediaTotalsForAdmin({
        studyIds: studyIdsArr,
        campaign: newProps.campaign,
        startDate: newProps.startDate,
        endDate: newProps.endDate,
      });
    }
  }

  goToReportsPage() {
    browserHistory.push('/admin/reports');
  }

  renderLines() {
    const { mediaTotals } = this.props;
    const details = (mediaTotals.details.length) ? mediaTotals.details : defaultStats;

    return map(details, (e, i) => {
      if (e.type === 'total' || e.type === 'campaign') {
        return null;
      }

      return (
        <tr key={i}>
          <th>{e.type}</th>
          <td>{e.count_not_contacted}</td>
          <td>{e.call_attempted}</td>
          <td>{e.dnq}</td>
          <td>{e.action_needed}</td>
          <td>{e.scheduled}</td>
          <td>{e.consented}</td>
          <td>{e.screen_failed}</td>
          <td>{e.randomized}</td>
          <td>{(parseInt(e.count_not_contacted) + parseInt(e.call_attempted) + parseInt(e.dnq) + parseInt(e.action_needed) + parseInt(e.scheduled) + parseInt(e.consented) + parseInt(e.screen_failed) + parseInt(e.randomized))}</td>
        </tr>
      );
    });
  }

  renderGrandTotalLines() {
    const { mediaTotals } = this.props;
    const total = (mediaTotals.details.length) ? find(mediaTotals.details, { type: 'total' }) : find(defaultStats, { type: 'total' });

    return (
      <tr className="alwaysVisible">
        <th>Grand Total</th>
        <td>{total.count_not_contacted}</td>
        <td>{total.call_attempted}</td>
        <td>{total.dnq}</td>
        <td>{total.action_needed}</td>
        <td>{total.scheduled}</td>
        <td>{total.consented}</td>
        <td>{total.screen_failed}</td>
        <td>{total.randomized}</td>
        <td>{(parseInt(total.count_not_contacted) + parseInt(total.call_attempted) + parseInt(total.dnq) + parseInt(total.action_needed) + parseInt(total.scheduled) + parseInt(total.consented) + parseInt(total.screen_failed) + parseInt(total.randomized))}</td>
      </tr>
    );
  }

  renderCampaignTotalLines() {
    const { campaingSelected, mediaTotals } = this.props;
    const campaign = (mediaTotals.details.length) ? find(mediaTotals.details, { type: 'campaign' }) : find(defaultStats, { type: 'campaign' });
    const countNotContacted = !campaingSelected ? 'N/A' : campaign.count_not_contacted;
    const callAttempted = !campaingSelected ? 'N/A' : campaign.call_attempted;
    const dnq = !campaingSelected ? 'N/A' : campaign.dnq;
    const actionNeeded = !campaingSelected ? 'N/A' : campaign.action_needed;
    const scheduled = !campaingSelected ? 'N/A' : campaign.scheduled;
    const consented = !campaingSelected ? 'N/A' : campaign.consented;
    const screenFailed = !campaingSelected ? 'N/A' : campaign.screen_failed;
    const randomized = !campaingSelected ? 'N/A' : campaign.randomized;
    const total = !campaingSelected ? 'N/A' : (parseInt(campaign.count_not_contacted) + parseInt(campaign.call_attempted) + parseInt(campaign.dnq) + parseInt(campaign.action_needed) + parseInt(campaign.scheduled) + parseInt(campaign.consented) + parseInt(campaign.screen_failed) + parseInt(campaign.randomized));

    return (
      <tr className="alwaysVisible">
        <th>Campaign Total</th>
        <td>{countNotContacted}</td>
        <td>{callAttempted}</td>
        <td>{dnq}</td>
        <td>{actionNeeded}</td>
        <td>{scheduled}</td>
        <td>{consented}</td>
        <td>{screenFailed}</td>
        <td>{randomized}</td>
        <td>{total}</td>
      </tr>
    );
  }

  render() {
    return (
      <div id="mediaStatsTable">
        <table onClick={this.goToReportsPage}>
          <thead>
            <tr>
              <th></th>
              <th>New Patient</th>
              <th>Call Attempted</th>
              <th>DNQ / Not Interested</th>
              <th>Action Needed</th>
              <th>Scheduled</th>
              <th>Consented</th>
              <th>Screen Failed</th>
              <th>Randomized</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {this.renderLines()}
            {this.renderCampaignTotalLines()}
            {this.renderGrandTotalLines()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default MediaStatsBox;
