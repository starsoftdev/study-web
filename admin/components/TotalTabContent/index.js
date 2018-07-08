import React, { Component, PropTypes } from 'react';
import { map } from 'lodash';


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

export class TotalTabContent extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    mediaTotals: PropTypes.object,
  };

  constructor() {
    super();

    this.renderLines = this.renderLines.bind(this);
  }

  renderLines() {
    const { mediaTotals } = this.props;
    const details = (mediaTotals.details.length) ? mediaTotals.details : defaultStats;

    return map(details, (e, i) => {
      if (e.type === 'campaign') {
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

  render() {
    return (
      <div id="totalTabContent">
        <table>
          <thead>
            <tr>
              <th>Media Type</th>
              <th>New Patient</th>
              <th>Call Attempted</th>
              <th>DNQ / NOT INTERESTED</th>
              <th>Action Needed</th>
              <th>Scheduled</th>
              <th>Consented</th>
              <th>Screen Failed</th>
              <th>Randomized</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            { this.renderLines() }
          </tbody>
        </table>
      </div>
    );
  }
}

export default TotalTabContent;
