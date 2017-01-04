import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import RewardModal from 'components/RewardModal';

import { selectCurrentUser, selectSitePatients, selectUserSiteLocations } from 'containers/App/selectors';
import { submitForm } from 'containers/RewardsPage/actions';

import { fetchPatientSignUps, fetchPrincipalInvestigators } from '../actions';
import { selectPatientSignUps, selectPrincipalInvestigators } from '../selectors';

import './styles.less';
import graphImage from 'assets/images/graph.svg';

export class SponsorDashboard extends React.Component {
  static propTypes = {
    currentUser: PropTypes.any,
    patientSignUps: PropTypes.object,
    principalInvestigators: PropTypes.object,
    fetchPatientSignUps: PropTypes.func,
    fetchPrincipalInvestigators: PropTypes.func,
    submitForm: PropTypes.func,
  }

  state = {
    rewardModalOpen: false,
  }

  componentDidMount() {
    const { currentUser } = this.props;
    this.props.fetchPatientSignUps(currentUser);
    this.props.fetchPrincipalInvestigators(currentUser);
  }

  openRewardModal = () => {
    this.setState({ rewardModalOpen: true });
  }

  closeRewardModal = () => {
    this.setState({ rewardModalOpen: false });
  }

  render() {
    const { patientSignUps, principalInvestigators } = this.props;
    return (
      <div className="infoarea row">
        <div className="col-xs-6">
          <div className="box table-box">
            <div className="box-holder">
              <i className="icomoon-doctor pull-left"></i>
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
                  <strong className="number">{principalInvestigators.active}</strong>
                </li>
                <li>
                  <span className="sub-title">Inactive</span>
                  <strong className="number">{principalInvestigators.inactive}</strong>
                </li>
                <li>
                  <span className="sub-title">Total</span>
                  <strong className="number">{principalInvestigators.total}</strong>
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
              <ul className="list-inline text-center list-activities alt">
                <li>
                  <span className="sub-title">Today</span>
                  <strong className="number">{patientSignUps.today}</strong>
                </li>
                <li>
                  <span className="sub-title">Yesterday</span>
                  <strong className="number">{patientSignUps.yesterday}</strong>
                </li>
                <li>
                  <span className="sub-title">Total</span>
                  <strong className="number">{patientSignUps.total}</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
  patientSignUps: selectPatientSignUps(),
  principalInvestigators: selectPrincipalInvestigators(),
});
const mapDispatchToProps = {
  fetchPatientSignUps,
  fetchPrincipalInvestigators,
  submitForm,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SponsorDashboard);
