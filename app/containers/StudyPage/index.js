/*
 *
 * StudyPage
 *
 */

import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from 'containers/App/selectors';
import { setItem } from 'utils/localStorage';
import LoadingSpinner from '../../components/LoadingSpinner';
import FilterStudyPatients from './FilterStudyPatients';
import StudyStats from './StudyStats';
import StudyPatients from './PatientPanel/StudyPatients';
import * as Selector from './selectors';
import { fetchPatients, fetchPatientCategories, fetchStudy } from './actions';

import './styles.less';

export class StudyPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    campaigns: PropTypes.array,
    currentUser: PropTypes.any,
    fetchPatients: PropTypes.func.isRequired,
    fetchPatientCategories: PropTypes.func.isRequired,
    fetchingPatients: PropTypes.bool.isRequired,
    fetchStudy: PropTypes.func.isRequired,
    fetchingStudy: PropTypes.bool.isRequired,
    patientCategories: PropTypes.array,
    params: PropTypes.object,
    patients: PropTypes.array,
    sources: PropTypes.array,
    site: PropTypes.object,
    study: PropTypes.object,
    stats: PropTypes.object,
  };

  static defaultProps = {
    fetchingStudy: true,
    fetchingPatients: true,
  };

  constructor(props) {
    super(props);
    props.fetchStudy(props.params.id, props.params.siteId);
    props.fetchPatientCategories(props.params.id, props.params.siteId);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(searchFilter) {
    const { params: { id, siteId } } = this.props;
    this.props.fetchPatients(id, siteId, searchFilter.text, searchFilter.campaignId, searchFilter.sourceId);
  }

  render() {
    const { fetchingStudy, campaigns, patientCategories, site, sources, study, stats } = this.props;
    if (fetchingStudy) {
      return (
        <LoadingSpinner />
      );
    } else if (!study) {
      return (
        <div>A problem occurred trying to load the page. Please refreshing the page.</div>
      );
    }
    const pageTitle = `${study.name} - StudyKIK`;

    const campaignOptions = campaigns.map(campaign => (
      {
        label: campaign.name,
        value: campaign.id,
      }
    ));
    campaignOptions.unshift({ label: 'All', value: 0 });
    const sourceOptions = sources.map(source => (
      {
        label: source.type,
        value: source.id,
      }
    ));
    sourceOptions.unshift({ label: 'All', value: 0 });
    const siteLocation = site.location;
    let sponsor = 'None';
    if (study.sponsor) {
      sponsor = study.sponsor.name;
    }
    return (
      <div className="container-fluid">
        <Helmet title={pageTitle} />
        <section className="individual-study">
          <header className="main-head">
            <h2 className="main-heading">{study.name}</h2>
            <p>
              <span className="info-cell">Location: {siteLocation}</span>
              <span className="info-cell">Sponsor: {sponsor}</span>
              <span className="info-cell">Protocol: {study.protocolNumber}</span>
            </p>
          </header>
          <FilterStudyPatients
            campaignOptions={campaignOptions}
            sourceOptions={sourceOptions}
            handleSubmit={this.handleSubmit}
          />
          <StudyStats stats={stats} />
          <StudyPatients patientCategories={patientCategories} />
        </section>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  campaigns: Selector.selectCampaigns(),
  fetchingPatients: Selector.selectFetchingPatients(),
  fetchingStudy: Selector.selectFetchingStudy(),
  patientCategories: Selector.selectPatientCategories(),
  sources: Selector.selectSources(),
  site: Selector.selectSite(),
  study: Selector.selectStudy(),
  stats: Selector.selectStudyStats(),
  currentUser: selectCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchPatients: (studyId, siteId, text, campaignId, sourceId) => dispatch(fetchPatients(studyId, siteId, text, campaignId, sourceId)),
    fetchPatientCategories: (studyId, siteId) => dispatch(fetchPatientCategories(studyId, siteId)),
    fetchStudy: (studyId, siteId) => dispatch(fetchStudy(studyId, siteId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StudyPage);
