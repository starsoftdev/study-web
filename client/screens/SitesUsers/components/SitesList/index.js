import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap'
import EditSiteForm from 'forms/EditSite'
import EditUserForm from 'forms/EditUser'
import { clearSelectedSite, clearSelectedUser, saveSite, saveUser, removeUser } from 'actions'
import SiteItem from './SiteItem'
import './styles.less'

export default class SitesList extends Component {

  static propTypes = {
    currentUser: PropTypes.object,
    sites: PropTypes.array,
    selectedSite: PropTypes.object,
    selectedUser: PropTypes.object,
    clearSelectedSite: PropTypes.func,
    clearSelectedUser: PropTypes.func,
    savingSite: PropTypes.bool,
    saveSite: PropTypes.func,
    savingUser: PropTypes.bool,
    saveUser: PropTypes.func,
    removingUser: PropTypes.bool,
    removeUser: PropTypes.func,
  }

  constructor (props) {
    super(props)
  }

  editSiteModalShouldBeShown () {
    return (this.props.selectedSite)
  }

  editUserModalShouldBeShown () {
    return (this.props.selectedUser && !this.props.selectedUser.roleForClient)
  }

  closeEditSiteModal () {
    this.props.clearSelectedSite()
  }

  closeEditUserModal () {
    this.props.clearSelectedUser()
  }

  updateSite (siteData) {
    this.props.saveSite(this.props.currentUser, this.props.selectedSite.id, siteData)
  }

  updateUser (userData) {
    const userInput = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      siteId: userData.site,
      clientRole: {
        purchase: userData.purchase,
        reward: userData.reward,
      }
    }

    this.props.saveUser(this.props.currentUser, this.props.selectedUser.id, userInput)
  }

  removeUser () {
    this.props.removeUser(this.props.selectedUser.id)
  }

  render () {
    const { sites, selectedSite, savingSite, selectedUser, savingUser, removingUser } = this.props
    const sitesListContents = sites.map((item, index) => (
      <SiteItem {...item} key={index} />
    ))
    let siteOptions = _.map(sites, siteIterator => ({ label: siteIterator.name, value: siteIterator.id }))
    siteOptions.push({ label: 'All', value: 0 })
    let selectedUserInput = {}
    if (selectedUser && !selectedUser.roleForClient) {
      selectedUserInput.firstName = selectedUser.firstName
      selectedUserInput.lastName = selectedUser.lastName
      selectedUserInput.email = selectedUser.email
      const foundSiteIndex = _.findIndex(sites, (siteIterator) => {
        return (_.findIndex(siteIterator.users, { id: selectedUser.id }) > -1)
      })
      selectedUserInput.site = sites[foundSiteIndex].id
    }

    if (sites.length > 0) {
      return (
        <div className="row">
          <div className="col-sm-12">
            <h3>SITE LOCATIONS</h3>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>SITE NAME</th>
                    <th>PRINCIPAL INVESTIGATOR</th>
                    <th>SITE PHONE</th>
                    <th>SITE ADDRESS</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {sitesListContents}
                </tbody>
              </table>
            </div>
            <Modal className="edit-site" show={(this.editSiteModalShouldBeShown())} onHide={this.closeEditSiteModal.bind(this)}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Site</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <EditSiteForm submitting={savingSite} initialValues={selectedSite} onSubmit={this.updateSite.bind(this)} />
              </Modal.Body>
            </Modal>
            <Modal className="edit-user" show={(this.editUserModalShouldBeShown())} onHide={this.closeEditUserModal.bind(this)}>
              <Modal.Header closeButton>
                <Modal.Title>Edit User</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <EditUserForm submitting={savingUser} removing={removingUser} siteOptions={siteOptions}
                              initialValues={selectedUserInput} onRemove={this.removeUser.bind(this)} onSubmit={this.updateUser.bind(this)} />
              </Modal.Body>
            </Modal>
          </div>
        </div>
      )
    } else {
      return <div><h3>No matching sites found!</h3></div>
    }
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.authorization.authData,
  sites: state.sites,
  selectedSite: state.selectedSite,
  savingSite: state.savingSite,
  selectedUser: state.selectedUser,
  savingUser: state.savingUser,
  removingUser: state.removingUser,
})
const mapDispatchToProps = {
  clearSelectedSite,
  saveSite,
  clearSelectedUser,
  saveUser,
  removeUser,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SitesList)
