/*
 * AdminHome
 *
 */

import React, { Component } from 'react';

import StatsBox from '../../components/StatsBox';

export class AdminHome extends Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <div id="adminHomePage">
        <h1>Admin portal</h1>
        <StatsBox />
      </div>
    );
  }
}

export default AdminHome;
