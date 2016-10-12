/**
 * Created by mike on 10/3/16.
 */

import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Form from 'react-bootstrap/lib/Form';
import CenteredModal from '../../../components/CenteredModal/index';

class ImportPatientsModal extends React.Component {
  static propTypes = {
    show: React.PropTypes.bool.isRequired,
    onHide: React.PropTypes.func.isRequired,
    toggleAddPatient: React.PropTypes.func.isRequired,
  };

  componentDidMount() {
  }

  render() {
    const { onHide, toggleAddPatient, ...props } = this.props;
    return (
      <Modal
        {...props}
        id="import-info"
        dialogComponentClass={CenteredModal}
        backdrop
        keyboard
      >
        <Modal.Header>
          <Modal.Title>
            <strong>Import</strong>
          </Modal.Title>
          <a className="close" onClick={onHide}>
            <i className="icomoon-icon_close" />
          </a>
        </Modal.Header>
        <Modal.Body>
          <Form className="upload-patient-info">
            <div className="table">
              <label className="table-cell" htmlFor="upload-patient">
                <i className="icomoon-arrow_up_alt" />
                <span className="text">Upload Patients</span>
                <span className="jcf-file">
                  <span className="jcf-fake-input">No file chosen</span>
                  <span className="jcf-upload-button">
                    <span className="jcf-button-content">Choose file</span>
                  </span>
                  <input type="file" id="upload-patient" className="jcf-real-element" />
                </span>
              </label>
            </div>
          </Form>
          <span className="or">
            <span>or</span>
          </span>
          <a className="add-patient-info-import" onClick={toggleAddPatient}>
            <div className="table">
              <div className="table-cell">
                <i className="icomoon-icon_plus_alt" />
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

