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
import StudyPatients from './StudyPatients';
import * as Selector from './selectors';
import { fetchStudyPatients } from './actions';

import './styles.less';

export class StudyPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    campaigns: PropTypes.array,
    currentUser: PropTypes.any,
    fetchStudyPatients: PropTypes.func,
    fetchingPatients: PropTypes.bool.isRequired,
    fetchingStudy: PropTypes.bool.isRequired,
    params: PropTypes.object,
    patients: PropTypes.array,
    sources: PropTypes.array,
    sites: PropTypes.array,
    study: PropTypes.object,
  };

  static defaultProps = {
    fetchingStudy: true,
    fetchingPatients: true,
  };

  constructor(props) {
    super(props);
    setItem('study_id', this.props.params.id);
    this.fetchStudyPatients = this.props.fetchStudyPatients.bind(this);
  }

  componentDidMount() {
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(searchFilter) {
    this.props.fetchStudyPatients(searchFilter);
  }

  render() {
    const { fetchingStudy, campaigns, patients, sites, sources, study } = this.props;
    if (fetchingStudy) {
      return (
        <LoadingSpinner />
      );
    } else if (study === false) {
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
        label: source.name,
        value: source.id,
      }
    ));
    sourceOptions.unshift({ label: 'All', value: 0 });
    const siteLocation = sites[0].location;
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
          <StudyStats />
          <StudyPatients patients={patients} />
        </section>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  campaigns: Selector.selectCampaigns(),
  fetchingStudy: Selector.selectFetchingStudy(),
  fetchingPatients: Selector.selectFetchingPatients(),
  patients: Selector.selectPatients(),
  sources: Selector.selectSources(),
  sites: Selector.selectSites(),
  study: Selector.selectStudy(),
  currentUser: selectCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchStudyPatients: (values) => dispatch(fetchStudyPatients(values)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StudyPage);
