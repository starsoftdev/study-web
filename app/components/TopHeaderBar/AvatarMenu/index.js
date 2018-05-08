import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';
import enhanceWithClickOutside from 'react-click-outside';

import { translate } from '../../../../common/utilities/localization';
import defaultImage from '../../../assets/images/Default-User-Img-Dr.png';

class AvatarMenu extends React.Component {
  static propTypes = {
    handleLogoutClick: PropTypes.func.isRequired,
    currentUser: PropTypes.any,
    userRoleType: PropTypes.string,
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
    const { currentUser, userRoleType } = this.props;
    const { firstName, lastName } = currentUser;
    const userName = `${firstName} ${lastName}`;
    let bDisabled = true;
    if (currentUser && currentUser.roleForClient) {
      bDisabled = !(currentUser.roleForClient.canPurchase || currentUser.roleForClient.name === 'Super Admin');
    }
    const paymentClassName = bDisabled ? 'disabled-li' : null;

    return (
      <div className="logged-user-area open-close pull-right">
        <a className={classNames('opener', { active: this.state.avatarMenuOpen })} onClick={this.toggleAvatarMenuHandle}>
          <div className="img-circle">
            <img src={this.props.currentUser.profileImageURL || defaultImage} width="43" height="43" alt="" />
          </div>
          <span className="text margin-left-5px margin-right-5px">{userName}</span>
          <i className="caret" />
        </a>
        <div className={`logged-user-drop avatar-menu ${avatarMenuClassName}`}>
          <div className="well">
            <ul className="list-unstyled">
              <li><Link to="/app/me/profile" onClick={() => this.handleClickOutside()}>{translate('portals.component.topHeaderBar.avatarMenu.profile')}</Link></li>
              <li className={paymentClassName}><Link to="/app/payment-information" onClick={() => this.handleClickOutside()}>{translate('portals.component.topHeaderBar.avatarMenu.paymentInfo')}</Link></li>
              { userRoleType === 'client' &&
                <li><Link to="/app/receipts" onClick={() => this.handleClickOutside()}>{translate('portals.component.topHeaderBar.avatarMenu.receipts')}</Link></li>
              }
              { userRoleType === 'client' &&
                <li><Link to="/app/proposals" onClick={() => this.handleClickOutside()}>{translate('portals.component.topHeaderBar.avatarMenu.proposals')}</Link></li>
              }
              { userRoleType !== 'client' &&
                <li><Link to="/app/receipts-project-agreements" onClick={() => this.handleClickOutside()}>{translate('portals.component.topHeaderBar.avatarMenu.receiptsProjectAgreements')}</Link></li>
              }
              <a
                onClick={() => {
                  this.props.handleLogoutClick();
                  this.handleClickOutside();
                }}
              >
                {translate('portals.component.topHeaderBar.avatarMenu.logOut')}
              </a>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default enhanceWithClickOutside(AvatarMenu);
