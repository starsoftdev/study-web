/*
 *
 * DashboardClientAdminsPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { DashboardClientAdminsSearch } from './DashboardClientAdminsSearch';
import { DashboardClientAdminsTable } from './DashboardClientAdminsTable';
import { fetchClientAdmin, addClientAdmin, editClientAdmin, deleteClientAdmin, fetchUsersByRoles, setActiveSort } from './actions';
import selectDashboardClientAdminsPage, { selectDashboardClientAdminsUsersByRoles, selectDashboardClientAdmins, selectDashboardClientAdminSearchFormValues, selectDashboardEditUserProcess, selectPaginationOptions } from './selectors';

import {
  fetchSites,
  getAvailPhoneNumbers,
  fetchClientSites,
} from '../../containers/App/actions';
import {
  selectSiteLocations,
  selectAvailPhoneNumbers,
  selectClientSites,
} from '../../containers/App/selectors';

export class DashboardClientAdminsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    siteLocations: PropTypes.array,
    availPhoneNumbers: PropTypes.array,
    fullSiteLocations: PropTypes.object,
    fetchClientSites: PropTypes.func,
    fetchSites: PropTypes.func,
    getAvailPhoneNumbers: PropTypes.func,
    fetchClientAdmins: PropTypes.func,
    clientAdmins: PropTypes.object,
    addClientAdmin: PropTypes.func,
    editUserProcess: PropTypes.object,
    fetchUsersByRoles: PropTypes.func,
    usersByRoles: PropTypes.object,
    editClientAdmin: PropTypes.func,
    deleteClientAdmin: PropTypes.func,
    paginationOptions: PropTypes.object,
    clientAdminSearchFormValues: PropTypes.object,
    setActiveSort: PropTypes.func,
  };

  componentWillMount() {
    this.props.fetchClientAdmins();
    this.props.fetchUsersByRoles();

    this.props.fetchSites();
    this.props.getAvailPhoneNumbers();
    // TODO: change client_id
    this.props.fetchClientSites(1, {});
  }

  render() {
    console.log('*********Sites*********', this.props.siteLocations);
    console.log('*********Number*********', this.props.availPhoneNumbers);
    console.log('*********ClientSites*****', this.props.fullSiteLocations);
    const { usersByRoles, clientAdmins, editUserProcess, addClientAdmin, editClientAdmin, deleteClientAdmin, paginationOptions, setActiveSort, clientAdminSearchFormValues } = this.props;

    return (
      <div className="container-fluid dashboard-clients-admins">
        <h2 className="main-heading">CLIENT ADMINS</h2>

        <DashboardClientAdminsSearch
          clientAdmins={clientAdmins}
          addClientAdmin={addClientAdmin}
          usersByRoles={usersByRoles}
          editUserProcess={editUserProcess}
        />
        <DashboardClientAdminsTable
          clientAdmins={clientAdmins}
          editClientAdmin={editClientAdmin}
          deleteClientAdmin={deleteClientAdmin}
          editUserProcess={editUserProcess}
          usersByRoles={usersByRoles}
          paginationOptions={paginationOptions}
          clientAdminSearchFormValues={clientAdminSearchFormValues}
          setActiveSort={setActiveSort}
        />

      </div>
    );
  }
}

const mapStateToProps = selectDashboardClientAdminsPage({
  siteLocations : selectSiteLocations(),
  fullSiteLocations : selectClientSites(),
  availPhoneNumbers: selectAvailPhoneNumbers(),
  clientAdmins: selectDashboardClientAdmins(),
  editUserProcess: selectDashboardEditUserProcess(),
  paginationOptions: selectPaginationOptions(),
  usersByRoles: selectDashboardClientAdminsUsersByRoles(),
  clientAdminSearchFormValues: selectDashboardClientAdminSearchFormValues(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchSites:       () => dispatch(fetchSites()),
    fetchClientSites: (clientId, searchParams) => dispatch(fetchClientSites(clientId, searchParams)),
    getAvailPhoneNumbers: () => dispatch(getAvailPhoneNumbers()),
    fetchClientAdmins: () => dispatch(fetchClientAdmin()),
    fetchUsersByRoles: () => dispatch(fetchUsersByRoles()),
    addClientAdmin: (payload) => dispatch(addClientAdmin(payload)),
    editClientAdmin: (payload) => dispatch(editClientAdmin(payload)),
    deleteClientAdmin: (payload) => dispatch(deleteClientAdmin(payload)),
    setActiveSort: (sort, direction) => dispatch(setActiveSort(sort, direction)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardClientAdminsPage);
