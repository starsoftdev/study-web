import React, { Component, PropTypes } from 'react';
import Button from 'react-bootstrap/lib/Button';
import { Field, reduxForm } from 'redux-form';
import { browserHistory } from 'react-router';
import moment from 'moment-timezone';
import InfiniteScroll from 'react-infinite-scroller';

import ReactSelect from '../../components/Input/ReactSelect';
import LoadingSpinner from '../../components/LoadingSpinner';

const campaignOptions = [
  {
    label: '1',
    value: '1',
  }, {
    label: '2',
    value: '2',
  }, {
    label: '3',
    value: '3',
  },
];

@reduxForm({
  form: 'adminInfoFilter',
  enableReinitialize: true,
})
export class StudyInfo extends Component {
  static propTypes = {
    studies: PropTypes.object,
    totals: PropTypes.object,
    filtersFormValues: PropTypes.object,
    paginationOptions: PropTypes.object,
    fetchStudiesAccordingToFilters: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.state = {};

    this.goToStudyStatsPage = this.goToStudyStatsPage.bind(this);
    this.goToStudyEditPage = this.goToStudyEditPage.bind(this);
    this.loadItems = this.loadItems.bind(this);
  }

  goToStudyStatsPage(studyId) {
    browserHistory.push(`/admin/studyStats/${studyId}`);
  }

  goToStudyEditPage(studyId) {
    browserHistory.push(`/admin/studies/${studyId}/edit`);
  }

  loadItems() {
    if (this.props.studies.details.length > 0) {
      this.props.fetchStudiesAccordingToFilters(null, null, true);
    }
  }

