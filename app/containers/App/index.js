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

import SideNavBar from '../../components/SideNavBar';
import TopHeaderBar from '../../components/TopHeaderBar';
import TopHeaderBar2 from '../../components/TopHeaderBar2';
import LoadingSpinner from '../../components/LoadingSpinner';
import GlobalNotifications from '../../containers/GlobalNotifications';
import { fetchMeFromToken } from './actions';
import { selectAuthState, selectCurrentUser, selectEvents, selectUserRoleType } from './selectors';

import './styles.less';

class App extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
    currentUserRoleType: React.PropTypes.string,
    fetchMeFromToken: React.PropTypes.func.isRequired,
    isLoggedIn: React.PropTypes.bool.isRequired,
    location: React.PropTypes.object,
    pageEvents: React.PropTypes.any,
    userData: React.PropTypes.object,
  };

  componentWillMount() {
    // Always load user details from the localStorage Token
    this.props.fetchMeFromToken();
  }

  componentWillReceiveProps(nextProps) {
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
        </div>
      );
    }

    return (
      <div id="wrapper" className="dashboard">
        <TopHeaderBar2 />
        <main id="main">
          {React.Children.toArray(this.props.children)}
        </main>
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
    fetchMeFromToken: () => dispatch(fetchMeFromToken()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
