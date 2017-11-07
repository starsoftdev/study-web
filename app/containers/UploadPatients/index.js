import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Modal from 'react-bootstrap/lib/Modal';
import { createStructuredSelector } from 'reselect';
// import { toastr } from 'react-redux-toastr';
import { touch } from 'redux-form';
import { actions as toastrActions } from 'react-redux-toastr';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import CenteredModal from '../../components/CenteredModal/index';
import { fetchIndications, fetchSources, fetchClientSites } from '../../containers/App/actions';
import {
  selectCurrentUser,
  selectSiteLocations,
  selectSources,
  selectIndications,
  selectClientSites,
} from '../App/selectors';
import { selectSyncErrors } from '../../common/selectors/form.selector';
import { selectAddProtocolProcessStatus, selectRevertBulkUploadProcess } from './selectors';
import { selectSocket } from '../../containers/GlobalNotifications/selectors';

import { exportPatients, emptyRowRequiredError, addProtocol, validationError, fetchHistory } from './actions';

import UploadPatientsForm from '../../components/UploadPatientsForm/index';
import NewProtocolForm from '../../components/AddNewProtocolForm/index';
import { fields } from '../../components/UploadPatientsForm/validator';
import { addProtocolFields } from '../../components/AddNewProtocolForm/validator';
import { normalizePhoneForServer } from '../../common/helper/functions';

const formName = 'UploadPatients.UploadPatientsForm';

