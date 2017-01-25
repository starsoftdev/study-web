import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _ from 'lodash';

export class ReportViewTotals extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    reportsList: PropTypes.object,
    getPercentageObject: PropTypes.func,
  }

  render() {
    const totals = {
      count_total: 0,
      count_contacted: 0,
      count_not_contacted: 0,
      dnq: 0,
      scheduled: 0,
      consented: 0,
      screen_failed: 0,
      randomized: 0,
      call_attempted: 0,
    };

    _.forEach(this.props.reportsList.details, (item) => {
      totals.count_total += parseInt(item.count_total);
      totals.count_contacted += parseInt(item.count_contacted);
      totals.count_not_contacted += parseInt(item.count_not_contacted);
      totals.call_attempted += parseInt(item.call_attempted);
      totals.dnq += parseInt(item.dnq);
      totals.scheduled += parseInt(item.scheduled);
      totals.consented += parseInt(item.consented);
      totals.screen_failed += parseInt(item.screen_failed);
      totals.randomized += parseInt(item.randomized);
    });

    const percentage = this.props.getPercentageObject(totals);

    return (
      <ul className="list-inline list-stats">
        <li>
          <strong className="heading"><span>REFERRALS</span></strong>
          <strong className="number"><span>{totals.count_total}</span></strong>
        </li>
        <li>
          <strong className="heading"><span>CONTACTED</span></strong>
          <strong className="number"><span>{totals.count_contacted}<span className="small">{`(${percentage.count_contacted_p}%)`}</span></span></strong>
        </li>
        <li>
          <strong className="heading"><span>NOT<br /> CONTACTED</span></strong>
          <strong className="number"><span>{totals.count_not_contacted}<span className="small">{`(${percentage.count_not_contacted_p}%)`}</span></span></strong>
        </li>
        <li>
          <a href="#popup-call-attempted" className="lightbox-opener">
            <strong className="heading"><span>CALL<br /> ATTEMPTED</span></strong>
            <strong className="number"><span>{totals.call_attempted}<span className="small">{`(${percentage.call_attempted_p}%)`}</span></span></strong>
          </a>
        </li>
        <li>
          <a href="#popup-dnq" className="lightbox-opener">
            <strong className="heading"><span>DNQ</span></strong>
            <strong className="number"><span>{totals.dnq}<span className="small">{`(${percentage.dnq_p}%)`}</span></span></strong>
          </a>
        </li>
        <li>
          <a href="#popup-scheduled" className="lightbox-opener">
            <strong className="heading"><span>SCHEDULED</span></strong>
            <strong className="number"><span>{totals.scheduled}<span className="small">{`(${percentage.scheduled_p}%)`}</span></span></strong>
          </a>
        </li>
        <li>
          <a href="#popup-condrnted" className="lightbox-opener">
            <strong className="heading"><span>CONSENTED</span></strong>
            <strong className="number"><span>{totals.consented}<span className="small">{`(${percentage.consented_p}%)`}</span></span></strong>
          </a>
        </li>
        <li>
          <a href="#popup-screen-failed" className="lightbox-opener">
            <strong className="heading"><span>SCREEN<br /> FAILED</span></strong>
            <strong className="number"><span>{totals.screen_failed}<span className="small">{`(${percentage.screen_failed_p}%)`}</span></span></strong>
          </a>
        </li>
        <li>
          <a href="#popup-randomized" className="lightbox-opener">
            <strong className="heading"><span>RANDOMIZED</span></strong>
            <strong className="number"><span>{totals.randomized}<span className="small">{`(${percentage.randomized_p}%)`}</span></span></strong>
          </a>
        </li>
      </ul>
    );
  }
}

const mapStateToProps = createStructuredSelector({});
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportViewTotals);
