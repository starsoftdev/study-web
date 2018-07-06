/**
 * Created by mike on 10/2/16.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../App/selectors';
import { translate } from '../../../common/utilities/localization';

import { exportPatients } from './actions';

class StudyActionButtons extends Component {
  static propTypes = {
    campaign: PropTypes.number,
    search: PropTypes.string,
    source: PropTypes.any,
    studyId: PropTypes.number.isRequired,
    exportPatients: PropTypes.func,
    ePMS: PropTypes.bool,
    studyName: PropTypes.string,
    currentUser: PropTypes.any,
  };
  constructor(props) {
    super(props);
    this.state = {
      showImportPatientsModal: false,
      showAddPatientModal: false,
      showTextEmailBlastModal: false,
      showTextBlastModal: false,
      showEmailBlastModal: false,
    };
    this.toggleImportPatientsModal = this.toggleImportPatientsModal.bind(this);
    this.toggleAddPatientModal = this.toggleAddPatientModal.bind(this);
    this.closeAddPatientModal = this.closeAddPatientModal.bind(this);
    this.toggleTextEmailBlastModal = this.toggleTextEmailBlastModal.bind(this);
    this.toggleTextBlastModal = this.toggleTextBlastModal.bind(this);
    this.closeTextBlastModal = this.closeTextBlastModal.bind(this);
    this.toggleEmailBlastModal = this.toggleEmailBlastModal.bind(this);
    this.closeEmailBlastModal = this.closeEmailBlastModal.bind(this);
    this.download = this.download.bind(this);
  }

  toggleImportPatientsModal() {
    this.setState({
      showImportPatientsModal: !this.state.showImportPatientsModal,
    });
  }

  toggleAddPatientModal() {
    this.setState({
      showImportPatientsModal: !this.state.showImportPatientsModal,
      showAddPatientModal: !this.state.showAddPatientModal,
    });
  }

  closeAddPatientModal() {
    this.setState({
      showImportPatientsModal: false,
      showAddPatientModal: false,
    });
  }

  toggleTextEmailBlastModal() {
    this.setState({
      showTextEmailBlastModal: !this.state.showTextEmailBlastModal,
    });
  }

  toggleTextBlastModal() {
    this.setState({
      showTextEmailBlastModal: !this.state.showTextEmailBlastModal,
      showTextBlastModal: !this.state.showTextBlastModal,
    });
  }

  closeTextBlastModal() {
    this.setState({
      showTextEmailBlastModal: false,
      showTextBlastModal: false,
    });
  }

  toggleEmailBlastModal() {
    this.setState({
      showTextEmailBlastModal: !this.state.showTextEmailBlastModal,
      showEmailBlastModal: !this.state.showEmailBlastModal,
    });
  }

  closeEmailBlastModal() {
    this.setState({
      showTextEmailBlastModal: false,
      showEmailBlastModal: false,
    });
  }

  download() {
    const { exportPatients, studyId, campaign, source, search, currentUser } = this.props;
    if (currentUser && currentUser.roleForClient) {
      exportPatients(studyId, currentUser.roleForClient.id, search, campaign, source);
    }
  }

  render() {
    return (
      <div className="btns-popups pull-right">
        <div className="col pull-right no-right-padding">
          <button type="button" className="btn btn-primary download pull-right" onClick={this.download}>
            <i className="icomoon-icon_download" />
            &nbsp;{translate('client.component.studyActionButtons.download')}
          </button>
        </div>

      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    exportPatients: (studyId, clientRoleId, text, campaignId, sourceId) => dispatch(exportPatients(studyId, clientRoleId, text, campaignId, sourceId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StudyActionButtons);
