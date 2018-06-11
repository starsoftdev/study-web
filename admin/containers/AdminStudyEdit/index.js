import React, { Component, PropTypes } from 'react';

import StudyInfoSection from '../../components/StudyInfoSection';
import EditStudyTabs from '../../components/EditStudyTabs';

export class AdminStudyEditPage extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    params: PropTypes.object,
  };

  componentDidMount() {
    const { studyId } = this.props.params;
    if (studyId) {
      // load studyId related data.
    }
  }


  render() {
    const { studyId } = this.props.params;

    return (
      <div id="adminStudyEditPage">
        <StudyInfoSection study={{ id: studyId }} />
        <div id="studyEditSection">
          <EditStudyTabs />
        </div>
      </div>
    );
  }
}

export default AdminStudyEditPage;
