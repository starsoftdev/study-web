import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import graphImage from 'assets/images/graph.svg';

export class ReportViewInfo extends React.Component {

  render() {
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
                  <strong className="number">{1}</strong>
                </li>
                <li>
                  <span className="sub-title">Inactive</span>
                  <strong className="number">{2}</strong>
                </li>
                <li>
                  <span className="sub-title">Total</span>
                  <strong className="number">{3}</strong>
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
                  <strong className="number">{4}</strong>
                </li>
                <li>
                  <span className="sub-title">Text<br />Received</span>
                  <strong className="number">{5}</strong>
                </li>
                <li>
                  <span className="sub-title">Unread<br />Text</span>
                  <strong className="number">{6}</strong>
                </li>
                <li>
                  <span className="sub-title">Email<br />Sent</span>
                  <strong className="number">{6}</strong>
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
