import React, { Component, PropTypes } from 'react';
import moment from 'moment-timezone';
import { pad } from '../../utils/functions';

export default class DispositionTabContent extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    studies: PropTypes.object,
    active: PropTypes.bool,
  };

  render() {
    const { studies, active } = this.props;
    let key = 0;
    if (active) {
      return (
        <table id="dispositionTable">
          <thead>
            <tr>
              <th>STUDY #</th>
              <th>SITE LOCATION</th>
              <th>SITE ADDRESS</th>
              <th>EXPOSURE LEVEL</th>
              <th>START DATE</th>
              <th>END DATE</th>
              <th>PASSED PRESCREENER</th>
              <th>DID NOT PASS PRESCREENER</th>
              <th>DNQ / NOT INTERESTED</th>
              <th>ALL ATTEMPTS MADE</th>
              <th>TOTAL</th>
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
                  return (
                    <tr key={key++}>
                      <th>{study.study_id}.{pad(campaign.order)}</th>
                      <td>{study.site_name}</td>
                      <td>{study.site_address}</td>
                      <td>{campaign.level_name}</td>
                      <td>{startDate}</td>
                      <td>{endDate}</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
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
        <table id="dispositionTable" />
      );
    }
  }
}
