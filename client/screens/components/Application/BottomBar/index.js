import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { Nav, Navbar, NavItem } from 'react-bootstrap'

import LogoImg from 'assets/images/logo.png'
import ffbImg from 'assets/images/social/ffb.jpg'
import flkImg from 'assets/images/social/flk.jpg'
import fgpImg from 'assets/images/social/fgp.jpg'
import fttImg from 'assets/images/social/ftt.jpg'
import finImg from 'assets/images/social/fin.jpg'
import ftpImg from 'assets/images/social/ftp.jpg'

import './styles.less'

export default class TopBar extends React.Component {
  render () {
    return (
      <div className="footer">
        <div className="col-md-2 col-md-offset-2 col-sm-3 col-sm-3 col-xs-10 col-xs-offset-1">
          <h5>Copyright StudyKIK 2016</h5>
          <h5>Santa Ana, California.</h5>
        </div>
        <div className="col-md-3 col-sm-3 col-xs-10 col-xs-offset-1">
          <h5>NAVIGATION.</h5>
            <div className="menu-footer-menu-container">
              <ul>
                <li id="menu-item-4195"><a href="https://studykik.com/privacy-policy/">PRIVACY POLICY</a></li>
                <li id="menu-item-4196"><a href="https://studykik.com/term-conditions/">TERMS &amp; CONDITIONS</a></li>
                <li id="menu-item-4866"><a href="https://studykik.com/refund-policy/">REFUND POLICY</a></li>
                <li id="menu-item-5139"><a target="_blank" href="https://studykik.com/sitemap_index.xml">SITEMAP</a></li>
                <li id="menu-item-5140"><a target="_blank" href="https://studykik.com/feed/">RSS FEEDS</a></li>
              </ul>
            </div>
        </div>
        <div className="col-md-2 col-sm-2 col-xs-10 col-xs-offset-1">
          <h5>SOCIALIZE.</h5>
          <ul className="foot-social">
            <li>
              <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?=www.studykik.com&amp;u=www.studykik.com">
                <img src={ffbImg} alt="" height="32" width="32" />
              </a>
            </li>
            <li>
              <a target="_blank" href="https://www.linkedin.com/shareArticle?mini=true&amp;url=http://studykik.com/&amp;title=Find%20Clinical%20Trials%20Near%20You&amp;summary=&amp;source=">
                <img src={flkImg} alt="" height="32" width="32" />
              </a>
            </li>
            <li>
              <a target="_blank" href="https://plus.google.com/share?url=[http://studykik.com]">
              <img src={fgpImg} alt="" height="32" width="32" />
              </a>
            </li>
            <li>
              <a target="_blank" href="http://twitter.com/home?status=[Find Clinical Trials Near You]+[http://studykik.com]">
              <img src={fttImg} alt="" height="32" width="32" />
              </a>
            </li>
            <li>
              <a target="_blank" href="http://instagram.com/studykik/#">
              <img src={finImg} alt="" height="32" width="32" />
              </a>
            </li>
            <li>
              <a target="_blank" href="http://pinterest.com/pin/create/bookmarklet/?media=http://studykik.com/wp-content/themes/twentythirteen/images/logo.png&amp;url=http://studykik.com&amp;is_video=false&amp;description=Find Clinical Trials Near You">
                <img src={ftpImg} alt="" height="32" width="32" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
