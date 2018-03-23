import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import graphImage from '../../../assets/images/graph.svg';


export class ReportViewInfo extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    reportsList: PropTypes.object,
    totals: PropTypes.object,
    openPQSModal: PropTypes.func,
  }


  render() {
    const totals = {
      textSent: (this.props.totals.details.outbound_text || this.props.totals.details.outbound_text === 0) ? parseInt(this.props.totals.details.outbound_text) : 'N/A',
      unreadText: (this.props.totals.details.unread_text || this.props.totals.details.unread_text === 0) ? parseInt(this.props.totals.details.unread_text) : 'N/A',
      emailSent: (this.props.totals.details.outbound_emails || this.props.totals.details.outbound_emails === 0) ? parseInt(this.props.totals.details.outbound_emails) : 'N/A',

      count_today: (this.props.totals.details.count_today || this.props.totals.details.count_today === 0) ? parseInt(this.props.totals.details.count_today) : 'N/A',
      count_yesterday: (this.props.totals.details.count_yesterday || this.props.totals.details.count_yesterday === 0) ? parseInt(this.props.totals.details.count_yesterday) : 'N/A',
    };

    const totalSignUps = parseInt(this.props.totals.details.count_not_contacted) + parseInt(this.props.totals.details.dnq) + parseInt(this.props.totals.details.action_needed) + parseInt(this.props.totals.details.scheduled)
                         + parseInt(this.props.totals.details.consented) + parseInt(this.props.totals.details.screen_failed) + parseInt(this.props.totals.details.randomized) + parseInt(this.props.totals.details.call_attempted);

    return (
      <div className="infoarea row">
        <div className="col-xs-4">
          <div className="box table-box">
            <div className="reprot-view-box-holder">
              <div className="img-holder pull-left view-holder">
                <img width="141" height="119" alt=" " src={graphImage} />
              </div>
              <div className="textbox">
                <h2 className="view-header">PATIENT <br />SIGN UPS</h2>
              </div>
            </div>
          </div>
          <div className="box table-box">
            <div className="reprot-view-box-holder">
              <ul className="list-inline text-center list-activities alt">
                <li>
                  <span className="sub-title report-font-fix">YESTERDAY</span>
                  <strong className="number">{totals.count_yesterday}</strong>
                </li>
                <li>
                  <span className="sub-title report-font-fix">TODAY</span>
                  <strong className="number">{totals.count_today}</strong>
                </li>
                <li>
                  <span className="sub-title report-font-fix">TOTAL</span>
                  <strong className="number">{totalSignUps}</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-xs-4 green">
          <div className="box table-box">
            <div className="reprot-view-box-holder">
              <i className="icomoon-icon_comment_alt pull-left i-view" />
              <div className="textbox">
                <h2 className="view-header">PATIENT <br />MESSAGES</h2>
              </div>
            </div>
          </div>
          <div className="box table-box">
            <div className="reprot-view-box-holder">
              <ul className="list-inline text-center list-activities alt">
                <li>
                  <span className="sub-title report-font-fix">TEXT<br />SENT</span>
                  <strong className="number">{totals.textSent}</strong>
                </li>
                <li>
                  <span className="sub-title report-font-fix">UNREAD<br />TEXT</span>
                  <strong className="number">{totals.unreadText}</strong>
                </li>
                <li>
                  <span className="sub-title report-font-fix">EMAIL <br />SENT</span>
                  <strong className="number">{totals.emailSent}</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-xs-4 qualification-info">
          <div className="box table-box">
            <div className="reprot-view-box-holder">
              <i className="icomoon-phone pull-left i-view" />
              <div className="textbox">
                <h2 className="view-header">PATIENT <br />QUALIFICATION SUITE</h2>
              </div>
            </div>
          </div>
          <div className="box table-box">
            <div className="reprot-view-box-holder" onClick={this.props.openPQSModal}>
              <ul className="list-inline text-center list-activities alt">
                <li className="font-fix">
                  <span className="sub-title report-font-fix">INCOMING<br />CALL</span>
                  <strong className="number">N/A</strong>
                </li>
                <li className="font-fix">
                  <span className="sub-title report-font-fix">SUCCESSFUL<br />TRANSFER</span>
                  <strong className="number">N/A</strong>
                </li>
                <li className="font-fix">
                  <span className="sub-title report-font-fix">UNSUCCESSFUL<br />TRANSFER</span>
                  <strong className="number">N/A</strong>
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
