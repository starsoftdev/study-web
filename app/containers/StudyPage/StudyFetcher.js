import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchStudy } from './actions';
import LoadingSpinner from '../../components/LoadingSpinner';

class StudyFetcher extends React.Component {
  static propTypes = {
    studyId: PropTypes.number,
    study: PropTypes.object,
    fetching: PropTypes.bool,
    fetchStudy: PropTypes.func,
    children: PropTypes.any,
  };

  componentWillMount() {
    if (this.props.studyId && (!this.props.study || this.props.study.id !== this.props.studyId)) {
      this.props.fetchStudy(this.props.studyId);
    }
  }

  shouldComponentUpdate(nextProps) {
    return !(nextProps.study && nextProps.study.id !== nextProps.studyId);
  }

  componentWillReceiveNewProps(nextProps) {
    if (this.props.studyId !== nextProps.studyId) {
      nextProps.fetchStudy(nextProps.studyId);
    }
  }

  render() {
    if (this.props.study) {
      if (this.props.fetching) {
        return (
          <LoadingSpinner />
        );
      }
      return (
        <span>Not Found</span>
      );
    }
    return this.props.children(this.props.study);
  }
}

const mapStateToProps = (state) => ({
  study: state.currentStudy,
  fetching: state.fetchingStudy,
});
const mapDispatchToProps = {
  fetchStudy,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudyFetcher);
