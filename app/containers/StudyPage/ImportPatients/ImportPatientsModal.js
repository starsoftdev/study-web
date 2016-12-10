/**
 * Created by mike on 10/3/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Modal from 'react-bootstrap/lib/Modal';
import Form from 'react-bootstrap/lib/Form';
import Button from 'react-bootstrap/lib/Button';
import CenteredModal from '../../../components/CenteredModal/index';
import Input from '../../../components/Input/index';
import { submitPatientImport, clearForm } from '../actions';
import LoadingSpinner from '../../../components/LoadingSpinner';

@reduxForm({ form: 'importPatients' })
class ImportPatientsModal extends React.Component {
  static propTypes = {
    clearForm: React.PropTypes.func,
    fileUploaded: React.PropTypes.string,
    show: React.PropTypes.bool.isRequired,
    onHide: React.PropTypes.func.isRequired,
    toggleAddPatient: React.PropTypes.func.isRequired,
    studyId: React.PropTypes.number,
    submitPatientImport: React.PropTypes.func.isRequired,
    uploadStart: React.PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.uploadFile = this.uploadFile.bind(this);
  }

  componentDidMount() {
  }

  uploadFile(event) {
    const { submitPatientImport, studyId } = this.props;
    // if the file is a csv
    if (event.target.files[0].type === 'text/csv' || event.target.files[0].type !== '' || event.target.files[0].type !== 'application/vnd.ms-excel' || event.target.files[0].type !== 'application/excel' || event.target.files[0].type !== 'text/anytext' || event.target.files[0].type !== 'application/vnd.msexcel' || event.target.files[0].type !== 'text/comma-separated-values') {
      const file = event.target.files[0];
      submitPatientImport(studyId, file);
    } else {
      // return error
      console.error('wrong file type');
    }
  }
  render() {
    const { onHide, toggleAddPatient, uploadStart, fileUploaded, clearForm, ...props } = this.props;
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
          {uploadStart ? <div><LoadingSpinner /></div> :
            <div>
              <Form className="upload-patient-info">
                <div className="table">

                  <label className="table-cell" htmlFor="upload-patient">
                    <i className="icomoon-arrow_up_alt" />
                    <span className="text">Upload Patients</span>
                    {fileUploaded && <span className="jcf-file jcf-extension-csv parent-active">{fileUploaded}</span>}
                    <span className="jcf-file">
                      <span className="jcf-fake-input">No file chosen</span>
                      <span className="jcf-upload-button">
                        <span className="jcf-button-content">Choose file</span>
                      </span>
                      <Field
                        type="file"
                        name="uploadFile"
                        component={Input}
                        className="jcf-real-element"
                        id="upload-patient"
                        onChange={this.uploadFile}
                      />
                    </span>

                  </label>

                </div>
                {fileUploaded && <Button className="clear-import-button" onClick={() => clearForm()}><i className="fa fa-times" aria-hidden="true" /></Button>}

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
            </div>
          }
        </Modal.Body>
      </Modal>
    );
  }
}
const mapStateToProps = (state) => (
  {
    studyId: state.studyPage.studyId,
    uploadStart: state.studyPage.uploadStarted,
    fileUploaded: state.studyPage.fileUploaded,
  }
);

function mapDispatchToProps(dispatch) {
  return {
    submitPatientImport: (studyId, file, onClose) => dispatch(submitPatientImport(studyId, file, onClose)),
    clearForm: () => dispatch(clearForm()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportPatientsModal);
