import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import './styles.less'

import sideNavLogo from 'assets/images/new_version/logo2.png'

const menuItemsGroupA = [
  { text: 'Home', link: '/dashboard', icon: 'icon-icon_house_alt' },
  { text: 'List New Study', link: '/replace_me', icon: 'icon-screen' },
  { text: 'Order IRB Ad Creation', link: '/replace_me', icon: 'icon-irb' },
  { text: 'Request Proposal', link: '/replace_me', icon: 'icon-doller' },
  { text: 'Refer', link: '/replace_me', icon: 'icon-signout' }
]
const menuItemsGroupB = [
  { text: 'Calendar', link: '/calendar', icon: 'icon-icon_calendar' },
  { text: 'Manage Sites/Users', link: '/sites-users', icon: 'icon-icon_group' },
  { text: 'Patient Database', link: '/patient-database', icon: 'icon-icon_contacts' },
  { text: 'Rewards', link: '/replace_me', icon: 'icon-gift' },
  { text: 'Badges', link: '/replace_me', icon: 'icon-star' }
]

export default class SideBar extends React.Component {

  render () {

    return (
      <aside id="sidebar">
        <div className="sidebar-holder">

          <nav className="sidenav">
            <ul className="list-unstyled">
              {
                menuItemsGroupA.map((item, index) =>
                  <li key={index}>
                    <Link to={item.link} activeClassName="active"><i className={item.icon} />{item.text}</Link>
                  </li>
                )
              }
            </ul>
            <ul className="list-unstyled">
              {
                menuItemsGroupB.map((item, index) =>
                  <li key={index}>
                    <Link to={item.link} activeClassName="active"><i className={item.icon} />{item.text}</Link>
                  </li>
                )
              }
            </ul>
          </nav>

          <div className="helpline">
            <h2>StudyKIK Project Manager</h2>
            <div className="area">
              <img src={sideNavLogo} width="60" height="60" alt="logo" className="sub-logo" />
              <p>Motang <br /> <a href="tel:5626114752">562.611.4752</a> <br /> <a href="mailto:motang@studykik.com">motang@studykik.com</a></p>
            </div>
            <a href="#" className="bgn-chat">
              <span className="text">CHAT NOW!</span>
              <i className="icon-bg" />
            </a>
          </div>

        </div>
      </aside>
    )
  }
}