export class UploadPatientsPage extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    fetchHistory: PropTypes.func,
    fetchIndications: PropTypes.func,
    fetchClientSites: PropTypes.func,
    fetchSources: PropTypes.func,
    fetchPatients: PropTypes.func,
    addProtocol: PropTypes.func,
    fullSiteLocations: PropTypes.object,
    exportPatients: PropTypes.func,
    currentUser: PropTypes.object.isRequired,
    sites: PropTypes.array,
    indications: PropTypes.array,
    sources: PropTypes.array,
    formSyncErrors: PropTypes.object,
    touchFields: PropTypes.func,
    touchAddProtocolFields: PropTypes.func,
    notifyEmptyRowRequiredError: PropTypes.func,
    notifyValidationError: PropTypes.func,
    formValues: PropTypes.object,
    addProtocolProcess: PropTypes.object,
    revertBulkUploadProcess: PropTypes.object,
    socket: PropTypes.any,
    toastrActions: PropTypes.object.isRequired,
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
    const { fetchIndications, fetchSources, fetchClientSites, currentUser, fetchHistory } = this.props;
    fetchIndications();
    fetchHistory(currentUser.id);
    fetchSources();
    fetchClientSites(currentUser.roleForClient.client_id);
  }

  componentWillReceiveProps(newProps) {
    const { addProtocolProcess, revertBulkUploadProcess, fetchHistory, currentUser, socket, toastrActions } = this.props;
    if (newProps.addProtocolProcess.fetching === false && newProps.addProtocolProcess.fetching !== addProtocolProcess.fetching) {
      this.switchShowAddProtocolModal();
    }

    if (revertBulkUploadProcess.processing && !newProps.revertBulkUploadProcess.processing) {
      fetchHistory(currentUser.id);
    }

    if (socket && this.state.socketBinded === false) {
      this.setState({ socketBinded: true }, () => {
        socket.on('notifyUploadFinish', (data) => {
          console.log('notifyUploadFinish', data);
          this.setState({ uploadResult: data }, () => {
            toastrActions.remove('loadingToasterForUploadPatients');
            fetchHistory(currentUser.id);
          });
        });
      });
    }
  }

  onSubmitForm(params) {
    const { exportPatients, currentUser/* , formSyncErrors, touchFields*/ } = this.props;
    const { patients, fileName } = this.state;
    const options = _.clone(params);
    options.patients = [];

    this.setState({ isImporting : true }, () => {
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

      console.log('onSubmitForm', options);

      exportPatients(options);

      /* delete options.protocol;
      delete options.groupname;
      delete options.groupemail;
      delete options.groupphone;
      delete options.groupage;
      delete options.groupgender;
      delete options.groupbmi;

      // console.log('fields', fields);

      touchFields();


      if (options.patients && options.patients.length) {
        const hasEmpty = this.checkEmptyRequired(options.patients);
        const hasError = this.validateEmailOrPhone(options.patients);

        if (!_.isEmpty(formSyncErrors)) {
          if (formSyncErrors.groupname) {
            toastr.error('', formSyncErrors.groupname);
          } else if (formSyncErrors.groupemail) {
            toastr.error('', formSyncErrors.groupemail);
          } else if (formSyncErrors.groupphone) {
            toastr.error('', formSyncErrors.groupphone);
          }
        } else if (!hasEmpty && !hasError) {
          /!* normalizing the phone number *!/
          _.forEach(options.patients, (patient, index) => {
            if (patient.phone) {
              options.patients[index].phone = normalizePhoneForServer(patient.phone);
            }
          });

          exportPatients(options);
        }
      } else {
        toastr.error('', 'Error! There are no patients to be added.');
      }*/
    });
  }

  setPatients(patients) {
    console.log('setPatients: ', patients);
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
      addProtocol(params);
    } else {
      console.log('addProtocol', err, data);
      touchAddProtocolFields();
    }
  }

  switchShowAddProtocolModal() {
    this.setState({ showAddProtocolModal: !this.state.showAddProtocolModal });
  }

  switchIsImporting() {
    const { isImporting } = this.state;
    this.setState({ isImporting: !isImporting });
  }

  render() {
    const { indications, fullSiteLocations, fetchHistory } = this.props;
    const { isImporting, uploadResult } = this.state;

    return (
      <div className="container-fluid">
        <section className="patient-upload">
          <Helmet title="Patient Database - StudyKIK" />
          <h2 className="main-heading">Upload Patients</h2>

          <UploadPatientsForm
            onSubmit={this.onSubmitForm}
            isImporting={isImporting}
            uploadResult={uploadResult}
            fetchHistory={fetchHistory}
            setPatients={this.setPatients}
            setFileName={this.setFileName}
            switchIsImporting={this.switchIsImporting}
            showProtocolModal={this.switchShowAddProtocolModal}
          />
        </section>
        <Modal dialogComponentClass={CenteredModal} show={this.state.showAddProtocolModal} onHide={this.switchShowAddProtocolModal}>
          <Modal.Header>
            <Modal.Title>ADD NEW PROTOCOL</Modal.Title>
            <a className="lightbox-close close" onClick={this.switchShowAddProtocolModal}>
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

const mapStateToProps = createStructuredSelector({
  socket: selectSocket(),
  currentUser: selectCurrentUser(),
  sites: selectSiteLocations(),
  indications: selectIndications(),
  sources: selectSources(),
  formSyncErrors: selectSyncErrors(formName),
  fullSiteLocations : selectClientSites(),
  addProtocolProcess: selectAddProtocolProcessStatus(),
  revertBulkUploadProcess: selectRevertBulkUploadProcess(),
});

function mapDispatchToProps(dispatch) {
  return {
    toastrActions: bindActionCreators(toastrActions, dispatch),
    touchFields: () => dispatch(touch(formName, ...fields)),
    touchAddProtocolFields: () => dispatch(touch('addProtocol', ...addProtocolFields)),
    fetchIndications: () => dispatch(fetchIndications()),
    addProtocol: (payload) => dispatch(addProtocol(payload)),
    fetchHistory: (userId) => dispatch(fetchHistory(userId)),
    fetchSources: () => dispatch(fetchSources()),
    notifyEmptyRowRequiredError: (hasEmpty) => dispatch(emptyRowRequiredError(hasEmpty)),
    notifyValidationError: (hasError) => dispatch(validationError(hasError)),
    fetchClientSites: (clientId) => dispatch(fetchClientSites(clientId)),
    exportPatients: (params) => dispatch(exportPatients(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadPatientsPage);
