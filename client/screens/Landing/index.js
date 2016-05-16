import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import DocumentTitle from 'react-document-title'

class Application extends React.Component {

  render () {
    return (
      <DocumentTitle title="StudyKik Landing Page">
        <div>Landing Page</div>
      </DocumentTitle>
    )
  }
}

export default connect(state => ({
}), {
})(Application)
