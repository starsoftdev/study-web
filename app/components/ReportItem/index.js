import React, { PropTypes } from 'react';
import ReactTooltip from 'react-tooltip';
import moment from 'moment-timezone';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import pqsImage from '../../assets/images/pqs.png';

class ReportItem extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    order: PropTypes.number,
    item: PropTypes.object,
    percentage: PropTypes.object,
    openNotesModal: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
    };

    this.toggleExpand = this.toggleExpand.bind(this);
  }

  toggleExpand(e) {
    e.preventDefault();
    this.setState({
      expanded: !this.state.expanded,
    });
  }


  render() {
    const { item, order, percentage, openNotesModal } = this.props;
    const countTotal = parseInt(item.count_not_contacted || 0) + parseInt(item.call_attempted || 0) +
      parseInt(item.dnq || 0) + parseInt(item.action_needed || 0) + parseInt(item.scheduled || 0) +
      parseInt(item.consented || 0) + parseInt(item.screen_failed || 0) + parseInt(item.randomized || 0);
    const landingHref = item.url ? `/${item.study_id}-${item.url.toLowerCase().replace(/ /ig, '-')}` : '';
    const piName = (item.principalinvestigatorname) ? item.principalinvestigatorname : 'N/A';
    const tooltip = (
      <Tooltip id={`tooltip-id-${order}`} className="sponsor-report-tooltip">
        {`${item.study_id} - ${item.site_name}`}
      </Tooltip>
    );

    return (
      <div className={`elements-box ${this.state.expanded ? '' : 'collapsed'}`}>
        <div className="box-element order">
          <span className="name">#</span>
          <span className="value">{order + 1}</span>
        </div>
        <div className="box-element pi">
          <span className="name">PRINCIPAL INVESTIGATOR</span>
          <span className="value">
            <OverlayTrigger placement="top" overlay={tooltip}>
              <a target="_blank" href={landingHref} className="tooltip-element">{piName}</a>
            </OverlayTrigger>
          </span>
        </div>
        <div className="box-element listing">
          <span className="name">LISTING</span>
          <span className="value">{item.level}</span>
        </div>
        <div className="box-element status">
          <span className="name">STATUS</span>
          <span className="value">{item.is_active ? 'Active' : 'Inactive'}</span>
        </div>
        <div className="box-element pqs">
          <span className="name">
            <img className="pqs-logo" src={pqsImage} alt="" data-for="pqs-logo" data-tip="Patient Qualification Suite" />
            <ReactTooltip id="pqs-logo" type="info" className="tooltipClass wide" effect="solid" />
          </span>
          <span className="value"><span className={`patient-messaging-suite-status ${(item.pqs_cur || item.pqs_last) ? '' : 'off'}`}>{(item.pqs_cur || item.pqs_last) ? 'On' : 'Off'}</span></span>
        </div>
        <div className="box-element start-date">
          <span className="name">START DATE</span>
          <span className="value">{item.levelDateFrom}</span>
        </div>
        <div className="box-element end-date">
          <span className="name">END DATE</span>
          <span className="value">{item.levelDateTo}</span>
        </div>
        <div className="box-element last-login">
          <span className="name">LAST LOGIN</span>
          <span className="value">{(item.last_login_time ? moment(item.last_login_time).tz(item.timezone).format('MM/DD/YY [at] h:mm A') : '')}</span>
        </div>

        <div className="box-element new-patient">
          <span className="name">NEW PATIENT</span>
          <span className="value">{item.count_not_contacted || 0}<span className="small">{`(${percentage.count_not_contacted_p}%)`}</span></span>
        </div>
        <div className="box-element text-attempted">
          <span className="name">CALL / TEXT ATTEMPTED</span>
          <span className="value">{item.call_attempted || 0}<span className="small">{`(${percentage.call_attempted_p}%)`}</span></span>
        </div>
        <div className="box-element dnq">
          <span className="name">DNQ / NOT INTERESTED</span>
          <span className="value link" onClick={() => { openNotesModal(item.study_id, 'Not Qualified / Not Interested', 'DNQ'); }}>{item.dnq || 0}<span className="small">{`(${percentage.dnq_p}%)`}</span></span>
        </div>
        <div className="box-element action-needed">
          <span className="name">ACTION NEEDED</span>
          <span className="value link" onClick={() => { this.props.openNotesModal(null, 'Action Needed', 'ACTION NEEDED'); }}>{item.action_needed || 0}<span className="small">{`(${percentage.action_needed_p}%)`}</span></span>
        </div>
        <div className="box-element scheduled">
          <span className="name">SCHEDULED</span>
          <span className="value">{item.scheduled || 0}<span className="small">{`(${percentage.scheduled_p}%)`}</span></span>
        </div>
        <div className="box-element consented">
          <span className="name">CONSENTED</span>
          <span className="value">{item.consented || 0}<span className="small">{`(${percentage.consented_p}%)`}</span></span>
        </div>
        <div className="box-element screen-failed">
          <span className="name">SCREEN FAILED</span>
          <span className="value link" onClick={() => { this.props.openNotesModal(null, 'Screen Failed', 'SCREEN FAILED'); }}>{item.screen_failed || 0}<span className="small">{`(${percentage.screen_failed_p}%)`}</span></span>
        </div>
        <div className="box-element randomized">
          <span className="name">RANDOMIZED</span>
          <span className="value">{item.randomized || 0}<span className="small">{`(${percentage.randomized_p}%)`}</span></span>
        </div>
        <div className="box-element total">
          <span className="name">TOTAL</span>
          <span className="value">{countTotal}</span>
        </div>

        <div className="box-element text-sent">
          <span className="name">TEXT SENT</span>
          <span className="value">{item.outbound_text || 0}</span>
        </div>
        <div className="box-element text-received">
          <span className="name">TEXT RECEIVED</span>
          <span className="value">{item.inbound_text || 0}</span>
        </div>
        <div className="box-element unread-text">
          <span className="name">UNREAD TEXT</span>
          <span className="value">{item.unread_text || 0}</span>
        </div>
        <div className="box-element email-sent">
          <span className="name">EMAIL SENT</span>
          <span className="value">{item.outbound_emails || 0}</span>
        </div>
        <a className="see-more-btn" href="#" onClick={this.toggleExpand}>{this.state.expanded ? 'See less' : 'See more'}</a>
      </div>
    );
  }
}

export default ReportItem;
