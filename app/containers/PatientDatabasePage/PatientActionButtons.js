/**
 * Created by mike on 10/2/16.
 */

import React from 'react';
import TextEmailBlastModal from './TextEmailBlastModal';
import { connect } from 'react-redux';
import { change } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import AlertModal from 'components/AlertModal';
import Form from 'react-bootstrap/lib/Form';
import Modal from 'react-bootstrap/lib/Modal';
import { selectValues } from '../../common/selectors/form.selector';
import CenteredModal from '../../components/CenteredModal/index';
import LoadingSpinner from '../../components/LoadingSpinner';
import { selectImportPatientsStatus } from './selectors';
import TextBlastModal from './TextBlast/index';
import AddPatientModal from './ImportPatients/AddPatientModal';
import { clearForm, importPatients, setAddPatientStatus } from './actions';

class PatientActionButtons extends React.Component {
  static propTypes = {
    clearTextBlastMessage: React.PropTypes.func,
    clearForm: React.PropTypes.func,
    formValues: React.PropTypes.object,
    importPatients: React.PropTypes.func,
    importPatientsStatus: React.PropTypes.object,
    paginationOptions: React.PropTypes.object,
    searchPatients: React.PropTypes.func,
    setAddPatientStatus: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      showImportPatientsModal: false,
      showAddPatientModal: false,
      showTextEmailBlastModal: false,
      showTextBlastModal: false,
      showEmailBlastModal: false,
      showAlertModal: false,
    };
    this.toggleImportPatientsModal = this.toggleImportPatientsModal.bind(this);
    this.toggleAddPatientModal = this.toggleAddPatientModal.bind(this);
    this.closeAddPatientModal = this.closeAddPatientModal.bind(this);
    this.toggleTextEmailBlastModal = this.toggleTextEmailBlastModal.bind(this);
    this.toggleAlertModal = this.toggleAlertModal.bind(this);
    this.toggleTextBlastModal = this.toggleTextBlastModal.bind(this);
    this.closeTextBlastModal = this.closeTextBlastModal.bind(this);
    this.toggleEmailBlastModal = this.toggleEmailBlastModal.bind(this);
    this.closeEmailBlastModal = this.closeEmailBlastModal.bind(this);
    this.download = this.download.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.renderUpload = this.renderUpload.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.importPatientsStatus.uploadStart && !newProps.importPatientsStatus.uploadStart) {
      this.toggleImportPatientsModal();
    }
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
    this.props.setAddPatientStatus(false);
    this.setState({
      showImportPatientsModal: false,
      showAddPatientModal: false,
    });
  }

  toggleAlertModal() {
    this.setState({
      showAlertModal: !this.state.showAlertModal,
    });
  }

  toggleTextEmailBlastModal() {
    if (!this.props.formValues.patients || this.props.formValues.patients.length === 0) {
      this.setState({
        showAlertModal: true,
      });
    } else {
      this.setState({
        showTextEmailBlastModal: !this.state.showTextEmailBlastModal,
      });
    }
  }

  toggleTextBlastModal() {
    this.props.clearTextBlastMessage();
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

  download() {
    if (!this.props.formValues.patients || this.props.formValues.patients.length === 0) {
      this.setState({
        showAlertModal: true,
      });
    } else {
      this.props.searchPatients(this.props.paginationOptions.prevSearchFilter, true, true);
    }
  }

  uploadFile(e) {
    if (e.target.files[0]) {
      this.props.importPatients(e.target.files[0], this.toggleImportPatientsModal);
      this.fileBttn.value = '';
    }
  }

  renderUpload() {
    const { importPatientsStatus: { uploadStart, fileUploaded } } = this.props;

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
            <label className="table-cell" htmlFor="file">
              <i className={fileUploaded ? 'icomoon-icon_check' : 'icomoon-arrow_up_alt'} />
              <span className="text">Upload Patients</span>
              {fileUploaded && <span className="jcf-file jcf-extension-csv parent-active">{fileUploaded}</span>}
              <span className="jcf-file">
                <span className="jcf-fake-input">No file chosen</span>
                <span className="jcf-upload-button">
                  <span className="jcf-button-content">Choose file</span>
                </span>
                <input
                  type="file"
                  id="file"
                  onChange={this.uploadFile}
                  ref={(fileBttn) => {
                    this.fileBttn = fileBttn;
                  }}
                />
              </span>
            </label>
          </div>
        </Form>
        <span className="or">
          <span>or</span>
        </span>
        <a className="add-patient-info-import" onClick={this.toggleAddPatientModal}>
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
    return (
      <div className="btns-popups">
        <div className="col pull-right">
          <a onClick={this.download} className="btn btn-primary download"><i className="icomoon-icon_download" /> Download</a>
        </div>
        <div className="col pull-right">
          <label onClick={this.toggleImportPatientsModal} className="btn btn-primary import lightbox-opener"><i className="icomoon-icon_upload" /> Import</label>
        </div>
        <div className="col pull-right">
          <a className="btn btn-primary email lightbox-opener" onClick={this.toggleTextEmailBlastModal}><i className="icomoon-icon_chat_alt" /> TEXT / EMAIL BLAST</a>
        </div>
        <TextEmailBlastModal show={this.state.showTextEmailBlastModal} onHide={this.toggleTextEmailBlastModal} toggleTextBlast={this.toggleTextBlastModal} />
        <AlertModal show={this.state.showAlertModal} onHide={this.toggleAlertModal} name="patient" />
        <TextBlastModal
          show={this.state.showTextBlastModal}
          onClose={this.closeTextBlastModal}
          onHide={this.toggleTextBlastModal}
        />
        <Modal
          show={this.state.showImportPatientsModal}
          onHide={this.toggleImportPatientsModal}
          id="import-info"
          dialogComponentClass={CenteredModal}
          backdrop
          keyboard
        >
          <Modal.Header>
            <Modal.Title>
              <strong>Import</strong>
            </Modal.Title>
            <a className="close" onClick={this.toggleImportPatientsModal}>
              <i className="icomoon-icon_close" />
            </a>
          </Modal.Header>
          <Modal.Body>
            {this.renderUpload()}
          </Modal.Body>
        </Modal>
        <AddPatientModal show={this.state.showAddPatientModal} onClose={this.closeAddPatientModal} onHide={this.toggleAddPatientModal} />
      </div>
    );
  }
}

const formName = 'PatientDatabase.TextBlastModal';
const mapStateToProps = createStructuredSelector({
  formValues: selectValues(formName),
  importPatientsStatus: selectImportPatientsStatus(),
});

function mapDispatchToProps(dispatch) {
  return {
    clearForm: () => (dispatch(clearForm())),
    clearTextBlastMessage: () => dispatch(change(formName, 'message', '')),
    importPatients: payload => dispatch(importPatients(payload)),
    setAddPatientStatus: (status) => dispatch(setAddPatientStatus(status)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientActionButtons);
