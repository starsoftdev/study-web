/**
 * Created by mike on 10/2/16.
 */

import React from 'react';
import ImportPatientsModal from './ImportPatientsModal';
import TextEmailBlastModal from './TextEmailBlastModal';

class StudyActionButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showImportPatientsModal: false,
      showTextEmailBlastModal: false,
    };
    this.toggleImportPatientsModal = this.toggleImportPatientsModal.bind(this);
    this.toggleTextEmailBlastModal = this.toggleTextEmailBlastModal.bind(this);
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

  render() {
    return (
      <div className="btns pull-right">
        <div className="btn-email pull-left">
          <span className="btn btn-primary email" onClick={this.toggleTextEmailBlastModal}>
            <i className="icomoon-icon_chat_alt" />
            <span>Text / Email Blast</span>
            <TextEmailBlastModal show={this.state.showTextEmailBlastModal} onHide={this.toggleTextEmailBlastModal} />
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
