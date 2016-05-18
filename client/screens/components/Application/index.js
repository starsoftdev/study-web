import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import DocumentTitle from 'react-document-title'

class Application extends React.Component {
  static propTypes = {
    children: PropTypes.any,
  }

  render () {
    return (
      <DocumentTitle title="StudyKik Home Page">
        {this.props.children || <div>welcome!</div>}
      </DocumentTitle>
    )
  }
}

const mapStateToProps = () => ({})
const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Application)
