import React, { Component, PropTypes } from 'react';

export default class RangePopups extends Component {
  static propTypes = {
    manuallySetActiveTab: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div id="btnsPopupsHolder">
        <div className="col pull-right no-right-padding">
          <button type="button" className="btn btn-primary pull-right" onClick={() => {}}>
            Download
          </button>
        </div>
        <div className="col pull-right">
          <button type="button" className="btn btn-primary pull-right" onClick={() => this.props.manuallySetActiveTab('studyEndDateRange')}>
            Study End Date Range
          </button>
        </div>
        <div className="col pull-right">
          <button type="button" className="btn btn-primary pull-right" onClick={() => {}}>
            Stats Date Range
          </button>
        </div>
      </div>
    );
  }
}
