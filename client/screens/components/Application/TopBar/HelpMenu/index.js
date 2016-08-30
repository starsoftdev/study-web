import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import enhanceWithClickOutside from 'react-click-outside'

import './styles.less'

class HelpMenu extends React.Component {
  static propTypes = {

  }

  state = {
    menuOpen: false
  }

  toggleMenuHandle () {
    this.setState ({
      menuOpen: !this.state.menuOpen
    })
  }

  handleClickOutside () {
    this.setState({ menuOpen: false })
  }

  render () {
    const menuClassName = this.state.menuOpen ? '' : 'help-menu-close'

    return (
      <div className="open-close help-drop pull-left">
        <a href="#" className="link-help pull-left opener" onClick={this.toggleMenuHandle.bind(this)}>?</a>
        <div className={`slide default-slide help-menu ${menuClassName}`}>
          <div className="well">
            <ul className="list-unstyled">
              <li><a href="#">HELP AND SUPPORT</a></li>
              <li><a href="#">VIDEOS</a></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default enhanceWithClickOutside(HelpMenu)
