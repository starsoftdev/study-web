import React, { Component } from 'react';
import { browserHistory } from 'react-router';

export class MediaStatsBox extends Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();

    this.goToReportsPage = this.goToReportsPage.bind(this);
  }

  goToReportsPage() {
    browserHistory.push('/admin/reports');
  }

  render() {
    return (
      <div id="mediaStatsTable">
        <table onClick={this.goToReportsPage}>
          <thead>
            <tr>
              <th></th>
              <th>New Patient</th>
              <th>Call Attempted</th>
              <th>DNQ / Not Interested</th>
              <th>Action Needed</th>
              <th>Scheduled</th>
              <th>Consented</th>
              <th>Screen Failed</th>
              <th>Randomized</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>StudyKIK</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th>Database</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th>TV</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th>Radio</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th>Digital</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th>Print</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th>Other</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr className="alwaysVisible">
              <th>Campaign Total</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr className="alwaysVisible">
              <th>Grand Total</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default MediaStatsBox;
