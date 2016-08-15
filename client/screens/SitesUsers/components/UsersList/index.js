import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap'
import EditUserForm from 'forms/EditUser'
import { clearSelectedUser, saveUser, removeClientRole } from 'actions'
import UserItem from './UserItem'
import './styles.less'

export default class UsersList extends Component {

  static propTypes = {
    currentUser: PropTypes.object,
    sites: PropTypes.array,
    users: PropTypes.array,
    selectedUser: PropTypes.object,
    clearSelectedUser: PropTypes.func,
    savingUser: PropTypes.bool,
    saveUser: PropTypes.func,
    removingClientRole: PropTypes.bool,
    removeClientRole: PropTypes.func,
  }

  constructor (props) {
    super(props)
  }

  modalShouldBeShown () {
    return (this.props.selectedUser && this.props.selectedUser.roleForClient)
  }

  closeModal () {
    this.props.clearSelectedUser()
  }

  updateUser (userData) {
    let userInput = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      siteId: userData.site,
    }
    if (userData.site === 0) {
      userInput.clientRole = {
        purchase: userData.purchase,
        reward: userData.reward,
      }
    }

    this.props.saveUser(this.props.currentUser, this.props.selectedUser.id, userInput)
  }

  removeClientRole () {
    this.props.removeClientRole(this.props.selectedUser.roleForClient.id)
  }

  render () {
    const { sites, users, selectedUser, savingUser, removingClientRole } = this.props
    const usersListContents = users.map((item, index) => (
      <UserItem {...item} key={index} />
    ))
    let siteOptions = _.map(sites, siteIterator => ({ label: siteIterator.name, value: siteIterator.id }))
    siteOptions.push({ label: 'All', value: 0 })
    let selectedUserInput = {}
    if (selectedUser && selectedUser.roleForClient) {
      selectedUserInput.firstName = selectedUser.firstName
      selectedUserInput.lastName = selectedUser.lastName
      selectedUserInput.email = selectedUser.email
      selectedUserInput.site = 0
      selectedUserInput.purchase = selectedUser.roleForClient.purchase
      selectedUserInput.reward = selectedUser.roleForClient.reward
    }

    if (users.length > 0) {
      return (
        <div className="row">
          <div className="col-sm-12">
            <h3>ADMINS</h3>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>ACCESS</th>
                  </tr>
                </thead>
                <tbody>
                  {usersListContents}
                </tbody>
              </table>
            </div>
            <Modal className="edit-user" show={(this.modalShouldBeShown())} onHide={this.closeModal.bind(this)}>
              <Modal.Header closeButton>
                <Modal.Title>Edit User</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <EditUserForm submitting={savingUser} removing={removingClientRole} siteOptions={siteOptions}
                              initialValues={selectedUserInput} onRemove={this.removeClientRole.bind(this)} onSubmit={this.updateUser.bind(this)} />
              </Modal.Body>
            </Modal>
          </div>
        </div>
      )
    } else {
      return <div><h3>No matching users found!</h3></div>
    }
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.authorization.authData,
  sites: state.sites,
  users: state.clientRoles,
  selectedUser: state.selectedUser,
  savingUser: state.savingUser,
  removingClientRole: state.removingClientRole,
})
const mapDispatchToProps = {
  clearSelectedUser,
  saveUser,
  removeClientRole,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersList)
