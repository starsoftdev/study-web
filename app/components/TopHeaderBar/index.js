import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { createStructuredSelector } from 'reselect';
import Button from 'react-bootstrap/lib/Button';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Tooltip from 'react-bootstrap/lib/Tooltip';

import studykikLogo from '../../assets/images/logo.svg';
import AddCreditsModal from '../../components/AddCreditsModal';
import GlobalPMSModal from '../../components/GlobalPMSModal';

import NotificationBox from './NotificationBox';
import AvatarMenu from './AvatarMenu';
import HelpMenu from './HelpMenu';

import { fetchClientCredits, clientCreditsFetched, fetchPatientMessageUnreadCount, fetchSitePatients } from '../../containers/App/actions';
import {
  selectCurrentUser,
  selectCurrentUserClientId,
  selectSitePatients,
  selectPatientMessageUnreadCount,
  selectClientCredits,
  selectUserRoleType,
} from '../../containers/App/selectors';
import {
  selectSocket,
} from '../../containers/GlobalNotifications/selectors';
import { logout } from '../../containers/LoginPage/actions';
import { translate } from '../../../common/utilities/localization';

class TopHeaderBar extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    clientCredits: React.PropTypes.object,
    currentUser: PropTypes.any,
    currentUserClientId: PropTypes.number,
    fetchSitePatients: React.PropTypes.func,
    fetchClientCredits: React.PropTypes.func,
    clientCreditsFetched: React.PropTypes.func,
    fetchPatientMessageUnreadCount: PropTypes.func,
    logout: React.PropTypes.func,
    sitePatients: React.PropTypes.object,
    socket: React.PropTypes.any,
    userRoleType: PropTypes.string,
    patientMessageUnreadCount: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.showAddCreditsModal = this.showAddCreditsModal.bind(this);
    this.closeAddCreditsModal = this.closeAddCreditsModal.bind(this);
    this.showGlobalPMSModal = this.showGlobalPMSModal.bind(this);
    this.closeGlobalPMSModal = this.closeGlobalPMSModal.bind(this);

    this.state = {
      socketBinded: false,
      showAddCreditsModal: false,
      showGlobalPMSModal: false,
    };
  }

  componentDidMount() {
    const { currentUser, currentUserClientId, userRoleType } = this.props;
    if (currentUserClientId && userRoleType === 'client') {
      this.props.fetchPatientMessageUnreadCount(currentUser);
      this.props.fetchClientCredits(currentUser.id);
    }
  }

  componentWillReceiveProps() {
    const { currentUser, socket } = this.props;

    if (socket && this.state.socketBinded === false) {
      this.setState({ socketBinded: true }, () => {
        socket.on('notifyChangePoints', (clientId, newCreditsAmount, newEmailCredit) => {
          if (currentUser.roleForClient && currentUser.roleForClient.client_id === clientId) {
            this.props.clientCreditsFetched({ customerCredits: { customerCredits: newCreditsAmount, emailCredits: newEmailCredit } });
          }
        });
        socket.on('notifyEmailSent', (params) => {
          if (currentUser.roleForClient && params.clientId && currentUser.roleForClient.client_id === params.clientId) {
            const emailCredits = (this.props.clientCredits.details.emailCredits) ? this.props.clientCredits.details.emailCredits : 0;
            if (emailCredits > 0) {
              this.props.clientCreditsFetched({ customerCredits: { emailCredits: (emailCredits - 1) } });
            }
          }
        });
      });
    }
  }

  handleLogoutClick() {
    this.props.logout();
  }

  showAddCreditsModal() {
    this.setState({ showAddCreditsModal: true });
  }

  closeAddCreditsModal() {
    this.setState({ showAddCreditsModal: false });
  }

  showGlobalPMSModal() {
    this.setState({ showGlobalPMSModal: true });
  }

  closeGlobalPMSModal() {
    this.setState({ showGlobalPMSModal: false });
  }

  render() {
    const { userRoleType, currentUser, patientMessageUnreadCount } = this.props;
    let purchasable = true;

    const tooltip = (
      <Tooltip
        id={'ms-tooltip'}
        className="tooltop-inner"
      >
        {translate('portals.component.topHeaderBar.comingSoon')}
      </Tooltip>
    );

    if (userRoleType === 'client') {
      purchasable = currentUser.roleForClient.name === 'Super Admin' ? true : currentUser.roleForClient.canPurchase;
      const credits = this.props.clientCredits.details.customerCredits || 0;
      const emailCredits = this.props.clientCredits.details.emailCredits || 0;

      return (
        <header id="header">
          <div className="container-fluid">

            <h1 className="logo pull-left">
              <Link to="/app">
                <img src={studykikLogo} width="214" height="31" alt="logo" />
              </Link>
            </h1>

            <NotificationBox currentUser={this.props.currentUser} />

            <OverlayTrigger
              placement="bottom"
              overlay={tooltip}
            >
              <div className="emails pull-left">
                <a
                  className="opener"
                  data-toggle="tooltip"
                  data-placement="bottom"
                >
                  <i className="icomoon-envelop" />
                  <span className="counter">1</span>
                </a>
              </div>
            </OverlayTrigger>

            <HelpMenu />

            <a
              className={classNames('link-help opener pull-left btn-chat-popup', { active: this.state.showGlobalPMSModal })}
              onClick={this.showGlobalPMSModal}
            >
              {patientMessageUnreadCount > 0
               ? <span className="counter">{patientMessageUnreadCount}</span>
               : null
               }
              <i className="icomoon-credit" />
            </a>

            <div className="get-credits pull-left">
              <div>
                <div>{credits} {translate('portals.component.topHeaderBar.textCredits')}</div>
                <div>{emailCredits} {translate('portals.component.topHeaderBar.emailCredits')}</div>
              </div>
              <div>
                <Button disabled={!purchasable} onClick={this.showAddCreditsModal}>{translate('portals.component.topHeaderBar.addCredits')}</Button>
              </div>
            </div>

            <AvatarMenu handleLogoutClick={this.handleLogoutClick} currentUser={this.props.currentUser} userRoleType={userRoleType} />

          </div>
          <AddCreditsModal
            currentUser={this.props.currentUser}
            showModal={this.state.showAddCreditsModal}
            closeModal={this.closeAddCreditsModal}
            openModal={this.showAddCreditsModal}
          />
          <GlobalPMSModal
            showModal={this.state.showGlobalPMSModal}
            closeModal={this.closeGlobalPMSModal}
          />
        </header>
      );
    }

    return (
      <header id="header">
        <div className="container-fluid">

          <h1 className="logo pull-left">
            <Link to="/app">
              <img src={studykikLogo} width="214" height="31" alt="logo" />
            </Link>
          </h1>

          <NotificationBox currentUser={this.props.currentUser} />
          <AvatarMenu handleLogoutClick={this.handleLogoutClick} currentUser={this.props.currentUser} />
        </div>
      </header>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  clientCredits: selectClientCredits(),
  currentUser: selectCurrentUser(),
  currentUserClientId: selectCurrentUserClientId(),
  sitePatients: selectSitePatients(),
  socket: selectSocket(),
  userRoleType: selectUserRoleType(),
  patientMessageUnreadCount: selectPatientMessageUnreadCount(),
});

const mapDispatchToProps = (dispatch) => ({
  fetchSitePatients: (clientRoleId, offset, limit) => dispatch(fetchSitePatients(clientRoleId, offset, limit)),
  fetchClientCredits: (userId) => dispatch(fetchClientCredits(userId)),
  clientCreditsFetched: (payload) => dispatch(clientCreditsFetched(payload)),
  logout: () => dispatch(logout()),
  fetchPatientMessageUnreadCount: (currentUser) => dispatch(fetchPatientMessageUnreadCount(currentUser)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TopHeaderBar);
