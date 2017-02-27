/*
 *
 * DashboardSponsorAdminPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectDashboardSponsorAdminPage from './selectors';

import { DashboardSponsorAdminSearch } from './DashboardSponsorAdminSearch/index';
import { DashboardSponsorAdminTable } from './DashboardSponsorAdminTable';

export class DashboardSponsorAdminPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="container-fluid dashboard-sponsor-admin">
        <h2 className="main-heading">SponsorAdmin</h2>

        <DashboardSponsorAdminSearch />
        <DashboardSponsorAdminTable />
      </div>
    );
  }
}

const mapStateToProps = selectDashboardSponsorAdminPage();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardSponsorAdminPage);
