/*
 *
 * StudyPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Helmet from 'react-helmet';
import StudyFetcher from './StudyFetcher';
import FilterStudyPatients from '../../components/FilterStudyPatients';
import StudyStats from './StudyStats';
import StudyPatients from './StudyPatients';
import { selectCurrentUser } from 'containers/App/selectors';
import { fetchStudy, fetchStudyPatients } from 'containers/StudyPage/actions';
import { createStructuredSelector } from 'reselect';

export class StudyPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    campaigns: PropTypes.array,
    currentUser: PropTypes.any,
    fetchStudy: PropTypes.func,
    fetchStudyPatients: PropTypes.func,
    params: PropTypes.object,
    fetchingPatients: PropTypes.bool,
    patients: PropTypes.array,
    sources: PropTypes.array,
    study: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.fetchStudy = this.props.fetchStudy.bind(this);
    this.fetchStudyPatients = this.props.fetchStudyPatients.bind(this);
  }

  componentDidMount() {
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(searchFilter) {
    this.props.fetchStudyPatients(searchFilter);
  }

  renderStudy() {
    const { patients, campaigns, sources, study } = this.props;
    const pageTitle = `${study.name} - StudyKIK`;

    let campaignOptions = campaigns.map(campaign => (
      {
        label: campaign.name,
        value: campaign.id,
      }
    ));
    campaignOptions.unshift({ label: 'All', value: 0 });
    let sourceOptions = sources.map(source => (
      {
        label: source.name,
        value: source.id,
      }
    ));
    sourceOptions.unshift({ label: 'All', value: 0 });
    return (
      <Helmet title={pageTitle}>
        <div className="container-fluid">
          <section className="individual-study">
            <header className="main-head">
              <h2 className="main-heading">{study.name}</h2>
              <p>
                <span className="info-cell">Location: Seattle, WA</span>
                <span className="info-cell">Sponsor: Motang</span>
                <span className="info-cell">Protocol: YM12345</span>
              </p>
            </header>
            <FilterStudyPatients campaignOptions={campaignOptions} sourceOptions={sourceOptions} handleSubmit={this.handleSubmit} />
            <StudyStats />
            <StudyPatients patients={patients} />
          </section>
        </div>
      </Helmet>
    );
  }

  render() {
    const studyId = parseInt(this.props.params.id, 10);
    return (
      <StudyFetcher studyId={studyId}>
        {this.renderStudy()}
      </StudyFetcher>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchStudy: (values) => dispatch(fetchStudy(values)),
    fetchStudyPatients: (values) => dispatch(fetchStudyPatients(values)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StudyPage);
