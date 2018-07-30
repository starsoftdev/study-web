import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _ from 'lodash';
import moment from 'moment-timezone';

import ExpandableSection from '../../components/ExpandableSection';
import CampaignStatsTable from '../../components/CampaignStatsTable';
import { fetchStudiesForAdmin, fetchTotalsForAdmin, fetchSources } from '../App/actions';
import { selectTotals, selectSources } from '../App/selectors';
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
    fetchTotalsForAdmin: PropTypes.func,
    totals: PropTypes.object,
    sources: PropTypes.array,
    fetchSources: PropTypes.func,
  };

  componentWillMount() {
    const { sources, fetchSources } = this.props;

    if (!sources.length) {
      fetchSources();
    }
  }

  componentWillReceiveProps(newProps) {
    const { studyId } = this.props.params;

    if (newProps.sources !== this.props.sources) {
      const allSources = _.cloneDeep(newProps.sources);
      const defaultSource = allSources.find(s => {
        return s.type === 'StudyKIK';
      });

      if (studyId) {
        // load studyId related data.
        newProps.fetchTotalsForAdmin({ source: defaultSource.id, search: { value: studyId } }, 1, 0);
        newProps.fetchStudiesForAdmin({ search: { value: studyId } }, 1, 0);
        newProps.fetchStudyCampaignsStats(studyId);
      }
    }
  }

  loadCampaignDetailedStats = (campaignId) => {
    const { fetchCampaignDetailStats } = this.props;
    const { studyId } = this.props.params;
    fetchCampaignDetailStats(studyId, campaignId);
  }

  render() {
    const { studyId } = this.props.params;
    const { studyInfo, studyCampaigns, totals } = this.props;

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
            <li><strong>Last 24 hours:</strong> {totals.details && totals.details.total_hours ? totals.details.total_hours : 0}</li>
            <li><strong>Grand total:</strong> {totals.details && totals.details.total_grand ? totals.details.total_grand : 0}</li>
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
  totals: selectTotals(),
  sources: selectSources(),
});

const mapDispatchToProps = (dispatch) => ({
  fetchStudiesForAdmin: (params, limit, offset) => dispatch(fetchStudiesForAdmin(params, limit, offset)),
  fetchTotalsForAdmin: (params, limit, offset) => dispatch(fetchTotalsForAdmin(params, limit, offset)),
  fetchStudyCampaignsStats: (studyId) => dispatch(fetchStudyCampaignsStats(studyId)),
  fetchCampaignDetailStats: (studyId, campaignId) => dispatch(fetchCampaignDetailStats(studyId, campaignId)),
  fetchSources: () => dispatch(fetchSources()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminStudyStatsPage);
