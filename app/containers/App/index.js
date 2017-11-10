/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a neccessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ReactGA from 'react-ga';
import mixpanel from 'mixpanel-browser';
import LogRocket from 'logrocket';

import SideNavBar from '../../components/SideNavBar';
import TopHeaderBar from '../../components/TopHeaderBar';
import TopHeaderBar2 from '../../components/TopHeaderBar2';
import LoadingSpinner from '../../components/LoadingSpinner';
import GlobalNotifications from '../../containers/GlobalNotifications';
import { fetchMeFromToken, changeTemporaryPassword, updateUser } from './actions';
import { getItem } from '../../utils/localStorage';
import ChangeTemporaryPasswordModal from '../../components/ChangeTemporaryPasswordModal';
import SetTimeZoneModal from '../../components/SetTimeZoneModal';
import { selectAuthState, selectCurrentUser, selectEvents, selectUserRoleType } from './selectors';

class App extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
    changePassword: React.PropTypes.func,
    updateUser: React.PropTypes.func,
    currentUserRoleType: React.PropTypes.string,
    fetchMeFromToken: React.PropTypes.func.isRequired,
    isLoggedIn: React.PropTypes.bool.isRequired,
    location: React.PropTypes.object,
    pageEvents: React.PropTypes.any,
    userData: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.changePassword = this.props.changePassword.bind(this);

    this.state = {
      showChangePwdModal: false,
      showSetTimeZoneModal: false,
    };
  }

  componentWillMount() {
    // Always load user details from the localStorage Token
    this.props.fetchMeFromToken(true);
  }

  componentDidMount() {
    if (MIXPANEL_TOKEN) {
      mixpanel.init(MIXPANEL_TOKEN);
    }
    if (LOG_ROCKET) {
      LogRocket.init(LOG_ROCKET);
    }
  }

  componentWillReceiveProps(nextProps) {
    const tempPassword = getItem('temp_password');

    if (tempPassword) {
      this.setState({ showChangePwdModal: true });
    }

    if (nextProps.userData && nextProps.userData.needSetup && nextProps.userData.id) {
      this.setState({ showSetTimeZoneModal: true });
      this.props.updateUser(nextProps.userData.id, { needSetup: false });
    } else {
      this.setState({ showSetTimeZoneModal: false });
    }

    if (window.FS && nextProps.userData) {
      window.FS.identify(nextProps.userData.id, {
        displayName: `${nextProps.userData.firstName} ${nextProps.userData.lastName}`,
        email: nextProps.userData.email,
        timezone_str: nextProps.userData.timezone,
      });
    }

    if (process.env.NODE_ENV !== 'development') {
      if (!this.props.userData && nextProps.userData) {
        ReactGA.initialize('UA-91568063-1', {
          debug: true,
        });
      }
      if (this.props.location.pathname !== nextProps.location.pathname) {
        ReactGA.set({ page: nextProps.location.pathname });
        ReactGA.pageview(nextProps.location.pathname);
      }
    }

    console.log(1, window.OneSignal);
    if (window.OneSignal && nextProps.userData) {
      window.OneSignal.sendTags({
        userId: nextProps.userData.id,
      }, (tagsSent) => {
        console.log(2, tagsSent);
      });
    }

    if (LOG_ROCKET && nextProps.userData) {
      LogRocket.identify(`${nextProps.userData.id}`, {
        name: `${nextProps.userData.firstName} ${nextProps.userData.lastName}`,
        email: nextProps.userData.email,
        // Add your own custom user variables here, ie:
        subscriptionType: 'pro',
      });
    }
  }

  handleChangePassword(ev) { // eslint-disable-line react/prefer-stateless-function
    const params = ev;
    params.user_id = this.props.userData.id;
    params.changeTempPassword = true;

    this.props.changePassword(params);
  }

  render() {
    const { isLoggedIn, userData, pageEvents, currentUserRoleType } = this.props;

    if (!isLoggedIn) {
      return (
        <div className="container-fluid">
          {React.Children.toArray(this.props.children)}
        </div>
      );
    }

    if (!userData) {
      return (
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-12 text-center spinner-container">
              <LoadingSpinner showOnlyIcon />
            </div>
          </div>
        </div>
      );
    }

    if (currentUserRoleType === 'client' || currentUserRoleType === 'sponsor') {
      return (
        <div id="wrapper">
          <TopHeaderBar />
          <SideNavBar
            location={this.props.location}
          />
          <main id="main">
            {React.Children.toArray(this.props.children)}
          </main>
          <GlobalNotifications {...this.props} events={pageEvents} />
          <ChangeTemporaryPasswordModal show={this.state.showChangePwdModal} onSubmit={this.handleChangePassword} />
          <SetTimeZoneModal show={this.state.showSetTimeZoneModal} />
        </div>
      );
    }

    return (
      <div id="wrapper" className="dashboard">
        <TopHeaderBar2 />
        <main id="main">
          {React.Children.toArray(this.props.children)}
        </main>
        <ChangeTemporaryPasswordModal show={this.state.showChangePwdModal} onSubmit={this.handleChangePassword} />
        <SetTimeZoneModal show={this.state.showSetTimeZoneModal} />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isLoggedIn: selectAuthState(),
  userData: selectCurrentUser(),
  pageEvents: selectEvents(),
  currentUserRoleType: selectUserRoleType(),
});

function mapDispatchToProps(dispatch) {
  return {
    changePassword: (values) => dispatch(changeTemporaryPassword(values)),
    updateUser: (id, values) => dispatch(updateUser(id, values)),
    fetchMeFromToken: (redirect) => dispatch(fetchMeFromToken(redirect)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
