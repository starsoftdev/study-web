import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import UserItem from './UserItem'

import './styles.less'

export default class UsersList extends Component {

  static propTypes = {
    users: PropTypes.array
  }

  render () {
    const { users } = this.props

    const listContents = users.map((item, index) => (
      <UserItem {...item} key={index} />
    ))

    if (users.length > 0) {
      return (
        <div className="users">
          <div className="container">
            <div className="row">
              {listContents}
            </div>
          </div>
        </div>
      )
    } else {
      return <div />
    }
  }
}

const mapStateToProps = (state) => ({
  users: state.users
})
const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersList)
