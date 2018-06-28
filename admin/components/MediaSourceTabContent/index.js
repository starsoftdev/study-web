import React, { Component, PropTypes } from 'react';
import moment from 'moment-timezone';
import { pad } from '../../utils/functions';

export default class MediaSourceTabContent extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    studies: PropTypes.object,
    active: PropTypes.bool,
    type: PropTypes.string,
  };

  render() {
    const { studies, active, type } = this.props;
    let key = 0;
    if (active) {
      return (
        <table id="mediaSourceTabContent">
          <thead>
            <tr>
              <th>Study #</th>
              <th>Site Location</th>
              <th>Site Address</th>
              <th>Exposure Level</th>
              <th>Start Date</th>
              <th>End Date</th>
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
            {
              studies.details.map((study) => {
                return study.campaigns.map((campaign) => {
                  const campaignDateFrom = moment(campaign.start_date).tz(study.timezone);
                  const campaignDateTo = moment(campaign.end_date).tz(study.timezone);
                  const startDate = campaign.start_date ? campaignDateFrom.format('MM/DD/YY') : 'TBD';
                  const endDate = campaign.end_date ? campaignDateTo.format('MM/DD/YY') : 'TBD';
                  let total = 0;
                  for (let i = 1; i <= 8; i++) {
                    total += campaign.stats[type][`id-${i}`];
                  }
                  return (
                    <tr key={key++}>
                      <th>{study.study_id}.{pad(campaign.order)}</th>
                      <td>{study.site_name}</td>
                      <td>{study.site_address}</td>
                      <td>{campaign.level_name}</td>
                      <td>{startDate}</td>
                      <td>{endDate}</td>
                      <td>{campaign.stats[type]['id-1']}</td>
                      <td>{campaign.stats[type]['id-2']}</td>
                      <td>{campaign.stats[type]['id-3']}</td>
                      <td>{campaign.stats[type]['id-4']}</td>
                      <td>{campaign.stats[type]['id-5']}</td>
                      <td>{campaign.stats[type]['id-6']}</td>
                      <td>{campaign.stats[type]['id-7']}</td>
                      <td>{campaign.stats[type]['id-8']}</td>
                      <td>{total}</td>
                    </tr>
                  );
                });
              })
            }
          </tbody>
        </table>
      );
    } else {
      return (
        <table id="mediaSourceTabContent" />
      );
    }
  }
}
