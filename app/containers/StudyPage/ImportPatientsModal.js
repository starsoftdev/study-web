/**
 * Created by mike on 10/3/16.
 */

import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';

class ImportPatientsModal extends React.Component {
  static propTypes = {
    show: React.PropTypes.bool.isRequired,
    onHide: React.PropTypes.func.isRequired,
  };

  componentDidMount() {
  }

  render() {
    return (
      <Modal
        {...this.props}
        bsStyle="medium"
        id="import-info"
        backdrop
        keyboard
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <strong>IMPORT</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="scroll-holder jcf--scrollable">
            <form className="upload-patient-info">
              <div className="table">
                <label className="table-cell" htmlFor="upload-patient">
                  <i className="icon-arrow_up_alt" />
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
              <button type="reset" className="btn btn-gray-outline">
                <i className="icon-icon_close" />
              </button>
            </form>
            <span className="or">
              <span>or</span>
            </span>
            <a href="#add-patient-info-import" className="add-patient-info-import">
              <div className="table">
                <div className="table-cell">
                  <i className="icon-icon_plus_alt" />
                  <span className="text">Add Patient</span>
                </div>
              </div>
            </a>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

export default ImportPatientsModal;

