import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchSite, fetchUser } from 'actions'
import ActivityIcon from 'components/ActivityIcon'

class SiteItem extends Component {
  static propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    piFirstName: PropTypes.string,
    piLastName: PropTypes.string,
    phone: PropTypes.string,
    address: PropTypes.string,
    users: PropTypes.array,
    fetchingSite: PropTypes.bool,
    fetchSite: PropTypes.func,
    fetchingUser: PropTypes.bool,
    fetchUser: PropTypes.func,
  }

  constructor (props) {
    super(props)
  }

  state = {
    assignedUsersCollapsed: true,
  }

  toggleAssignedUsers () {
    const collapsed = !this.state.assignedUsersCollapsed
    this.setState({ assignedUsersCollapsed: collapsed })
  }

  editSite () {
    this.props.fetchSite(this.props.id)
  }

  editAssignedUser (assignedUser) {
    this.props.fetchUser(assignedUser.id)
  }

  render () {
    const { fetchingSite, fetchingUser, users } = this.props
    const assignedUsersContents = users.map((item, index) => (
      <div className="assigned-user" key={index}>
        <span>{item.firstName} {item.lastName}</span>
        <span className="edit-assigned-user" disabled={fetchingUser} onClick={this.editAssignedUser.bind(this, item)}>
          {fetchingUser
            ? <span><ActivityIcon /></span>
            : <span className="fa fa-pencil-square-o" />
          }
        </span>
      </div>
    ))

    return (
      <tr className="site-container">
        <td className="name">
          <span>{this.props.name}</span>
        </td>
        <td className="principal-investigator">
          <span>{this.props.piFirstName} {this.props.piLastName}</span>
        </td>
        <td className="phone">
          <span>{this.props.phone}</span>
        </td>
        <td className="address">
          <span>{this.props.address}</span>
        </td>
        <td className="assigned-users">
          <div className="toggle-assigned-users" onClick={this.toggleAssignedUsers.bind(this)}>
            <span>Assigned Users</span>
            {this.state.assignedUsersCollapsed
              ? <span className="fa fa-plus-square-o" />
              : <span className="fa fa-minus-square-o" />
            }
          </div>
          {!this.state.assignedUsersCollapsed
            ? <div className="assigned-users-list">{assignedUsersContents}</div>
            : <div />
          }
        </td>
        <td className="action">
          <button type="button" className="btn btn-default btn-edit-site pull-right" onClick={this.editSite.bind(this)} disabled={fetchingSite}>
            {fetchingSite
              ? <span><ActivityIcon /></span>
              : <span>Edit</span>
            }
          </button>
        </td>
      </tr>
    )
  }
}

const mapStateToProps = (state) => ({
  fetchingSite: state.fetchingSite,
  fetchingUser: state.fetchingUser,
})
const mapDispatchToProps = {
  fetchSite,
  fetchUser,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SiteItem)
