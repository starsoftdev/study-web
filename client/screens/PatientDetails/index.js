import React from 'react'
import DocumentTitle from 'react-document-title'

import PatientBoard from './components/PatientBoard'

export default class PatientDetails extends React.Component {
  render () {
    return (
      <DocumentTitle title="Patients Details - StudyKIK">
        <div className="inner-page top-margin patient-details-container">
          <div className="container">
            <div className="row">
              <PatientBoard />
            </div>
          </div>
        </div>
      </DocumentTitle>
    )
  }
}
