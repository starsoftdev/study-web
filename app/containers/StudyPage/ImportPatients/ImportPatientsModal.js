/**
 * Created by mike on 10/3/16.
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { actions as toastrActions } from 'react-redux-toastr';
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
    toastrActions: React.PropTypes.object.isRequired,
    uploadStart: React.PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.uploadFile = this.uploadFile.bind(this);
    this.renderUpload = this.renderUpload.bind(this);
  }

  componentDidMount() {
  }

  uploadFile(event) {
    const { onHide, submitPatientImport, studyId, toastrActions } = this.props;
    // if the file is a csv
    if (event.target.files[0].type === 'text/csv' || event.target.files[0].type === '' || event.target.files[0].type === 'application/vnd.ms-excel' || event.target.files[0].type === 'application/excel' || event.target.files[0].type === 'text/anytext' || event.target.files[0].type === 'application/vnd.msexcel' || event.target.files[0].type === 'text/comma-separated-values') {
      const file = event.target.files[0];
      submitPatientImport(studyId, file, onHide);
    } else {
      // display error
      toastrActions.error('Wrong file type');
    }
  }

  renderUpload() {
    const { toggleAddPatient, uploadStart, fileUploaded, clearForm } = this.props;
    if (uploadStart) {
      return (
        <div className="text-center" style={{ marginTop: '20px', marginBottom: '20px' }}>
          <p>
            <LoadingSpinner showOnlyIcon />
          </p>
          <p className="text-info spinner-text">
            Uploading CSV File...
          </p>
        </div>
      );
    }
    return (
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
    );
  }

  render() {
    let { onHide, ...props } = this.props;
    delete props.toggleAddPatient;
    delete props.toggleAddPatient;
    delete props.uploadStart;
    delete props.fileUploaded;
    delete props.clearForm;
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
          {this.renderUpload()}
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
    toastrActions: bindActionCreators(toastrActions, dispatch),
    clearForm: () => dispatch(clearForm()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportPatientsModal);
