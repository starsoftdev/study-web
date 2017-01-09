import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { createStructuredSelector } from 'reselect';

import studykikLogo from 'assets/images/logo.svg';
import AvatarMenu from './AvatarMenu';

import { fetchSitePatients, fetchClientCredits } from 'containers/App/actions';
import { logout } from 'containers/LoginPage/actions';

import {
  selectSocket,
} from 'containers/GlobalNotifications/selectors';

import {
  selectCurrentUser,
  selectSitePatients,
  selectClientCredits,
} from 'containers/App/selectors';


class TopHeaderBar2 extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    socket: React.PropTypes.any,
    currentUser: PropTypes.any,
    sitePatients: React.PropTypes.object,
    clientCredits: React.PropTypes.object,
    fetchSitePatients: React.PropTypes.func,
    fetchClientCredits: React.PropTypes.func,
    logout: React.PropTypes.func,
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
    const { currentUser } = this.props;

    if (!currentUser) {
      console.error('Something is wrong with session');
      return;
    }
    this.props.fetchSitePatients(currentUser.id);
    this.props.fetchClientCredits(currentUser.id);
  }

  componentWillReceiveProps() {
    const { currentUser, socket } = this.props;

    if (socket && this.state.socketBinded === false) {
      this.setState({ socketBinded: true }, () => {
        socket.on('notifyChangePoints', () => {
          this.props.fetchClientCredits(currentUser.id);
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
    return (
      <header id="d-header">
        <div className="container-fluid">
          <h1 className="logo pull-left"><Link to="/"><img src={studykikLogo} width="214" height="31" alt="logo" /></Link></h1>
          <AvatarMenu handleLogoutClick={this.handleLogoutClick} currentUser={this.props.currentUser} />
        </div>
      </header>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
  sitePatients: selectSitePatients(),
  clientCredits: selectClientCredits(),
  socket: selectSocket(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchSitePatients: (userId) => dispatch(fetchSitePatients(userId)),
    fetchClientCredits: (userId) => dispatch(fetchClientCredits(userId)),
    logout: () => dispatch(logout()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TopHeaderBar2);
