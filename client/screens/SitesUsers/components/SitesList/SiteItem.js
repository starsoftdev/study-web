import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

export default class SiteItem extends Component {
  static propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    principalInvestigator: PropTypes.string,
    phone: PropTypes.string,
    address: PropTypes.string,
    assignedUsers: PropTypes.array
  }

  render () {
    const { assignedUsers } = this.props

    const assignedUsersContent = assignedUsers.map((item, index) => (
      <span key={index}>{item.name}</span>
    ))

    return (
      <tr className="site-container">
        <td className="name">
          <span>{this.props.name}</span>
        </td>
        <td className="principal-investigator">
          <span>{this.props.principalInvestigator}</span>
        </td>
        <td className="phone">
          <span>{this.props.phone}</span>
        </td>
        <td className="address">
          <span>{this.props.address}</span>
        </td>
        <td className="assigned-users">
          {assignedUsersContent}
        </td>
        <td className="action">
          <button type="button" className="btn btn-default edit-site">Edit</button>
        </td>
      </tr>
    )
  }
}
