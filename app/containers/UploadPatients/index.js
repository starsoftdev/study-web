import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Modal from 'react-bootstrap/lib/Modal';
import { createStructuredSelector } from 'reselect';
import { touch, reset } from 'redux-form';
import _ from 'lodash';

import CenteredModal from '../../components/CenteredModal/index';
import { fetchIndications, fetchClientSites } from '../../containers/App/actions';
import { selectCurrentUser, selectSiteLocations, selectIndications, selectClientSites } from '../App/selectors';
import { selectSyncErrors } from '../../common/selectors/form.selector';
import { selectAddProtocolProcessStatus } from './selectors';
import { selectSocket } from '../../containers/GlobalNotifications/selectors';
import {
  subscribeToUploadProgressSocket,
  unsubscribeFromUploadProgressSocket,
  subscribeToRevertProgressSocket,
  unsubscribeFromRevertProgressSocket,
} from '../../containers/GlobalNotifications/actions';

import { exportPatients, emptyRowRequiredError, addProtocol, validationError, fetchHistory, patientsExported } from './actions';

import UploadPatientsForm from '../../components/UploadPatientsForm/index';
import AddNewPatientList from '../../components/AddNewPatienList/index';
import { fields } from '../../components/UploadPatientsForm/validator';
import { addProtocolFields } from '../../components/AddNewPatienList/validator';
import { normalizePhoneForServer } from '../../common/helper/functions';

const formName = 'UploadPatients.UploadPatientsForm';

