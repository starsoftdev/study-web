import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

export default class UserItem extends Component {
  static propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    access: PropTypes.string
  }

  render () {
    return (
      <div className="user-container">
        <div className="name">
          <span>{this.props.name}</span>
        </div>
        <div className="email">
          <span>{this.props.email}</span>
        </div>
        <div className="access">
          <span>{this.props.access}</span>
        </div>
      </div>
    )
  }
}
