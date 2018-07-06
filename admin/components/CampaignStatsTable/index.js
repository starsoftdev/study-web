import React, { PropTypes, Component } from 'react';

export class CampaignStatsTable extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    stats: PropTypes.object,
  };

  render() {
    const { stats } = this.props;

    return (
      <div className="campaignStatsTable">
        <table>
          <thead>
            <tr>
              <th>Media Type</th>
              <th>New Patient</th>
              <th>Call Attempted</th>
              <th>DNQ / Not interested</th>
              <th>Action Needed</th>
              <th>Scheduled</th>
              <th>Consented</th>
              <th>Screen Failed</th>
              <th>Randomized</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr className="alwaysVisible">
              <th>StudyKIK</th>
              <td>{stats.StudyKIK && stats.StudyKIK.count_not_contacted ? stats.StudyKIK.count_not_contacted : 0}</td>
              <td>{stats.StudyKIK && stats.StudyKIK.call_attempted ? stats.StudyKIK.call_attempted : 0}</td>
              <td>{stats.StudyKIK && stats.StudyKIK.dnq ? stats.StudyKIK.dnq : 0}</td>
              <td>{stats.StudyKIK && stats.StudyKIK.action_needed ? stats.StudyKIK.action_needed : 0}</td>
              <td>{stats.StudyKIK && stats.StudyKIK.scheduled ? stats.StudyKIK.scheduled : 0}</td>
              <td>{stats.StudyKIK && stats.StudyKIK.consented ? stats.StudyKIK.consented : 0}</td>
              <td>{stats.StudyKIK && stats.StudyKIK.screen_failed ? stats.StudyKIK.screen_failed : 0}</td>
              <td>{stats.StudyKIK && stats.StudyKIK.randomized ? stats.StudyKIK.randomized : 0}</td>
              <td>
                {
                  (stats.StudyKIK && stats.StudyKIK.count_not_contacted ? parseInt(stats.StudyKIK.count_not_contacted) : 0) + (stats.StudyKIK && stats.StudyKIK.call_attempted ? parseInt(stats.StudyKIK.call_attempted) : 0) + (stats.StudyKIK && stats.StudyKIK.dnq ? parseInt(stats.StudyKIK.dnq) : 0)
                  + (stats.StudyKIK && stats.StudyKIK.action_needed ? parseInt(stats.StudyKIK.action_needed) : 0) + (stats.StudyKIK && stats.StudyKIK.scheduled ? parseInt(stats.StudyKIK.scheduled) : 0)
                  + (stats.StudyKIK && stats.StudyKIK.consented ? parseInt(stats.StudyKIK.consented) : 0) + (stats.StudyKIK && stats.StudyKIK.screen_failed ? parseInt(stats.StudyKIK.screen_failed) : 0) + (stats.StudyKIK && stats.StudyKIK.randomized ? parseInt(stats.StudyKIK.randomized) : 0)
                }
              </td>
            </tr>
            <tr>
              <th>Database</th>
              <td>{stats.Database && stats.Database.count_not_contacted ? stats.Database.count_not_contacted : 0}</td>
              <td>{stats.Database && stats.Database.call_attempted ? stats.Database.call_attempted : 0}</td>
              <td>{stats.Database && stats.Database.dnq ? stats.Database.dnq : 0}</td>
              <td>{stats.Database && stats.Database.action_needed ? stats.Database.action_needed : 0}</td>
              <td>{stats.Database && stats.Database.scheduled ? stats.Database.scheduled : 0}</td>
              <td>{stats.Database && stats.Database.consented ? stats.Database.consented : 0}</td>
              <td>{stats.Database && stats.Database.screen_failed ? stats.Database.screen_failed : 0}</td>
              <td>{stats.Database && stats.Database.randomized ? stats.Database.randomized : 0}</td>
              <td>
                {
                  (stats.Database && stats.Database.count_not_contacted ? parseInt(stats.Database.count_not_contacted) : 0) + (stats.Database && stats.Database.call_attempted ? parseInt(stats.Database.call_attempted) : 0) + (stats.Database && stats.Database.dnq ? parseInt(stats.Database.dnq) : 0)
                  + (stats.Database && stats.Database.action_needed ? parseInt(stats.Database.action_needed) : 0) + (stats.Database && stats.Database.scheduled ? parseInt(stats.Database.scheduled) : 0)
                  + (stats.Database && stats.Database.consented ? parseInt(stats.Database.consented) : 0) + (stats.Database && stats.Database.screen_failed ? parseInt(stats.Database.screen_failed) : 0) + (stats.Database && stats.Database.randomized ? parseInt(stats.Database.randomized) : 0)
                }
              </td>
            </tr>
            <tr>
              <th>TV</th>
              <td>{stats.TV && stats.TV.count_not_contacted ? stats.TV.count_not_contacted : 0}</td>
              <td>{stats.TV && stats.TV.call_attempted ? stats.TV.call_attempted : 0}</td>
              <td>{stats.TV && stats.TV.dnq ? stats.TV.dnq : 0}</td>
              <td>{stats.TV && stats.TV.action_needed ? stats.TV.action_needed : 0}</td>
              <td>{stats.TV && stats.TV.scheduled ? stats.TV.scheduled : 0}</td>
              <td>{stats.TV && stats.TV.consented ? stats.TV.consented : 0}</td>
              <td>{stats.TV && stats.TV.screen_failed ? stats.TV.screen_failed : 0}</td>
              <td>{stats.TV && stats.TV.randomized ? stats.TV.randomized : 0}</td>
              <td>
                {
                  (stats.TV && stats.TV.count_not_contacted ? parseInt(stats.TV.count_not_contacted) : 0) + (stats.TV && stats.TV.call_attempted ? parseInt(stats.TV.call_attempted) : 0) + (stats.TV && stats.TV.dnq ? parseInt(stats.TV.dnq) : 0)
                  + (stats.TV && stats.TV.action_needed ? parseInt(stats.TV.action_needed) : 0) + (stats.TV && stats.TV.scheduled ? parseInt(stats.TV.scheduled) : 0)
                  + (stats.TV && stats.TV.consented ? parseInt(stats.TV.consented) : 0) + (stats.TV && stats.TV.screen_failed ? parseInt(stats.TV.screen_failed) : 0) + (stats.TV && stats.TV.randomized ? parseInt(stats.TV.randomized) : 0)
                }
              </td>
            </tr>
            <tr>
              <th>Radio</th>
              <td>{stats.Radio && stats.Radio.count_not_contacted ? stats.Radio.count_not_contacted : 0}</td>
              <td>{stats.Radio && stats.Radio.call_attempted ? stats.Radio.call_attempted : 0}</td>
              <td>{stats.Radio && stats.Radio.dnq ? stats.Radio.dnq : 0}</td>
              <td>{stats.Radio && stats.Radio.action_needed ? stats.Radio.action_needed : 0}</td>
              <td>{stats.Radio && stats.Radio.scheduled ? stats.Radio.scheduled : 0}</td>
              <td>{stats.Radio && stats.Radio.consented ? stats.Radio.consented : 0}</td>
              <td>{stats.Radio && stats.Radio.screen_failed ? stats.Radio.screen_failed : 0}</td>
              <td>{stats.Radio && stats.Radio.randomized ? stats.Radio.randomized : 0}</td>
              <td>
                {
                  (stats.Radio && stats.Radio.count_not_contacted ? parseInt(stats.Radio.count_not_contacted) : 0) + (stats.Radio && stats.Radio.call_attempted ? parseInt(stats.Radio.call_attempted) : 0) + (stats.Radio && stats.Radio.dnq ? parseInt(stats.Radio.dnq) : 0)
                  + (stats.Radio && stats.Radio.action_needed ? parseInt(stats.Radio.action_needed) : 0) + (stats.Radio && stats.Radio.scheduled ? parseInt(stats.Radio.scheduled) : 0)
                  + (stats.Radio && stats.Radio.consented ? parseInt(stats.Radio.consented) : 0) + (stats.Radio && stats.Radio.screen_failed ? parseInt(stats.Radio.screen_failed) : 0) + (stats.Radio && stats.Radio.randomized ? parseInt(stats.Radio.randomized) : 0)
                }
              </td>
            </tr>
            <tr>
              <th>Digital</th>
              <td>{stats.Digital && stats.Digital.count_not_contacted ? stats.Digital.count_not_contacted : 0}</td>
              <td>{stats.Digital && stats.Digital.call_attempted ? stats.Digital.call_attempted : 0}</td>
              <td>{stats.Digital && stats.Digital.dnq ? stats.Digital.dnq : 0}</td>
              <td>{stats.Digital && stats.Digital.action_needed ? stats.Digital.action_needed : 0}</td>
              <td>{stats.Digital && stats.Digital.scheduled ? stats.Digital.scheduled : 0}</td>
              <td>{stats.Digital && stats.Digital.consented ? stats.Digital.consented : 0}</td>
              <td>{stats.Digital && stats.Digital.screen_failed ? stats.Digital.screen_failed : 0}</td>
              <td>{stats.Digital && stats.Digital.randomized ? stats.Digital.randomized : 0}</td>
              <td>
                {
                  (stats.Digital && stats.Digital.count_not_contacted ? parseInt(stats.Digital.count_not_contacted) : 0) + (stats.Digital && stats.Digital.call_attempted ? parseInt(stats.Digital.call_attempted) : 0) + (stats.Digital && stats.Digital.dnq ? parseInt(stats.Digital.dnq) : 0)
                  + (stats.Digital && stats.Digital.action_needed ? parseInt(stats.Digital.action_needed) : 0) + (stats.Digital && stats.Digital.scheduled ? parseInt(stats.Digital.scheduled) : 0)
                  + (stats.Digital && stats.Digital.consented ? parseInt(stats.Digital.consented) : 0) + (stats.Digital && stats.Digital.screen_failed ? parseInt(stats.Digital.screen_failed) : 0) + (stats.Digital && stats.Digital.randomized ? parseInt(stats.Digital.randomized) : 0)
                }
              </td>
            </tr>
            <tr>
              <th>Print</th>
              <td>{stats.Print && stats.Print.count_not_contacted ? stats.Print.count_not_contacted : 0}</td>
              <td>{stats.Print && stats.Print.call_attempted ? stats.Print.call_attempted : 0}</td>
              <td>{stats.Print && stats.Print.dnq ? stats.Print.dnq : 0}</td>
              <td>{stats.Print && stats.Print.action_needed ? stats.Print.action_needed : 0}</td>
              <td>{stats.Print && stats.Print.scheduled ? stats.Print.scheduled : 0}</td>
              <td>{stats.Print && stats.Print.consented ? stats.Print.consented : 0}</td>
              <td>{stats.Print && stats.Print.screen_failed ? stats.Print.screen_failed : 0}</td>
              <td>{stats.Print && stats.Print.randomized ? stats.Print.randomized : 0}</td>
              <td>
                {
                  (stats.Print && stats.Print.count_not_contacted ? parseInt(stats.Print.count_not_contacted) : 0) + (stats.Print && stats.Print.call_attempted ? parseInt(stats.Print.call_attempted) : 0) + (stats.Print && stats.Print.dnq ? parseInt(stats.Print.dnq) : 0)
                  + (stats.Print && stats.Print.action_needed ? parseInt(stats.Print.action_needed) : 0) + (stats.Print && stats.Print.scheduled ? parseInt(stats.Print.scheduled) : 0)
                  + (stats.Print && stats.Print.consented ? parseInt(stats.Print.consented) : 0) + (stats.Print && stats.Print.screen_failed ? parseInt(stats.Print.screen_failed) : 0) + (stats.Print && stats.Print.randomized ? parseInt(stats.Print.randomized) : 0)
                }
              </td>
            </tr>
            <tr>
              <th>Other</th>
              <td>{stats.Other && stats.Other.count_not_contacted ? stats.Other.count_not_contacted : 0}</td>
              <td>{stats.Other && stats.Other.call_attempted ? stats.Other.call_attempted : 0}</td>
              <td>{stats.Other && stats.Other.dnq ? stats.Other.dnq : 0}</td>
              <td>{stats.Other && stats.Other.action_needed ? stats.Other.action_needed : 0}</td>
              <td>{stats.Other && stats.Other.scheduled ? stats.Other.scheduled : 0}</td>
              <td>{stats.Other && stats.Other.consented ? stats.Other.consented : 0}</td>
              <td>{stats.Other && stats.Other.screen_failed ? stats.Other.screen_failed : 0}</td>
              <td>{stats.Other && stats.Other.randomized ? stats.Other.randomized : 0}</td>
              <td>
                {
                  (stats.Other && stats.Other.count_not_contacted ? parseInt(stats.Other.count_not_contacted) : 0) + (stats.Other && stats.Other.call_attempted ? parseInt(stats.Other.call_attempted) : 0) + (stats.Other && stats.Other.dnq ? parseInt(stats.Other.dnq) : 0)
                  + (stats.Other && stats.Other.action_needed ? parseInt(stats.Other.action_needed) : 0) + (stats.Other && stats.Other.scheduled ? parseInt(stats.Other.scheduled) : 0)
                  + (stats.Other && stats.Other.consented ? parseInt(stats.Other.consented) : 0) + (stats.Other && stats.Other.screen_failed ? parseInt(stats.Other.screen_failed) : 0) + (stats.Other && stats.Other.randomized ? parseInt(stats.Other.randomized) : 0)
                }
              </td>
            </tr>
            <tr>
              <th>Total</th>
              <td>{stats.total && stats.total.count_not_contacted ? stats.total.count_not_contacted : 0}</td>
              <td>{stats.total && stats.total.call_attempted ? stats.total.call_attempted : 0}</td>
              <td>{stats.total && stats.total.dnq ? stats.total.dnq : 0}</td>
              <td>{stats.total && stats.total.action_needed ? stats.total.action_needed : 0}</td>
              <td>{stats.total && stats.total.scheduled ? stats.total.scheduled : 0}</td>
              <td>{stats.total && stats.total.consented ? stats.total.consented : 0}</td>
              <td>{stats.total && stats.total.screen_failed ? stats.total.screen_failed : 0}</td>
              <td>{stats.total && stats.total.randomized ? stats.total.randomized : 0}</td>
              <td>
                {
                  (stats.total && stats.total.count_not_contacted ? parseInt(stats.total.count_not_contacted) : 0) + (stats.total && stats.total.call_attempted ? parseInt(stats.total.call_attempted) : 0) + (stats.total && stats.total.dnq ? parseInt(stats.total.dnq) : 0)
                  + (stats.total && stats.total.action_needed ? parseInt(stats.total.action_needed) : 0) + (stats.total && stats.total.scheduled ? parseInt(stats.total.scheduled) : 0)
                  + (stats.total && stats.total.consented ? parseInt(stats.total.consented) : 0) + (stats.total && stats.total.screen_failed ? parseInt(stats.total.screen_failed) : 0) + (stats.total && stats.total.randomized ? parseInt(stats.total.randomized) : 0)
                }
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default CampaignStatsTable;
