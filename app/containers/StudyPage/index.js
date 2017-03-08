/*
 *
 * StudyPage
 *
 */

import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import moment from 'moment-timezone';
import _ from 'lodash';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser, selectSitePatients } from '../../containers/App/selectors';
import { fetchSources } from '../../containers/App/actions';
import LoadingSpinner from '../../components/LoadingSpinner';
import FilterStudyPatients from './FilterStudyPatients';
import StudyStats from './StudyStats';
import PatientBoard from './PatientBoard/index';
import * as Selector from './selectors';
import { fetchPatients, fetchPatientCategories, fetchStudy, setStudyId, updatePatientSuccess, fetchStudyTextNewStats } from './actions';
import {
  selectSocket,
} from '../../containers/GlobalNotifications/selectors';

export class StudyPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    campaigns: PropTypes.array,
    currentUser: PropTypes.any,
    fetchPatients: PropTypes.func.isRequired,
    fetchPatientCategories: PropTypes.func.isRequired,
    fetchingPatientCategories: PropTypes.bool.isRequired,
    fetchingPatients: PropTypes.bool.isRequired,
    fetchStudy: PropTypes.func.isRequired,
    fetchingStudy: PropTypes.bool.isRequired,
    patientCategories: PropTypes.array,
    params: PropTypes.object,
    patients: PropTypes.array,
    setStudyId: PropTypes.func.isRequired,
    sources: PropTypes.array,
    protocol: PropTypes.object,
    site: PropTypes.object,
    study: PropTypes.object,
    stats: PropTypes.object,
    socket: React.PropTypes.any,
    updatePatientSuccess: React.PropTypes.func,
    fetchSources: PropTypes.func,
    sitePatients: React.PropTypes.object,
    fetchStudyTextNewStats: React.PropTypes.func,
  };

  static defaultProps = {
    fetchingStudy: true,
    fetchingPatients: true,
    fetchingPatientCategories: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      socketBinded: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    const { params, setStudyId, fetchStudy, fetchPatientCategories } = this.props;
    setStudyId(parseInt(params.id));
    fetchStudy(params.id);
    fetchPatientCategories(params.id);
    this.props.fetchSources();
  }

  componentWillReceiveProps() {
    const { params, socket } = this.props;
    if (socket && this.state.socketBinded === false) {
      socket.on('notifyMessage', (message) => {
        let curCategoryId = null;

        _.forEach(this.props.patientCategories, (item) => {
          _.forEach(item.patients, (patient) => {
            if (patient.id === message.patient_id) {
              curCategoryId = item.id;
            }
          });
        });

        this.props.fetchStudy(params.id);
        this.props.fetchStudyTextNewStats(params.id);
        this.props.updatePatientSuccess({
          patientId: message.patient_id,
          patientCategoryId: curCategoryId,
          lastTextMessage: { body: message.twilioTextMessage.body, dateSent: message.twilioTextMessage.dateUpdated, dateUpdated: message.twilioTextMessage.dateUpdated },
        });
      });
      this.setState({ socketBinded: true });
    }
  }

  handleSubmit(searchFilter) {
    const { params: { id } } = this.props;
    this.props.fetchPatients(id, searchFilter.text, searchFilter.campaignId, searchFilter.sourceId);
  }

  render() {
    const { fetchingPatientCategories, fetchingStudy, campaigns, patientCategories, protocol, site, sources, study, stats } = this.props;
    const ePMS = (study && (study.patientMessagingSuite || study.patientQualificationSuite));
    if (fetchingStudy || fetchingPatientCategories) {
      return (
        <LoadingSpinner />
      );
    } else if (!study || !sources || !campaigns) {
      return (
        <div>A problem occurred trying to load the page. Please try refreshing the page.</div>
      );
    }
    const pageTitle = `${study.name} - StudyKIK`;
    const campaignOptions = campaigns.map(campaign => (
      {
        label: `${moment(campaign.dateFrom).format('MM/DD/YYYY')} - ${moment(campaign.dateTo).format('MM/DD/YYYY')}`,
        value: campaign.id,
      }
    ));
    campaignOptions.unshift({ label: 'All', value: -1 });
    const sourceOptions = sources.map(source => (
      {
        label: source.type,
        value: source.id,
      }
    ));
    sourceOptions.unshift({ label: 'All', value: -1 });
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
              <span className="info-cell">Protocol: {protocol.number || ''}</span>
            </p>
          </header>
          <FilterStudyPatients
            campaignOptions={campaignOptions}
            sourceOptions={sourceOptions}
            handleSubmit={this.handleSubmit}
            ePMS={ePMS}
          />
          <StudyStats stats={stats} />
          <PatientBoard
            patientCategories={patientCategories}
            ePMS={ePMS}
          />
        </section>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  campaigns: Selector.selectCampaigns(),
  fetchingPatients: Selector.selectFetchingPatients(),
  fetchingPatientCategories: Selector.selectFetchingPatientCategories(),
  fetchingStudy: Selector.selectFetchingStudy(),
  patientCategories: Selector.selectPatientCategories(),
  sources: Selector.selectSources(),
  site: Selector.selectSite(),
  protocol: Selector.selectProtocol(),
  study: Selector.selectStudy(),
  stats: Selector.selectStudyStats(),
  currentUser: selectCurrentUser(),
  socket: selectSocket(),
  sitePatients: selectSitePatients(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchPatients: (studyId, text, campaignId, sourceId) => dispatch(fetchPatients(studyId, text, campaignId, sourceId)),
    fetchPatientCategories: (studyId) => dispatch(fetchPatientCategories(studyId)),
    fetchStudy: (studyId) => dispatch(fetchStudy(studyId)),
    setStudyId: (id) => dispatch(setStudyId(id)),
    updatePatientSuccess: (payload) => dispatch(updatePatientSuccess(payload)),
    fetchSources: () => dispatch(fetchSources()),
    fetchStudyTextNewStats: (studyId) => dispatch(fetchStudyTextNewStats(studyId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StudyPage);
