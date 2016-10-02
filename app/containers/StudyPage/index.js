/*
 *
 * StudyPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from 'containers/App/selectors';
import { setItem } from 'utils/localStorage';
import FilterStudyPatients from '../../components/FilterStudyPatients';
import StudyStats from './StudyStats';
import StudyPatients from './StudyPatients';
import * as Selector from './selectors';

export class StudyPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    campaigns: PropTypes.array,
    currentUser: PropTypes.any,
    fetchStudyPatients: PropTypes.func,
    params: PropTypes.object,
    fetchingPatients: PropTypes.bool.isRequired,
    patients: PropTypes.array,
    sources: PropTypes.array,
    fetchingStudy: PropTypes.bool.isRequired,
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
    const { patients, campaigns, sources, study, studyLoading } = this.props;
    if (study && campaigns && sources) {
      const pageTitle = `${study.name} - StudyKIK`;

      const campaignOptions = campaigns.map(campaign => (
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
              <FilterStudyPatients
                campaignOptions={campaignOptions}
                sourceOptions={sourceOptions}
                handleSubmit={this.handleSubmit}
              />
              <StudyStats />
              <StudyPatients patients={patients} />
            </section>
          </div>
        </Helmet>
      );
    } else if (studyLoading) {
      return (
        <div />
      );
    } else {
      return (
        <div />
      )
    }
  }
}

const mapStateToProps = createStructuredSelector({
  campaigns: Selector.selectCampaigns(),
  patients: Selector.selectPatients(),
  sources: Selector.selectSources(),
  study: Selector.selectStudy(),
  currentUser: selectCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchStudyPatients: (values) => dispatch(fetchStudyPatients(values)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StudyPage);
