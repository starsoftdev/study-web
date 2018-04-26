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
      count_not_contacted: (this.props.totals.details.count_not_contacted || this.props.totals.details.count_not_contacted === 0) ? parseInt(this.props.totals.details.count_not_contacted) : 'N/A',
      dnq: (this.props.totals.details.dnq || this.props.totals.details.dnq === 0) ? parseInt(this.props.totals.details.dnq) : 'N/A',
      action_needed: (this.props.totals.details.action_needed || this.props.totals.details.action_needed === 0) ? parseInt(this.props.totals.details.action_needed) : 'N/A',
      scheduled: (this.props.totals.details.scheduled || this.props.totals.details.scheduled === 0) ? parseInt(this.props.totals.details.scheduled) : 'N/A',
      consented: (this.props.totals.details.consented || this.props.totals.details.consented === 0) ? parseInt(this.props.totals.details.consented) : 'N/A',
      screen_failed: (this.props.totals.details.screen_failed || this.props.totals.details.screen_failed === 0) ? parseInt(this.props.totals.details.screen_failed) : 'N/A',
      randomized: (this.props.totals.details.randomized || this.props.totals.details.randomized === 0) ? parseInt(this.props.totals.details.randomized) : 'N/A',
      call_attempted: (this.props.totals.details.call_attempted || this.props.totals.details.call_attempted === 0) ? parseInt(this.props.totals.details.call_attempted) : 'N/A',
    };

    const percentage = this.props.getPercentageObject(totals);

    return (
      <div className="report-page-totals-container">
        {this.props.totals.fetching && <div className="text-center report-page-total-loading-container"><LoadingSpinner showOnlyIcon /></div>}
        <ul className="list-inline list-stats">
          <li>
            <strong className="heading"><span>NEW<br /> PATIENT</span></strong>
            <strong className="number"><span>{totals.count_not_contacted}<span className="small">{`(${percentage.count_not_contacted_p}%)`}</span></span></strong>
          </li>
          <li>
            <strong className="heading"><span>CALL / TEXT<br /> ATTEMPTED</span></strong>
            <strong className="number"><span>{totals.call_attempted}<span className="small">{`(${percentage.call_attempted_p}%)`}</span></span></strong>
          </li>
          <li onClick={() => { this.props.openNotesModal(null, 'Not Qualified / Not Interested', 'DNQ'); }}>
            <strong className="heading"><span>DNQ / NOT<br /> INTERESTED</span></strong>
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
