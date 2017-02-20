/*
 *
 * DashboardSponsorPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectDashboardSponsorPage from './selectors';

import { DashboardSponsorSearch } from './DashboardSponsorSearch/index';
import { DashboardSponsorTable } from './DashboardSponsorTable';

export class DashboardSponsorPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="container-fluid dashboard-sponsor">
        <h2 className="main-heading">Sponsor</h2>

        <DashboardSponsorSearch />
        <DashboardSponsorTable />
      </div>
    );
  }
}

const mapStateToProps = selectDashboardSponsorPage();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardSponsorPage);
