/**
 * Created by mike on 10/2/16.
 */

import React from 'react';
import ImportPatientsModal from './ImportPatientsModal';

class StudyActionButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showImportPatientsModal: false,
    };
    this.toggleImportPatientsModal = this.toggleImportPatientsModal.bind(this);
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
          <span className="btn btn-primary email">
            <i className="icon-icon_chat_alt" />
            <span>TEXT / EMAIL BLAST</span>
          </span>
        </div>
        <div className="btn-import pull-left">
          <span className="btn btn-primary import" onClick={this.toggleImportPatientsModal}>
            <i className="icon-icon_upload" />
            <span>Import</span>
          </span>
          <ImportPatientsModal show={this.state.showImportPatientsModal} onHide={this.toggleImportPatientsModal} />
        </div>
        <div className="btn-download pull-left">
          <span className="btn btn-primary download">
            <i className="icon-icon_download" />
            <span>Download</span>
          </span>
        </div>
      </div>
    );
  }
}

export default StudyActionButtons;
