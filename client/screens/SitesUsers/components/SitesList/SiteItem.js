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
      <span>{item.name}</span>
    ))

    return (
      <div className="site-container">
        <div className="name">
          <span>{this.props.name}</span>
        </div>
        <div className="principal-investigator">
          <span>{this.props.principalInvestigator}</span>
        </div>
        <div className="phone">
          <span>{this.props.phone}</span>
        </div>
        <div className="address">
          <span>{this.props.address}</span>
        </div>
        <div className="assigned-users">
          {assignedUsersContent}
        </div>
      </div>
    )
  }
}
