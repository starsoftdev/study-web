import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import _, { map, omit, omitBy, isUndefined } from 'lodash';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import { actions as toastrActions } from 'react-redux-toastr';

import SearchPatientsForm from '../../components/SearchPatientsForm/index';
import PatientsList from '../../components/PatientsList/index';
import { fetchIndications, fetchSources, fetchClientSites, fetchProtocols } from '../../containers/App/actions';
import { fetchPatientCategories, fetchPatients, clearPatientsList, resetTextBlast, getTotalPatientsCount } from './actions';
import { selectPaginationOptions, selectPatients } from './selectors';
import { selectCurrentUser, selectSiteLocations } from '../App/selectors';
import {
  selectSocket,
} from '../../containers/GlobalNotifications/selectors';
import { translate } from '../../../common/utilities/localization';

export class PatientDatabasePage extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    fetchIndications: PropTypes.func,
    fetchClientSites: PropTypes.func,
    fetchSources: PropTypes.func,
    fetchPatientCategories: PropTypes.func,
    resetTextBlast: PropTypes.func,
    fetchPatients: PropTypes.func,
    fetchProtocols: PropTypes.func,
    paginationOptions: PropTypes.object,
    patients: PropTypes.object,
    clearPatientsList: PropTypes.func,
    getTotalPatientsCount: PropTypes.func,
    currentUser: PropTypes.object.isRequired,
    socket: React.PropTypes.any,
    sites: PropTypes.array,
    toastrActions: React.PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      socketBinded: false,
    };

    this.searchPatients = this.searchPatients.bind(this);
  }

  componentWillMount() {
    const { fetchIndications, fetchSources, fetchPatientCategories, fetchClientSites, fetchProtocols, currentUser } = this.props;
    fetchIndications();
    fetchSources();
    fetchPatientCategories();
    fetchProtocols(currentUser.roleForClient.id);
    fetchClientSites(currentUser.roleForClient.client_id);
  }

  componentWillReceiveProps(newProps) {
    const { currentUser, socket } = this.props;
    if (newProps.sites && newProps.sites.length > 0 && this.props.sites.length === 0) {
      const userIsAdmin = currentUser.roleForClient.name === 'Super Admin' || currentUser.roleForClient.name === 'Admin';
      if (userIsAdmin) {
        this.props.fetchPatients(currentUser.roleForClient.client_id, { site: 'All', limit: 50, skip: 0 }, this.props.patients.details, { site: 'All' }, false);
      } else {
        let defaultSiteLocation = null;
        if (currentUser.roleForClient.site_id && newProps.sites.length > 0) {
          defaultSiteLocation = _.find(newProps.sites, { id: currentUser.roleForClient.site_id }).id;
        }
        this.props.fetchPatients(currentUser.roleForClient.client_id, { site: defaultSiteLocation, limit: 50, skip: 0 }, this.props.patients.details, { site: defaultSiteLocation }, false);
      }
    }

    if (socket && this.state.socketBinded === false) {
      this.setState({ socketBinded: true }, () => {
        socket.on('notifyPatientsDbReportReady', (data) => {
          if (currentUser.roleForClient && data.url && currentUser.roleForClient.client_id === data.clientId) {
            setTimeout(() => { this.props.toastrActions.remove('loadingToasterForExportDbPatients'); }, 1000);
            location.replace(data.url);
          }
        });
      });
    }
  }

  searchPatients(searchFilter, isSearch, isExport = false) {
    const queryParams = omit(omitBy(searchFilter, isUndefined), ['includeIndication', 'excludeIndication']);
    const savedSearchFilter = { ...searchFilter };

    if (searchFilter.includeIndication) {
      queryParams.includeIndication = map(searchFilter.includeIndication, i => i.value).join(',');
    }
    if (searchFilter.excludeIndication) {
      queryParams.excludeIndication = map(searchFilter.excludeIndication, i => i.value).join(',');
    }

    const { currentUser, paginationOptions } = this.props;
    queryParams.limit = 50;
    if (isSearch) {
      queryParams.skip = 0;
    } else {
      queryParams.skip = (paginationOptions.page) * queryParams.limit;
    }

    if (searchFilter.sort !== undefined && searchFilter.direction !== undefined) {
      queryParams.sort = searchFilter.sort;
      queryParams.direction = searchFilter.direction;
    } else if (paginationOptions.activeSort && paginationOptions.activeDirection) {
      queryParams.sort = paginationOptions.activeSort;
      queryParams.direction = paginationOptions.activeDirection;
    }
    const userIsAdmin = currentUser.roleForClient.name === 'Super Admin' || currentUser.roleForClient.name === 'Admin';
    if (!userIsAdmin && !queryParams.site) {
      queryParams.site = _.find(this.props.sites, { id: currentUser.roleForClient.site_id }).id;
    }
    if (queryParams.clearPatients) {
      this.props.clearPatientsList();
      delete savedSearchFilter.clearPatients;
    }

    if ((queryParams.status !== null && !isUndefined(queryParams.status)) || (queryParams.source !== null && !isUndefined(queryParams.source))
      || queryParams.includeIndication || queryParams.name || queryParams.site
      || queryParams.excludeIndication || queryParams.gender || queryParams.ageFrom
      || queryParams.ageTo || queryParams.bmiFrom || queryParams.bmiTo || !isSearch) {
      this.props.fetchPatients(currentUser.roleForClient.client_id, queryParams, this.props.patients.details, savedSearchFilter, isExport);
    } else {
      this.props.clearPatientsList();
      this.props.resetTextBlast();
      this.props.fetchPatients(currentUser.roleForClient.client_id, queryParams, this.props.patients.details, savedSearchFilter, isExport);
    }
  }

  render() {
    const { paginationOptions } = this.props;
    return (
      <div className="container-fluid">
        <section className="patient-database">
          <Helmet title="Patient Database - StudyKIK" />
          <h2 className="main-heading">{translate('client.page.patientDatabase.mainHeading')}</h2>
          <SearchPatientsForm onSubmit={this.searchPatients} searchPatients={this.searchPatients} paginationOptions={paginationOptions} />

          <PatientsList
            searchPatients={this.searchPatients}
            paginationOptions={paginationOptions}
          />
        </section>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  paginationOptions: selectPaginationOptions(),
  patients: selectPatients(),
  currentUser: selectCurrentUser(),
  sites: selectSiteLocations(),
  socket: selectSocket(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchIndications: () => dispatch(fetchIndications()),
    fetchClientSites: (clientId) => dispatch(fetchClientSites(clientId)),
    fetchSources: () => dispatch(fetchSources()),
    fetchPatientCategories: searchParams => dispatch(fetchPatientCategories(searchParams)),
    fetchPatients: (clientId, searchParams, patients, searchFilter, isExport) => dispatch(fetchPatients(clientId, searchParams, patients, searchFilter, isExport)),
    getTotalPatientsCount: (clientId, siteId) => dispatch(getTotalPatientsCount(clientId, siteId)),
    resetTextBlast: () => dispatch(resetTextBlast()),
    fetchProtocols: (clientRoleId) => dispatch(fetchProtocols(clientRoleId)),
    clearPatientsList: () => dispatch(clearPatientsList()),
    toastrActions: bindActionCreators(toastrActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientDatabasePage);
