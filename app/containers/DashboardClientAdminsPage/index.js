/*
 *
 * DashboardClientAdminsPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { DashboardClientAdminsSearch } from './DashboardClientAdminsSearch';
import { DashboardClientAdminsTable } from './DashboardClientAdminsTable';
import { addMessagingNumber, editMessagingNumber, getAvailPhoneNumbers, fetchSites, fetchClientAdmin, addClientAdmin, editClientAdmin, deleteClientAdmin, fetchUsersByRoles, setActiveSort } from './actions';
import selectDashboardClientAdminsPage, { selectDashboardAddMessagingProcess, selectDashboardEditMessagingProcess, selectDashboardAvailPhoneNumbers, selectDashboardClientSites, selectDashboardClientAdminsUsersByRoles, selectDashboardClientAdmins, selectDashboardClientAdminSearchFormValues, selectDashboardEditUserProcess, selectPaginationOptions } from './selectors';

export class DashboardClientAdminsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    clientSites: PropTypes.object,
    availPhoneNumbers: PropTypes.object,
    fetchSites: PropTypes.func,
    getAvailPhoneNumbers: PropTypes.func,
    fetchClientAdmins: PropTypes.func,
    clientAdmins: PropTypes.object,
    addClientAdmin: PropTypes.func,
    editUserProcess: PropTypes.object,
    editMessagingProcess: PropTypes.object,
    addMessagingProcess: PropTypes.object,
    fetchUsersByRoles: PropTypes.func,
    usersByRoles: PropTypes.object,
    editClientAdmin: PropTypes.func,
    deleteClientAdmin: PropTypes.func,
    paginationOptions: PropTypes.object,
    clientAdminSearchFormValues: PropTypes.object,
    setActiveSort: PropTypes.func,
    editMessagingNumber: PropTypes.func,
    addMessagingNumber: PropTypes.func,
  };

  componentWillMount() {
    this.props.fetchClientAdmins();
    this.props.fetchUsersByRoles();

    this.props.fetchSites();
    this.props.getAvailPhoneNumbers();
  }

  render() {
    const { addMessagingProcess, addMessagingNumber, editMessagingProcess, availPhoneNumbers, editMessagingNumber, clientSites, usersByRoles, clientAdmins, editUserProcess, addClientAdmin, editClientAdmin, deleteClientAdmin, paginationOptions, setActiveSort, clientAdminSearchFormValues } = this.props;
    return (
      <div className="container-fluid dashboard-clients-admins">
        <Helmet title="Client Admins - StudyKIK" />
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
          editMessagingProcess={editMessagingProcess}
          usersByRoles={usersByRoles}
          paginationOptions={paginationOptions}
          clientAdminSearchFormValues={clientAdminSearchFormValues}
          setActiveSort={setActiveSort}
          clientSites={clientSites}
          availPhoneNumbers={availPhoneNumbers}
          editMessagingNumber={editMessagingNumber}
          addMessagingNumber={addMessagingNumber}
          addMessagingProcess={addMessagingProcess}
        />

      </div>
    );
  }
}

const mapStateToProps = selectDashboardClientAdminsPage({
  clientSites : selectDashboardClientSites(),
  availPhoneNumbers: selectDashboardAvailPhoneNumbers(),
  clientAdmins: selectDashboardClientAdmins(),
  editUserProcess: selectDashboardEditUserProcess(),
  paginationOptions: selectPaginationOptions(),
  usersByRoles: selectDashboardClientAdminsUsersByRoles(),
  clientAdminSearchFormValues: selectDashboardClientAdminSearchFormValues(),
  editMessagingProcess: selectDashboardEditMessagingProcess(),
  addMessagingProcess: selectDashboardAddMessagingProcess(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchSites:       () => dispatch(fetchSites()),
    getAvailPhoneNumbers: () => dispatch(getAvailPhoneNumbers()),
    fetchClientAdmins: () => dispatch(fetchClientAdmin()),
    fetchUsersByRoles: () => dispatch(fetchUsersByRoles()),
    addClientAdmin: (payload) => dispatch(addClientAdmin(payload)),
    editClientAdmin: (payload) => dispatch(editClientAdmin(payload)),
    deleteClientAdmin: (payload) => dispatch(deleteClientAdmin(payload)),
    editMessagingNumber: (payload) => dispatch(editMessagingNumber(payload)),
    setActiveSort: (sort, direction) => dispatch(setActiveSort(sort, direction)),
    addMessagingNumber: (payload) => dispatch(addMessagingNumber(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardClientAdminsPage);
