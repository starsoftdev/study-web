import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import graphImage from '../../../assets/images/graph.svg';

export class ReportViewInfo extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    reportsList: PropTypes.object,
    totals: PropTypes.object,
  }


  render() {
    const totals = {
      active: this.props.totals.details.total_active ? parseInt(this.props.totals.details.total_active) : 0,
      inActive: this.props.totals.details.total_inactive ? parseInt(this.props.totals.details.total_inactive) : 0,
      textSent: this.props.totals.details.outbound_text ? parseInt(this.props.totals.details.outbound_text) : 0,
      textReceived: this.props.totals.details.inbound_text ? parseInt(this.props.totals.details.inbound_text) : 0,
      unreadText: this.props.totals.details.unread_text ? parseInt(this.props.totals.details.unread_text) : 0,
      emailSent: 0,
    };

    return (
      <div className="infoarea row">
        <div className="col-xs-6">
          <div className="box table-box">
            <div className="box-holder">
              <i className="icomoon-doctor pull-left" />
              <div className="textbox">
                <h2>Principal <br /> INVESTIGATORS</h2>
              </div>
            </div>
          </div>
          <div className="box table-box">
            <div className="box-holder">
              <ul className="list-inline text-center list-activities alt">
                <li>
                  <span className="sub-title">Active</span>
                  <strong className="number">{totals.active}</strong>
                </li>
                <li>
                  <span className="sub-title">Inactive</span>
                  <strong className="number">{totals.inActive}</strong>
                </li>
                <li>
                  <span className="sub-title">Total</span>
                  <strong className="number">{totals.active + totals.inActive}</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-xs-6 green">
          <div className="box table-box">
            <div className="box-holder">
              <div className="img-holder pull-left">
                <img width="141" height="119" alt=" " src={graphImage} />
              </div>
              <div className="textbox">
                <h2>PATIENT <br />MESSAGES</h2>
              </div>
            </div>
          </div>
          <div className="box table-box">
            <div className="box-holder">
              <ul className="list-inline text-center list-activities">
                <li>
                  <span className="sub-title">Text<br />Sent</span>
                  <strong className="number">{totals.textSent}</strong>
                </li>
                <li>
                  <span className="sub-title">Text<br />Received</span>
                  <strong className="number">{totals.textReceived}</strong>
                </li>
                <li>
                  <span className="sub-title">Unread<br />Text</span>
                  <strong className="number">{totals.unreadText}</strong>
                </li>
                <li>
                  <span className="sub-title">Email<br />Sent</span>
                  <strong className="number">{totals.emailSent}</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({});
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportViewInfo);
