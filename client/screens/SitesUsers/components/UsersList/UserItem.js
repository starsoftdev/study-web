import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchUser } from 'actions'

import ActivityIcon from 'components/ActivityIcon'

class UserItem extends Component {
  static propTypes = {
    id: PropTypes.number,
    username: PropTypes.string,
    email: PropTypes.string,
    access: PropTypes.string,
    isFetching: PropTypes.bool,
    fetchUser: PropTypes.func
  }

  constructor (props) {
    super(props)
  }

  editUserItem (ev) {
    ev.preventDefault()

    this.props.fetchUser(this.props.id)
  }

  render () {
    const { isFetching } = this.props

    return (
      <tr className="user-container">
        <td className="username">
          <span>{this.props.username}</span>
        </td>
        <td className="email">
          <span>{this.props.email}</span>
        </td>
        <td className="access">
          <span>{this.props.access}</span>
        </td>
        <td className="action">
          <button type="button" className="btn btn-default btn-edit-user pull-right" onClick={this.editUserItem.bind(this)} disabled={isFetching}>
            {isFetching
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
  isFetching: state.fetchingUser
})
const mapDispatchToProps = {
  fetchUser
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserItem)
