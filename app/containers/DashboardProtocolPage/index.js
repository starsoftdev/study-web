/*
 *
 * DashboardProtocolPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectDashboardProtocolPage from './selectors';

import { DashboardProtocolSearch } from './DashboardProtocolSearch/index';
import { DashboardProtocolTable } from './DashboardProtocolTable';

export class DashboardProtocolPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="container-fluid dashboard-protocol">
        <h2 className="main-heading">Protocol</h2>

        <DashboardProtocolSearch />
        <DashboardProtocolTable />
      </div>
    );
  }
}

const mapStateToProps = selectDashboardProtocolPage();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardProtocolPage);
