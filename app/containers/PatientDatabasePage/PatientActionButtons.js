/**
 * Created by mike on 10/2/16.
 */

import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/lib/Modal';
import classNames from 'classnames';

import { selectValues } from '../../common/selectors/form.selector';
import CenteredModal from '../../components/CenteredModal/index';
import { selectImportPatientsStatus } from '../../containers/PatientDatabasePage/selectors';
import { selectCurrentUserClientId } from '../App/selectors';
import AlertModal from '../../components/AlertModal';
import AddPatientForm from './ImportPatients/AddPatientForm';
import TextEmailBlastModal from '../../containers/PatientDatabasePage/TextEmailBlastModal';
import TextBlastModal from '../../containers/PatientDatabasePage/TextBlast/index';
import EmailBlastModal from '../../components/PatientDatabaseEmailBlastModal/index';

const formName = 'PatientDatabase.TextBlastModal';
const mapStateToProps = createStructuredSelector({
  clientId: selectCurrentUserClientId(),
  formValues: selectValues(formName),
  importPatientsStatus: selectImportPatientsStatus(),
});

const mapDispatchToProps = () => ({
});

@connect(mapStateToProps, mapDispatchToProps)
export default class PatientActionButtons extends React.Component {
  static propTypes = {
    clientId: React.PropTypes.number,
    formValues: React.PropTypes.object,
    importPatientsStatus: React.PropTypes.object,
    paginationOptions: React.PropTypes.object,
    searchPatients: React.PropTypes.func,
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
    this.renderUpload = this.renderUpload.bind(this);
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

  renderUpload() {
    return (
      <div>
        <span className="modal-opener coming-soon-wrapper">
          <div className="table">
            <div className="table-cell">
              <i className="icomoon-arrow_up_alt" />
              <span className="text coming-soon-old">Upload Patients</span>
              <span className="text coming-soon-new" />
            </div>
          </div>
        </span>
        <span className="or">
          <span>or</span>
        </span>
        <span className="modal-opener" onClick={this.toggleAddPatientModal}>
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
    const isPatientSelected = (this.props.formValues.patients && this.props.formValues.patients.length > 0);
    return (
      <div>
        <div className="col pull-right no-right-padding">
          <button type="button" className="btn btn-primary download pull-right" onClick={this.download}>
            <i className="icomoon-icon_download" />
            &nbsp;Download
          </button>
        </div>
        <div className="col pull-right">
          <label onClick={this.toggleImportPatientsModal} className="btn btn-primary import lightbox-opener"><i className="icomoon-icon_upload" /> Upload Patients</label>
        </div>
        <div className="col pull-right">
          <div className={classNames('btn btn-primary email lightbox-opener', { disabled: !isPatientSelected })} onClick={() => (isPatientSelected ? this.toggleTextEmailBlastModal() : null)}><i className="icomoon-icon_chat_alt" /> TEXT / EMAIL BLAST</div>
        </div>
        <TextEmailBlastModal
          show={this.state.showTextEmailBlastModal}
          onHide={this.toggleTextEmailBlastModal}
          toggleTextBlast={this.toggleTextBlastModal}
          toggleEmailBlast={this.toggleEmailBlastModal}
        />
        <AlertModal show={this.state.showAlertModal} onHide={this.toggleAlertModal} name="patient" />
        <TextBlastModal
          show={this.state.showTextBlastModal}
          onClose={this.closeTextBlastModal}
          onHide={this.toggleTextBlastModal}
        />
        <EmailBlastModal
          show={this.state.showEmailBlastModal}
          onClose={this.closeEmailBlastModal}
          onHide={this.toggleEmailBlastModal}
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
        <Modal
          id="add-patient-info-import"
          dialogComponentClass={CenteredModal}
          show={this.state.showAddPatientModal}
          onHide={this.toggleAddPatientModal}
          backdrop
          keyboard
        >
          <Modal.Header>
            <Modal.Title>
              <strong>Add Patient</strong>
            </Modal.Title>
            <a className="close" onClick={this.toggleAddPatientModal}>
              <i className="icomoon-icon_close" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <AddPatientForm onClose={this.closeAddPatientModal} />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
<<<<<<< HEAD
=======

const formName = 'PatientDatabase.TextBlastModal';
const mapStateToProps = createStructuredSelector({
  clientId: selectCurrentUserClientId(),
  formValues: selectValues(formName),
  importPatientsStatus: selectImportPatientsStatus(),
});

function mapDispatchToProps(dispatch) {
  return {
    clearForm: () => (dispatch(clearForm())),
    importPatients: (clientId, payload, onClose) => dispatch(importPatients(clientId, payload, onClose)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientActionButtons);
>>>>>>> master
