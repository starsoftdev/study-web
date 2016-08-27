import React, { PropTypes } from 'react'
import DocumentTitle from 'react-document-title'

import PatientBoard from './components/PatientBoard'

import './styles.less'

export default class PatientDetails extends React.Component {
  static propTypes = {
    params: PropTypes.object,
  }

  render () {
    return (
      <DocumentTitle title="Patients Details - StudyKIK">
        <div className="inner-page top-margin patient-details-container">
          <div className="container">
            <div className="row">
              <PatientBoard studyId={parseInt(this.props.params.id)} />
            </div>
          </div>
        </div>
      </DocumentTitle>
    )
  }
}
