import React from 'react'
import DocumentTitle from 'react-document-title'
import { Button } from 'react-bootstrap'

import ListStudyForm from './components/ListStudyForm'

import './styles.less'

const videoOptions = {
  height: '545',
  width: '100%',
  playerVars: { // https://developers.google.com/youtube/player_parameters
    autoplay: 0
  }
}

export default class ListStudy extends React.Component {
  render () {
    return (
      <DocumentTitle title="List Your Clinical Trials, Patient Recruitment & Patient Enrollment">
      <div className="inner-page top-margin get-report-container">
        <div className="container">
          <div className="row">
             <ListStudyForm editing={false} {...this.props} />
          </div>
        </div>
      </div>
      </DocumentTitle>
    )
  }
}
