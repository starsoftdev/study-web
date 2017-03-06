/*
 *
 * DashboardClientAdminsPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectDashboardClientAdminsPage from './selectors';

import { DashboardClientAdminsSearch } from './DashboardClientAdminsSearch';
import { DashboardClientAdminsTable } from './DashboardClientAdminsTable';

export class DashboardClientAdminsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="container-fluid dashboard-clients-admins">
        <h2 className="main-heading">CLIENT ADMINS</h2>

        <DashboardClientAdminsSearch />
        <DashboardClientAdminsTable />

      </div>
    );
  }
}

const mapStateToProps = selectDashboardClientAdminsPage();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardClientAdminsPage);
