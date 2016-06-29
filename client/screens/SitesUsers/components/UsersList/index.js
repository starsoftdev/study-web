import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap'
import t from 'tcomb-form'
import { clearSelectedUser } from 'actions'

import {
  getModel as getFormType,
  options as formOptions
} from 'forms/EditUser'

import UserItem from './UserItem'
import './styles.less'

const TCombForm = t.form.Form

export default class UsersList extends Component {

  static propTypes = {
    users: PropTypes.array,
    sites: PropTypes.array,
    selectedUser: PropTypes.object,
    clearSelectedUser: PropTypes.func
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
    const value = this.refs.form.getValue()

    if (value) {
      console.log(value)
    }
  }

  removeUser (ev) {

  }

  render () {
    const { sites, users, selectedUser } = this.props
    const usersListContents = users.map((item, index) => (
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
                  <TCombForm ref="form" type={getFormType(selectedUser, sites)} options={formOptions} />
                </Modal.Body>
                <Modal.Footer>
                  <button type="button" className="btn btn-default" onClick={this.removeUser.bind(this)}>REMOVE</button>
                  <button type="submit" className="btn btn-default">UPDATE</button>
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
  users: state.users,
  sites: state.sites,
  selectedUser: state.selectedUser
})
const mapDispatchToProps = {
  clearSelectedUser
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersList)
