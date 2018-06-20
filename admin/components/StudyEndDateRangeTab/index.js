import React, { Component } from 'react';

const items = [
  { studyId: 1000001, campaignCount: 3 },
  { studyId: 1000002, campaignCount: 1 },
  { studyId: 1000003, campaignCount: 1 },
  { studyId: 1000004, campaignCount: 1 },
  { studyId: 1000005, campaignCount: 7 },
  { studyId: 1000006, campaignCount: 2 },
  { studyId: 1000007, campaignCount: 1 },
];

export default class ReportTabTable extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {};

  constructor(props) {
    super(props);

    this.state = {};

    this.renderItems = this.renderItems.bind(this);
  }

  renderItems(item, key) {
    return (
      <tr key={key}>
        <th>{item.studyId} - {item.campaignCount}</th>
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
    );
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Study #</th>
            <th>SITE LOCATION</th>
            <th>SITE ADDRESS</th>
            <th>EXPOSURE LEVEL</th>
            <th>START DATE</th>
            <th>END DATE</th>
            <th>GOAL</th>
            <th>TIER</th>
            <th>COLOR</th>
            <th>TOTAL</th>
          </tr>
        </thead>
        <tbody>
          {
            items.map((item, key) => {
              return this.renderItems(item, key);
            })
          }
        </tbody>
      </table>
    );
  }
}
