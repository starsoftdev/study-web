import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchUser } from 'actions'
import ActivityIcon from 'components/ActivityIcon'

class UserItem extends Component {
  static propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    reward: PropTypes.bool,
    purchase: PropTypes.bool,
    user: PropTypes.object,
    isFetching: PropTypes.bool,
    fetchUser: PropTypes.func,
  }

  constructor (props) {
    super(props)
  }

  editUser () {
    this.props.fetchUser(this.props.user.id)
  }

  render () {
    const { isFetching } = this.props
    let accessStr = ''
    const isSuperAdmin = (this.props.name === 'Super Admin')

    if (isSuperAdmin) {
      accessStr = this.props.name
    } else {
      if (this.props.purchase && this.props.reward) {
        accessStr = 'All Access'
      } else if (this.props.purchase && !this.props.reward) {
        accessStr = 'Purchase'
      } else if (!this.props.purchase && this.props.reward) {
        accessStr = 'Rewards'
      } else {
        accessStr = 'No Access'
      }
    }

    return (
      <tr className="user-container">
        <td className="name">
          <span>{this.props.user.firstName} {this.props.user.lastName}</span>
        </td>
        <td className="email">
          <span>{this.props.user.email}</span>
        </td>
        <td className="access">
          <span>{accessStr}</span>
        </td>
        <td className="action">
          {!isSuperAdmin &&
            <button type="button" className="btn btn-default btn-edit-user pull-right" onClick={this.editUser.bind(this)} disabled={isFetching}>
              {isFetching
                ? <span><ActivityIcon /></span>
                : <span>Edit</span>
              }
            </button>
          }
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
