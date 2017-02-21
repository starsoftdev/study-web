/*
 *
 * DashboardPortalsPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectDashboardPortalsPage from './selectors';
import { DashboardPortalsForm } from '../DashboardPortalsPage/DashboardPortalsForm';

export class DashboardPortalsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="container-fluid dashboard-portals">
        <h2 className="main-heading">PORTALS</h2>

        <DashboardPortalsForm />

      </div>
    );
  }
}

const mapStateToProps = selectDashboardPortalsPage();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPortalsPage);
