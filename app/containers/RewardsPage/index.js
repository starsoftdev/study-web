/*
 *
 * RewardsPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  fetchSites,
  fetchClientSites,
  fetchRewards,
  fetchRewardsBalance,
} from 'containers/App/actions';

import {
  selectCurrentUser,
  selectCurrentUserClientId,
  selectUserSiteLocations,
  selectRewards,
  selectRewardsBalance,
} from 'containers/App/selectors';

import { selectSiteLocation } from 'components/RewardForm/selectors';
import { selectPaginationOptions } from './selectors';
import { submitForm, pickReward, setActiveSort } from 'containers/RewardsPage/actions';
import RewardModal from '../../components/RewardModal';
import RewardForm from '../../components/RewardForm';
import RewardsList from './RewardsList/index';

import cardStudykik from 'assets/images/img6.png';
import cardAmazon from 'assets/images/img8.png';
import cardStarbucks from 'assets/images/img7.png';
import diamond from 'assets/images/diamond.svg';
import platinum from 'assets/images/platinum.svg';
import gold from 'assets/images/gold.svg';
import ruby from 'assets/images/ruby.png';
import Helmet from 'react-helmet';

export class RewardsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    siteLocations: PropTypes.array,
    currentUser: PropTypes.object,
    currentUserClientId: PropTypes.number,
    rewards: PropTypes.array,
    rewardsBalance: PropTypes.any,
    fetchSites: PropTypes.func,
    fetchClientSites: PropTypes.func,
    fetchRewards: PropTypes.func,
    fetchRewardsBalance: PropTypes.func,
    onSubmitForm: PropTypes.func,
    pickReward: PropTypes.func,
    selectedSite: PropTypes.object,
    paginationOptions: PropTypes.object,
    setActiveSort: PropTypes.func,
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
    this.props.fetchSites();
    const { currentUserClientId } = this.props;
    if (currentUserClientId) {
      this.props.fetchClientSites(currentUserClientId, {});
    }
  }

  componentDidMount() {
    const { currentUser } = this.props;

    if (currentUser) {
      this.props.fetchRewards(currentUser.roleForClient.site_id);
      this.props.fetchRewardsBalance(currentUser.roleForClient.site_id);
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

  renderHeaderText() {
    const { selectedSite } = this.props;
    if (typeof (selectedSite) === 'number') {
      if (selectedSite === 0) {
        return (
          <h3 className="pull-left">'Client' Has <strong>450 KIKs</strong></h3>
        );
      }
      return (
        <h3 className="pull-left">'Site' Has <strong>450 KIKs</strong></h3>
      );
    }
    // shouldn't ever display this, since the site should be pre-populated, depending on whether they're a site user or an admin. If they're an admin, pre-select all sites
    return null;
  }
  render() {
    const { siteLocations, pickReward } = this.props;
    return (
      <div className="container-fluid">
        <Helmet title="Rewards - StudyKIK" />
        <section className="rewards">
          <h2 className="main-heading">REWARDS</h2>
          <div className="form-search clearfix">
            <div className="pull-left custom-select">
              <RewardForm
                siteLocations={siteLocations}
              />
            </div>
          </div>

          <header className="sub-header clearfix">
            {this.renderHeaderText()}
            <a className="btn bgn-chat pull-right" data-text="Redeem" data-hovertext="Redeem Now" onClick={this.openRewardModal} />
            <RewardModal siteLocations={siteLocations} showModal={this.state.rewardModalOpen} closeModal={this.closeRewardModal} onSubmit={this.onSubmitForm} pickReward={pickReward} />
          </header>

          <div className="row images-area">
            <div className="col-xs-4 pull-left">
              <a className="option1" data-for="radio-option1" onClick={() => this.openRewardModal('1')}><img role="presentation" src={cardStarbucks} /></a>
            </div>
            <div className="col-xs-4 pull-left">
              <a className="option2" data-for="radio-option2" onClick={() => this.openRewardModal('2')}><img role="presentation" src={cardAmazon} /></a>
            </div>
            <div className="col-xs-4 pull-left">
              <a className="option3" data-for="radio-option3" onClick={() => this.openRewardModal('3')}><img role="presentation" src={cardStudykik} /></a>
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
              rewards={this.props.rewards}
              paginationOptions={this.props.paginationOptions}
              setActiveSort={this.props.setActiveSort}
            />
          </section>

        </section>

      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
  currentUserClientId: selectCurrentUserClientId(),
  siteLocations: selectUserSiteLocations(),
  rewards: selectRewards(),
  rewardsBalance: selectRewardsBalance(),
  selectedSite: selectSiteLocation(),
  paginationOptions: selectPaginationOptions(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchSites: () => dispatch(fetchSites()),
    fetchClientSites: (clientId, searchParams) => dispatch(fetchClientSites(clientId, searchParams)),
    fetchRewards: (siteId) => dispatch(fetchRewards(siteId)),
    fetchRewardsBalance: (siteId) => dispatch(fetchRewardsBalance(siteId)),
    onSubmitForm: (values) => dispatch(submitForm(values)),
    pickReward: (value) => dispatch(pickReward(value)),
    setActiveSort: (sort, direction) => dispatch(setActiveSort(sort, direction)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RewardsPage);
