/*
 *
 * DashboardManageUsers
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectDashboardAdmins, selectDashboardRoles } from './selectors';
import { createStructuredSelector } from 'reselect';
import { DashboardManageUsersSearch } from './DashboardManageUsersSearch';
import { DashboardManageUsersTable } from './DashboardManageUsersTable';
import { fetchAdmins, fetchAdminRoles } from './actions';

export class DashboardManageUsers extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    fetchAdmins: PropTypes.func,
    fetchAdminRoles: PropTypes.func,
    admins: PropTypes.object,
    roles: PropTypes.object,
  };

  componentWillMount() {
    this.props.fetchAdmins();
    this.props.fetchAdminRoles();
  }

  render() {
    return (
      <div className="container-fluid dashboard-manage-users">
        <h2 className="main-heading">MANAGE USERS</h2>

        <DashboardManageUsersSearch
          roles={this.props.roles}
        />
        <DashboardManageUsersTable
          roles={this.props.roles}
          admins={this.props.admins}
        />

      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  admins: selectDashboardAdmins(),
  roles: selectDashboardRoles(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchAdmins: () => dispatch(fetchAdmins()),
    fetchAdminRoles: () => dispatch(fetchAdminRoles()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardManageUsers);
