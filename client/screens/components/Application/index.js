import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import DocumentTitle from 'react-document-title'

import TopBar from './TopBar'
import BottomBar from './BottomBar'

class Application extends React.Component {
  static propTypes = {
    authorization: PropTypes.any,
    location: PropTypes.any,
    children: PropTypes.any,
  }

  render () {
    return (
      <DocumentTitle title="StudyKik Home Page">
        <div>
          <TopBar authorization={this.props.authorization} location={this.props.location} />

          <div className="content">
            {this.props.children}
          </div>

          <BottomBar />
        </div>
      </DocumentTitle>
    )
  }
}

const mapStateToProps = (state) => ({
  authorization: state.authorization,
  location: state.location,
})
const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Application)
