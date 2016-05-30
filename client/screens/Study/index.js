import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import DocumentTitle from 'react-document-title'

import StudyFetcher from './components/StudyFetcher'

import './styles.less'

class Study extends React.Component {
  static propTypes = {
    details: PropTypes.object,
  }

  render () {
    const { details } = this.props
    const pageTitle = `${details.name} - Study Details`

    const content = Object.keys(details).map((key, index) => (
      <div className="row" key={index}>
        <div className="col-md-2">
          <span className="label">{key}:</span>
        </div>
        <div className="col-md-4">
          <span className="value">{details[key]}</span>
        </div>
      </div>
    ))

    return (
      <DocumentTitle title={pageTitle}>
        <div className="inner-page">
          <div className="container study-details-container">
            <h2>Sample Study Details Page</h2>
            {content}
          </div>
        </div>
      </DocumentTitle>
    )
  }
}

class WithStudy extends React.Component {
  static propTypes = {
    params: PropTypes.object,
  }

  render () {
    // Need to convert the params `:id` into number
    const studyId = parseInt(this.props.params.id, 10)
    return (
      <StudyFetcher studyId={studyId}>
        {(study) => <Study details={study} {...this.props} />}
      </StudyFetcher>
    )
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.fetchingStudy,
})
const mapDispatchToProps = {
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithStudy)
