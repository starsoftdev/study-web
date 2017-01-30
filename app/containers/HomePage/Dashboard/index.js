import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import RewardModal from 'components/RewardModal';

import { selectCurrentUser, selectSitePatients, selectUserSiteLocations, selectRewardsBalance } from 'containers/App/selectors';
import { fetchRewardsBalance } from 'containers/App/actions';
import { submitForm } from 'containers/RewardsPage/actions';

import { fetchPatientSignUps, fetchPatientMessages } from '../actions';
import { selectPatientSignUps, selectPatientMessages } from '../selectors';

import graph from 'assets/images/graph.svg';

export class Dashboard extends React.Component {
  static propTypes = {
    currentUser: PropTypes.any,
    patientSignUps: PropTypes.object,
    patientMessages: PropTypes.object,
    rewardsBalance: PropTypes.any,
    fetchPatientSignUps: PropTypes.func,
    fetchPatientMessages: PropTypes.func,
    fetchRewardsBalance: PropTypes.func,
    sitePatients: React.PropTypes.object,
    siteLocations: PropTypes.array,
    submitForm: PropTypes.func,
  }

  state = {
    rewardModalOpen: false,
  }

  componentDidMount() {
    const { currentUser } = this.props;
    this.props.fetchPatientSignUps(currentUser);
    this.props.fetchPatientMessages(currentUser);
    this.props.fetchRewardsBalance(currentUser.roleForClient.site_id);
  }

  openRewardModal = () => {
    this.setState({ rewardModalOpen: true });
  }

  closeRewardModal = () => {
    this.setState({ rewardModalOpen: false });
  }

  render() {
    const { patientSignUps, patientMessages, rewardsBalance, siteLocations, submitForm } = this.props;
    return (
      <section className="row infoarea text-uppercase">
        <h2 className="hidden">Statics</h2>
        <article className="col-xs-4 signup-info">
          <div className="box">
            <div className="img-holder pull-left"><img src={graph} width="141" height="119" alt=" " /></div>
            <div className="textbox">
              <h2>PATIENT <br /> SIGN UPS</h2>
              <span className="counter">TOTAL {patientSignUps.total}</span>
            </div>
          </div>
          <div className="box">
            <div className="col pull-left">
              <span className="sub-title">Yesterday</span>
              <strong className="number">{patientSignUps.yesterday} <span className="caret-holder"><i className="caret" /></span></strong>
            </div>
            <div className="col pull-right">
              <span className="sub-title">Today</span>
              <strong className="number">{patientSignUps.today} <span className="caret-holder"><i className="caret" /><i className="caret" /></span></strong>
            </div>
          </div>
        </article>
        <article className="col-xs-4 msg-info">
          <div className="box">
            <div className="messages-counter pull-left">
              <i className="icomoon-icon_comment_alt" />
              <strong className="number hidden">72</strong>
            </div>
            <div className="textbox">
              <h2>PATIENT<br /> MESSAGES</h2>
              <span className="counter">TOTAL {patientMessages.total}</span>
            </div>
          </div>
          <div className="box">
            <div className="col pull-left">
              <span className="sub-title">UNREAD<br /> EMAILS</span>
              <strong className="number"><i className="icomoon-envelop" /> {patientMessages.unreadEmails}</strong>
            </div>
            <div className="col pull-right">
              <span className="sub-title">UNREAD<br /> TEXTS</span>
              <strong className="number"><i className="icomoon-icon_chat_alt" /> {patientMessages.unreadTexts}</strong>
            </div>
          </div>
        </article>
        <article className="col-xs-4 rewards-info">
          <div className="box">
            <i className="icomoon-gift pull-left" />
            <div className="textbox">
              <h2>REWARDS</h2>
              <a className="btn btn-info lightbox-opener" data-text="Redeem" data-hovertext="Redeem Now" onClick={this.openRewardModal}>Redeem</a>
              <span className="counter">{rewardsBalance || ''} KIK<span className="small text-lowercase">s</span></span>
            </div>
          </div>
          <div className="box">
            <div className="col pull-left">
              <span className="sub-title">REFER CRO/<br />SPONSORS</span>
              <strong className="number">+300 <span className="number-label">KIK<span className="text-lowercase">s</span></span></strong>
            </div>
            <div className="col pull-right">
              <span className="sub-title">Refer <br /> Site</span>
              <strong className="number">+100 <span className="number-label">KIK<span className="text-lowercase">s</span></span></strong>
            </div>
          </div>
        </article>
        <RewardModal siteLocations={siteLocations} showModal={this.state.rewardModalOpen} closeModal={this.closeRewardModal} onSubmit={submitForm} />
      </section>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
  patientSignUps: selectPatientSignUps(),
  patientMessages: selectPatientMessages(),
  rewardsBalance: selectRewardsBalance(),
  sitePatients: selectSitePatients(),
  siteLocations: selectUserSiteLocations(),
});
const mapDispatchToProps = {
  fetchPatientSignUps,
  fetchPatientMessages,
  fetchRewardsBalance,
  submitForm,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
