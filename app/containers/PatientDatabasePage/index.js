import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { map, omit, omitBy, isUndefined } from 'lodash';
import { createStructuredSelector } from 'reselect';

import SearchPatientsForm from '../../components/SearchPatientsForm/index';
import PatientsList from '../../containers/PatientDatabasePage/PatientsList/index';
import { fetchIndications, fetchSources, fetchClientSites } from '../../containers/App/actions';
import { fetchPatientCategories, fetchPatients, clearPatientsList, fetchProtocols } from './actions';
import { selectPaginationOptions, selectPatients } from './selectors';
import { selectCurrentUser } from '../App/selectors';

export class PatientDatabasePage extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    fetchIndications: PropTypes.func,
    fetchClientSites: PropTypes.func,
    fetchSources: PropTypes.func,
    fetchPatientCategories: PropTypes.func,
    fetchPatients: PropTypes.func,
    fetchProtocols: PropTypes.func,
    paginationOptions: PropTypes.object,
    patients: PropTypes.object,
    clearPatientsList: PropTypes.func,
    currentUser: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.searchPatients = this.searchPatients.bind(this);
  }

  componentWillMount() {
    const { fetchIndications, fetchSources, fetchPatientCategories, fetchClientSites, fetchProtocols, currentUser } = this.props;
    fetchIndications();
    fetchSources();
    fetchPatientCategories();
    fetchProtocols();
    fetchClientSites(currentUser.roleForClient.client_id);
  }

  searchPatients(searchFilter, isSearch, isExport = false) {
    const queryParams = omit(omitBy(searchFilter, isUndefined), ['includeIndication', 'excludeIndication']);

    if (searchFilter.includeIndication) {
      queryParams.includeIndication = map(searchFilter.includeIndication, i => i.value).join(',');
    }
    if (searchFilter.excludeIndication) {
      queryParams.excludeIndication = map(searchFilter.excludeIndication, i => i.value).join(',');
    }

    const { currentUser, paginationOptions } = this.props;
    queryParams.limit = 15;
    if (isSearch) {
      queryParams.skip = 0;
    } else {
      queryParams.skip = (paginationOptions.page) * 15;
    }

    if (searchFilter.sort !== undefined && searchFilter.direction !== undefined) {
      queryParams.sort = searchFilter.sort;
      queryParams.direction = searchFilter.direction;
    } else if (paginationOptions.activeSort && paginationOptions.activeDirection) {
      queryParams.sort = paginationOptions.activeSort;
      queryParams.direction = paginationOptions.activeDirection;
    }

    if (queryParams.status !== null || queryParams.source !== null || queryParams.includeIndication || queryParams.name
      || queryParams.site || queryParams.excludeIndication || queryParams.gender || queryParams.ageFrom ||
      queryParams.ageTo || queryParams.bmiFrom || queryParams.bmiTo) {
      this.props.fetchPatients(currentUser.roleForClient.client_id, queryParams, this.props.patients.details, searchFilter, isExport);
    } else {
      this.props.clearPatientsList();
    }
  }

  render() {
    const { paginationOptions } = this.props;
    return (
      <div className="container-fluid">
        <section className="patient-database">
          <Helmet title="Patient Database - StudyKIK" />
          <h2 className="main-heading">Patient Database</h2>
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
});

function mapDispatchToProps(dispatch) {
  return {
    fetchIndications: () => dispatch(fetchIndications()),
    fetchClientSites: (clientId) => dispatch(fetchClientSites(clientId)),
    fetchSources: () => dispatch(fetchSources()),
    fetchPatientCategories: searchParams => dispatch(fetchPatientCategories(searchParams)),
    fetchPatients: (clientId, searchParams, patients, searchFilter, isExport) => dispatch(fetchPatients(clientId, searchParams, patients, searchFilter, isExport)),
    fetchProtocols: () => dispatch(fetchProtocols()),
    clearPatientsList: () => dispatch(clearPatientsList()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientDatabasePage);
