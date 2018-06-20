import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { createStructuredSelector } from 'reselect';

import studykikLogo from '../../assets/images/logo.svg';
import AvatarMenu from './AvatarMenu';

import { logout } from '../../containers/LoginPage/actions';

import {
  selectCurrentUser,
  selectCurrentUserClientId,
  selectUserRoleType,
} from '../../containers/App/selectors';


class TopHeaderBar2 extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    socket: React.PropTypes.any,
    currentUser: PropTypes.any,
    currentUserClientId: PropTypes.number,
    userRoleType: PropTypes.string,
    logout: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {
      socketBinded: false,
    };
  }

  handleLogoutClick() {
    this.props.logout();
  }

  render() {
    return (
      <header id="d-header">
        <div className="container-fluid">
          <h1 className="logo pull-left"><Link to="/app/cc/home"><img src={studykikLogo} width="214" height="31" alt="logo" /></Link></h1>
          <AvatarMenu handleLogoutClick={this.handleLogoutClick} currentUser={this.props.currentUser} />
        </div>
      </header>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
  currentUserClientId: selectCurrentUserClientId(),
  userRoleType: selectUserRoleType(),
});

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TopHeaderBar2);
