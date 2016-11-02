/**
 * Created by mike on 10/2/16.
 */

import React from 'react';
import TextEmailBlastModal from './TextEmailBlastModal';
import TextBlastModal from './TextBlast/index';

class PatientActionButtons extends React.Component {
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

  render() {
    return (
      <div className="btns pull-right">
        <div className="btn-email pull-left">
          <span className="btn btn-primary email" onClick={this.toggleTextEmailBlastModal}>
            <i className="icomoon-icon_chat_alt" />
            <span>Text / Email Blast</span>
            <TextEmailBlastModal show={this.state.showTextEmailBlastModal} onHide={this.toggleTextEmailBlastModal} toggleTextBlast={this.toggleTextBlastModal} />
            <TextBlastModal
              show={this.state.showTextBlastModal}
              onClose={this.closeTextBlastModal}
              onHide={this.toggleTextBlastModal}
            />
          </span>
        </div>
        <div className="btn-import pull-left">
          <button type="button" className="btn btn-primary btn-import">
            <i className="fa fa-upload" aria-hidden="true" />
            <span>Import</span>
          </button>
          <button type="button" className="btn btn-primary btn-download">
            <i className="fa fa-download" aria-hidden="true" />
            <span>Download</span>
          </button>
        </div>
      </div>
    );
  }
}

export default PatientActionButtons;
