import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap'
import t from 'tcomb-form'
import DocumentTitle from 'react-document-title'
import { saveSite, saveUser } from 'actions'

import SearchSitesForm from './components/SearchSitesForm'
import SearchUsersForm from './components/SearchUsersForm'
import UsersList from './components/UsersList'
import SitesList from './components/SitesList'
import {
  getModel as getSiteFormType,
  options as siteFormOptions
} from 'forms/AddSite'
import {
  getModel as getUserFormType,
  options as userFormOptions
} from 'forms/AddUser'

import './styles.less'

const TCombForm = t.form.Form

export default class SitesUsers extends Component {

  static propTypes = {
    sites: PropTypes.array,
    saveSite: PropTypes.func,
    savingSite: PropTypes.boolean,
    saveUser: PropTypes.func,
    savingUser: PropTypes.boolean,
  }

  constructor (props) {
    super(props)
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

  addSite (ev) {
    ev.preventDefault()

    const siteData = this.refs.siteForm.getValue()
    if (siteData) {
      this.props.saveSite(null, siteData)
    }
  }

  addUser (ev) {
    ev.preventDefault()

    const userData = this.refs.userForm.getValue()
    if (userData) {
      this.props.saveUser(null, userData)
    }
  }

  render () {
    const { sites, savingSite, savingUser } = this.props

    return (
      <DocumentTitle title="Manage Sites / Users">
        <div className="sites-users-page">
          <div className="container">
            <div className="row form-group">
              <div className="col-sm-12">
                <h1>Manage Sites / Users</h1>
              </div>
            </div>
            <div className="row form-group">
              <div className="col-sm-4">
                <SearchSitesForm />
              </div>
              <div className="col-sm-8">
                <button type="button" className="btn btn-default" onClick={this.openAddSiteModal.bind(this)}>+ Add Site</button>
                <Modal className="new-site" show={this.state.addSiteModalOpen} onHide={this.closeAddSiteModal.bind(this)}>
                  <form className="form-green" onSubmit={this.addSite.bind(this)}>
                    <Modal.Header closeButton>
                      <Modal.Title>New Site</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <TCombForm ref="siteForm" type={getSiteFormType()} options={siteFormOptions} />
                    </Modal.Body>
                    <Modal.Footer>
                      <button type="submit" className="btn btn-default" disabled={savingSite}>
                        {savingSite
                          ? <span>Saving...</span>
                          : <span>SUBMIT</span>
                        }
                      </button>
                    </Modal.Footer>
                  </form>
                </Modal>
              </div>
            </div>
            <div className="row form-group">
              <div className="col-sm-4">
                <SearchUsersForm />
              </div>
              <div className="col-sm-8">
                <button type="button" className="btn btn-default" onClick={this.openAddUserModal.bind(this)}>+ Add User</button>
                <Modal className="new-user" show={this.state.addUserModalOpen} onHide={this.closeAddUserModal.bind(this)}>
                  <form className="form-green" onSubmit={this.addUser.bind(this)}>
                    <Modal.Header closeButton>
                      <Modal.Title>New User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <TCombForm ref="userForm" type={getUserFormType(sites)} options={userFormOptions} />
                    </Modal.Body>
                    <Modal.Footer>
                      <button type="submit" className="btn btn-default" disabled={savingUser}>
                        {savingUser
                          ? <span>Saving...</span>
                          : <span>SUBMIT</span>
                        }
                      </button>
                    </Modal.Footer>
                  </form>
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
      </DocumentTitle>
    )
  }
}

const mapStateToProps = (state) => ({
  sites: state.sites,
  savingSite: state.savingSite,
  savingUser: state.savingUser,
})
const mapDispatchToProps = {
  saveSite,
  saveUser,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SitesUsers)
