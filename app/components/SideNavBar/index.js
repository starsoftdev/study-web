import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router';
import FeedbackWidget from '../../../common/utilities/feedback';
import { normalizePhoneDisplay } from '../../../app/common/helper/functions';
import { selectUserRoleType, selectCurrentUser, selectCurrentUserClientId, selectCurrentUserEmail, selectCurrentUserFullName, selectCurrentUserId } from '../../containers/App/selectors';
import { translate } from '../../../common/utilities/localization';
import './styles.less';


class SideNavBar extends React.Component { // eslint-disable-line react/prefer-stateless-function
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
        { upperText: translate('portals.component.sideNavBar.home'), link: '/app', icon: 'icomoon-icon_house_alt' },
        { upperText: translate('portals.component.sideNavBar.listNewStudy'), link: '/app/list-new-study', icon: 'icomoon-icon_new' },
        { upperText: translate('portals.component.sideNavBar.orderAdCreation'), link: '/app/order-irb-ad-creation', icon: 'icomoon-irb' },
        { upperText: translate('portals.component.sideNavBar.requestProposal'), link: '/app/request-proposal', icon: 'icomoon-icon_note' },
        { upperText: translate('portals.component.sideNavBar.refer'), link: '/app/refer', icon: 'icomoon-signout' },
      ];
      menuItemsGroupB = [
        { upperText: translate('portals.component.sideNavBar.calendar'), link: '/app/calendar', icon: 'icomoon-icon_calendar' },
        { upperText: translate('portals.component.sideNavBar.manage'), lowerText: translate('portals.component.sideNavBar.manageLowerText'), link: '/app/sites-users', icon: 'icomoon-icon_group' },
        { upperText: translate('portals.component.sideNavBar.patientDB'), link: '/app/patient-database', icon: 'icomoon-icon_database' },
        { upperText: translate('portals.component.sideNavBar.rewards'), link: '/app/rewards', icon: 'icomoon-gift' },
        { upperText: translate('portals.component.sideNavBar.badges'), link: '/app/badges', icon: 'icomoon-star' },
      ];
    } else {
      menuItemsGroupA = [
        { upperText: translate('common.component.sideNavBar.home'), link: '/app', icon: 'icomoon-icon_house_alt' },
        /* Commenting out those pages from sponsor portal until they are available
        { upperText: 'List New Protocol', link: '/app/list-new-protocol', icon: 'icomoon-screen' },
        { upperText: 'Order IRB Ad Creation', link: '/app/order-irb-ad-creation', icon: 'icomoon-irb' },
        { upperText: 'Request Proposal', link: '/app/request-proposal', icon: 'icomoon-doller' },
        { upperText: 'Find Out How Many Sites Are Listing Your Protocol', link: '/app/find-out-how-many-sites-are-listing-your-protocol', icon: 'icomoon-help-with-circle' },
        */
      ];
      menuItemsGroupB = [
        { upperText: translate('portals.component.sideNavBar.calendar'), link: '/app/calendar', icon: 'icomoon-icon_calendar' },
        { upperText: translate('portals.component.sideNavBar.manageUsers'), link: '/app/manage-users', icon: 'icomoon-icon_group' },
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
              <h2>{translate('portals.component.sideNavBar.siteManager')}</h2>
              <div className="area">
                <p>{helpName} <br /> <a>{helpPhone}</a> <br /> <a>{helpEmail}</a></p>
                <p className="feedback-link" onClick={this.handleCustomerFeedbackClick}>{translate('portals.component.sideNavBar.customerFeedback')}</p>
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
