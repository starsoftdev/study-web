import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Nav, Navbar, NavItem } from 'react-bootstrap'

import { logout } from 'actions'
import isSessionExpired from 'utils/isSessionExpired'
import history from 'utils/history'

import NotificationBox from './NotificationBox'

import './styles.less'

import logoImg from 'assets/images/logo.png'
import hfbImg from 'assets/images/social/hfb.png'
import hlkImg from 'assets/images/social/hlk.png'
import hgpImg from 'assets/images/social/hgp.png'
import httImg from 'assets/images/social/htt.png'
import hinImg from 'assets/images/social/hin.png'
import htpImg from 'assets/images/social/htp.png'

const menuItems = [ {
  text: 'Trial Search',
  link: '/trials' // Need to define exactly since it'll have 'active' class always
}, {
  text: 'List Your Trials',
  link: '/clinical-trial-patient-recruitment-patient-enrollment'
}, {
  text: 'Sites and Users',
  link: '/sites-users',
}, {
  text: 'Patient Database',
  link: '/patient-database',
}, {
  text: 'Blog',
  link: '/blog'
}, {
  text: 'About Us',
  link: '/about'
}, {
  text: 'Contact',
  link: '/contact'
} ]

const socialShares = [ {
  name: 'facebook',
  image: hfbImg,
  link: 'https://www.facebook.com/sharer/sharer.php?=www.studykik.com&amp;u=https://studykik.com'
}, {
  name: 'linkedin',
  image: hlkImg,
  link: 'https://www.linkedin.com/shareArticle?mini=true&amp;url=https://studykik.com/&amp;title=Find%20Clinical%20Trials%20Near%20You&amp;summary=&amp;source='
}, {
  name: 'google',
  image: hgpImg,
  link: 'https://plus.google.com/share?url=[https://studykik.com]'
}, {
  name: 'twitter',
  image: httImg,
  link: 'https://twitter.com/home?status=[Find Clinical Trials Near You]+[https://studykik.com]'
}, {
  name: 'instagram',
  image: hinImg,
  link: 'https://instagram.com/studykik/#'
}, {
  name: 'pinterest',
  image: htpImg,
  link: 'https://pinterest.com/pin/create/bookmarklet/?media=https://studykik.com/wp-content/themes/twentythirteen/images/logo.png&amp;url=https://studykik.com&amp;is_video=false&amp;description=Find Clinical Trials Near You'
} ]

export default class TopBar extends React.Component {
  static propTypes = {
    authorization: PropTypes.any,
    location: PropTypes.any,
    logoutRequest: PropTypes.func.isRequired,
  }

  componentDidMount () {
    this.clearSessionWhenExpired()
  }

  componentDidUpdate () {
    this.clearSessionWhenExpired()
  }

  clearSessionWhenExpired () {
    if (this.props.authorization.authorized === true) {
      const { authData } = this.props.authorization

      if (isSessionExpired(authData)) {
        this.props.logoutRequest()
      }
    }
  }

  render () {
    const { authorized } = this.props.authorization

    return (
      <Navbar className="navbar-studykik">

        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/" className="logo-link">
              <img src={logoImg} />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>

        <Navbar.Collapse>
          <Nav>
            {menuItems.map((item, index) =>
              <li className="nav-item" key={index}>
                <Link to={item.link} activeClassName="active">{item.text}</Link>
              </li>
            )}
          </Nav>

          <Nav pullRight>
            <li className="blue-color nav-item">
              {!authorized &&
                <Link to="/login">Login</Link>
              }
              {authorized &&
                <Link to="/logout"
                  onClick={this.handleLogoutClick.bind(this)}
                >
                  Logout
                </Link>
              }
            </li>
          </Nav>

          <ul className="social-share nav navbar-nav navbar-right">
            {socialShares.map((item, index) =>
              <li key={index}>
                <a target="_blank" href={item.link}>
                  <img src={item.image} alt="" height="32" width="32" />
                </a>
              </li>
            )}
          </ul>

          <ul className="nav navbar-nav navbar-right">
            {authorized &&
              <NotificationBox authorization={this.props.authorization} />}
          </ul>

        </Navbar.Collapse>
      </Navbar>
    )
  }

  handleLogoutClick (ev) {
    ev.preventDefault()

    this.props.logoutRequest()
  }
}


const mapDispatchToProps = {
  logoutRequest: logout,
}

export default connect(
  null,
  mapDispatchToProps
)(TopBar)
