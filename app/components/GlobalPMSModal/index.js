/**
*
* Global Patient Message Suite
*
*/

import React from 'react';
import Sound from 'react-sound';
import Form from 'react-bootstrap/lib/Form';
import Button from 'react-bootstrap/lib/Button';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router';

import Input from '../../components/Input';
import formValidator from './validator';
import { selectGlobalPMSFormValues, selectGlobalPMSFormError } from './selectors';
import CenteredModal from '../../components/CenteredModal/index';
import Modal from 'react-bootstrap/lib/Modal';
import {
  selectCurrentUser,
  selectSitePatients,
  selectPatientMessages,
  selectClientCredits,
  selectStudies,
} from '../../containers/App/selectors';

import MessageItem from './MessageItem';
import CallItem from './CallItem';
import PatientItem from './PatientItem';

import ChatForm from './ChatForm';
import { change, Field, reduxForm } from 'redux-form';
import _ from 'lodash';

import {
  fetchSitePatients,
  searchSitePatients,
  fetchPatientMessages,
  markAsReadPatientMessages,
  updateSitePatients,
  fetchClientCredits,
  fetchStudies,
} from '../../containers/App/actions';
import {
  selectSocket,
} from '../../containers/GlobalNotifications/selectors';

import {
  sendStudyPatientMessages,
} from '../../containers/GlobalNotifications/actions';

import alertSound from './sounds/message_received.wav';

@reduxForm({ form: 'globalPMS', validate: formValidator })
@connect(mapStateToProps, null)

