import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Modal } from 'react-bootstrap';
import { map, omit } from 'lodash';

import EditPatientForm from 'containers/PatientDatabasePage/EditPatientForm';
import ChatForm from 'components/ChatForm';
import { selectPatients,
  selectSelectedPatient,
  selectSelectedPatientDetailsForForm,
  selectSavedPatient,
  selectChat } from 'containers/PatientDatabasePage/selectors';
import {
  clearSelectedPatient,
  savePatient,
  initChat,
  disableChat,
} from 'containers/PatientDatabasePage/actions';
import {
  sendStudyPatientMessages,
} from 'containers/GlobalNotifications/actions';
import PatientItem from './PatientItem';
import './styles.less';

class PatientsList extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
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
    this.sendMessage = this.sendMessage.bind(this);
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

    this.props.savePatient(selectedPatient.details.id, payload);
  }

  sendMessage(message) {
    const { chat } = this.props;
    const options = {
      body: message.body,
      studyId: chat.details.study_id,
      patientId: chat.details.id,
      to: chat.details.phone,
    };

    this.props.sendStudyPatientMessages(options, (err, data) => {
      if (!err) {
        console.log('data', data);
      }
    });
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

  render() {
    const { patients, selectedPatientDetailsForForm } = this.props;
    const chat = this.props.chat.active ? this.props.chat.details : null;
    const patientsListContents = patients.details.map((item, index) => (
      <PatientItem {...item} key={index} index={index} openChat={this.openChat} />
    ));
    const editPatientModalShown = this.editPatientModalShouldBeShown();
    const chatModalShown = this.chatModalShouldBeShown();

    if (patients.details.length > 0) {
      return (
        <div className="row">
          <div className="col-sm-12">
            <div className="table-responsive">
              <table className="table table-striped">
                <caption>Total Patients Count: {patients.details.length}</caption>
                <thead>
                  <tr>
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
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {patientsListContents}
                </tbody>
              </table>
            </div>
            <Modal className="edit-patient" show={editPatientModalShown} onHide={this.closeEditPatientModal}>
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
              <Modal className="chat-patient" show={chatModalShown} onHide={this.closeChat}>
                <Modal.Header closeButton>
                  <Modal.Title>Chat with {chat.firstName || ''} {chat.lastName || ''}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <ChatForm onSubmit={this.sendMessage} />
                </Modal.Body>
              </Modal>
            : ''
            }
          </div>
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
    clearSelectedPatient: () => dispatch(clearSelectedPatient()),
    savePatient: (id, data) => dispatch(savePatient(id, data)),
    initChat: (payload) => dispatch(initChat(payload)),
    disableChat: (payload) => dispatch(disableChat(payload)),
    sendStudyPatientMessages: (payload, cb) => dispatch(sendStudyPatientMessages(payload, cb)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientsList);
