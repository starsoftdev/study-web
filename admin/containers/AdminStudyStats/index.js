import React, { Component, PropTypes } from 'react';

import ExpandableSection from '../../components/ExpandableSection';
import CampaignStatsTable from '../../components/CampaignStatsTable';

export class AdminStudyStatsPage extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    params: PropTypes.object,
  };

  componentDidMount() {
    const { studyId } = this.props.params;
    if (studyId) {
      // load studyId related data.
    }
  }

  render() {
    const { studyId } = this.props.params;
    const studyCampaigns = [
      {
        id: 1,
        exposureLevel: 'Gold',
        startDate: '04/25/2018',
        endDate: '05/25/2018',
      },
      {
        id: 2,
        exposureLevel: 'Silver',
        startDate: '07/25/2018',
        endDate: '08/25/2018',
      },
    ];

    return (
      <div id="adminStudyStatsPage">
        <div id="studyGeneralInfo">
          <ul>
            <li><strong>Study number:</strong> {studyId}</li>
            <li><strong>Protocol:</strong> </li>
            <li><strong>Sponsor:</strong> </li>
            <li><strong>Cro:</strong> </li>
            <li><strong>Indication:</strong> </li>
            <li><strong>Tier:</strong> </li>
            <li><strong>Site location:</strong> </li>
            <li><strong>Site address:</strong> </li>
          </ul>
          <ul>
            <li><strong>Last 24 hours:</strong> 100</li>
            <li><strong>Grand total:</strong> 200</li>
          </ul>
        </div>

        {
          studyCampaigns.map((c, i) => {
            return (
              <div key={i} className="campaignStats">
                <div className="campaignInfo">
                  <span><strong>Campaign:</strong> {c.id}</span>
                  <span><strong>Exposure level:</strong> {c.exposureLevel}</span>
                  <span><strong>Start date:</strong> {c.startDate}</span>
                  <span><strong>End date:</strong> {c.endDate}</span>
                </div>
                <ExpandableSection content={<CampaignStatsTable />} />
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default AdminStudyStatsPage;
