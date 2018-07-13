import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../App/selectors';

import { fetchPatientSignUps, fetchPatientMessagesCount } from '../actions';
import { selectPatientSignUps, selectPatientMessagesCount } from '../selectors';
import { translate } from '../../../../common/utilities/localization';

import graph from '../../../../common/assets/images/graph.svg';

export class Dashboard extends React.Component {
  static propTypes = {
    currentUser: PropTypes.any,
    patientSignUps: PropTypes.object,
    patientMessagesCount: PropTypes.object,
    fetchPatientSignUps: PropTypes.func,
    fetchPatientMessagesCount: PropTypes.func,
  }

  componentDidMount() {
    const { currentUser, fetchPatientSignUps, fetchPatientMessagesCount } = this.props;
    if (currentUser && currentUser.roleForVendor && currentUser.roleForVendor.vendor_id) {
      fetchPatientSignUps(currentUser.roleForVendor.vendor_id, currentUser.timezone ? currentUser.timezone : 'America/New_York');
      fetchPatientMessagesCount(currentUser.roleForVendor.vendor_id);
    }
  }

  render() {
    const { patientSignUps, patientMessagesCount } = this.props;

    return (
      <section className="row infoarea text-uppercase">
        <article className="col-xs-6 signup-info">
          <div className="box">
            <div className="img-holder pull-left"><img src={graph} width="141" height="119" alt=" " /></div>
            <div className="textbox">
              <h2 dangerouslySetInnerHTML={{ __html: translate('portals.client.component.homePage.dashboard.title1') }}></h2>
              <span className="counter">{translate('portals.client.component.homePage.dashboard.total')} { patientSignUps.total }</span>
            </div>
          </div>
          <div className="box">
            <div className="col pull-left">
              <span className="sub-title">{translate('portals.client.component.homePage.dashboard.yesterday')}</span>
              <strong className="number">{ patientSignUps.yesterday } <span className="caret-holder"><i className="caret" /></span></strong>
            </div>
            <div className="col pull-right">
              <span className="sub-title">{translate('portals.client.component.homePage.dashboard.today')}</span>
              <strong className="number">{ patientSignUps.today } <span className="caret-holder"><i className="caret" /><i className="caret" /></span></strong>
            </div>
          </div>
        </article>
        <article className="col-xs-6 msg-info">
          <div className="box">
            <div className="messages-counter pull-left">
              <i className="icomoon-icon_comment_alt" />
            </div>
            <div className="textbox">
              <h2 dangerouslySetInnerHTML={{ __html: translate('portals.client.component.homePage.dashboard.title2') }} />
              <span className="counter">{translate('portals.client.component.homePage.dashboard.total')} { patientMessagesCount.textTotal ? patientMessagesCount.textTotal : '0'}</span>
            </div>
          </div>
          <div className="box">
            <div className="col pull-left">
              <span className="sub-title" dangerouslySetInnerHTML={{ __html: translate('portals.client.component.homePage.dashboard.emailSent') }} />
              <strong className="number"><i className="icomoon-envelop" /> { patientMessagesCount.emailsSent ? patientMessagesCount.emailsSent : '0'}</strong>
            </div>
            <div className="col pull-right">
              <span className="sub-title" dangerouslySetInnerHTML={{ __html: translate('portals.client.component.homePage.dashboard.unreadText') }} />
              <strong className="number"><i className="icomoon-icon_chat_alt" /> { patientMessagesCount.unreadTexts ? patientMessagesCount.unreadTexts : '0' }</strong>
            </div>
          </div>
        </article>
      </section>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
  patientSignUps: selectPatientSignUps(),
  patientMessagesCount: selectPatientMessagesCount(),
});
const mapDispatchToProps = {
  fetchPatientSignUps,
  fetchPatientMessagesCount,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
