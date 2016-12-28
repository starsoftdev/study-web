/**
 * Created by mike on 10/2/16.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ImportPatientsModal from './ImportPatients/ImportPatientsModal';
import TextEmailBlastModal from './TextEmailBlastModal';
import TextBlastModal from './TextBlast/index';
import AddPatient from './ImportPatients/AddPatient';

import { exportPatients, setAddPatientStatus } from './actions';
import { reset } from 'redux-form';

class StudyActionButtons extends Component {
  static propTypes = {
    campaign: PropTypes.number,
    search: PropTypes.string,
    source: PropTypes.number,
    siteId: PropTypes.number.isRequired,
    studyId: PropTypes.number.isRequired,
    exportPatients: PropTypes.func,
    resetTextBlastForm: PropTypes.func,
    setAddPatientStatus: PropTypes.func,
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
    this.props.setAddPatientStatus(false);
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
    this.props.resetTextBlastForm();
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
    const { exportPatients, siteId, studyId, campaign, source, search } = this.props;
    exportPatients(studyId, siteId, search, campaign, source);
  }

  render() {
    return (
      <div className="btns-popups pull-right">
        <div className="col pull-right">
          <a className="btn btn-primary download" onClick={this.download}>
            <i className="icomoon-icon_download" />
            &nbsp;Download
          </a>
        </div>
        <div className="col pull-right">
          <span className="btn btn-primary import" onClick={this.toggleImportPatientsModal}>
            <i className="icomoon-icon_upload" />
            &nbsp;Import
          </span>
          <ImportPatientsModal show={this.state.showImportPatientsModal} onHide={this.toggleImportPatientsModal} toggleAddPatient={this.toggleAddPatientModal} />
          <AddPatient show={this.state.showAddPatientModal} onClose={this.closeAddPatientModal} onHide={this.toggleAddPatientModal} />
        </div>
        <div className="col pull-right">
          <span className="btn btn-primary email" onClick={this.toggleTextEmailBlastModal}>
            <i className="icomoon-icon_chat_alt" />
            &nbsp;Text / Email Blast
            <TextEmailBlastModal show={this.state.showTextEmailBlastModal} onHide={this.toggleTextEmailBlastModal} toggleTextBlast={this.toggleTextBlastModal} />
            <TextBlastModal
              show={this.state.showTextBlastModal}
              onClose={this.closeTextBlastModal}
              onHide={this.toggleTextBlastModal}
            />
          </span>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    exportPatients: (studyId, siteId, text, campaignId, sourceId) => dispatch(exportPatients(studyId, siteId, text, campaignId, sourceId)),
    resetTextBlastForm: () => dispatch(reset('StudyPage.TextBlastModal')),
    setAddPatientStatus: (status) => dispatch(setAddPatientStatus(status)),
  };
}

export default connect(null, mapDispatchToProps)(StudyActionButtons);
