/*
 *
 * DashboardManageUsers
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectDashboardManageUsers from './selectors';

import { DashboardManageUsersSearch } from './DashboardManageUsersSearch';
import { DashboardManageUsersTable } from './DashboardManageUsersTable';

export class DashboardManageUsers extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="container-fluid dashboard-manage-users">
        <h2 className="main-heading">MANAGE USERS</h2>

        <DashboardManageUsersSearch />
        <DashboardManageUsersTable />

      </div>
    );
  }
}

const mapStateToProps = selectDashboardManageUsers();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardManageUsers);
