/**
*
* Global Patient Message Suite
*
*/

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CenteredModal from '../../components/CenteredModal/index';
import Modal from 'react-bootstrap/lib/Modal';
import { selectCurrentUser, selectSitePatients, selectPatientMessages } from 'containers/App/selectors';

import MessageItem from './MessageItem';
import PatientItem from './PatientItem';

import ChatForm from './ChatForm';

import { fetchSitePatients, fetchPatientMessages, markAsReadPatientMessages } from 'containers/App/actions';
import {
  selectSocket,
} from 'containers/GlobalNotifications/selectors';

import {
  sendStudyPatientMessages,
} from 'containers/GlobalNotifications/actions';

import './styles.less';

class GlobalPMSModal extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    currentUser: React.PropTypes.object,
    sitePatients: React.PropTypes.object,
    patientMessages: React.PropTypes.object,
    showModal: React.PropTypes.bool,
    closeModal: React.PropTypes.func,
    socket: React.PropTypes.any,
    fetchSitePatients: React.PropTypes.func,
    fetchPatientMessages: React.PropTypes.func,
    sendStudyPatientMessages: React.PropTypes.func,
    markAsReadPatientMessages: React.PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.selectPatient = this.selectPatient.bind(this);
    this.state = {
      selectedPatient: { id: 0 },
    };
  }

  componentWillReceiveProps(newProps) {
    if (this.props.socket) {
      this.props.socket.on('notifyMessage', () => {
        console.log('notifyMessage');
        if (this.state.selectedPatient && this.state.selectedPatient.study_id) {
          console.log('refresh message');
          this.props.fetchSitePatients(this.props.currentUser.id);
          this.props.fetchPatientMessages(this.state.selectedPatient.id, this.state.selectedPatient.study_id);
        }
      });
    }
    if (newProps.showModal === true && newProps.sitePatients.details.length > 0 && this.state.selectedPatient.id === 0) {
      this.selectPatient(newProps.sitePatients.details[0]);
    }
  }

  componentDidUpdate(prevProps) {
    const scrollable = this.scrollable;
    if (this.props.patientMessages && scrollable) {
      setTimeout(() => {
        scrollable.scrollTop = scrollable.scrollHeight;
      }, 0);
    }
  }

  selectPatient(item) {
    if (item.id !== this.state.selectedPatient.id) {
      this.setState({ selectedPatient: item });
      this.props.fetchPatientMessages(item.id, item.study_id);
      this.props.markAsReadPatientMessages(item.id, item.study_id);
    }
  }

  render() {
    const { sitePatients, patientMessages, sendStudyPatientMessages } = this.props;
    const sitePatientsListContents = sitePatients.details.map((item, index) => (
      <PatientItem
        patientData={item}
        key={index}
        onSelectPatient={this.selectPatient}
        patientSelected={this.state.selectedPatient.id === item.id}
      />
    ));
    const patientMessageListContents = patientMessages.details.map((item, index) => (
      <MessageItem
        messageData={item}
        key={index}
      />
    ));

    let protocolNumber = '';
    if (this.state.selectedPatient.protocol_number) {
      protocolNumber = 'Protocol: '.concat(this.state.selectedPatient.protocol_number);
    }
    return (
      <div>
        <Modal className="custom-modal global-pms" dialogComponentClass={CenteredModal} id="chart-popup" show={this.props.showModal} onHide={this.props.closeModal}>
          <Modal.Header>
            <Modal.Title>PATIENT MESSAGING SUITE</Modal.Title>
            <a className="lightbox-close close" onClick={this.props.closeModal}>
              <i className="icomoon-icon_close" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <div className="holder clearfix">
              <aside className="aside-chat">
                <div className="scroll-holder">
                  <div className="custom-select-drop">
                    <div className="search-holder">
                      <input className="form-control keyword-search" type="search" placeholder="Search" />
                      <i className="icomoon-icon_search2"></i>
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
                    <a href="#">
                      <span className="protocol">{protocolNumber}</span>
                    </a>
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
                    <ChatForm selectedPatient={this.state.selectedPatient} sendStudyPatientMessages={sendStudyPatientMessages} />
                  </footer>
                </section>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
  sitePatients: selectSitePatients(),
  patientMessages: selectPatientMessages(),
  socket: selectSocket(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchSitePatients: (siteId) => dispatch(fetchSitePatients(siteId)),
    fetchPatientMessages: (patientId, studyId) => dispatch(fetchPatientMessages(patientId, studyId)),
    markAsReadPatientMessages: (patientId, studyId) => dispatch(markAsReadPatientMessages(patientId, studyId)),
    sendStudyPatientMessages: (payload, cb) => dispatch(sendStudyPatientMessages(payload, cb)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GlobalPMSModal);