  renderStudyTiles(study, key) {
    // campaign_datefrom and campaign_dateto can be null, if it set to TBD
    const campaignDateFrom = moment(study.campaign_datefrom).tz(study.timezone);
    const campaignDateTo = moment(study.campaign_dateto).tz(study.timezone);
    const totalDays = campaignDateTo.diff(campaignDateFrom, 'days');
    let daysRan = moment.utc().diff(campaignDateFrom, 'days');
    let daysLeft = campaignDateTo.diff(moment.utc(), 'days');

    if (daysLeft < 0) {
      daysLeft = 0;
    }

    if (daysRan < 0) {
      daysRan = 0;
    }

    if (daysRan > totalDays) {
      daysRan = totalDays;
    }

    // handle case when campaign dates is set to TBD or when campaign_count is null
    let percent;
    if (study.campaign_datefrom === null || study.campaign_dateto === null) {
      percent = null;
    } else if (study.campaign_count === null) {
      percent = 0;
    } else {
      percent = ((study.campaign_count || 0) / (study.goal || 1)) * (totalDays / daysRan) * 100;
    }
    percent = isFinite(percent) ? percent : 0;

    const startDate = study.campaign_datefrom ? campaignDateFrom.format('MM/DD/YY') : 'TBD';
    const endDate = study.campaign_dateto ? campaignDateTo.format('MM/DD/YY') : 'TBD';

    let campaignName = this.props.filtersFormValues.campaign ? this.props.filtersFormValues.campaign.toString() : '1';
    campaignName = campaignName.charAt(0).toUpperCase() + campaignName.slice(1);

    return (
      <section key={key}>
        <div className="part study clickable" onClick={() => this.goToStudyEditPage(study.study_id)}>
          <div className="title">study</div>
          <ul>
            <li>#{key + 1}</li>
            <li><label>STUDY NUMBER: </label><span>{study.study_id}</span></li>
            <li><label>STATUS: </label><span>{study.isPublic ? 'ON' : 'OFF'}</span></li>
            <li><label>PROTOCOL: </label><span>{study.protocol_number || 'N/A'}</span></li>
            <li><label>SPONSOR: </label><span>{study.sponsor_name || 'N/A'}</span></li>
            <li><label>CRO: </label><span>{study.cro_name || 'N/A'}</span></li>
            <li><label>INDICATION: </label><span>{study.indication_name || 'N/A'}</span></li>
            <li><label>PERCENTAGE: </label><span>{(percent !== null) ? `${percent.toFixed(2)}%` : 'N/A'}</span></li>
            <li><label>COLOR: </label><span className={`color ${study.color || ''}`}>{`${study.color ? study.color.toUpperCase() : 'N/A'}`}</span></li>
          </ul>
        </div>
        <div className="part info clickable" onClick={() => this.goToStudyEditPage(study.study_id)}>
          <div className="title">info</div>
          <ul>
            <li><label>SITE LOCATION: </label><span>{study.site_name}</span></li>
            <li><label>SITE NUMBER: </label><span>{study.site_id}</span></li>
            <li><label>ADDRESS: </label><span>{study.site_address}</span></li>
            <li><label>PAGE VIEWS: </label><span>{study.views_count || 0}</span></li>
            <li><label>UNREAD TEXTS: </label><span>{study.unread_text || 0}</span></li>
            <li><label>AO: </label><span>{study.sm_user_first_name ? `${study.sm_user_first_name} ${study.sm_user_last_name}` : 'N/A'}</span></li>
            <li><label>BD: </label><span>{study.bd_user_first_name ? `${study.bd_user_first_name} ${study.bd_user_last_name}` : 'N/A'}</span></li>
            <li><label>CC: </label><span>{study.cc_user_first_name ? `${study.cc_user_first_name} ${study.cc_user_last_name}` : 'N/A'}</span></li>
          </ul>
        </div>
        <div className="part campaign clickable" onClick={() => this.goToStudyEditPage(study.study_id)}>
          <div className="title">campaign</div>
          <ul>
            <li><label>EXPOSURE LEVEL: </label><span>{study.level_name}</span></li>
            <li><label>TIER: </label><span>{study.tier_number}</span></li>
            <li><label>GOAL: </label><span>{study.goal || 'N/A'}</span></li>
            <li><label>CAMPAIGN NUMBER :</label><span>{campaignName}</span></li>
            <li><label>START DATE: </label><span>{startDate}</span></li>
            <li><label>END DATE: </label><span>{endDate}</span></li>
            <li><label>TOTAL DAYS: </label><span>{totalDays || 0}</span></li>
            <li><label>DAYS LEFT: </label><span>{daysLeft || 0}</span></li>
            <li><label>CENTRAL: </label></li>
            <li><label>PQS: </label><span>{study.patient_qualification_suite ? 'ON' : 'OFF'}</span></li>
          </ul>
        </div>
        <div className="part stat clickable" onClick={() => this.goToStudyStatsPage(study.study_id)}>
          <div className="title">stats</div>
          <ul>
            <li><label>LAST 24 HOURS: </label><span>{study.today_count || 0}</span></li>
            <li><label>CAMPAIGN TOTAL: </label><span>{study.campaign_count || 0}</span></li>
            <li><label>GRAND TOTAL: </label><span>{study.count_total}</span></li>
            <li><label>NEW PATIENT: </label><span>{study.count_not_contacted_campaign || 0}</span></li>
            <li><label>CALL / TEXT ATTEMPTED: </label><span>{study.call_attempted_campaign || 0}</span></li>
            <li><label>DNQ / NOT INTERESTED: </label><span>{study.dnq_campaign || 0}</span></li>
            <li><label>ACTION NEEDED: </label><span>{study.action_needed_campaign || 0}</span></li>
            <li><label>SCHEDULED: </label><span>{study.scheduled_campaign || 0}</span></li>
            <li><label>CONSENTED: </label><span>{study.consented_campaign || 0}</span></li>
            <li><label>SCREEN FAILED: </label><span>{study.screen_failed_campaign || 0}</span></li>
            <li><label>RANDOMIZED: </label><span>{study.randomized_campaign || 0}</span></li>
          </ul>
        </div>
      </section>
    );
  }

  render() {
    const { studies, totals, paginationOptions } = this.props;
    return (
      <div id="infoSection">
        {(totals.details && totals.details.total_studies) && (
          <div className="head">
            <h2 className="pull-left">
              <span>Active: {totals.details.total_active || 0}</span>
              <span>Inactive: {totals.details.total_inactive || 0}</span>
              <span>Total: {totals.details.total_studies || 0}</span>
            </h2>
            <div className="btns pull-right">
              <form className="admin-info-filter">
                <div className="select pull-left">
                  <Field
                    name="campaign-search"
                    className="campaign-search"
                    component={ReactSelect}
                    placeholder="Select Campaign"
                    searchPlaceholder="Search"
                    searchable
                    options={campaignOptions}
                    customSearchIconClass="icomoon-icon_search2"
                    onChange={this.campaignChanged}
                  />
                </div>
                <Button bsStyle="primary" className="pull-left" onClick={() => {}}>
                  <i className="icomoon-icon_calendar" />
                  &nbsp;Date Range
                </Button>
              </form>
            </div>
          </div>
        )}

        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadItems}
          initialLoad={false}
          hasMore={paginationOptions.hasMoreItems}
        >
          <div className="tiles">
            {
              studies.details.map((study, key) => this.renderStudyTiles(study, key))
            }
          </div>
          {studies.fetching &&
          <div className="loading"><LoadingSpinner showOnlyIcon /></div>}
        </InfiniteScroll>

      </div>
    );
  }
}

export default StudyInfo;
