import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router';

import {
  selectCurrentUserClientId,
  selectUserRoleType,
  selectCurrentUser,
} from '../../containers/App/selectors';

import sideNavLogo from '../../assets/images/logo2.png';

class SideNavBar extends React.Component {
  static propTypes = {
    currentUserClientId: React.PropTypes.number,
    userRoleType: React.PropTypes.string,
    currentUser: React.PropTypes.any,
  };

  componentDidMount() {
  }

  render() {
    const { userRoleType, currentUser } = this.props;
    let purchasable = true;
    if (userRoleType === 'client') {
      purchasable = currentUser.roleForClient.canPurchase;
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
        { upperText: 'List New Protocol', link: '/app/list-new-study', icon: 'icomoon-screen' },
        { upperText: 'Order IRB Ad Creation', link: '/app/order-irb-ad-creation', icon: 'icomoon-irb' },
        { upperText: 'Request Proposal', link: '/app/request-proposal', icon: 'icomoon-doller' },
        { upperText: 'Find Out How Many Sites Are Listing Your Protocol', link: '/app/find-out-how-many-sites-are-listing-your-protocol', icon: 'icomoon-help-with-circle' },
      ];
      menuItemsGroupB = [
        { upperText: 'Calendar', link: '/app/calendar', icon: 'icomoon-icon_calendar' },
        { upperText: 'Manage Users', lowerText: '', link: '/app/protocol-users', icon: 'icomoon-icon_group' },
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
          <div className="helpline">
            <h2>StudyKIK Project Manager</h2>
            <div className="area">
              <img src={sideNavLogo} width="60" height="60" alt="logo" className="sub-logo" />
              <p>Motang <br /> <a href="tel:5626114752">562.611.4752</a> <br /> <a href="mailto:motang@studykik.com">motang@studykik.com</a></p>
            </div>
            <a href="" className="bgn-chat">
              <span className="text">CHAT NOW!</span>
              <i className="icomoon-bg" />
            </a>
          </div>

        </div>
      </aside>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUserClientId: selectCurrentUserClientId(),
  userRoleType: selectUserRoleType(),
  currentUser: selectCurrentUser(),
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(SideNavBar);
