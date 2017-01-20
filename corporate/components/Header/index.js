import React from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';

import NavBar from './NavBar';
import studyKikLogo from 'assets/images/logo.svg';

export default class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    location: React.PropTypes.any,
  };

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      menuCollapsed: true,
    };
  }

  componentDidMount() {}

  handleClick() {
    this.button.classList.toggle('collapsed');
    this.setState({ menuCollapsed: this.button.classList.contains('collapsed') });
  }

  render() {
    const { pathname } = this.props.location;
    const { menuCollapsed } = this.state;
    const isLoginPage = (pathname === '/login');
    return (
      <header id="header">
        <img src={studyKikLogo} alt="Study KIK" width="260" height="38" className="visible-print-block logo-print" />
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button
                ref={(button) => { this.button = button; }}
                onClick={this.handleClick}
                type="button"
                className="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#bs-example-navbar-collapse-1"
                aria-expanded="false"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              {(!isLoginPage) > 0 &&
                <Link to="/login" className="btn btn-default btn-login">LOGIN</Link>
              }
              <div className={classNames('logo-holder', { loginPage: isLoginPage })}>
                <Link to="/" className="navbar-brand" title="Study KIK">
                  <img src={studyKikLogo} alt="Study KIK" width="150" />
                </Link>
              </div>
            </div>

            <NavBar menuCollapsed={menuCollapsed} />
          </div>
        </nav>
      </header>
    );
  }
}
