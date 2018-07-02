import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { createStructuredSelector } from 'reselect';

import studykikLogo from '../../../app/assets/images/logo.svg';
import AvatarMenu from './AvatarMenu';
import {
  selectCurrentUser,
} from '../../containers/App/selectors';

import { logout } from '../../containers/App/actions';

class TopHeaderBar extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    currentUser: PropTypes.any,
    logout: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleLogoutClick() {
    this.props.logout();
  }

  render() {
    return (
      <header id="header">
        <div className="container-fluid">

          <h1 className="logo pull-left">
            <Link to="/app/vendor">
              <img src={studykikLogo} width="214" height="31" alt="logo" />
            </Link>
          </h1>

          <AvatarMenu handleLogoutClick={this.handleLogoutClick} currentUser={this.props.currentUser} />
        </div>
      </header>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TopHeaderBar);
