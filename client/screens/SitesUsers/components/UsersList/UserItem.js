import React, { Component, PropTypes } from 'react'

export default class UserItem extends Component {
  static propTypes = {
    id: PropTypes.number,
    username: PropTypes.string,
    email: PropTypes.string,
    access: PropTypes.string
  }

  render () {
    return (
      <tr className="user-container">
        <td className="name">
          <span>{this.props.username}</span>
        </td>
        <td className="email">
          <span>{this.props.email}</span>
        </td>
        <td className="access">
          <span>{this.props.access}</span>
        </td>
        <td className="action">
          <button type="button" className="btn btn-default edit-user">Edit</button>
        </td>
      </tr>
    )
  }
}
