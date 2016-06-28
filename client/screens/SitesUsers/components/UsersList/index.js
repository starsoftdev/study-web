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
        <div className="row">
          <div className="col-sm-12">
            <h3>Users</h3>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>ACCESS</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {listContents}
                </tbody>
              </table>
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
