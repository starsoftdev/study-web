import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router';
import classNames from 'classnames';
import enhanceWithClickOutside from 'react-click-outside';
import defaultImage from '../../../assets/images/Default-User-Img-Dr.png';
import FeedbackWidget from '../../../../common/utilities/feedback';
import { selectCurrentUserEmail, selectCurrentUserFullName, selectCurrentUserId } from '../../../containers/App/selectors';
import { translate } from '../../../../common/utilities/localization';


class AvatarMenu extends React.Component {
  static propTypes = {
    handleLogoutClick: React.PropTypes.func.isRequired,
    currentUser: React.PropTypes.any,
    currentUserEmail: React.PropTypes.string,
    currentUserFullName: React.PropTypes.string,
    currentUserId: React.PropTypes.number,
    userRoleType: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      avatarMenuOpen: false,
    };
  }

  toggleAvatarMenuHandle = () => {
    this.setState({
      avatarMenuOpen: !this.state.avatarMenuOpen,
    });
  }

  handleClickOutside = () => {
    this.setState({ avatarMenuOpen: false });
  }

  handleCustomerFeedbackClick = () => {
    const feedbackWidget = new FeedbackWidget();
    feedbackWidget.init({
      clickTarget: 'AVATAR_MENU',
      email: this.props.currentUserEmail,
      name: this.props.currentUserFullName,
      userId: this.props.currentUserId,
    });
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
              <li><a onClick={this.handleCustomerFeedbackClick}>{translate('portals.component.topHeaderBar.avatarMenu.customerFeedback')}</a></li>
              <li><Link to="/app/me/profile" onClick={this.handleClickOutside}>{translate('portals.component.topHeaderBar.avatarMenu.profile')}</Link></li>
              { userRoleType === 'client' &&
                <li className={paymentClassName}><Link to="/app/payment-information" onClick={this.handleClickOutside}>{translate('portals.component.topHeaderBar.avatarMenu.paymentInfo')}</Link></li>
              }
              { userRoleType === 'client' &&
                <li><Link to="/app/receipts" onClick={this.handleClickOutside}>{translate('portals.component.topHeaderBar.avatarMenu.receipts')}</Link></li>
              }
              { userRoleType === 'client' &&
                <li><Link to="/app/proposals" onClick={this.handleClickOutside}>{translate('portals.component.topHeaderBar.avatarMenu.proposals')}</Link></li>
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

const mapStateToProps = createStructuredSelector({
  currentUserEmail: selectCurrentUserEmail(),
  currentUserFullName: selectCurrentUserFullName(),
  currentUserId: selectCurrentUserId(),
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(enhanceWithClickOutside(AvatarMenu));
