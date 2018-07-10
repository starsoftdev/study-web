import classNames from 'classnames';
import { reject } from 'lodash';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import RewardModal from '../../../components/RewardModal';

import { selectCurrentUser, selectSitePatients, selectUserSiteLocations, selectRewardsBalance } from '../../App/selectors';
import { fetchRewardsBalance, redeem } from '../../App/actions';
import { pickReward } from '../../../containers/RewardsPage/actions';

import { fetchPatientSignUps, fetchPatientMessages } from '../actions';
import { selectPatientSignUps, selectPatientMessagesCount } from '../selectors';
import { translate } from '../../../../common/utilities/localization';

import graph from '../../../assets/images/graph.svg';

export class Dashboard extends React.Component {
  static propTypes = {
    currentUser: PropTypes.any,
    patientSignUps: PropTypes.object,
    patientMessagesCount: PropTypes.object,
    rewardsBalance: PropTypes.object,
    fetchPatientSignUps: PropTypes.func,
    fetchPatientMessages: PropTypes.func,
    fetchRewardsBalance: PropTypes.func,
    sitePatients: React.PropTypes.object,
    siteLocations: PropTypes.array,
    redeem: PropTypes.func,
    pickReward: PropTypes.func,
  }

  state = {
    rewardModalOpen: false,
  }

  componentDidMount() {
    const { currentUser } = this.props;
    this.props.fetchPatientSignUps(currentUser);
    this.props.fetchPatientMessages(currentUser);
    this.props.fetchRewardsBalance(currentUser.roleForClient.client_id, currentUser.roleForClient.site_id);
  }

  openRewardModal = () => {
    this.setState({ rewardModalOpen: true });
  }

  closeRewardModal = () => {
    this.setState({ rewardModalOpen: false });
  }

  handleRedeem = (data) => {
    const { currentUser } = this.props;

    this.props.redeem({
      ...data,
      userId: currentUser.id,
    });
  }

  render() {
    const { currentUser, patientSignUps, patientMessagesCount, rewardsBalance, siteLocations, pickReward } = this.props;
    let redeemable = false;
    if (currentUser && currentUser.roleForClient) {
      redeemable = !currentUser.roleForClient.client.rewardsLocked &&
        (currentUser.roleForClient.canRedeemRewards || currentUser.roleForClient.name === 'Super Admin');
    }
    const redeemableSiteLocations = reject(siteLocations, { id: 0 });
    return (
      <section className="row infoarea text-uppercase">
        <article className="col-xs-4 signup-info">
          <div className="box">
            <div className="img-holder pull-left"><img src={graph} width="141" height="119" alt=" " /></div>
            <div className="textbox">
              <h2 dangerouslySetInnerHTML={{ __html: translate('portals.client.component.homePage.dashboard.title1') }}></h2>
              <span className="counter">{translate('portals.client.component.homePage.dashboard.total')} {patientSignUps.total}</span>
            </div>
          </div>
          <div className="box">
            <div className="col pull-left">
              <span className="sub-title">{translate('portals.client.component.homePage.dashboard.yesterday')}</span>
              <strong className="number">{patientSignUps.yesterday} <span className="caret-holder"><i className="caret" /></span></strong>
            </div>
            <div className="col pull-right">
              <span className="sub-title">{translate('portals.client.component.homePage.dashboard.today')}</span>
              <strong className="number">{patientSignUps.today} <span className="caret-holder"><i className="caret" /><i className="caret" /></span></strong>
            </div>
          </div>
        </article>
        <article className="col-xs-4 msg-info">
          <div className="box">
            <div className="messages-counter pull-left">
              <i className="icomoon-icon_comment_alt" />
            </div>
            <div className="textbox">
              <h2 dangerouslySetInnerHTML={{ __html: translate('portals.client.component.homePage.dashboard.title2') }} />
              <span className="counter">{translate('portals.client.component.homePage.dashboard.total')} {patientMessagesCount.textTotal ? patientMessagesCount.textTotal : '0'}</span>
            </div>
          </div>
          <div className="box">
            <div className="col pull-left">
              <span className="sub-title" dangerouslySetInnerHTML={{ __html: translate('portals.client.component.homePage.dashboard.emailSent') }} />
              <strong className="number"><i className="icomoon-envelop" /> {patientMessagesCount.emailsSent ? patientMessagesCount.emailsSent : '0'}</strong>
            </div>
            <div className="col pull-right">
              <span className="sub-title" dangerouslySetInnerHTML={{ __html: translate('portals.client.component.homePage.dashboard.unreadText') }} />
              <strong className="number"><i className="icomoon-icon_chat_alt" /> {patientMessagesCount.unreadTexts ? patientMessagesCount.unreadTexts : '0'}</strong>
            </div>
          </div>
        </article>
        <article className="col-xs-4 rewards-info">
          <div className="box">
            <i className="icomoon-gift pull-left" />
            <div className="textbox">
              <h2>{translate('portals.client.component.homePage.dashboard.title3')}</h2>
              <a className={classNames('btn btn-info lightbox-opener', { disabled: !redeemable })} data-text="Redeem" data-hovertext="Redeem Now" onClick={redeemable ? this.openRewardModal : null}>Redeem</a>
              <span className="counter">{rewardsBalance[currentUser.roleForClient.site_id || 0]} KIK<span className="small text-lowercase">s</span></span>
            </div>
          </div>
          <div className="box">
            <div className="col pull-left">
              <span className="sub-title" dangerouslySetInnerHTML={{ __html: translate('portals.client.component.homePage.dashboard.referCro') }} />
              <strong className="number">+300 <span className="number-label">KIK<span className="text-lowercase">s</span></span></strong>
            </div>
            <div className="col pull-right">
              <span className="sub-title" dangerouslySetInnerHTML={{ __html: translate('portals.client.component.homePage.dashboard.referSite') }} />
              <strong className="number">+100 <span className="number-label">KIK<span className="text-lowercase">s</span></span></strong>
            </div>
          </div>
        </article>
        <RewardModal
          currentUser={currentUser}
          siteLocations={redeemableSiteLocations}
          showModal={this.state.rewardModalOpen}
          closeModal={this.closeRewardModal}
          onSubmit={this.handleRedeem}
          pickReward={pickReward}
        />
      </section>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
  patientSignUps: selectPatientSignUps(),
  patientMessagesCount: selectPatientMessagesCount(),
  rewardsBalance: selectRewardsBalance(),
  sitePatients: selectSitePatients(),
  siteLocations: selectUserSiteLocations(),
});
const mapDispatchToProps = {
  fetchPatientSignUps,
  fetchPatientMessages,
  fetchRewardsBalance,
  redeem,
  pickReward,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
