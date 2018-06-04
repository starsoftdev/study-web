/*
 * AdminHome
 *
 */

import React, { Component } from 'react';

import StatsBox from '../../components/StatsBox';
import ExpandableSection from '../../components/ExpandableSection';
import MediaStatsTable from '../../components/MediaStatsTable';

export class AdminHome extends Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <div id="adminHomePage">
        <h1>Admin portal</h1>
        <StatsBox />
        <div id="mediaStatsBox">
          <ExpandableSection content={<MediaStatsTable />} />
        </div>
      </div>
    );
  }
}

export default AdminHome;
