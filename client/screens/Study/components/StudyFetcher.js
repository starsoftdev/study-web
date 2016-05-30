import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { fetchStudy } from 'actions'
import LoadingResults from 'components/LoadingResults'

class StudyFetcher extends React.Component {
  static propTypes = {
    studyId: PropTypes.number,
    study: PropTypes.object,
    fetching: PropTypes.bool,
    fetchStudy: PropTypes.func,
    children: PropTypes.any,
  }

  componentWillMount ()  {
    if (this.props.studyId && (!this.props.study || this.props.study.id !== this.props.studyId)) {
      this.props.fetchStudy(this.props.studyId)
    }
  }

  componentWillReceiveNewProps (nextProps) {
    if (this.props.studyId !== nextProps.studyId) {
      nextProps.fetchStudy(nextProps.studyId)
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !(nextProps.study && nextProps.study.id !== nextProps.studyId)
  }

  render () {
    return this.props.study
      ? this.props.children(this.props.study)
      : (this.props.fetching
          ? <LoadingResults />
          : <span>Not Found</span>
        )
  }
}

const mapStateToProps = (state) => ({
  study: state.currentStudy,
  fetching: state.fetchingStudy,
})
const mapDispatchToProps = {
  fetchStudy
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudyFetcher)
