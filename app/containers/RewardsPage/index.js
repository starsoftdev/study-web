/*
 *
 * RewardsPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { find, reject } from 'lodash';
import classNames from 'classnames';
import Helmet from 'react-helmet';

import {
  fetchClientSites,
  fetchRewards,
  fetchRewardsBalance,
  redeem,
} from '../../containers/App/actions';

import {
  selectCurrentUser,
  selectUserSiteLocations,
  selectRewards,
  selectRewardsBalance,
  selectSites,
} from '../../containers/App/selectors';

import { selectSiteLocation } from '../../components/RewardForm/selectors';
import { selectPaginationOptions } from './selectors';
import { pickReward, setActiveSort } from '../../containers/RewardsPage/actions';
import RewardModal from '../../components/RewardModal';
import RewardForm from '../../components/RewardForm';
import RewardsList from './RewardsList/index';

import cardStudykik from '../../assets/images/img6.png';
import cardAmazon from '../../assets/images/img8.png';
import cardStarbucks from '../../assets/images/img7.png';
import diamond from '../../assets/images/diamond.svg';
import platinum from '../../assets/images/platinum.svg';
import gold from '../../assets/images/gold.svg';
import ruby from '../../assets/images/ruby.png';

export class RewardsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    siteLocations: PropTypes.array,
    currentUser: PropTypes.object,
    rewards: PropTypes.array,
    rewardsBalance: PropTypes.object,
    sites: PropTypes.array,
    fetchClientSites: PropTypes.func.isRequired,
    fetchRewards: PropTypes.func,
    fetchRewardsBalance: PropTypes.func.isRequired,
    onSubmitForm: PropTypes.func.isRequired,
    pickReward: PropTypes.func.isRequired,
    selectedSite: PropTypes.number,
    paginationOptions: PropTypes.object,
    setActiveSort: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      rewardModalOpen: false,
    };

    this.openRewardModal = this.openRewardModal.bind(this);
    this.closeRewardModal = this.closeRewardModal.bind(this);
    this.onSubmitForm = this.props.onSubmitForm.bind(this);
  }

  componentWillMount() {
    const { currentUser } = this.props;
    if (currentUser) {
      this.props.fetchClientSites(currentUser.roleForClient.client_id);
    }
  }

  componentDidMount() {
    const { currentUser } = this.props;

    if (currentUser) {
      this.props.fetchRewards(currentUser.roleForClient.client_id, currentUser.roleForClient.site_id);
      this.props.fetchRewardsBalance(currentUser.roleForClient.client_id, currentUser.roleForClient.site_id);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { selectedSite, fetchRewardsBalance, currentUser } = nextProps;

    if (this.props.selectedSite !== selectedSite) {
      if (typeof (selectedSite) === 'number') {
        fetchRewardsBalance(currentUser.roleForClient.client_id, selectedSite);
      }
    }

    if (nextProps.rewardsBalance && nextProps.rewardsBalance[0] !== this.props.rewardsBalance[0]) {
      this.props.fetchRewards(currentUser.roleForClient.client_id, currentUser.roleForClient.site_id);
    }
  }

  openRewardModal(value) {
    const { pickReward } = this.props;
    pickReward(value);
    this.setState({ rewardModalOpen: true });
  }

  closeRewardModal() {
    this.setState({ rewardModalOpen: false });
  }

  redeem = (data) => {
    const { currentUser, onSubmitForm } = this.props;
    onSubmitForm({
      ...data,
      userId: currentUser.id,
    });
  }

  renderHeaderText() {
    const { selectedSite, rewardsBalance } = this.props;

    if (selectedSite && selectedSite !== '0') {
      const siteDetail = find(this.props.sites, { id: selectedSite });
      return (
        <h3 className="pull-left">{siteDetail.name} Has <strong>{rewardsBalance[selectedSite]} KIKs</strong></h3>
      );
    }

    return (
      <h3 className="pull-left"><strong>{rewardsBalance[0]} Total KIKs</strong></h3>
    );
  }


  render() {
    const { siteLocations, pickReward, currentUser } = this.props;
    let redeemable = false;
    if (currentUser && currentUser.roleForClient) {
      redeemable = currentUser.roleForClient.canRedeemRewards || currentUser.roleForClient.name === 'Super Admin';
    }
    const redeemableSiteLocations = reject(siteLocations, { id: 0 });

    return (
      <div className="container-fluid">
        <Helmet title="Rewards - StudyKIK" />
        <section className="rewards">
          <h2 className="main-heading">REWARDS</h2>
          <div className="form-search clearfix">
            <div className="pull-left custom-select no-left-padding">
              {siteLocations.length > 0 &&
                <RewardForm
                  currentUser={currentUser}
                  siteLocations={siteLocations}
                />
              }
            </div>
          </div>

          <header className="sub-header clearfix">
            {this.renderHeaderText()}
            <a className={classNames('btn bgn-chat pull-right', { disabled: !redeemable })} data-text="Redeem" data-hovertext="Redeem Now" onClick={() => (redeemable ? this.openRewardModal() : null)} />
            <RewardModal
              currentUser={currentUser}
              siteLocations={redeemableSiteLocations}
              showModal={this.state.rewardModalOpen}
              closeModal={this.closeRewardModal}
              onSubmit={this.redeem}
              pickReward={pickReward}
            />
          </header>

          <div className="row images-area">
            <div className="col-xs-4 pull-left">
              <a className="option1" data-for="radio-option1" onClick={() => redeemable && this.openRewardModal('1')}><img alt="" src={cardStarbucks} /></a>
            </div>
            <div className="col-xs-4 pull-left">
              <a className="option2" data-for="radio-option2" onClick={() => redeemable && this.openRewardModal('2')}><img alt="" src={cardAmazon} /></a>
            </div>
            <div className="col-xs-4 pull-left">
              <a className="option3" data-for="radio-option3" onClick={() => redeemable && this.openRewardModal('3')}><img alt="" src={cardStudykik} /></a>
            </div>


          </div>

          <div className="earning-info clearfix">

            <aside className="aside pull-left">
              <h3>HOW TO <br /> EARN KIKs </h3>

              <ol className="list-unstyled list-earning">
                <li>
                  <span className="number"><span></span></span>
                  <h4>FILL OUT ENROLLMENT DATA!</h4>
                  <p>For every study that you update your patient notes and status on weekly, you earn points</p>
                </li>
                <li>
                  <span className="number"><span></span></span>
                  <h4>Listing<br /> Studies!</h4>
                  <p>Every time you list a study, you earn points back</p>
                </li>
                <li>
                  <span className="number"><span></span></span>
                  <h4>Referrals!</h4>
                  <p>We appreciate your referrals! Earn points for every site or sponsor that lists a Platinum Study or higher  with StudyKIK</p>
                </li>
              </ol>
            </aside>

            <div className="detail">
              <div className="infoarea row table-parent">
                <div className="col-sm-3 column diamond table-child">
                  <div>
                    <div className="box">
                      <div className="box-holder">
                        <h3>RUBY LISTING</h3>
                        <strong className="number">+500 <span>KIK<span className="text-lowercase">s</span></span></strong>
                      </div>
                    </div>

                    <div className="box">
                      <div className="box-holder">
                        <h3>RUBY LISTING</h3>
                        <strong className="number">+50 <span>KIK<span className="text-lowercase">s</span></span></strong>
                      </div>
                    </div>
                  </div>
                  <div className="package-img diamond"><img className="ruby-img" src={ruby} alt="RUBY LISTING" width="135" /></div>
                </div>

                <div className="col-sm-3 column table-child">
                  <div>
                    <div className="box">
                      <div className="box-holder">
                        <h3>DIAMOND LISTING</h3>
                        <strong className="number">+300 <span>KIK<span className="text-lowercase">s</span></span></strong>
                      </div>
                    </div>

                    <div className="box">
                      <div className="box-holder">
                        <h3>DIAMOND LISTING</h3>
                        <strong className="number">+30 <span>KIK<span className="text-lowercase">s</span></span></strong>
                      </div>
                    </div>
                  </div>
                  <div className="package-img diamond"><img src={diamond} alt="DIAMOND LISTING" width="115" height="102" /></div>
                </div>

                <div className="col-sm-3 msg-info column table-child">
                  <div>
                    <div className="box">
                      <div className="box-holder">
                        <h3>PLATINUM LISTING</h3>
                        <strong className="number">+150 <span>KIK<span className="text-lowercase">s</span></span></strong>
                      </div>
                    </div>

                    <div className="box">
                      <div className="box-holder">
                        <h3>PLATINUM LISTING</h3>
                        <strong className="number">+15 <span>KIK<span className="text-lowercase">s</span></span></strong>
                      </div>
                    </div>
                  </div>
                  <div className="package-img platinum"><img src={platinum} alt="PLATINUM LISTING" width="108" height="115" /></div>
                </div>

                <div className="col-sm-3 rewards-info column table-child">
                  <div>
                    <div className="box">
                      <div className="box-holder">
                        <h3>GOLD LISTING</h3>
                        <strong className="number">+50 <span>KIK<span className="text-lowercase">s</span></span></strong>
                      </div>
                    </div>

                    <div className="box">
                      <div className="box-holder">
                        <h3>GOLD LISTING</h3>
                        <strong className="number">+5 <span>KIK<span className="text-lowercase">s</span></span></strong>
                      </div>
                    </div>
                  </div>
                  <div className="package-img gold"><img src={gold} alt="GOLD LISTING" width="98" height="108" /></div>
                </div>
              </div>

              <div className="infoarea row">
                <div className="col-xs-8 sponsor">
                  <div className="box">
                    <div className="box-holder">
                      <h3>REFER A SPONSOR</h3>
                      <strong className="number">+300 <span>KIK<span className="text-lowercase">s</span></span></strong>
                    </div>
                  </div>
                </div>

                <div className="col-xs-4 site">
                  <div className="box">
                    <div className="box-holder">
                      <h3>REFER A SITE</h3>
                      <strong className="number">+100 <span>KIK<span className="text-lowercase">s</span></span></strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <section className="table-holder">
            <RewardsList
              currentUser={currentUser}
              rewards={this.props.rewards}
              paginationOptions={this.props.paginationOptions}
              setActiveSort={this.props.setActiveSort}
              siteLocations={this.props.sites}
            />
          </section>

        </section>

      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
  siteLocations: selectUserSiteLocations(),
  rewards: selectRewards(),
  rewardsBalance: selectRewardsBalance(),
  selectedSite: selectSiteLocation(),
  paginationOptions: selectPaginationOptions(),
  sites: selectSites(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchClientSites: (clientId, searchParams) => dispatch(fetchClientSites(clientId, searchParams)),
    fetchRewards: (clientId, siteId) => dispatch(fetchRewards(clientId, siteId)),
    fetchRewardsBalance: (clientId, siteId) => dispatch(fetchRewardsBalance(clientId, siteId)),
    onSubmitForm: (values) => dispatch(redeem(values)),
    pickReward: (value) => dispatch(pickReward(value)),
    setActiveSort: (sort, direction) => dispatch(setActiveSort(sort, direction)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RewardsPage);
