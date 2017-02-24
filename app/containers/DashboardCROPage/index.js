/*
 *
 * DashboardCROPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectDashboardCROPage from './selectors';

import { DashboardCROSearch } from './DashboardCROSearch/index';
import { DashboardCROTable } from './DashboardCROTable';

export class DashboardCROPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="container-fluid dashboard-cro">
        <h2 className="main-heading">CRO</h2>

        <DashboardCROSearch />
        <DashboardCROTable />
      </div>
    );
  }
}

const mapStateToProps = selectDashboardCROPage();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardCROPage);
