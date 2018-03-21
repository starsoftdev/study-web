import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import { Glyphicon } from 'react-bootstrap';
import classNames from 'classnames';

import NavBar from './NavBar';
import LoggedUserMenu from './LoggedUserMenu';

import {
  clearClinicalTrialsSearch,
} from '../../../app/containers/App/actions';

import studyKikLogo from '../../assets/images/logo.svg';

export class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    isLoggedIn: React.PropTypes.bool,
    userDataFetched: React.PropTypes.object,
    location: React.PropTypes.any,
    logout: React.PropTypes.func,
    resetForm: React.PropTypes.func,
    clearTrialsList: React.PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleLogoClick = this.handleLogoClick.bind(this);

    this.state = {
      menuCollapsed: true,
      cachePathname: null,
    };
  }

  componentDidMount() {
  }

  componentWillReceiveProps(newProps) {
    const { cachePathname } = this.state;
    if (newProps.location && cachePathname !== newProps.location.pathname) {
      this.setState({ cachePathname: newProps.location.pathname }, () => {
        if (!this.button.classList.contains('collapsed')) {
          this.button.classList.add('collapsed');
          this.setState({ menuCollapsed: true });
        }
      });
    }
  }

  handleClick() {
    this.button.classList.toggle('collapsed');
    this.setState({ menuCollapsed: this.button.classList.contains('collapsed') });
  }

  handleLogoClick(ev) {
    let target;
    const location = window.location;
    if (ev.target.tagName === 'IMG') {
      target = ev.target.parentElement.href;
    } else {
      target = ev.target.href;
    }

    if (location.toString() === target) {
      // document.querySelector('.form-find-studies').reset();
      this.props.resetForm();
      this.props.clearTrialsList();
    }
  }

  isLandingPage = path => {
    const reg = /\d{1,}-\w/;
    return reg.test(path);
  }

  render() {
    const { isLoggedIn, userDataFetched, location } = this.props;
    const { menuCollapsed } = this.state;
    const isLoginPage = (location.pathname === '/login');
    return (
      <header id="header">
        {isLoggedIn &&
          <LoggedUserMenu user={userDataFetched} logout={this.props.logout} />
        }
        <img src={studyKikLogo} alt="Study KIK" width="260" height="38" className="visible-print-block logo-print" />
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              {!this.isLandingPage(location.pathname) &&
                <button
                  ref={(button) => { this.button = button; }}
                  onClick={this.handleClick}
                  type="button"
                  className="navbar-toggle collapsed"
                >
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
              }
              <Link to="/login" className={classNames('btn btn-default btn-login', { invisible: isLoginPage || isLoggedIn })}>
                <span className="hidden-xs">LOGIN</span>
                <Glyphicon glyph="log-in" className="visible-xs-* hidden-sm hidden-md hidden-lg" />
              </Link>
              <div className={classNames('logo-holder', { loginPage: isLoginPage })}>
                <Link
                  to="/"
                  className="navbar-brand"
                  onClick={this.handleLogoClick}
                >
                  <img src={studyKikLogo} alt="Study KIK" width="150" />
                </Link>
              </div>
            </div>

            <NavBar menuCollapsed={menuCollapsed} location={this.props.location} />
          </div>
        </nav>
      </header>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    resetForm: () => dispatch(reset('find-studies')),
    clearTrialsList: () => dispatch(clearClinicalTrialsSearch()),
  };
}

export default connect(null, mapDispatchToProps)(Header);
