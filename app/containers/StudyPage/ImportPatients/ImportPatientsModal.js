/**
 * Created by mike on 10/3/16.
 */

import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import CenteredModal from '../../../components/CenteredModal/index';

class ImportPatientsModal extends React.Component {
  static propTypes = {
    show: React.PropTypes.bool.isRequired,
    onHide: React.PropTypes.func.isRequired,
  };

  componentDidMount() {
  }

  render() {
    const { onHide } = this.props;
    return (
      <Modal
        {...this.props}
        id="import-info"
        dialogComponentClass={CenteredModal}
        backdrop
        keyboard
      >
        <Modal.Header>
          <Modal.Title>
            <strong>IMPORT</strong>
          </Modal.Title>
          <a className="close" onClick={onHide}>
            <i className="icomoon-close" />
          </a>
        </Modal.Header>
        <Modal.Body>
          <form className="upload-patient-info">
            <div className="table">
              <label className="table-cell" htmlFor="upload-patient">
                <i className="icomoon-alt-arrow-up" />
                <span className="text">UPLOAD PATIENTS</span>
                <span className="jcf-file">
                  <span className="jcf-fake-input">No file chosen</span>
                  <span className="jcf-upload-button">
                    <span className="jcf-button-content">Choose file</span>
                  </span>
                  <input type="file" id="upload-patient" className="jcf-real-element" />
                </span>
              </label>
            </div>
          </form>
          <span className="or">
            <span>or</span>
          </span>
          <a href="#add-patient-info-import" className="add-patient-info-import">
            <div className="table">
              <div className="table-cell">
                <i className="icomoon-alt-plus" />
                <span className="text">Add Patient</span>
              </div>
            </div>
          </a>
        </Modal.Body>
      </Modal>
    );
  }
}

export default ImportPatientsModal;

