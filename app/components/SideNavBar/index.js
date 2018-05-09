import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router';
import FeedbackWidget from '../../../common/utilities/feedback';
import { normalizePhoneDisplay } from '../../../app/common/helper/functions';
import { selectUserRoleType, selectCurrentUser, selectCurrentUserClientId, selectCurrentUserEmail, selectCurrentUserFullName, selectCurrentUserId } from '../../containers/App/selectors';
import './styles.less';


class SideNavBar extends React.Component {
  static propTypes = {
    currentUserClientId: React.PropTypes.number,
    userRoleType: React.PropTypes.string,
    currentUser: React.PropTypes.any,
    currentUserEmail: React.PropTypes.string,
    currentUserFullName: React.PropTypes.string,
    currentUserId: React.Proptypes.number,
    location: React.PropTypes.object,
  };

  handleCustomerFeedbackClick = () => {
    const feedbackWidget = new FeedbackWidget();
    feedbackWidget.init({
      clickTarget: 'SIDE_NAV_BAR',
      email: this.props.currentUserEmail,
      name: this.props.currentUserFullName,
      userId: this.props.currentUserId,
    });
  }

  render() {
    const { userRoleType, currentUser } = this.props;
    let purchasable = true;
    let helpName = '';
    let helpEmail = '';
    let helpPhone = '';
    if (userRoleType === 'client') {
      purchasable = currentUser.roleForClient.name === 'Super Admin' ? true : currentUser.roleForClient.canPurchase;
      helpName = (currentUser.roleForClient.client && currentUser.roleForClient.client.projectManager) ? `${currentUser.roleForClient.client.projectManager.firstName} ${currentUser.roleForClient.client.projectManager.lastName}` : '';
      helpEmail = (currentUser.roleForClient.client && currentUser.roleForClient.client.projectManager) ? currentUser.roleForClient.client.projectManager.email : '';
      helpPhone = (currentUser.roleForClient.client && currentUser.roleForClient.client.projectManager) ? normalizePhoneDisplay(currentUser.roleForClient.client.projectManager.phone) : '';
    } else {
      helpName = (currentUser.roleForSponsor.sponsor && currentUser.roleForSponsor.sponsor.projectManager) ? `${currentUser.roleForSponsor.sponsor.projectManager.firstName} ${currentUser.roleForSponsor.sponsor.projectManager.lastName}` : '';
      helpEmail = (currentUser.roleForSponsor.sponsor && currentUser.roleForSponsor.sponsor.projectManager) ? currentUser.roleForSponsor.sponsor.projectManager.email : '';
      helpPhone = (currentUser.roleForSponsor.sponsor && currentUser.roleForSponsor.sponsor.projectManager) ? normalizePhoneDisplay(currentUser.roleForSponsor.sponsor.projectManager.phone) : '';
    }
    let menuItemsGroupA;
    let menuItemsGroupB;
    if (userRoleType === 'client') {
      menuItemsGroupA = [
        { upperText: 'Home', link: '/app', icon: 'icomoon-icon_house_alt' },
        { upperText: 'List New Study', link: '/app/list-new-study', icon: 'icomoon-screen' },
        { upperText: 'Order IRB Ad Creation', link: '/app/order-irb-ad-creation', icon: 'icomoon-irb' },
        { upperText: 'Request Proposal', link: '/app/request-proposal', icon: 'icomoon-doller' },
        { upperText: 'Refer', link: '/app/refer', icon: 'icomoon-signout' },
      ];
      menuItemsGroupB = [
        { upperText: 'Calendar', link: '/app/calendar', icon: 'icomoon-icon_calendar' },
        { upperText: 'Manage', lowerText: 'Sites / Users', link: '/app/sites-users', icon: 'icomoon-icon_group' },
        { upperText: 'Patient Database', link: '/app/patient-database', icon: 'icomoon-icon_contacts' },
        { upperText: 'Rewards', link: '/app/rewards', icon: 'icomoon-gift' },
        { upperText: 'Badges', link: '/app/badges', icon: 'icomoon-star' },
      ];
    } else {
      menuItemsGroupA = [
        { upperText: 'Home', link: '/app', icon: 'icomoon-icon_house_alt' },
        /* Commenting out those pages from sponsor portal until they are available
        { upperText: 'List New Protocol', link: '/app/list-new-protocol', icon: 'icomoon-screen' },
        { upperText: 'Order IRB Ad Creation', link: '/app/order-irb-ad-creation', icon: 'icomoon-irb' },
        { upperText: 'Request Proposal', link: '/app/request-proposal', icon: 'icomoon-doller' },
        { upperText: 'Find Out How Many Sites Are Listing Your Protocol', link: '/app/find-out-how-many-sites-are-listing-your-protocol', icon: 'icomoon-help-with-circle' },
        */
      ];
      menuItemsGroupB = [
        { upperText: 'Calendar', link: '/app/calendar', icon: 'icomoon-icon_calendar' },
        { upperText: 'Manage Users', lowerText: '', link: '/app/manage-users', icon: 'icomoon-icon_group' },
      ];
    }
    return (
      <aside id="sidebar">
        <div className="sidebar-holder">
          <nav className="sidenav">
            <ul className="list-unstyled">
              {menuItemsGroupA.map((item, index) => (
                ((index === 1 || index === 2) && !purchasable) ?
                  <li key={index} className="disabled-li">
                    <Link to={item.link} activeClassName="active">
                      <i className={item.icon} />
                      <div>{item.upperText}</div>
                      <div>{item.lowerText}</div>
                    </Link>
                  </li>
                :
                  <li key={index}>
                    <Link to={item.link} activeClassName="active">
                      <i className={item.icon} />
                      <div>{item.upperText}</div>
                      <div>{item.lowerText}</div>
                    </Link>
                  </li>
              ))}
            </ul>
            <ul className="list-unstyled">
              {menuItemsGroupB.map((item, index) =>
                <li key={index}>
                  <Link to={item.link} activeClassName="active">
                    <i className={item.icon} />
                    <div>{item.upperText}</div>
                    <div>{item.lowerText}</div>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
          {
            helpName &&
            <div className="helpline">
              <h2>StudyKIK Site Manager</h2>
              <div className="area">
                <p>{helpName} <br /> <a>{helpPhone}</a> <br /> <a>{helpEmail}</a></p>
                <p className="feedback-link" onClick={this.handleCustomerFeedbackClick}>Customer Feedback</p>
              </div>
            </div>
          }
        </div>
      </aside>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
  currentUserClientId: selectCurrentUserClientId(),
  currentUserEmail: selectCurrentUserEmail(),
  currentUserFullName: selectCurrentUserFullName(),
  currentUserId: selectCurrentUserId(),
  userRoleType: selectUserRoleType(),
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(SideNavBar);
