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
import IdleTimer from 'react-idle-timer';
import LogRocket from 'logrocket';
import moment from 'moment-timezone';

import SideNavBar from '../../components/SideNavBar';
import TopHeaderBar from '../../components/TopHeaderBar';
import TopHeaderBar2 from '../../components/TopHeaderBar2';
import TopHeaderBar3 from '../../components/TopHeaderBar3';
import LoadingSpinner from '../../components/LoadingSpinner';
import GlobalNotifications from '../../containers/GlobalNotifications';
import { logout } from '../../containers/LoginPage/actions';
import { fetchMeFromToken, changeTemporaryPassword, updateUser } from './actions';
import { getItem } from '../../utils/localStorage';
import ChangeTemporaryPasswordModal from '../../components/ChangeTemporaryPasswordModal';
import SetTimeZoneModal from '../../components/SetTimeZoneModal';
import EmailTutorialModal from '../../components/EmailTutorialModal';
import IdleModal from '../../components/IdleModal';

import { selectAuthState, selectCurrentUser, selectEvents, selectUserRoleType } from './selectors';

class App extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
    changePassword: React.PropTypes.func,
    logout: React.PropTypes.func,
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
    this.idleHandler = this.idleHandler.bind(this);
    this.stayLoggedIn = this.stayLoggedIn.bind(this);
    this.changePassword = this.props.changePassword.bind(this);
    this.handleCloseEmailModal = this.handleCloseEmailModal.bind(this);
    this.state = {
      forceLogout: parseInt(FORCE_LOGOUT), // should be 10 hours in milliseconds
      timeout: parseInt(IDLE_TIMEOUT), // should be 2 hours in milliseconds
      showChangePwdModal: false,
      showSetTimeZoneModal: false,
      showEmailTutorialModal: false,
      showIdleModal: false,
    };
  }

  componentWillMount() {
    const authTime = getItem('auth_time');
    // Always load user details from the localStorage Token
    this.props.fetchMeFromToken(true);

    const timerId = setInterval(() => {
      const currentTime = moment();
      if ((currentTime.valueOf() - parseInt(authTime)) > this.state.forceLogout) {
        clearInterval(this.state.timerId);
        this.props.logout();
      }
    }, 600000);

    this.setState({ timerId });

    if (ONE_SIGNAL_APP_ID) {
      const OneSignal = window.OneSignal || [];
      OneSignal.push(['init', {
        appId: ONE_SIGNAL_APP_ID,
        autoRegister: true,
        notifyButton: {
          enable: true, /* Set to false to hide */
        },
      }]);
    }
  }

  componentDidMount() {
    if (MIXPANEL_TOKEN) {
      mixpanel.init(MIXPANEL_TOKEN);
    }
    if (LOG_ROCKET) {
      LogRocket.init(LOG_ROCKET);
      if (MIXPANEL_TOKEN) {
        LogRocket.getSessionURL((sessionURL) => {
          mixpanel.track('LogRocket', { sessionURL });
        });
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const tempPassword = getItem('temp_password');

    if (tempPassword) {
      this.setState({ showChangePwdModal: true });
    }

    console.log(1, window.OneSignal);
    if (window.OneSignal && nextProps.userData) {
      window.OneSignal.push(() => {
        window.OneSignal.sendTags({
          userId: nextProps.userData.id,
        }, (tagsSent) => {
          console.log(2, tagsSent);
        });
      });
    }

    if (nextProps.userData && nextProps.userData.needSetup && nextProps.location.pathname !== '/app/me/profile') {
      this.setState({ showSetTimeZoneModal: true });
    } else {
      this.setState({ showSetTimeZoneModal: false });
    }

    if (nextProps.userData && nextProps.userData.needEmailCreditTutorial && nextProps.userData.id) {
      this.setState({ showEmailTutorialModal: true });
    } else {
      this.setState({ showEmailTutorialModal: false });
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

    if (LOG_ROCKET && nextProps.userData) {
      LogRocket.identify(`${nextProps.userData.id}`, {
        name: `${nextProps.userData.firstName} ${nextProps.userData.lastName}`,
        email: nextProps.userData.email,
        // Add your own custom user variables here, ie:
        subscriptionType: 'pro',
      });
    }

    if (nextProps.currentUserRoleType && !this.props.currentUserRoleType && nextProps.currentUserRoleType === 'vendor') {
      this.gotoVendorHome();
    }
  }

  handleChangePassword(ev) { // eslint-disable-line react/prefer-stateless-function
    const params = ev;
    params.user_id = this.props.userData.id;
    params.changeTempPassword = true;

    this.props.changePassword(params);
  }

  handleCloseEmailModal() {
    this.setState({ showEmailTutorialModal: false });
    this.props.updateUser(this.props.userData.id, { needEmailCreditTutorial: false });
  }

  idleHandler() { // eslint-disable-line react/prefer-stateless-function
    this.setState({ showIdleModal: true });
  }

  stayLoggedIn() { // eslint-disable-line react/prefer-stateless-function
    this.setState({ showIdleModal: false });
  }

  renderEmailTutorial() {
    const { currentUserRoleType } = this.props;
    if (currentUserRoleType === 'client') {
      return (
        <EmailTutorialModal
          showModal={this.state.showEmailTutorialModal}
          closeModal={this.handleCloseEmailModal}
        />
      );
    }
    return null;
  }

  gotoVendorHome = () => {
    location.href = '/app/vendor';
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
    if (currentUserRoleType === 'vendor') {
      return <div id="wrapper"></div>;
    }

    if (currentUserRoleType === 'client' || currentUserRoleType === 'sponsor') {
      return (
        <IdleTimer
          element={document}
          events={['mousemove', 'keydown', 'mousedown', 'touchstart']}
          activeAction={this.activeHandler}
          idleAction={this.idleHandler}
          timeout={this.state.timeout}
          startOnLoad
          format="MM-DD-YYYY HH:MM:ss.SSS"
        >
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
            <SetTimeZoneModal show={this.state.showSetTimeZoneModal} currentUserRoleType={currentUserRoleType} />
            {this.state.showIdleModal && <IdleModal show={this.state.showIdleModal} logout={this.props.logout} stayLoggedIn={this.stayLoggedIn} />}
            {this.renderEmailTutorial()}
          </div>
        </IdleTimer>
      );
    }

    if (currentUserRoleType === 'dashboard') {
      return (
        <IdleTimer
          element={document}
          events={['mousemove', 'keydown', 'mousedown', 'touchstart']}
          activeAction={this.activeHandler}
          idleAction={this.idleHandler}
          timeout={this.state.timeout}
          startOnLoad
          format="MM-DD-YYYY HH:MM:ss.SSS"
        >
          <div id="wrapper" className="dashboard">
            <TopHeaderBar2 />
            <main id="main">
              {React.Children.toArray(this.props.children)}
            </main>
            <ChangeTemporaryPasswordModal show={this.state.showChangePwdModal} onSubmit={this.handleChangePassword} />
            <SetTimeZoneModal show={this.state.showSetTimeZoneModal} currentUserRoleType={currentUserRoleType} />
            {this.state.showIdleModal && <IdleModal show={this.state.showIdleModal} logout={this.props.logout} stayLoggedIn={this.stayLoggedIn} />}
          </div>
        </IdleTimer>
      );
    }

    // callcenter role
    return (
      <IdleTimer
        element={document}
        events={['mousemove', 'keydown', 'mousedown', 'touchstart']}
        activeAction={this.activeHandler}
        idleAction={this.idleHandler}
        timeout={this.state.timeout}
        startOnLoad
        format="MM-DD-YYYY HH:MM:ss.SSS"
      >
        <div id="wrapper" className="dashboard">
          <TopHeaderBar3 />
          <main id="main">
            {React.Children.toArray(this.props.children)}
          </main>
          {this.state.showIdleModal && <IdleModal show={this.state.showIdleModal} logout={this.props.logout} stayLoggedIn={this.stayLoggedIn} />}
        </div>
      </IdleTimer>
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
    logout: () => dispatch(logout()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
