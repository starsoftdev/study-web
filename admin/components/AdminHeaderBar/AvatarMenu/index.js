import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';
import enhanceWithClickOutside from 'react-click-outside';


import defaultImage from '../../../assets/images/Default-User-Img-Dr.png';

class AvatarMenu extends Component {
  static propTypes = {
    handleLogoutClick: PropTypes.func.isRequired,
    currentUser: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = {
      avatarMenuOpen: false,
    };
    this.toggleAvatarMenuHandle = this.toggleAvatarMenuHandle.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  toggleAvatarMenuHandle() {
    this.setState({
      avatarMenuOpen: !this.state.avatarMenuOpen,
    });
  }

  handleClickOutside() {
    this.setState({ avatarMenuOpen: false });
  }

  render() {
    const avatarMenuClassName = this.state.avatarMenuOpen ? 'avatar-menu-open' : 'avatar-menu-close';

    return (
      <div className="logged-user-area open-close pull-right">
        <a className={classNames('opener', { active: this.state.avatarMenuOpen })} onClick={this.toggleAvatarMenuHandle}>
          <div className="img-circle">
            <img src={this.props.currentUser.profileImageURL || defaultImage} width="43" height="43" alt="" />
          </div>
          <span className="text margin-left-5px margin-right-5px">{`${this.props.currentUser.firstName} ${this.props.currentUser.lastName}`}</span>
          <i className="caret" />
        </a>
        <div className={`logged-user-drop avatar-menu ${avatarMenuClassName}`}>
          <div className="well">
            <ul className="list-unstyled">
              <li><Link to="/app/me/profile" onClick={() => this.handleClickOutside()}>PROFILE</Link></li>
              <li><Link to="/app/dashboard-exposure-level" onClick={() => this.handleClickOutside()}>EXPOSURE LEVEL</Link></li>
              <li><Link to="/app/coupon" onClick={() => this.handleClickOutside()}>COUPON</Link></li>
              <li><Link to="/app/dashboard-indication" onClick={() => this.handleClickOutside()}>INDICATION</Link></li>
              <li><Link to="/app/dashboard-protocol" onClick={() => this.handleClickOutside()}>Protocol</Link></li>
              <li><Link to="/app/dashboard-cro" onClick={() => this.handleClickOutside()}>CRO</Link></li>
              <li><Link to="/app/dashboard-sponsor" onClick={() => this.handleClickOutside()}>Sponsor</Link></li>
              <li><Link to="/app/dashboard-sponsor-admins" onClick={() => this.handleClickOutside()}>Sponsor Admins</Link></li>
              <li><Link to="/app/dashboard-client-admins" onClick={() => this.handleClickOutside()}>Client Admins</Link></li>
              <li><Link to="/app/dashboard-manage-users" onClick={() => this.handleClickOutside()}>Manage Users</Link></li>
              <li><Link to="/app/dashboard-reset-password" onClick={() => this.handleClickOutside()}>Reset Password</Link></li>
              <li><Link to="/app/dashboard-locked-users" onClick={() => this.handleClickOutside()}>Locked Users</Link></li>
              <li><Link to="/app/dashboard-portals" onClick={() => this.handleClickOutside()}>Portals</Link></li>
              <li><Link to="/app/dashboard-messaging-numbers" onClick={() => this.handleClickOutside()}>Messaging Numbers</Link></li>

              <a
                onClick={() => {
                  this.props.handleLogoutClick();
                  this.handleClickOutside();
                }}
              >
                LOG OUT
              </a>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default enhanceWithClickOutside(AvatarMenu);
