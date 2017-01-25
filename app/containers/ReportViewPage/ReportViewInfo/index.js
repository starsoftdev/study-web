import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import graphImage from 'assets/images/graph.svg';

import _ from 'lodash';

export class ReportViewInfo extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    reportsList: PropTypes.object,
  }

  render() {
    const totals = {
      active: 0,
      inActive: 0,
      total: 0,
      textSent: 0,
      textReceived: 0,
      unreadText: 0,
      emailSent: 0,
    };

    _.forEach(this.props.reportsList.details, (item) => {
      totals.total += parseInt(item.principal_investigator_active) + parseInt(item.principal_investigator_inactive);
      totals.active += parseInt(item.principal_investigator_active);
      totals.inActive += parseInt(item.principal_investigator_inactive);

      totals.textSent += parseInt(item.outbound_text);
      totals.textReceived += parseInt(item.inbound_text);
      totals.unreadText += parseInt(item.unread_text);
      totals.emailSent += parseInt(item.outbound_emails);
    });


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
                  <strong className="number">{totals.total}</strong>
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
                <h2>PATIENT <br />SIGN UPS</h2>
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
