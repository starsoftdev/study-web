import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment-timezone';

import ExpandableSection from '../../components/ExpandableSection';
import CampaignStatsTable from '../../components/CampaignStatsTable';
import { fetchStudiesForAdmin } from '../App/actions';
import { fetchStudyCampaignsStats, fetchCampaignDetailStats } from './actions';
import { selectStudyInfo, selectStudyCampaigns } from './selectors';

export class AdminStudyStatsPage extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    params: PropTypes.object,
    fetchStudiesForAdmin: PropTypes.func,
    fetchCampaignDetailStats: PropTypes.func,
    fetchStudyCampaignsStats: PropTypes.func,
    studyInfo: PropTypes.object,
    studyCampaigns: PropTypes.object,
  };

  componentDidMount() {
    const { studyId } = this.props.params;
    const { fetchStudiesForAdmin, fetchStudyCampaignsStats } = this.props;
    if (studyId) {
      // load studyId related data.
      fetchStudiesForAdmin({ search: { value: studyId } }, 1, 0);
      fetchStudyCampaignsStats(studyId);
    }
  }

  loadCampaignDetailedStats = (campaignId) => {
    const { fetchCampaignDetailStats } = this.props;
    const { studyId } = this.props.params;
    fetchCampaignDetailStats(studyId, campaignId);
  }

  render() {
    const { studyId } = this.props.params;
    const { studyInfo, studyCampaigns } = this.props;

    return (
      <div id="adminStudyStatsPage">
        <div id="studyGeneralInfo">
          <ul>
            <li><strong>Study number:</strong> {studyId}</li>
            <li><strong>Protocol:</strong> {studyInfo.details && studyInfo.details.protocol_number ? studyInfo.details.protocol_number : 'N/A'}</li>
            <li><strong>Sponsor:</strong> {studyInfo.details && studyInfo.details.sponsor_name ? studyInfo.details.sponsor_name : 'N/A'}</li>
            <li><strong>Cro:</strong> {studyInfo.details && studyInfo.details.cro_name ? studyInfo.details.cro_name : 'N/A'}</li>
            <li><strong>Indication:</strong> {studyInfo.details && studyInfo.details.indication_name ? studyInfo.details.indication_name : 'N/A'}</li>
            <li><strong>Tier:</strong> {studyInfo.details && studyInfo.details.tier_number ? studyInfo.details.tier_number : 'N/A'}</li>
            <li><strong>Site location:</strong> {studyInfo.details && studyInfo.details.site_name ? studyInfo.details.site_name : 'N/A'}</li>
            <li><strong>Site address:</strong> {studyInfo.details && studyInfo.details.site_address ? studyInfo.details.site_address : 'N/A'}</li>
          </ul>
          <ul>
            <li><strong>Last 24 hours:</strong> {studyInfo.details && studyInfo.details.today_count ? studyInfo.details.today_count : 0}</li>
            <li><strong>Grand total:</strong> {studyInfo.details && studyInfo.details.count_total ? studyInfo.details.count_total : 0}</li>
          </ul>
        </div>

        {
          studyCampaigns.details.length > 0 && studyCampaigns.details.map((c, i) => {
            return (
              <div key={i} className="campaignStats">
                <div className="campaignInfo">
                  <span><strong>Campaign:</strong> {c.orderNumber}</span>
                  <span><strong>Exposure level:</strong> {c.levelName}</span>
                  <span><strong>Start date:</strong> {moment(c.dateFrom).format('M/DD/Y')}</span>
                  <span><strong>End date:</strong> {moment(c.dateTo).format('M/DD/Y')}</span>
                </div>
                <ExpandableSection seeMoreHandler={this.loadCampaignDetailedStats.bind(this, c.id) /* eslint-disable-line react/jsx-no-bind */} content={<CampaignStatsTable stats={c.stats} />} />
              </div>
            );
          })
        }
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  studyInfo: selectStudyInfo(),
  studyCampaigns: selectStudyCampaigns(),
});

const mapDispatchToProps = (dispatch) => ({
  fetchStudiesForAdmin: (params, limit, offset) => dispatch(fetchStudiesForAdmin(params, limit, offset)),
  fetchStudyCampaignsStats: (studyId) => dispatch(fetchStudyCampaignsStats(studyId)),
  fetchCampaignDetailStats: (studyId, campaignId) => dispatch(fetchCampaignDetailStats(studyId, campaignId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminStudyStatsPage);
