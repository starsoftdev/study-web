import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import enhanceWithClickOutside from 'react-click-outside'

import './styles.less'

import userAvatar from 'assets/images/new_version/img-logged-user.png'

class AvatarMenu extends React.Component {
  static propTypes = {
    handleLogoutClick: PropTypes.func.isRequired,
  }

  state = {
    avatarMenuOpen: false
  }

  toggleAvatarMenuHandle () {
    this.setState ({
      avatarMenuOpen: !this.state.avatarMenuOpen
    })
  }

  handleClickOutside () {
    this.setState({ avatarMenuOpen: false })
  }

  render () {
    const avatarMenuClassName = this.state.avatarMenuOpen ? 'avatar-menu-open' : 'avatar-menu-close'

    return (
      <div className="logged-user-area pull-right">
        <a className="opener" role="button" onClick={this.toggleAvatarMenuHandle.bind(this)}>
          <div className="img-circle">
            <img src={userAvatar} width="43" height="43" alt="Bruce Wayne" />
          </div>
          <span className="text margin-left-5px margin-right-5px">Bruce Wayne</span>
          <i className="caret" />
        </a>
        <div className={`avatar-menu ${avatarMenuClassName}`}>
          <div className="well">
            <ul className="list-unstyled">
              <li><a href="#">Profile</a></li>
              <li><a href="#">Payment Information</a></li>
              <li><a href="#">Reciepts</a></li>
              <Link to="/logout"
                onClick={this.handleLogoutClick}
              >Logout</Link>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default enhanceWithClickOutside(AvatarMenu)
