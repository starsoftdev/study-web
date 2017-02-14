import React from 'react';
import { Link } from 'react-router';
import { Glyphicon } from 'react-bootstrap';
import classNames from 'classnames';

import NavBar from './NavBar';
import LoggedUserMenu from './LoggedUserMenu';

import studyKikLogo from 'assets/images/logo.svg';

export default class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    isLoggedIn: React.PropTypes.bool,
    userDataFetched: React.PropTypes.object,
    location: React.PropTypes.any,
    logout: React.PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);

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
              <Link to="/login" className={classNames('btn btn-default btn-login', { invisible: isLoginPage || isLoggedIn })}>
                <span className="hidden-xs">LOGIN</span>
                <Glyphicon bsClass="glyphicon glyphicon-log-in visible-xs-* hidden-sm hidden-md hidden-lg" />
              </Link>
              <div className={classNames('logo-holder', { loginPage: isLoginPage })}>
                <Link to="/" className="navbar-brand" title="Study KIK">
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
