import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap'
import t from 'tcomb-form'
import { clearSelectedUser, saveUser, removeUser } from 'actions'

import {
  getModel as getFormType,
  options as formOptions
} from 'forms/EditUser'

import UserItem from './UserItem'
import './styles.less'

const TCombForm = t.form.Form

export default class UsersList extends Component {

  static propTypes = {
    currentUser: PropTypes.object,
    sites: PropTypes.array,
    users: PropTypes.array,
    selectedUser: PropTypes.object,
    clearSelectedUser: PropTypes.func,
    savingUser: PropTypes.bool,
    saveUser: PropTypes.func,
    removeUser: PropTypes.func,
    removingUser: PropTypes.bool,
  }

  constructor (props) {
    super(props)
  }

  modalShouldBeShown () {
    return (this.props.selectedUser !== null)
  }

  closeModal () {
    this.props.clearSelectedUser()
  }

  updateUser (ev) {
    ev.preventDefault()

    const userData = this.refs.form.getValue()
    if (userData) {
      const userInput = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        siteId: parseInt(userData.siteId),
        clientRole: {
          purchase: userData.purchase,
          reward: userData.reward,
        }
      }

      this.props.saveUser(this.props.currentUser, this.props.selectedUser.id, userInput)
    }
  }

  removeUser (ev) {
    ev.preventDefault()

    this.props.removeUser(this.props.selectedUser.id)
  }

  render () {
    const { sites, users, selectedUser, savingUser, removingUser } = this.props
    const usersListContents = users.map((item, index) => (
      <UserItem {...item} key={index} />
    ))

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
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {usersListContents}
                </tbody>
              </table>
            </div>
            <Modal className="edit-user" show={this.modalShouldBeShown()} onHide={this.closeModal.bind(this)}>
              <form className="form-green" onSubmit={this.updateUser.bind(this)}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <TCombForm ref="form" type={getFormType(sites, selectedUser)} options={formOptions} />
                </Modal.Body>
                <Modal.Footer>
                  <button type="button" className="btn btn-default" disabled={removingUser} onClick={this.removeUser.bind(this)}>
                    {removingUser
                      ? <span>Removing...</span>
                      : <span>REMOVE</span>
                    }
                  </button>
                  <button type="submit" className="btn btn-default" disabled={savingUser}>
                    {savingUser
                      ? <span>Saving...</span>
                      : <span>UPDATE</span>
                    }
                  </button>
                </Modal.Footer>
              </form>
            </Modal>
          </div>
        </div>
      )
    } else {
      return <div />
    }
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.authorization.authData,
  sites: state.sites,
  users: state.users,
  selectedUser: state.selectedUser,
  savingUser: state.savingUser,
  removingUser: state.removingUser,
})
const mapDispatchToProps = {
  clearSelectedUser,
  saveUser,
  removeUser,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersList)
