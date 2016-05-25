import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { Nav, Navbar, NavItem } from 'react-bootstrap'

import './styles.less'

import LogoImg from 'assets/images/logo.png'
import hfbImg from 'assets/images/social/hfb.png'
import hlkImg from 'assets/images/social/hlk.png'
import hgpImg from 'assets/images/social/hgp.png'
import httImg from 'assets/images/social/htt.png'
import hinImg from 'assets/images/social/hin.png'
import htpImg from 'assets/images/social/htp.png'

export default class TopBar extends React.Component {
  render () {
    return (
      <div>
        <Navbar className="navbar-studykik">
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/studies" className="logo">
                <img src={LogoImg} />
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} href="/landing" className="nav-item">TRIAL SEARCH</NavItem>
              <NavItem eventKey={2} href="/clinical-trial-patient-recruitment-patient-enrollment" className="nav-item">LIST YOUR TRIALS</NavItem>
              <NavItem eventKey={3} href="/blog" className="nav-item">BLOG</NavItem>
              <NavItem eventKey={4} href="/about" className="nav-item">ABOUT US</NavItem>
              <NavItem eventKey={5} href="/contact" className="nav-item">CONTACT</NavItem>
            </Nav>

            <Nav pullRight>
              <NavItem eventKey={1} href="/login">Login</NavItem>
            </Nav>
            <ul className="head-social nav navbar-nav navbar-right">
              <li><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?=www.studykik.com&amp;u=https://studykik.com">
                <img src={hfbImg} alt="" height="32" width="32" />
                </a></li>
              <li><a target="_blank" href="https://www.linkedin.com/shareArticle?mini=true&amp;url=https://studykik.com/&amp;title=Find%20Clinical%20Trials%20Near%20You&amp;summary=&amp;source=">
                <img src={hlkImg} alt="" height="32" width="32" /></a></li>
              <li><a target="_blank" href="https://plus.google.com/share?url=[https://studykik.com]">
                <img src={hgpImg} alt="" height="32" width="32" /></a></li>
              <li> <a target="_blank" href="https://twitter.com/home?status=[Find Clinical Trials Near You]+[https://studykik.com]">
                <img src={httImg} alt="" height="32" width="32" /></a></li>
              <li><a target="_blank" href="https://instagram.com/studykik/#">
                <img src={hinImg} alt="" height="32" width="32" /></a></li>
              <li><a target="_blank" href="https://pinterest.com/pin/create/bookmarklet/?media=https://studykik.com/wp-content/themes/twentythirteen/images/logo.png&amp;url=https://studykik.com&amp;is_video=false&amp;description=Find Clinical Trials Near You">
                <img src={htpImg} alt="" height="32" width="32" /></a></li>
            </ul>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}
