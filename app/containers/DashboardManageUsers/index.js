/*
 *
 * DashboardManageUsers
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';

import DashboardManageUsersSearch from './DashboardManageUsersSearch';
import DashboardManageUsersTable from './DashboardManageUsersTable';
import { selectDashboardAdmins, selectDashboardRoles, selectPaginationOptions } from './selectors';
import { fetchAdmins, fetchAdminRoles } from './actions';

export class DashboardManageUsers extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    fetchAdmins: PropTypes.func,
    fetchAdminRoles: PropTypes.func,
    admins: PropTypes.object,
    roles: PropTypes.object,
    paginationOptions: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.loadMore = this.loadMore.bind(this);
  }


  componentWillMount() {
    this.props.fetchAdmins();
    this.props.fetchAdminRoles();
  }

  loadMore() {
    const { fetchAdmins } = this.props;
    const offset = this.props.paginationOptions.page * 10;
    const limit = 10;
    fetchAdmins(limit, offset);
  }


  render() {
    return (
      <div className="container-fluid dashboard-manage-users">
        <Helmet title="Manage Users - StudyKIK" />
        <h2 className="main-heading">MANAGE USERS</h2>

        <DashboardManageUsersSearch
          roles={this.props.roles}
        />
        <DashboardManageUsersTable
          roles={this.props.roles}
          admins={this.props.admins}
          loadMore={this.loadMore}
        />

      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  admins: selectDashboardAdmins(),
  roles: selectDashboardRoles(),
  paginationOptions: selectPaginationOptions(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchAdmins: (limit, skip) => dispatch(fetchAdmins(limit, skip)),
    fetchAdminRoles: () => dispatch(fetchAdminRoles()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardManageUsers);