export class UploadPatientsPage extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    clearForm: PropTypes.func,
    fetchHistory: PropTypes.func,
    fetchIndications: PropTypes.func,
    fetchClientSites: PropTypes.func,
    fetchPatients: PropTypes.func,
    addProtocol: PropTypes.func,
    fullSiteLocations: PropTypes.object,
    exportPatients: PropTypes.func,
    currentUser: PropTypes.object.isRequired,
    sites: PropTypes.array,
    indications: PropTypes.array,
    formSyncErrors: PropTypes.object,
    touchFields: PropTypes.func,
    touchAddProtocolFields: PropTypes.func,
    setPatientsExported: PropTypes.func,
    notifyEmptyRowRequiredError: PropTypes.func,
    subscribeToUploadProgressSocket: PropTypes.func,
    unsubscribeFromUploadProgressSocket: PropTypes.func,
    subscribeToRevertProgressSocket: PropTypes.func,
    unsubscribeFromRevertProgressSocket: PropTypes.func,
    notifyValidationError: PropTypes.func,
    formValues: PropTypes.object,
    addProtocolProcess: PropTypes.object,
    socket: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = {
      uploadResult: null,
      socketBinded: false,
      patients: [],
      showAddProtocolModal: false,
      fileName: null,
      isImporting: false,
      socketId: null,
      jobId: null,
      uploadProgress: 0,
      revertProgress: 0,
      lastAddedSiteLocation: null,
      lastAddedProtocolNumber: null,
    };


    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.checkEmptyRequired = this.checkEmptyRequired.bind(this);
    this.validateEmailOrPhone = this.validateEmailOrPhone.bind(this);
    this.addProtocol = this.addProtocol.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.switchShowAddProtocolModal = this.switchShowAddProtocolModal.bind(this);
    this.switchIsImporting = this.switchIsImporting.bind(this);
    this.setPatients = this.setPatients.bind(this);
    this.setFileName = this.setFileName.bind(this);
  }

  componentWillMount() {
    const { fetchIndications, fetchClientSites, currentUser, fetchHistory } = this.props;
    fetchIndications();
    fetchClientSites(currentUser.roleForClient.client_id);
    fetchHistory(currentUser.roleForClient.client_id);
  }

  componentWillReceiveProps(newProps) {
    const { addProtocolProcess, fetchHistory, currentUser,
      socket, clearForm, setPatientsExported, subscribeToRevertProgressSocket, unsubscribeFromRevertProgressSocket,
      subscribeToUploadProgressSocket, unsubscribeFromUploadProgressSocket } = this.props;

    if (newProps.addProtocolProcess.fetching === false && newProps.addProtocolProcess.fetching !== addProtocolProcess.fetching) {
      this.switchShowAddProtocolModal();
    }

    if (socket && this.state.socketBinded === false) {
      this.setState({ socketBinded: true }, () => {
        socket.on('uploadInitiated', (data) => {
          subscribeToUploadProgressSocket(data.bulkUploadId, data.jobId, (err, result) => {
            if (!err && result.success) {
              this.setState({ socketId: result.data.socketId, jobId: result.data.jobId });
            }
          });
        });

        socket.on('uploadProgressNotification', (data) => {
          if (parseInt(this.state.jobId) === data.jobId) {
            this.setState({ uploadResult: data.res, uploadProgress: data.percents }, () => {
              if (this.state.uploadProgress === 100) {
                unsubscribeFromUploadProgressSocket(data.jobId, (err, result) => {
                  if (!err && result.success) {
                    this.setState({ socketId: null, jobId: null }, () => {
                      fetchHistory(currentUser.roleForClient.client_id);
                      clearForm();
                      setPatientsExported();
                    });
                  }
                });
              }
            });
          }
        });

        socket.on('revertInitiated', (data) => {
          subscribeToRevertProgressSocket(data.bulkUploadId, data.jobId, (err, result) => {
            if (!err && result.success) {
              this.setState({ socketId: result.data.socketId, jobId: result.data.jobId });
            }
          });
        });

        socket.on('revertProgressNotification', (data) => {
          if (parseInt(this.state.jobId) === data.jobId) {
            this.setState({ revertProgress: data.percents }, () => {
              if (this.state.revertProgress === 100) {
                unsubscribeFromRevertProgressSocket(data.jobId, (err, result) => {
                  if (!err && result.success) {
                    this.setState({ socketId: null, jobId: null, revertProgress: 0 }, () => {
                      fetchHistory(currentUser.roleForClient.client_id);
                    });
                  }
                });
              }
            });
          }
        });
      });
    }
  }

  onSubmitForm(params) {
    const { exportPatients, currentUser } = this.props;
    const { patients, fileName } = this.state;
    const options = _.clone(params);
    options.patients = [];

    this.setState({ isImporting : true, uploadResult: null }, () => {
      // swap out the "protocol" for the study_id for adding the patient (in reality, we're storing studyId in the protocol field,
      // since it's easier to transform and display this way while still displaying studies by protocol
      if (options.protocol) {
        options.study_id = options.protocol;
      }

      if (currentUser) {
        options.currentUser = currentUser.id;
      }

      if (fileName) {
        options.fileName = fileName;
      }

      if (patients.length > 0) {
        _.forEach(patients, (patient) => {
          const normalizedPatient = {};
          _.forEach(patient, (value, key) => {
            normalizedPatient[key.toLowerCase()] = value;
          });

          options.patients.push({
            name: normalizedPatient['full name'],
            email: normalizedPatient.email,
            phone: normalizePhoneForServer(normalizedPatient.phone),
            dob: normalizedPatient.dob,
            gender: normalizedPatient.gender,
            bmi: normalizedPatient.bmi,
          });
        });
      }

      exportPatients(options);
    });
  }

  setPatients(patients) {
    this.setState({ patients });
  }

  setFileName(fileName) {
    console.log('setFileName: ', fileName);
    this.setState({ fileName });
  }

  validateEmail(email) {
    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(email);
  }

  checkEmptyRequired(patients) {
    const { notifyEmptyRowRequiredError } = this.props;
    let empty = false;
    _.forEach(patients, (patient) => {
      const hasName = _.hasIn(patient, 'name');
      const hasEmail = _.hasIn(patient, 'email');
      const hasPhone = _.hasIn(patient, 'phone');

      if (!hasName || !patient.name || !hasEmail || !patient.email || !hasPhone || !patient.phone) {
        empty = true;
      }
    });
    notifyEmptyRowRequiredError(empty);
    return empty;
  }

  validateEmailOrPhone(patients) {
    const { notifyValidationError } = this.props;
    let error = false;
    _.forEach(patients, (patient) => {
      const hasEmail = _.hasIn(patient, 'email');
      const hasPhone = _.hasIn(patient, 'phone');

      if (hasEmail && !this.validateEmail(patient.email)) {
        error = true;
      }

      if (hasPhone && patient.phone && normalizePhoneForServer(patient.phone).length < 12) {
        error = true;
      }
    });
    notifyValidationError(error);
    return error;
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
      this.setState({ lastAddedSiteLocation: data.siteLocation });
      this.setState({ lastAddedProtocolNumber: data.protocolNumber });
      addProtocol(params);
    } else {
      touchAddProtocolFields();
    }
  }

  switchShowAddProtocolModal() {
    this.setState({ showAddProtocolModal: !this.state.showAddProtocolModal });
  }

  switchIsImporting() {
    const { isImporting } = this.state;
    this.setState({ isImporting: !isImporting, uploadProgress: 0 });
  }

  render() {
    const { indications, fullSiteLocations, addProtocolProcess } = this.props;
    const { isImporting, uploadResult, uploadProgress, revertProgress } = this.state;

    return (
      <div className="container-fluid">
        <section className="patient-upload">
          <Helmet title="Patient Database - StudyKIK" />
          <h2 className="main-heading">Upload Patients</h2>
          <UploadPatientsForm
            onSubmit={this.onSubmitForm}
            revertProgress={revertProgress}
            uploadProgress={uploadProgress}
            isImporting={isImporting}
            uploadResult={uploadResult}
            addProtocolProcess={addProtocolProcess}
            setPatients={this.setPatients}
            setFileName={this.setFileName}
            switchIsImporting={this.switchIsImporting}
            showProtocolModal={this.switchShowAddProtocolModal}
            lastAddedSiteLocation={this.state.lastAddedSiteLocation}
            lastAddedProtocolNumber={this.state.lastAddedProtocolNumber}
          />
        </section>
        <Modal dialogComponentClass={CenteredModal} show={this.state.showAddProtocolModal} onHide={this.switchShowAddProtocolModal}>
          <Modal.Header>
            <Modal.Title>NEW PATIENT LIST</Modal.Title>
            <a className="lightbox-close close" onClick={this.switchShowAddProtocolModal}>
              <i className="icomoon-icon_close" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <AddNewPatientList
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

const mapStateToProps = createStructuredSelector({
  socket: selectSocket(),
  currentUser: selectCurrentUser(),
  sites: selectSiteLocations(),
  indications: selectIndications(),
  formSyncErrors: selectSyncErrors(formName),
  fullSiteLocations : selectClientSites(),
  addProtocolProcess: selectAddProtocolProcessStatus(),
});

function mapDispatchToProps(dispatch) {
  return {
    setPatientsExported: () => dispatch(patientsExported()),
    clearForm: () => dispatch(reset(formName)),
    touchFields: () => dispatch(touch(formName, ...fields)),
    touchAddProtocolFields: () => dispatch(touch('addProtocol', ...addProtocolFields)),
    fetchIndications: () => dispatch(fetchIndications()),
    addProtocol: (payload) => dispatch(addProtocol(payload)),
    fetchHistory: (userId) => dispatch(fetchHistory(userId)),
    notifyEmptyRowRequiredError: (hasEmpty) => dispatch(emptyRowRequiredError(hasEmpty)),
    notifyValidationError: (hasError) => dispatch(validationError(hasError)),
    fetchClientSites: (clientId) => dispatch(fetchClientSites(clientId)),
    exportPatients: (params) => dispatch(exportPatients(params)),
    subscribeToUploadProgressSocket: (bulkUploadId, jobId, cb) => dispatch(subscribeToUploadProgressSocket(bulkUploadId, jobId, cb)),
    unsubscribeFromUploadProgressSocket: (jobId, cb) => dispatch(unsubscribeFromUploadProgressSocket(jobId, cb)),
    subscribeToRevertProgressSocket: (bulkUploadId, jobId, cb) => dispatch(subscribeToRevertProgressSocket(bulkUploadId, jobId, cb)),
    unsubscribeFromRevertProgressSocket: (jobId, cb) => dispatch(unsubscribeFromRevertProgressSocket(jobId, cb)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadPatientsPage);
