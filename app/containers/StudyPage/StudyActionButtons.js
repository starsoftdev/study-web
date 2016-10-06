/**
 * Created by mike on 10/2/16.
 */

import React from 'react';
import ImportPatientsModal from './ImportPatientsModal';
import TextEmailBlastModal from './TextEmailBlastModal';
import TextBlastModal from './TextBlast/TextBlastModal';

class StudyActionButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showImportPatientsModal: false,
      showTextEmailBlastModal: false,
      showTextBlastModal: false,
      showEmailBlastModal: false,
    };
    this.toggleImportPatientsModal = this.toggleImportPatientsModal.bind(this);
    this.toggleTextEmailBlastModal = this.toggleTextEmailBlastModal.bind(this);
    this.toggleTextBlastModal = this.toggleTextBlastModal.bind(this);
    this.closeTextBlastModal = this.closeTextBlastModal.bind(this);
    this.toggleEmailBlastModal = this.toggleEmailBlastModal.bind(this);
    this.closeEmailBlastModal = this.closeEmailBlastModal.bind(this);
  }

  toggleTextEmailBlastModal() {
    this.setState({
      showTextEmailBlastModal: !this.state.showTextEmailBlastModal,
    });
  }

  toggleImportPatientsModal() {
    this.setState({
      showImportPatientsModal: !this.state.showImportPatientsModal,
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
            <TextBlastModal show={this.state.showTextBlastModal} onClose={this.closeTextBlastModal} onHide={this.toggleTextBlastModal} />
          </span>
        </div>
        <div className="btn-import pull-left">
          <span className="btn btn-primary import" onClick={this.toggleImportPatientsModal}>
            <i className="icomoon-icon_upload" />
            <span>Import</span>
          </span>
          <ImportPatientsModal show={this.state.showImportPatientsModal} onHide={this.toggleImportPatientsModal} />
        </div>
      </div>
    );
  }
}

export default StudyActionButtons;
