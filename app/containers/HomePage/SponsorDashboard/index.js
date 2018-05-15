import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../App/selectors';

import { fetchPatientSignUps, fetchPrincipalInvestigatorTotals, fetchProtocols } from '../actions';
import { selectPatientSignUps, selectPrincipalInvestigatorTotals } from '../selectors';

import graphImage from '../../../assets/images/graph.svg';
import { translate } from '../../../../common/utilities/localization';

export class SponsorDashboard extends React.Component {
  static propTypes = {
    currentUser: PropTypes.any,
    patientSignUps: PropTypes.object,
    principalInvestigatorTotals: PropTypes.object,
    fetchPatientSignUps: PropTypes.func,
    fetchPrincipalInvestigatorTotals: PropTypes.func,
    fetchProtocols: PropTypes.func,
  }

  state = {
    rewardModalOpen: false,
  }

  componentDidMount() {
    const { currentUser } = this.props;
    this.props.fetchPatientSignUps(currentUser);
    this.props.fetchPrincipalInvestigatorTotals(currentUser);
  }

  openRewardModal = () => {
    this.setState({ rewardModalOpen: true });
  }

  closeRewardModal = () => {
    this.setState({ rewardModalOpen: false });
  }

  render() {
    const { patientSignUps, principalInvestigatorTotals } = this.props;
    return (
      <div className="infoarea row">
        <div className="col-xs-6">
          <div className="box table-box">
            <div className="box-holder">
              <div className="img-holder pull-left">
                <img width="141" height="119" alt=" " src={graphImage} />
              </div>
              <div className="textbox">
                <h2 dangerouslySetInnerHTML={{ __html: translate('sponsor.page.sponsorDashboard.signUps') }} />
              </div>
            </div>
          </div>
          <div className="box table-box">
            <div className="box-holder">
              <ul className="list-inline text-center list-activities alt">
                <li>
                  <span className="sub-title">{translate('sponsor.page.sponsorDashboard.counterToday')}</span>
                  <strong className="number">{patientSignUps.today}</strong>
                </li>
                <li>
                  <span className="sub-title">{translate('sponsor.page.sponsorDashboard.counterYesterday')}</span>
                  <strong className="number">{patientSignUps.yesterday}</strong>
                </li>
                <li>
                  <span className="sub-title">{translate('sponsor.page.sponsorDashboard.counterTotal')}</span>
                  <strong className="number">{patientSignUps.total}</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-xs-6 green">
          <div className="box table-box">
            <div className="box-holder">
              <i className="icomoon-doctor pull-left" />
              <div className="textbox">
                <h2 dangerouslySetInnerHTML={{ __html: translate('sponsor.page.sponsorDashboard.investigators') }} />
              </div>
            </div>
          </div>
          <div className="box table-box">
            <div className="box-holder">
              <ul className="list-inline text-center list-activities alt">
                <li>
                  <span className="sub-title">{translate('sponsor.page.sponsorDashboard.counterActive')}</span>
                  <strong className="number">{principalInvestigatorTotals.active}</strong>
                </li>
                <li>
                  <span className="sub-title">{translate('sponsor.page.sponsorDashboard.counterInactive')}</span>
                  <strong className="number">{principalInvestigatorTotals.inactive}</strong>
                </li>
                <li>
                  <span className="sub-title">{translate('sponsor.page.sponsorDashboard.counterTotal')}</span>
                  <strong className="number">{principalInvestigatorTotals.total}</strong>
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
  principalInvestigatorTotals: selectPrincipalInvestigatorTotals(),
});
const mapDispatchToProps = {
  fetchPatientSignUps,
  fetchPrincipalInvestigatorTotals,
  fetchProtocols,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SponsorDashboard);
