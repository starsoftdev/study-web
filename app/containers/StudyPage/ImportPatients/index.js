/**
 * Created by mike on 10/3/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { toastr } from 'react-redux-toastr';
import { push } from 'react-router-redux';
import Modal from 'react-bootstrap/lib/Modal';
import CenteredModal from '../../../components/CenteredModal/index';
import LoadingSpinner from '../../../components/LoadingSpinner';
import sanitizeProps from '../../../utils/sanitizeProps';
import { submitPatientImport, clearForm } from '../actions';

@reduxForm({ form: 'importPatients' })
class ImportPatientsModal extends React.Component {
  static propTypes = {
    push: React.PropTypes.func,
    clientId: React.PropTypes.number,
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
    this.renderUpload = this.renderUpload.bind(this);
    this.moveToUploadPage = this.moveToUploadPage.bind(this);
  }

  componentDidMount() {
  }

  moveToUploadPage() {
    const { push } = this.props;
    push('/app/upload-patients');
  }

  renderUpload() {
    const { toggleAddPatient, uploadStart } = this.props;
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
        <span className="modal-opener" onClick={this.moveToUploadPage}>
          <div className="table">
            <div className="table-cell">
              <i className="icomoon-arrow_up_alt" />
              <span className="text">Upload Patients</span>
            </div>
          </div>
        </span>
        <span className="or">
          <span>or</span>
        </span>
        <span className="modal-opener" onClick={toggleAddPatient}>
          <div className="table">
            <div className="table-cell">
              <i className="icomoon-icon_plus_alt" />
              <span className="text">Add Patient</span>
            </div>
          </div>
        </span>
      </div>
    );
  }

  render() {
    const { onHide, ...props } = this.props;
    const sanitizedProps = sanitizeProps(props);
    delete sanitizedProps.toggleAddPatient;
    delete sanitizedProps.toggleAddPatient;
    delete sanitizedProps.uploadStart;
    delete sanitizedProps.fileUploaded;
    delete sanitizedProps.clearForm;
    delete sanitizedProps.studyId;
    delete sanitizedProps.submitPatientImport;
    return (
      <Modal
        {...sanitizedProps}
        id="import-info"
        dialogComponentClass={CenteredModal}
        onHide={onHide}
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
    clientId: state.global.userData.roleForClient.client.id,
    studyId: state.studyPage.studyId,
    uploadStart: state.studyPage.uploadStarted,
    fileUploaded: state.studyPage.fileUploaded,
  }
);

function mapDispatchToProps(dispatch) {
  return {
    push: (path) => dispatch(push(path)),
    submitPatientImport: (clientId, studyId, file, onClose) => dispatch(submitPatientImport(clientId, studyId, file, onClose)),
    clearForm: () => dispatch(clearForm()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportPatientsModal);
