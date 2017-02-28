/*
 *
 * DashboardIndicationPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectDashboardIndicationPage from './selectors';

import { DashboardIndicationSearch } from './DashboardIndicationSearch/index';
import { DashboardIndicationTable } from './DashboardIndicationTable';

export class DashboardIndicationPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="container-fluid dashboard-indication">
        <h2 className="main-heading">Indication</h2>

        <DashboardIndicationSearch />
        <DashboardIndicationTable />
      </div>
    );
  }
}

const mapStateToProps = selectDashboardIndicationPage();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardIndicationPage);
