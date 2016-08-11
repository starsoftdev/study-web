import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Nav, Navbar, NavItem } from 'react-bootstrap'

import { logout } from 'actions'
import isSessionExpired from 'utils/isSessionExpired'
import history from 'utils/history'

import NotificationBox from './NotificationBox'

import './styles.less'

import studykikLogo from 'assets/images/new_version/logo.svg'
import avatar1 from 'assets/images/new_version/img2.png'
import avatar2 from 'assets/images/new_version/img3.png'
import avatar3 from 'assets/images/new_version/img4.png'
import userAvatar from 'assets/images/new_version/img-logged-user.png'

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
      <header id="header">
        <div className="container-fluid">

          <h1 className="logo pull-left"><a href="#"><img src={studykikLogo} width="214" height="31" alt="logo" /></a></h1>

          <div className="notifications pull-left">
            <a className="opener" role="button" data-toggle="collapse" href="#notifications-drop" aria-expanded="false" aria-controls="notifications-drop">
              <i className="icon-bell" />
              <span className="counter">1</span>
            </a>
            {/*authorized &&
              <NotificationBox authorization={this.props.authorization} />*/}
            <div className="collapse" id="notifications-drop">
              <div className="well">
                <strong className="title">NOTIFICATIONS</strong>
                <ul className="list-unstyled">
                  <li>
                    <a href="#">
                      <div className="img-circle"><img src={avatar1} width="43" height="43" alt="alan_walker" /></div>
                      <p><strong>alan_walker</strong> moved Thomas Morgan from New Patient to Consented.</p>
                      <time dateTime="2016-05-16">05/16/16 at 11:31pm</time>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div className="img-circle"><img src={avatar2} width="43" height="43" alt="penny_worth" /></div>
                      <p><strong>penny_worth</strong> listed a new Birth Control Study.</p>
                      <time dateTime="2016-05-16">05/16/16 at 11:30pm</time>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div className="img-circle"><img src={avatar3} width="43" height="43" alt="arrow_island" /></div>
                      <p><strong>arrow_island</strong> sent a text message to Thomas Morgan</p>
                      <time dateTime="2016-05-16">05/16/16 at 9:30pm</time>
                    </a>
                  </li>
                </ul>
                <div className="btn-block text-center">
                  <a href="#">See All</a>
                </div>
              </div>
            </div>
          </div>

          <div className="emails pull-left">
            <a href="#" className="opener">
              <i className="icon-envelop" />
              <span className="counter">1</span>
            </a>
          </div>

          <a href="#" className="link-help pull-left">?</a>

          <div className="get-credits pull-left">
            <i className="icon-credit" />
            <span>100 Credits</span>
            <a href="#" className="btn btn-default">+ ADD CREDITS</a>
          </div>

          <div className="logged-user-area pull-right">
            <a className="opener" role="button" data-toggle="collapse" href="#logged-user-drop" aria-expanded="false" aria-controls="logged-user-drop">
              <div className="img-circle"><img src={userAvatar} width="43" height="43" alt="Bruce Wayne" /></div>
              <span className="text">Bruce Wayne</span>
              <i className="caret" />
            </a>
            <div className="collapse" id="logged-user-drop">
              <div className="well">
                <ul className="list-unstyled">
                  <li><a href="#">Profile</a></li>
                  <li><a href="#">Payment Information</a></li>
                  <li><a href="#">Reciepts</a></li>
                  <Link to="/logout"
                    onClick={this.handleLogoutClick.bind(this)}
                  >Logout</Link>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </header>
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
