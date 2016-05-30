import React from 'react'
import DocumentTitle from 'react-document-title'

import GetTrialNotificationForm from './components/GetTrialNotificationForm'
import SearchTrialsForm from './components/SearchTrialsForm'
import TrialList from './components/TrialList'

export default class TrialListing extends React.Component {
  render () {
    return (
      <DocumentTitle title="Find Clinical Trials - Advertise & Promote Your Medical Study">
        <div>
          <div className="container">
            <GetTrialNotificationForm {...this.props} />
            <SearchTrialsForm {...this.props} />
          </div>

          <TrialList />
        </div>
      </DocumentTitle>
    )
  }
}
