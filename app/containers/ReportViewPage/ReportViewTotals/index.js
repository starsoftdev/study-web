import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import LoadingSpinner from '../../../components/LoadingSpinner';

export class ReportViewTotals extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    reportsList: PropTypes.object,
    getPercentageObject: PropTypes.func,
    totals: PropTypes.object,
    openNotesModal: PropTypes.func,
  }

  render() {
    const totals = {
      count_not_contacted: this.props.totals.details.count_not_contacted ? parseInt(this.props.totals.details.count_not_contacted) : 0,
      dnq: this.props.totals.details.dnq ? parseInt(this.props.totals.details.dnq) : 0,
      action_needed: this.props.totals.details.action_needed ? parseInt(this.props.totals.details.action_needed) : 0,
      scheduled: this.props.totals.details.scheduled ? parseInt(this.props.totals.details.scheduled) : 0,
      consented: this.props.totals.details.consented ? parseInt(this.props.totals.details.consented) : 0,
      screen_failed: this.props.totals.details.screen_failed ? parseInt(this.props.totals.details.screen_failed) : 0,
      randomized: this.props.totals.details.randomized ? parseInt(this.props.totals.details.randomized) : 0,
      call_attempted: this.props.totals.details.call_attempted ? parseInt(this.props.totals.details.call_attempted) : 0,
    };

    const percentage = this.props.getPercentageObject(totals);

    return (
      <div className="report-page-totals-container">
        {this.props.totals.fetching && <div className="text-center report-page-total-loading-container"><LoadingSpinner showOnlyIcon /></div>}
        <ul className="list-inline list-stats">
          <li>
            <strong className="heading"><span>NOT<br /> CONTACTED</span></strong>
            <strong className="number"><span>{totals.count_not_contacted}<span className="small">{`(${percentage.count_not_contacted_p}%)`}</span></span></strong>
          </li>
          <li>
            <strong className="heading"><span>CALL<br /> ATTEMPTED</span></strong>
            <strong className="number"><span>{totals.call_attempted}<span className="small">{`(${percentage.call_attempted_p}%)`}</span></span></strong>
          </li>
          <li onClick={() => { this.props.openNotesModal(null, 'Not Qualified / Not Interested', 'DNQ'); }}>
            <strong className="heading"><span>DNQ</span></strong>
            <strong className="number pointer"><span>{totals.dnq}<span className="small">{`(${percentage.dnq_p}%)`}</span></span></strong>
          </li>
          <li onClick={() => { this.props.openNotesModal(null, 'Action Needed', 'ACTION NEEDED'); }}>
            <strong className="heading"><span>ACTION NEEDED</span></strong>
            <strong className="number pointer"><span>{totals.action_needed}<span className="small">{`(${percentage.action_needed_p}%)`}</span></span></strong>
          </li>
          <li>
            <strong className="heading"><span>SCHEDULED</span></strong>
            <strong className="number"><span>{totals.scheduled}<span className="small">{`(${percentage.scheduled_p}%)`}</span></span></strong>
          </li>
          <li>
            <strong className="heading"><span>CONSENTED</span></strong>
            <strong className="number"><span>{totals.consented}<span className="small">{`(${percentage.consented_p}%)`}</span></span></strong>
          </li>
          <li onClick={() => { this.props.openNotesModal(null, 'Screen Failed', 'SCREEN FAILED'); }}>
            <strong className="heading"><span>SCREEN<br /> FAILED</span></strong>
            <strong className="number pointer"><span>{totals.screen_failed}<span className="small">{`(${percentage.screen_failed_p}%)`}</span></span></strong>
          </li>
          <li>
            <strong className="heading"><span>RANDOMIZED</span></strong>
            <strong className="number"><span>{totals.randomized}<span className="small">{`(${percentage.randomized_p}%)`}</span></span></strong>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({});
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportViewTotals);
