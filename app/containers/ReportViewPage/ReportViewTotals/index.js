import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

export class ReportViewTotals extends React.Component {
  static propTypes = {
  }

  render() {
    return (
      <ul className="list-inline list-stats">
        <li>
          <strong className="heading"><span>REFERRALS</span></strong>
          <strong className="number"><span>1233</span></strong>
        </li>
        <li>
          <strong className="heading"><span>CONTACTED</span></strong>
          <strong className="number"><span>1000 <span className="small">(75%)</span></span></strong>
        </li>
        <li>
          <strong className="heading"><span>NOT<br /> CONTACTED</span></strong>
          <strong className="number"><span>233 <span className="small">(25%)</span></span></strong>
        </li>
        <li>
          <a href="#popup-call-attempted" className="lightbox-opener">
            <strong className="heading"><span>CALL<br /> ATTEMPTED</span></strong>
            <strong className="number"><span>134 <span className="small">(14%)</span></span></strong>
          </a>
        </li>
        <li>
          <a href="#popup-dnq" className="lightbox-opener">
            <strong className="heading"><span>DNQ</span></strong>
            <strong className="number"><span>500 <span className="small">(54%)</span></span></strong>
          </a>
        </li>
        <li>
          <a href="#popup-scheduled" className="lightbox-opener">
            <strong className="heading"><span>SCHEDULED</span></strong>
            <strong className="number"><span>100 <span className="small">(23%)</span></span></strong>
          </a>
        </li>
        <li>
          <a href="#popup-condrnted" className="lightbox-opener">
            <strong className="heading"><span>CONSENTED</span></strong>
            <strong className="number"><span>50 <span className="small">(5%)</span></span></strong>
          </a>
        </li>
        <li>
          <a href="#popup-screen-failed" className="lightbox-opener">
            <strong className="heading"><span>SCREEN<br /> FAILED</span></strong>
            <strong className="number"><span>34 <span className="small">(6%)</span></span></strong>
          </a>
        </li>
        <li>
          <a href="#popup-randomized" className="lightbox-opener">
            <strong className="heading"><span>RANDOMIZED</span></strong>
            <strong className="number"><span>12 <span className="small">(2%)</span></span></strong>
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
