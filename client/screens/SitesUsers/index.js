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
        <div>
          <div className="container">
            <SearchSitesForm {...this.props} />
            <SearchUsersForm {...this.props} />
          </div>

          <UsersList />
          <SitesList />
        </div>
      </DocumentTitle>
    )
  }
}
