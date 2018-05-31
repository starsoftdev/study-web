import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import graphImage from '../../../assets/images/graph.svg';
import { translate } from '../../../../common/utilities/localization';


export class ReportViewInfo extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    reportsList: PropTypes.object,
    totals: PropTypes.object,
    openPQSModal: PropTypes.func,
  }


  render() {
    let totals = {
      textSent: translate('sponsor.component.reportViewInfo.na'),
      unreadText: translate('sponsor.component.reportViewInfo.na'),
      emailSent: translate('sponsor.component.reportViewInfo.na'),
      count_today: translate('sponsor.component.reportViewInfo.na'),
      count_yesterday: translate('sponsor.component.reportViewInfo.na'),
    };
    let totalSignUps = 0;
    if (this.props.totals.details[this.props.totals.source]) {
      totals = {
        textSent: (this.props.totals.details[this.props.totals.source].outbound_text || this.props.totals.details[this.props.totals.source].outbound_text === 0) ? parseInt(this.props.totals.details[this.props.totals.source].outbound_text) : translate('sponsor.component.reportViewInfo.na'),
        unreadText: (this.props.totals.details[this.props.totals.source].unread_text || this.props.totals.details[this.props.totals.source].unread_text === 0) ? parseInt(this.props.totals.details[this.props.totals.source].unread_text) : translate('sponsor.component.reportViewInfo.na'),
        emailSent: (this.props.totals.details[this.props.totals.source].outbound_emails || this.props.totals.details[this.props.totals.source].outbound_emails === 0) ? parseInt(this.props.totals.details[this.props.totals.source].outbound_emails) : translate('sponsor.component.reportViewInfo.na'),

        count_today: (this.props.totals.details[this.props.totals.source].count_today || this.props.totals.details[this.props.totals.source].count_today === 0) ? parseInt(this.props.totals.details[this.props.totals.source].count_today) : translate('sponsor.component.reportViewInfo.na'),
        count_yesterday: (this.props.totals.details[this.props.totals.source].count_yesterday || this.props.totals.details[this.props.totals.source].count_yesterday === 0) ? parseInt(this.props.totals.details[this.props.totals.source].count_yesterday) : translate('sponsor.component.reportViewInfo.na'),
      };

      totalSignUps = parseInt(this.props.totals.details[this.props.totals.source].count_not_contacted) + parseInt(this.props.totals.details[this.props.totals.source].dnq) + parseInt(this.props.totals.details[this.props.totals.source].action_needed) + parseInt(this.props.totals.details[this.props.totals.source].scheduled)
      + parseInt(this.props.totals.details[this.props.totals.source].consented) + parseInt(this.props.totals.details[this.props.totals.source].screen_failed) + parseInt(this.props.totals.details[this.props.totals.source].randomized) + parseInt(this.props.totals.details[this.props.totals.source].call_attempted);
    }

    return (
      <div className="infoarea row">
        <div className="col-xs-4">
          <div className="box table-box">
            <div className="reprot-view-box-holder">
              <div className="img-holder pull-left view-holder">
                <img width="141" height="119" alt=" " src={graphImage} />
              </div>
              <div className="textbox">
                <h2 className="view-header" dangerouslySetInnerHTML={{ __html: translate('sponsor.component.reportViewInfo.signUps') }} />
              </div>
            </div>
          </div>
          <div className="box table-box">
            <div className="reprot-view-box-holder">
              <ul className="list-inline text-center list-activities alt">
                <li>
                  <span className="sub-title report-font-fix">{translate('sponsor.component.reportViewInfo.yesterday')}</span>
                  <strong className="number">{totals.count_yesterday}</strong>
                </li>
                <li>
                  <span className="sub-title report-font-fix">{translate('sponsor.component.reportViewInfo.today')}</span>
                  <strong className="number">{totals.count_today}</strong>
                </li>
                <li>
                  <span className="sub-title report-font-fix">{translate('sponsor.component.reportViewInfo.total')}</span>
                  <strong className="number">{totalSignUps || translate('sponsor.component.reportViewInfo.na')}</strong>
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
                <h2 className="view-header" dangerouslySetInnerHTML={{ __html: translate('sponsor.component.reportViewInfo.messages') }} />
              </div>
            </div>
          </div>
          <div className="box table-box">
            <div className="reprot-view-box-holder">
              <ul className="list-inline text-center list-activities alt">
                <li>
                  <span className="sub-title report-font-fix" dangerouslySetInnerHTML={{ __html: translate('sponsor.component.reportViewInfo.textSent') }} />
                  <strong className="number">{totals.textSent}</strong>
                </li>
                <li>
                  <span className="sub-title report-font-fix" dangerouslySetInnerHTML={{ __html: translate('sponsor.component.reportViewInfo.textUnread') }} />
                  <strong className="number">{totals.unreadText}</strong>
                </li>
                <li>
                  <span className="sub-title report-font-fix" dangerouslySetInnerHTML={{ __html: translate('sponsor.component.reportViewInfo.emailSent') }} />
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
                <h2 className="view-header" dangerouslySetInnerHTML={{ __html: translate('sponsor.component.reportViewInfo.pqs') }} />
              </div>
            </div>
          </div>
          <div className="box table-box">
            <div className="reprot-view-box-holder" onClick={this.props.openPQSModal}>
              <ul className="list-inline text-center list-activities alt">
                <li className="font-fix">
                  <span className="sub-title report-font-fix" dangerouslySetInnerHTML={{ __html: translate('sponsor.component.reportViewInfo.incomingCall') }} />
                  <strong className="number">{translate('sponsor.component.reportViewInfo.na')}</strong>
                </li>
                <li className="font-fix">
                  <span className="sub-title report-font-fix" dangerouslySetInnerHTML={{ __html: translate('sponsor.component.reportViewInfo.successfulTransfer') }} />
                  <strong className="number">{translate('sponsor.component.reportViewInfo.na')}</strong>
                </li>
                <li className="font-fix">
                  <span className="sub-title report-font-fix" dangerouslySetInnerHTML={{ __html: translate('sponsor.component.reportViewInfo.unsuccessfulTransfer') }} />
                  <strong className="number">{translate('sponsor.component.reportViewInfo.na')}</strong>
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