class GlobalPMSModal extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    currentUser: React.PropTypes.object,
    sitePatients: React.PropTypes.object,
    patientMessages: React.PropTypes.object,
    showModal: React.PropTypes.bool,
    closeModal: React.PropTypes.func,
    socket: React.PropTypes.any,
    fetchSitePatients: React.PropTypes.func,
    searchSitePatients: React.PropTypes.func,
    updateSitePatients: React.PropTypes.func,
    fetchPatientMessages: React.PropTypes.func,
    sendStudyPatientMessages: React.PropTypes.func,
    markAsReadPatientMessages: React.PropTypes.func,
    setChatTextValue: React.PropTypes.func,
    clientCredits: React.PropTypes.object,
    fetchClientCredits: React.PropTypes.func,
    handleSubmit: React.PropTypes.func,
    hasError: React.PropTypes.bool,
    formValues: React.PropTypes.object,
    change: React.PropTypes.func,
    studies: React.PropTypes.object,
    fetchStudies: React.PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.onSoundFinished = this.onSoundFinished.bind(this);
    this.startSound = this.startSound.bind(this);
    this.selectPatient = this.selectPatient.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      selectedPatient: { id: 0 },
      // patientLoaded: true,
      socketBinded: false,
      playSound: Sound.status.STOPPED,
      // searchTimer: null,
      newOpen: false,
      searchBy: null,
    };
  }

  componentDidMount() {
    this.props.fetchStudies();
  }

  componentWillReceiveProps(newProps) {
    const { currentUser } = newProps;
    if (this.props.socket && this.state.socketBinded === false) {
      this.props.socket.on('notifyMessage', (newMessage) => {
        this.props.fetchClientCredits(currentUser.id);
        if (newMessage.twilioTextMessage.direction === 'inbound') {
          this.startSound();
        }
        this.props.updateSitePatients(newMessage);
        if (this.props.showModal === true && this.state.selectedPatient && this.state.selectedPatient.study_id && this.state.selectedPatient.id === newMessage.patient_id) {
          this.props.fetchPatientMessages(this.state.selectedPatient.id, this.state.selectedPatient.study_id);
          this.props.markAsReadPatientMessages(this.state.selectedPatient.id, this.state.selectedPatient.study_id);
        }
      });
      this.setState({ socketBinded: true });
    }
    if (newProps.showModal === true && this.state.newOpen) {
      if (this.state.selectedPatient && this.state.selectedPatient.study_id) {
        this.props.fetchPatientMessages(this.state.selectedPatient.id, this.state.selectedPatient.study_id);
        this.props.markAsReadPatientMessages(this.state.selectedPatient.id, this.state.selectedPatient.study_id);
      }
      newProps.fetchSitePatients(currentUser.id);
      this.setState({
        newOpen: false,
      });
    }
    // if (newProps.sitePatients !== this.props.sitePatients) {
    //   // let selectedPatient = { id: 0 };
    //   _.forEach(newProps.sitePatients.details, (item) => {
    //     if (item.show === undefined || (item.show && item.show === true)) {
    //       // selectedPatient = item;
    //       return false;
    //     }
    //     return true;
    //   });
    //   // this.selectPatient(selectedPatient, true);
    // }
    // if (newProps.showModal === true && newProps.sitePatients.details.length > 0) {
    //   let selectedPatient = { id: 0 };
    //   _.forEach(newProps.sitePatients.details, (item) => {
    //     if (item.show === undefined || (item.show && item.show === true)) {
    //       selectedPatient = item;
    //       return false;
    //     }
    //     return true;
    //   });
    //   this.selectPatient(selectedPatient, true);
    //   // this.setState({ patientLoaded: false });
    // }
  }

  componentDidUpdate() {
    const scrollable = this.scrollable;
    if (this.props.patientMessages && scrollable) {
      setTimeout(() => {
        scrollable.scrollTop = scrollable.scrollHeight;
      }, 0);
    }
  }

  onSoundFinished() {
    this.setState({ playSound: Sound.status.STOPPED });
  }

  startSound() {
    this.setState({ playSound: Sound.status.PLAYING });
  }

  selectPatient(item, initialSelect = false) {
    if (item.id !== this.state.selectedPatient.id) {
      this.setState({ selectedPatient: item });
      this.props.fetchPatientMessages(item.id, item.study_id);
      this.props.markAsReadPatientMessages(item.id, item.study_id);

      if (!initialSelect) {
        this.props.setChatTextValue('');
      }
      this.props.change('name', '');
      this.handleKeyPress('');
    }
  }

  handleKeyPress(e) {
    let value;
    if (e && e.target) {
      value = e.target.value;
    } else {
      value = e;
    }
    this.setState({
      searchBy: value,
    });
    // if (this.state.searchTimer) {
    //   clearTimeout(this.state.searchTimer);
    //   this.setState({ searchTimer: null });
    // }
    this.props.searchSitePatients(value);
    // const timerH = setTimeout(() => { this.setState({ patientLoaded: true }); }, 500);
    // this.setState({ searchTimer: timerH });
  }

  handleClose() {
    this.setState({
      newOpen: true,
    });
    this.props.closeModal();
  }

  render() {
    const { sitePatients, patientMessages, sendStudyPatientMessages } = this.props;
    const clientCredits = this.props.clientCredits;
    const sitePatientArray = [];
    sitePatients.details.forEach((item) => {
      if (item.show === undefined || (item.show && item.show === true)) {
        sitePatientArray.push(item);
      }
    });
    const sitePatientsListContents = sitePatients.details.map((item, index) => {
      const firstname = item.first_name.toUpperCase();
      const lastname = item.last_name.toUpperCase();
      if (!this.state.searchBy || firstname.includes(this.state.searchBy.toUpperCase()) || lastname.includes(this.state.searchBy.toUpperCase())) {
        return (<PatientItem
          patientData={item}
          key={index}
          onSelectPatient={this.selectPatient}
          patientSelected={this.state.selectedPatient.id === item.id}
        />);
      }
      return '';
    });
    const patientMessageListContents = patientMessages.details.map((item, index) => {
      if (item.text_message_id) {
        return (<MessageItem
          messageData={item}
          key={index}
        />);
      }
      return (<CallItem
        messageData={item}
        key={index}
      />);
    });

    let protocolNumber = '';
    if (this.state.selectedPatient.protocol_number) {
      protocolNumber = 'Protocol: '.concat(this.state.selectedPatient.protocol_number);
    }
    const study = _.find(this.props.studies.details, { studyId: this.state.selectedPatient.study_id });
    const ePMS = (study && (study.patientMessagingSuite || study.patientQualificationSuite));
    return (
      <Form className="form-search form-search-studies pull-left" onSubmit={this.props.handleSubmit}>
        <div>
          <Sound
            url={alertSound}
            playStatus={this.state.playSound}
            onFinishedPlaying={this.onSoundFinished}
          />
          <Modal
            className="global-pms-modal"
            id="chart-popup"
            dialogComponentClass={CenteredModal}
            show={this.props.showModal}
            onHide={this.handleClose}
            backdrop
            keyboard
          >
            <Modal.Header>
              <Modal.Title>PATIENT MESSAGING SUITE</Modal.Title>
              <a className="lightbox-close close" onClick={this.handleClose}>
                <i className="icomoon-icon_close" />
              </a>
            </Modal.Header>
            <Modal.Body>
              <div className="holder clearfix">
                <aside className="aside-chat">
                  <div className="scroll-holder">
                    <div className="custom-select-drop">
                      <div className="field">
                        <Button className="btn-enter" type="submit">
                          <i className="icomoon-icon_search2" />
                        </Button>
                        <Field
                          name="name"
                          component={Input}
                          onChange={(e) => this.handleKeyPress(e)}
                          type="text"
                          className="keyword-search"
                          placeholder="Search"
                          ref={(searchKey) => {
                            this.searchKey = searchKey;
                          }}
                        />
                      </div>
                    </div>
                    <ul className="tabset list-unstyled">
                      {sitePatientsListContents}
                    </ul>
                  </div>
                </aside>
                <div className="chatroom">
                  <section className="chat-area" id="chat-room1">
                    <header>
                      <strong className="name">{this.state.selectedPatient.first_name} {this.state.selectedPatient.last_name}</strong>
                      <Link to={`/app/studies/${this.state.selectedPatient.study_id}/sites/${this.state.selectedPatient.site_id}`} onClick={this.handleClose}>
                        <span className="protocol">{protocolNumber}</span>
                      </Link>
                    </header>
                    <div
                      className="scroll-holder"
                      ref={(scrollable) => {
                        this.scrollable = scrollable;
                      }}
                    >
                      <article className="post-msg">
                        {patientMessageListContents}
                      </article>
                    </div>
                    <footer>
                      <ChatForm
                        clientCredits={clientCredits}
                        selectedPatient={this.state.selectedPatient}
                        sendStudyPatientMessages={sendStudyPatientMessages}
                        ePMS={ePMS ? true : null}
                      />
                    </footer>
                  </section>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </Form>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
  sitePatients: selectSitePatients(),
  patientMessages: selectPatientMessages(),
  clientCredits: selectClientCredits(),
  socket: selectSocket(),
  hasError: selectGlobalPMSFormError(),
  formValues: selectGlobalPMSFormValues(),
  studies: selectStudies(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchStudies: searchParams => dispatch(fetchStudies(searchParams)),
    fetchSitePatients: (siteId) => dispatch(fetchSitePatients(siteId)),
    searchSitePatients: (keyword) => dispatch(searchSitePatients(keyword)),
    updateSitePatients: (newMessage) => dispatch(updateSitePatients(newMessage)),
    fetchPatientMessages: (patientId, studyId) => dispatch(fetchPatientMessages(patientId, studyId)),
    markAsReadPatientMessages: (patientId, studyId) => dispatch(markAsReadPatientMessages(patientId, studyId)),
    sendStudyPatientMessages: (payload, cb) => dispatch(sendStudyPatientMessages(payload, cb)),
    setChatTextValue: (value) => dispatch(change('chatPatient', 'body', value)),
    fetchClientCredits: (userId) => dispatch(fetchClientCredits(userId)),
    change: (field, value) => dispatch(change('globalPMS', field, value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GlobalPMSModal);
