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
      emailSent: this.props.totals.details.outbound_emails ? parseInt(this.props.totals.details.outbound_emails) : 0,
    };

    return (
      <div className="infoarea row">
        <div className="col-xs-4">
          <div className="box table-box">
            <div className="box-holder">
              {/*<i className="icomoon-doctor pull-left" />*/}
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
              {/*<ul className="list-inline text-center list-activities alt">
                <li>
                  <span className="sub-title">ACTIVE</span>
                  <strong className="number">{totals.active}</strong>
                </li>
                <li>
                  <span className="sub-title">INACTIVE</span>
                  <strong className="number">{totals.inActive}</strong>
                </li>
                <li>
                  <span className="sub-title">TOTAL</span>
                  <strong className="number">{totals.active + totals.inActive}</strong>
                </li>
              </ul>*/}
              <ul className="list-inline text-center list-activities alt">
                <li>
                  <span className="sub-title">TODAY</span>
                  <strong className="number">N/A</strong>
                </li>
                <li>
                  <span className="sub-title">YESTERDAY</span>
                  <strong className="number">N/A</strong>
                </li>
                <li>
                  <span className="sub-title">TOTAL</span>
                  <strong className="number">N/A</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-xs-4 green">
          <div className="box table-box">
            <div className="box-holder">
              {/*<div className="img-holder pull-left">
                <img width="141" height="119" alt=" " src={graphImage} />
              </div>*/}
              <i className="icomoon-icon_comment_alt pull-left" />
              <div className="textbox">
                <h2>PATIENT <br />MESSAGES SUITE</h2>
              </div>
            </div>
          </div>
          <div className="box table-box">
            <div className="box-holder">
              <ul className="list-inline text-center list-activities">
                <li>
                  <span className="sub-title">TEXT<br />SENT</span>
                  <strong className="number">{totals.textSent}</strong>
                </li>
                <li>
                  <span className="sub-title">TEXT<br />RECEIVED</span>
                  <strong className="number">{totals.textReceived}</strong>
                </li>
                <li>
                  <span className="sub-title">UNREAD<br />TEXT</span>
                  <strong className="number">{totals.unreadText}</strong>
                </li>
                <li>
                  <span className="sub-title">EMAIL<br />SENT</span>
                  <strong className="number">{totals.emailSent}</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-xs-4 qualification-info">
          <div className="box table-box">
            <div className="box-holder">
              <i className="icomoon-phone pull-left" />
              <div className="textbox">
                <h2>PATIENT <br />QUALIFICATION SUITE</h2>
              </div>
            </div>
          </div>
          <div className="box table-box">
            <div className="box-holder">
              <ul className="list-inline text-center list-activities">
                <li>
                  <span className="sub-title">Incoming<br />call</span>
                  <strong className="number">N/A</strong>
                </li>
                <li>
                  <span className="sub-title">Successful<br />transfer</span>
                  <strong className="number">N/A</strong>
                </li>
                <li>
                  <span className="sub-title">Unsuccessful<br />transfer</span>
                  <strong className="number">N/A</strong>
                </li>
                <li>
                  <span className="sub-title">Total call<br />duration</span>
                  <strong className="number">N/A</strong>
                </li>
              </ul>
            </div>
          </div>
          {/*<div className="box">
            <div className="col pull-left">
              <span className="sub-title">REFER CRO/<br />SPONSOR</span>
              <strong className="number">+300 <span className="number-label">KIK<span className="text-lowercase">s</span></span></strong>
            </div>
            <div className="col pull-right">
              <span className="sub-title">Refer <br /> Site</span>
              <strong className="number">+100 <span className="number-label">KIK<span className="text-lowercase">s</span></span></strong>
            </div>
          </div>*/}
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
