import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm, change } from 'redux-form';
import { Modal } from 'react-bootstrap';
import { map, omit } from 'lodash';

import Checkbox from '../../../components/Input/Checkbox';
import CenteredModal from '../../../components/CenteredModal/index';
import EditPatientForm from '../../../containers/PatientDatabasePage/EditPatientForm';
import ChatForm from '../../../components/ChatForm';
import { selectPatients,
  selectSelectedPatient,
  selectSelectedPatientDetailsForForm,
  selectSavedPatient,
  selectChat } from '../../../containers/PatientDatabasePage/selectors';
import {
  sendStudyPatientMessages,
} from '../../../containers/GlobalNotifications/actions';
import { clearSelectedPatient,
  savePatient,
  initChat,
  disableChat,
  addPatientsToTextBlast,
  removePatientsFromTextBlast } from '../actions';
import PatientItem from './PatientItem';
import { normalizePhone, normalizePhoneDisplay } from '../../StudyPage/helper/functions';

import './styles.less';

const formName = 'PatientDatabase.TextBlastModal';

@reduxForm({ form: formName })
class PatientsList extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    addPatientsToTextBlast: PropTypes.func,
    change: PropTypes.func,
    removePatientsFromTextBlast: PropTypes.func,
    patients: PropTypes.object,
    selectedPatient: PropTypes.object,
    selectedPatientDetailsForForm: PropTypes.object,
    savedPatient: PropTypes.object,
    chat: PropTypes.object,
    clearSelectedPatient: PropTypes.func,
    savePatient: PropTypes.func,
    initChat: PropTypes.func,
    disableChat: PropTypes.func,
    sendStudyPatientMessages: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.closeEditPatientModal = this.closeEditPatientModal.bind(this);
    this.updatePatient = this.updatePatient.bind(this);
    this.openChat = this.openChat.bind(this);
    this.closeChat = this.closeChat.bind(this);
    this.toggleAllPatientSelection = this.toggleAllPatientSelection.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.savedPatient.saving && this.props.savedPatient.saving) {
      this.closeEditPatientModal();
    }
  }

  editPatientModalShouldBeShown() {
    const { selectedPatient } = this.props;
    const displayed = (selectedPatient.details) ? true: false; // eslint-disable-line

    return displayed;
  }

  closeEditPatientModal() {
    this.props.clearSelectedPatient();
  }

  updatePatient(patientData) {
    const { selectedPatient } = this.props;
    const payload = omit(patientData, ['indications', 'status', 'source']);
    payload.indications = map(patientData.indications, indicationIterator => indicationIterator.value);
    payload.source_id = patientData.source;
    payload.patient_category_id = patientData.status;
    payload.phone = normalizePhone(patientData.phone);

    this.props.savePatient(selectedPatient.details.id, payload);
  }

  chatModalShouldBeShown() {
    return this.props.chat.active;
  }

  openChat(payload) {
    this.props.initChat(payload);
  }

  closeChat() {
    this.props.disableChat();
  }

  toggleAllPatientSelection(checked) {
    const { addPatientsToTextBlast, change, patients, removePatientsFromTextBlast } = this.props;
    if (checked) {
      addPatientsToTextBlast(patients.details);
    } else {
      removePatientsFromTextBlast();
    }
    for (const patient of patients.details) {
      change(`patient-${patient.id}`, checked);
    }
  }

  render() {
    const { patients, selectedPatientDetailsForForm } = this.props;
    const chat = this.props.chat.active ? this.props.chat.details : null;
    const patientsListContents = patients.details.map((item, index) => {
      const patient = item;
      patient.phone = normalizePhoneDisplay(patient.phone);
      return (
        <PatientItem {...patient} key={index} index={index} openChat={this.openChat} />
      );
    });
    const editPatientModalShown = this.editPatientModalShouldBeShown();
    const chatModalShown = this.chatModalShouldBeShown();
    if (selectedPatientDetailsForForm) {
      selectedPatientDetailsForForm.phone = normalizePhoneDisplay(selectedPatientDetailsForForm.phone);
    }

    if (patients.details.length > 0) {
      return (
        <div className="patients">
          <div className="table-holder">
            <header>
              <h2>Total Patients Count: {patients.details.length}</h2>
            </header>
            <table className="table">
              <thead>
                <tr>
                  <th>
                    <Field
                      name="all-patients"
                      type="checkbox"
                      component={Checkbox}
                      onChange={this.toggleAllPatientSelection}
                    />
                  </th>
                  <th>#</th>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>PHONE</th>
                  <th>INDICATIONS</th>
                  <th>AGE</th>
                  <th>GENDER</th>
                  <th>BMI</th>
                  <th>STATUS</th>
                  <th>SOURCE</th>
                </tr>
              </thead>
              <tbody>
                {patientsListContents}
              </tbody>
            </table>
          </div>
          <Modal className="edit-patient" dialogComponentClass={CenteredModal} show={editPatientModalShown} onHide={this.closeEditPatientModal}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Patient</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <EditPatientForm
                initialValues={selectedPatientDetailsForForm}
                onSubmit={this.updatePatient}
              />
            </Modal.Body>
          </Modal>
          {(chat)
            ?
            <Modal className="chat-patient" dialogComponentClass={CenteredModal} show={chatModalShown} onHide={this.closeChat}>
              <Modal.Header closeButton>
                <Modal.Title>Chat with {chat.firstName || ''} {chat.lastName || ''}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <ChatForm chat={chat} sendStudyPatientMessages={sendStudyPatientMessages} />
              </Modal.Body>
            </Modal>
            : ''
          }
        </div>
      );
    }
    return (
      <div>
        <h3>No matching patients found!</h3>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  patients: selectPatients(),
  selectedPatient: selectSelectedPatient(),
  selectedPatientDetailsForForm: selectSelectedPatientDetailsForForm(),
  savedPatient: selectSavedPatient(),
  chat: selectChat(),
});

function mapDispatchToProps(dispatch) {
  return {
    addPatientsToTextBlast: (patients) => dispatch(addPatientsToTextBlast(patients)),
    change: (field, value) => dispatch(change(formName, field, value)),
    removePatientsFromTextBlast: () => dispatch(removePatientsFromTextBlast()),
    clearSelectedPatient: () => dispatch(clearSelectedPatient()),
    savePatient: (id, data) => dispatch(savePatient(id, data)),
    initChat: (payload) => dispatch(initChat(payload)),
    disableChat: (payload) => dispatch(disableChat(payload)),
    sendStudyPatientMessages: (payload, cb) => dispatch(sendStudyPatientMessages(payload, cb)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientsList);
