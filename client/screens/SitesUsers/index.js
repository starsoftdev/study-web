import React from 'react'
import DocumentTitle from 'react-document-title'

import SearchSitesForm from './components/SearchSitesForm'
import SearchUsersForm from './components/SearchUsersForm'
import UsersList from './components/UsersList'
import SitesList from './components/SitesList'

import './styles.less'

export default class SitesUsers extends React.Component {
  render () {
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
                <button type="button" className="btn btn-default">+ Add Site</button>
              </div>
            </div>
            <div className="row form-group">
              <div className="col-sm-4">
                <SearchUsersForm />
              </div>
              <div className="col-sm-8">
                <button type="button" className="btn btn-default">+ Add User</button>
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
