import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap'
import { saveSite, saveUser, fetchSites, fetchUsers, clearSites, clearUsers } from 'actions'
import EditSiteForm from 'forms/EditSite'
import EditUserForm from 'forms/EditUser'
import SearchByNameForm from 'forms/SearchByName'
import UsersList from './components/UsersList'
import SitesList from './components/SitesList'
import './styles.less'

class SitesUsers extends Component {

  static propTypes = {
    currentUser: PropTypes.object,
    sites: PropTypes.array,
    saveSite: PropTypes.func,
    savingSite: PropTypes.bool,
    saveUser: PropTypes.func,
    savingUser: PropTypes.bool,
    fetchingSites: PropTypes.bool,
    fetchSites: PropTypes.func,
    clearSites: PropTypes.func,
    fetchingUsers: PropTypes.bool,
    fetchUsers: PropTypes.func,
    clearUsers: PropTypes.func,
  }

  constructor (props) {
    super(props)

    if (this.props.currentUser.userInfo.roleForClient) {
      this.props.fetchSites(this.props.currentUser, {})
      this.props.fetchUsers(this.props.currentUser, {})
    }
  }

  componentWillUnmount () {
    this.props.clearSites()
    this.props.clearUsers()
  }

  state = {
    addSiteModalOpen: false,
    addUserModalOpen: false,
  }

  openAddSiteModal () {
    this.setState({ addSiteModalOpen: true })
  }

  closeAddSiteModal () {
    this.setState({ addSiteModalOpen: false })
  }

  openAddUserModal () {
    this.setState({ addUserModalOpen: true })
  }

  closeAddUserModal () {
    this.setState({ addUserModalOpen: false })
  }

  addSite (siteData) {
    this.props.saveSite(this.props.currentUser, null, siteData)
    this.closeAddSiteModal()
  }

  addUser (userData) {
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

    this.props.saveUser(this.props.currentUser, null, userInput)
    this.closeAddUserModal()
  }

  searchSites (searchFilter) {
    this.props.fetchSites(this.props.currentUser, searchFilter)
  }

  searchUsers (searchFilter) {
    this.props.fetchUsers(this.props.currentUser, searchFilter)
  }

  render () {
    const isCurrentUserAdmin = (this.props.currentUser.userInfo.roleForClient !== undefined)
    const { fetchingSites, savingSite, fetchingUsers, savingUser, sites } = this.props
    let siteOptions = _.map(sites, siteIterator => ({ label: siteIterator.name, value: siteIterator.id }))
    siteOptions.unshift({ label: 'All', value: 0 })

    if (!isCurrentUserAdmin) {
      return (
        <div className="sites-users-page">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <h4>You don't have permission to manage sites and users</h4>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="sites-users-page">
        <div className="container">
          <div className="row form-group">
            <div className="col-sm-12">
              <h1>Manage Sites / Users</h1>
            </div>
          </div>
          <div className="row form-group">
            <div className="col-sm-4">
              <SearchByNameForm submitting={fetchingSites} onSubmit={this.searchSites.bind(this)} />
            </div>
            <div className="col-sm-8">
              <button type="button" className="btn btn-default" onClick={this.openAddSiteModal.bind(this)}>
                + Add Site
              </button>
              <Modal className="new-site" show={this.state.addSiteModalOpen} onHide={this.closeAddSiteModal.bind(this)}>
                <Modal.Header closeButton>
                  <Modal.Title>New Site</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <EditSiteForm submitting={savingSite} onSubmit={this.addSite.bind(this)} />
                </Modal.Body>
              </Modal>
            </div>
          </div>
          <div className="row form-group">
            <div className="col-sm-4">
              <SearchByNameForm submitting={fetchingUsers} onSubmit={this.searchUsers.bind(this)} />
            </div>
            <div className="col-sm-8">
              <button type="button" className="btn btn-default" onClick={this.openAddUserModal.bind(this)}>
                + Add User
              </button>
              <Modal className="new-user" show={this.state.addUserModalOpen} onHide={this.closeAddUserModal.bind(this)}>
                <Modal.Header closeButton>
                  <Modal.Title>New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <EditUserForm submitting={savingUser} siteOptions={siteOptions} onSubmit={this.addUser.bind(this)} />
                </Modal.Body>
              </Modal>
            </div>
          </div>
          <div className="users">
            <UsersList />
          </div>
          <div className="sites">
            <SitesList />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.authorization.authData,
  sites: state.sites,
  savingSite: state.savingSite,
  savingUser: state.savingUser,
  fetchingSites: state.fetchingSites,
  fetchingUsers: state.fetchingUsers,
})
const mapDispatchToProps = {
  saveSite,
  saveUser,
  fetchSites,
  fetchUsers,
  clearSites,
  clearUsers,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SitesUsers)
