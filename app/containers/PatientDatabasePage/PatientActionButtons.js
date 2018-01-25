/**
 * Created by mike on 10/2/16.
 */

import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/lib/Modal';
import classNames from 'classnames';
import { touch } from 'redux-form';
import _ from 'lodash';
import { push } from 'react-router-redux';

import { normalizePhoneForServer } from '../../../app/common/helper/functions';
import { selectValues } from '../../common/selectors/form.selector';
import CenteredModal from '../../components/CenteredModal/index';
import { selectImportPatientsStatus, selectAddProtocolProcessStatus } from '../../containers/PatientDatabasePage/selectors';
import { addProtocol } from '../../containers/PatientDatabasePage/actions';
import { selectCurrentUserClientId, selectIndications, selectClientSites, selectCurrentUser } from '../App/selectors';
import AlertModal from '../../components/AlertModal';
import AddPatientForm from './ImportPatients/AddPatientForm';
import TextEmailBlastModal from '../../containers/PatientDatabasePage/TextEmailBlastModal';
import TextBlastModal from '../../containers/PatientDatabasePage/TextBlast/index';
import EmailBlastModal from '../../components/PatientDatabaseEmailBlastModal/index';
import NewProtocolForm from '../../components/AddNewProtocolForm/index';
import { addProtocolFields } from '../../components/AddNewProtocolForm/validator';

const formName = 'PatientDatabase.TextBlastModal';
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
  indications: selectIndications(),
  fullSiteLocations : selectClientSites(),
  clientId: selectCurrentUserClientId(),
  formValues: selectValues(formName),
  importPatientsStatus: selectImportPatientsStatus(),
  addProtocolProcess: selectAddProtocolProcessStatus(),
});

function mapDispatchToProps(dispatch) {
  return {
    addProtocol: (payload) => dispatch(addProtocol(payload)),
    touchAddProtocolFields: () => dispatch(touch('addProtocol', ...addProtocolFields)),
    push: (path) => dispatch(push(path)),
  };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class PatientActionButtons extends React.Component {
  static propTypes = {
    touchAddProtocolFields: React.PropTypes.func,
    addProtocol: React.PropTypes.func,
    indications: React.PropTypes.array.isRequired,
    fullSiteLocations: React.PropTypes.object,
    currentUser: React.PropTypes.object,
    addProtocolProcess: React.PropTypes.object,
    push: React.PropTypes.func,
    clientId: React.PropTypes.number,
    formValues: React.PropTypes.object,
    importPatientsStatus: React.PropTypes.object,
    paginationOptions: React.PropTypes.object,
    textBlastFormValues: React.PropTypes.object,
    searchPatients: React.PropTypes.func,
    showAddProtocolModal: React.PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      showAddProtocolModal: false,
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
    this.addProtocol = this.addProtocol.bind(this);
    this.toggleAddProtocolModal = this.toggleAddProtocolModal.bind(this);
    this.moveToUploadPage = this.moveToUploadPage.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.addProtocolProcess.fetching === false && newProps.addProtocolProcess.fetching !== this.props.addProtocolProcess.fetching) {
      this.toggleAddProtocolModal();
    }
  }

  toggleImportPatientsModal() {
    this.setState({
      showImportPatientsModal: !this.state.showImportPatientsModal,
    });
  }

  moveToUploadPage() {
    const { push } = this.props;
    push('/app/upload-patients');
  }

  toggleAddPatientModal() {
    this.setState({
      showImportPatientsModal: !this.state.showImportPatientsModal,
      showAddPatientModal: !this.state.showAddPatientModal,
    });
  }

  toggleAddProtocolModal() {
    this.setState({
      showAddProtocolModal: !this.state.showAddProtocolModal,
      showAddPatientModal: !this.state.showAddPatientModal,
    });
  }

  addProtocol(err, data) {
    const { fullSiteLocations, indications, currentUser, addProtocol, touchAddProtocolFields } = this.props;
    if (!err) {
      const siteLocation = _.find(fullSiteLocations.details, { id: data.siteLocation });
      const indication = _.find(indications, { id: data.indication_id });

      const params = {
        ...data,
        siteLocationName: siteLocation.name,
        indicationName: indication.name,
        user_id: currentUser.id,
        currentUser,
        client_id: currentUser.roleForClient.client_id,
        stripeCustomerId: currentUser.roleForClient.client.stripeCustomerId,
      };
      params.recruitmentPhone = normalizePhoneForServer(data.recruitmentPhone);
      addProtocol(params);
    } else {
      console.log('addProtocol', err, data);
      touchAddProtocolFields();
    }
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
    const patientsIDs = _.map(this.props.textBlastFormValues.patients, patient => (patient.id));
    if (!this.props.formValues.patients || this.props.formValues.patients.length === 0) {
      this.setState({
        showAlertModal: true,
      });
    } else {
      this.props.searchPatients({
        ...this.props.paginationOptions.prevSearchFilter,
        patientsIDs,
        selectAllUncheckedManually: this.props.textBlastFormValues.selectAllUncheckedManually,
        uncheckedPatients: this.props.textBlastFormValues.uncheckedPatients,
      }, true, true);
    }
  }

  renderUpload() {
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
    const { indications, fullSiteLocations } = this.props;
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
            <AddPatientForm onClose={this.closeAddPatientModal} switchShowAddProtocolModal={this.toggleAddProtocolModal} />
          </Modal.Body>
        </Modal>
        <Modal dialogComponentClass={CenteredModal} show={this.state.showAddProtocolModal} onHide={this.toggleAddProtocolModal}>
          <Modal.Header>
            <Modal.Title>ADD NEW PROTOCOL</Modal.Title>
            <a className="lightbox-close close" onClick={this.toggleAddProtocolModal}>
              <i className="icomoon-icon_close" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <NewProtocolForm
              onSubmit={this.addProtocol}
              fullSiteLocations={fullSiteLocations}
              indications={indications}
            />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
