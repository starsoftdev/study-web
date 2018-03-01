/*
 *
 * DashboardClientAdminsPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import DashboardClientAdminsSearch from './DashboardClientAdminsSearch';
import DashboardClientAdminsTable from './DashboardClientAdminsTable';
import {
  addMessagingNumber,
  editMessagingNumber,
  getAvailPhoneNumbers,
  fetchClientAdmin,
  addClientAdmin,
  editClientAdmin,
  deleteClientAdmin,
  fetchUsersByRoles,
  setActiveSort,
  setSearchQuery,
} from './actions';
import {
  selectDashboardAddMessagingProcess,
  selectDashboardEditMessagingProcess,
  selectDashboardAvailPhoneNumbers,
  selectDashboardClientSites,
  selectDashboardClientAdminsUsersByRoles,
  selectDashboardClientAdmins,
  selectDashboardClientAdminSearchFormValues,
  selectDashboardEditUserProcess,
  selectPaginationOptions,
} from './selectors';

export class DashboardClientAdminsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    clientSites: PropTypes.object,
    availPhoneNumbers: PropTypes.object,
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
    setSearchQuery: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.loadMore = this.loadMore.bind(this);
    this.onSubmitQuery = this.onSubmitQuery.bind(this);
  }

  componentWillMount() {
    this.props.fetchClientAdmins();
    this.props.fetchUsersByRoles();

    this.props.getAvailPhoneNumbers();
  }

  onSubmitQuery(query) {
    const { fetchClientAdmins } = this.props;
    this.props.setSearchQuery(query);
    const offset = 0;
    const limit = 50;
    fetchClientAdmins(query, limit, offset);
  }

  loadMore() {
    const { fetchClientAdmins, clientAdmins } = this.props;
    if (!clientAdmins.fetching) {
      const query = this.props.paginationOptions.query;
      const offset = this.props.paginationOptions.page * 50;
      const limit = 50;
      fetchClientAdmins(query, limit, offset);
    }
  }

  render() {
    const { addMessagingProcess, addMessagingNumber, editMessagingProcess, availPhoneNumbers, editMessagingNumber, clientSites, usersByRoles, clientAdmins, editUserProcess, addClientAdmin, editClientAdmin, deleteClientAdmin, setActiveSort, clientAdminSearchFormValues } = this.props;
    return (
      <div className="container-fluid dashboard-clients-admins">
        <Helmet title="Client Admins - StudyKIK" />
        <h2 className="main-heading">CLIENT ADMINS</h2>

        <DashboardClientAdminsSearch
          clientAdmins={clientAdmins}
          addClientAdmin={addClientAdmin}
          usersByRoles={usersByRoles}
          editUserProcess={editUserProcess}
          onSubmitQuery={this.onSubmitQuery}
        />
        <DashboardClientAdminsTable
          loadMore={this.loadMore}
          editClientAdmin={editClientAdmin}
          deleteClientAdmin={deleteClientAdmin}
          editUserProcess={editUserProcess}
          editMessagingProcess={editMessagingProcess}
          usersByRoles={usersByRoles}
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

const mapStateToProps = createStructuredSelector({
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
    getAvailPhoneNumbers: () => dispatch(getAvailPhoneNumbers()),
    fetchClientAdmins: (query, limit, offset) => dispatch(fetchClientAdmin(query, limit, offset)),
    fetchUsersByRoles: () => dispatch(fetchUsersByRoles()),
    addClientAdmin: (payload) => dispatch(addClientAdmin(payload)),
    editClientAdmin: (payload) => dispatch(editClientAdmin(payload)),
    deleteClientAdmin: (payload) => dispatch(deleteClientAdmin(payload)),
    editMessagingNumber: (payload) => dispatch(editMessagingNumber(payload)),
    setActiveSort: (sort, direction) => dispatch(setActiveSort(sort, direction)),
    addMessagingNumber: (payload) => dispatch(addMessagingNumber(payload)),
    setSearchQuery: (query) => dispatch(setSearchQuery(query)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardClientAdminsPage);
