/**
*
* Global Patient Message Suite
*
*/

import React from 'react';
import Sound from 'react-sound';
import { connect } from 'react-redux';
import { change, Field, reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import { map, find } from 'lodash';
import { Link } from 'react-router';
import Form from 'react-bootstrap/lib/Form';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import InfiniteScroll from 'react-infinite-scroller';
import ReactSelect from '../../components/Input/ReactSelect';
import Input from '../../components/Input';
import formValidator from './validator';
import { selectGlobalPMSFormValues, selectGlobalPMSFormError } from './selectors';
import CenteredModal from '../../components/CenteredModal/index';
import {
  selectSites,
  selectCurrentUser,
  selectSitePatients,
  selectPatientMessages,
  selectClientCredits,
  selectGlobalPMSPaginationOptions,
  selectSiteLocations,
  selectPatientCategories,
} from '../../containers/App/selectors';
import { readStudyPatientMessages } from '../../containers/StudyPage/actions';
import MessageItem from './MessageItem';
import CallItem from './CallItem';
import PatientItem from './PatientItem';

import ChatForm from './ChatForm';

import {
  fetchSitePatients,
  searchSitePatients,
  fetchPatientMessages,
  markAsReadPatientMessages,
  updateSitePatients,
  clientCreditsFetched,
  addMessagesCountStat,
  fetchPatientCategories,
} from '../../containers/App/actions';
import {
  selectSocket,
} from '../../containers/GlobalNotifications/selectors';

import {
  sendStudyPatientMessages,
} from '../../containers/GlobalNotifications/actions';
import { incrementStudyUnreadMessages, subtractStudyUnreadMessages } from '../../containers/HomePage/actions';
import { translate } from '../../../common/utilities/localization';

import alertSound from './sounds/message_received.wav';

@reduxForm({ form: 'globalPMS', validate: formValidator })

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
    clientCreditsFetched: React.PropTypes.func,
    handleSubmit: React.PropTypes.func,
    hasError: React.PropTypes.bool,
    formValues: React.PropTypes.object,
    change: React.PropTypes.func,
    globalPMSPaginationOptions: React.PropTypes.object,
    incrementStudyUnreadMessages: React.PropTypes.func,
    readStudyPatientMessages: React.PropTypes.func,
    addMessagesCountStat: React.PropTypes.func,
    subtractStudyUnreadMessages: React.PropTypes.func,
    sites: React.PropTypes.array,
    fetchPatientCategories: React.PropTypes.func.isRequired,
    patientCategories: React.PropTypes.array,
  };

  constructor(props) {
    super(props);

    this.onSoundFinished = this.onSoundFinished.bind(this);
    this.startSound = this.startSound.bind(this);
    this.selectPatient = this.selectPatient.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.loadItems = this.loadItems.bind(this);
    this.siteLocationChanged = this.siteLocationChanged.bind(this);
    this.state = {
      selectedPatient: { id: 0 },
      socketBinded: false,
      playSound: Sound.status.STOPPED,
      searchBy: null,
      searchTimer: null,
      siteLocation: null,
    };
  }

  componentWillMount() {
    this.props.fetchPatientCategories();
  }

  componentWillReceiveProps(newProps) {
    const { currentUser, change } = newProps;
    if (this.props.socket && this.state.socketBinded === false) {
      this.props.socket.on('notifyMessage', (newMessage) => {
        const socketMessage = newMessage;
        if (currentUser.roleForClient && currentUser.roleForClient.client_id === socketMessage.client_id &&
          (currentUser.roleForClient.isAdmin || currentUser.roleForClient.site_id === socketMessage.study.site_id)) {
          this.props.clientCreditsFetched({ customerCredits: { customerCredits: newMessage.customerCredits } });
          if (socketMessage.twilioTextMessage && socketMessage.twilioTextMessage.direction === 'inbound') {
            this.startSound();
            this.props.addMessagesCountStat(1);
          }
          this.props.updateSitePatients(socketMessage);
          this.props.incrementStudyUnreadMessages(socketMessage.study_id);
        }
        if (this.props.showModal === true && this.state.selectedPatient && this.state.selectedPatient.id === socketMessage.patient_id) {
          this.props.fetchPatientMessages(this.state.selectedPatient.id);
          this.props.markAsReadPatientMessages(this.state.selectedPatient.id);
        }
      });
      this.setState({ socketBinded: true });
    }
    if (!this.props.showModal && newProps.showModal) {
      if (this.state.selectedPatient) {
        this.props.fetchPatientMessages(this.state.selectedPatient.id);
        this.props.markAsReadPatientMessages(this.state.selectedPatient.id);
      }
      this.props.fetchSitePatients(currentUser.roleForClient.id, 0, 50);
    }

    if (currentUser && currentUser.roleForClient) {
      if (!currentUser.roleForClient.isAdmin) {
        const nLocation = currentUser.roleForClient.site_id ? currentUser.roleForClient.site_id.toString() : null;
        change('siteLocation', nLocation);
        this.setState({ siteLocation: nLocation });
      }
    }
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
      // TODO remove this later
      this.props.fetchPatientMessages(item.id);
      this.props.markAsReadPatientMessages(item.id);
      this.props.readStudyPatientMessages(item.id);
      this.props.subtractStudyUnreadMessages(item.study_id, item.count_unread);
      if (!initialSelect) {
        this.props.setChatTextValue('');
      }
      this.props.change('name', '');
      // this.handleKeyPress('');
    }
  }

  siteLocationChanged(value) {
    this.setState({ siteLocation: value, selectedPatient: { id: 0 } }, () => { this.props.fetchSitePatients(this.props.currentUser.roleForClient.id, 0, 50); });
  }

  handleKeyPress() {
    if (this.state.searchTimer) {
      clearTimeout(this.state.searchTimer);
      this.setState({ searchTimer: null });
    }
    const timerH = setTimeout(() => {
      this.props.fetchSitePatients(this.props.currentUser.roleForClient.id, 0, 50);
    }, 500);
    this.setState({ searchTimer: timerH });
  }

  handleClose() {
    this.props.closeModal();
  }

  loadItems() {
    if (this.props.sitePatients.fetching) {
      return;
    }

    const limit = 50;
    const offset = this.props.globalPMSPaginationOptions.page * 50;
    this.props.fetchSitePatients(this.props.currentUser.roleForClient.id, offset, limit);
  }

  render() {
    const { sitePatients, patientMessages, sendStudyPatientMessages, sites, currentUser } = this.props;
    const clientCredits = this.props.clientCredits;
    const sitePatientArray = [];

    const isAdmin = currentUser.roleForClient && currentUser.roleForClient.isAdmin;
    let timezone = currentUser.timezone;
    let site = null;
    if (currentUser.roleForClient.site_id) {
      if (currentUser.roleForClient.site) {
        timezone = currentUser.roleForClient.site.timezone;
      } else {
        site = find(sites, item => item.id === currentUser.roleForClient.site_id);
        if (site) {
          timezone = site.timezone;
        }
      }
    }

    const siteOptions = map(sites, siteIterator => ({ label: siteIterator.name, value: siteIterator.id.toString() }));
    siteOptions.unshift({ label: translate('portals.component.globalPMSModal.allLabel'), value: '0' });

    sitePatients.details.forEach((item) => {
      if (item.show === undefined || (item.show && item.show === true)) {
        sitePatientArray.push(item);
      }
    });
    const filteredPatients = sitePatients.details;
    // if (siteLocation && siteLocation !== '0') {
    //   filteredPatients = filter(sitePatients.details, item => item.site_id === parseInt(siteLocation));
    // }

    const sitePatientsListContents = filteredPatients.map((item, index) => {
      const firstname = item.first_name ? item.first_name.toUpperCase() : '';
      const lastname = item.last_name ? item.last_name.toUpperCase() : '';
      if (!this.state.searchBy || firstname.includes(this.state.searchBy.toUpperCase()) || lastname.includes(this.state.searchBy.toUpperCase())) {
        return (<PatientItem
          patientData={item}
          key={index}
          onSelectPatient={this.selectPatient}
          patientSelected={this.state.selectedPatient.id === item.id}
          timezone={timezone}
        />);
      }
      return '';
    });
    const pm = this.state.selectedPatient.id === 0 ? [] : patientMessages.details;
    const patientMessageListContents = pm.map((item, index) => {
      if (item.text_message_id) {
        return (<MessageItem
          messageData={item}
          key={index}
          timezone={timezone}
        />);
      }
      return (<CallItem
        messageData={item}
        key={index}
        timezone={timezone}
      />);
    });

    let protocolNumber = '';
    if (this.state.selectedPatient.protocol_number) {
      protocolNumber = `${translate('portals.component.globalPMSModal.protocolLabel')}: ${this.state.selectedPatient.protocol_number}`;
    }
    let patientCategory = '';
    if (this.state.selectedPatient.patient_category_id && this.props.patientCategories && this.props.patientCategories.length) {
      const categoryName = translate(`common.patientCategory.id${this.state.selectedPatient.patient_category_id}`);
      patientCategory = `${translate('portals.component.globalPMSModal.statusLabel')}: ${categoryName}`;
    }
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
              <Modal.Title>{translate('portals.component.globalPMSModal.modalTitle')}</Modal.Title>
              <a className="lightbox-close close" onClick={this.handleClose}>
                <i className="icomoon-icon_close" />
              </a>
            </Modal.Header>
            <Modal.Body>
              <div className="holder clearfix">
                <aside className="aside-chat">
                  <div className="scroll-holder">
                    <InfiniteScroll
                      pageStart={0}
                      loadMore={this.loadItems}
                      initialLoad={false}
                      hasMore={this.props.globalPMSPaginationOptions.hasMoreItems && filteredPatients.length > 0}
                      useWindow={false}
                    >
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
                            placeholder={translate('portals.component.globalPMSModal.searchPlaceholder')}
                            ref={(searchKey) => {
                              this.searchKey = searchKey;
                            }}
                          />
                        </div>
                        <div className="field">
                          <Field
                            name="siteLocation"
                            component={ReactSelect}
                            placeholder={translate('portals.component.globalPMSModal.siteLocationPlaceholder')}
                            options={siteOptions}
                            onChange={this.siteLocationChanged}
                            include
                            disabled={!isAdmin}
                          />
                        </div>
                      </div>
                      <ul className="tabset list-unstyled">
                        {sitePatientsListContents}
                      </ul>
                    </InfiniteScroll>
                  </div>
                </aside>
                <div className="chatroom">
                  <section className="chat-area" id="chat-room1">
                    <header>
                      <strong className="name">{this.state.selectedPatient.first_name} {this.state.selectedPatient.last_name}</strong>
                      <Link to={`/app/study/${this.state.selectedPatient.study_id}`} onClick={this.handleClose}>
                        <span className="protocol">{protocolNumber}</span>
                      </Link>
                      <span className="category">{patientCategory}</span>
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
  globalPMSPaginationOptions: selectGlobalPMSPaginationOptions(),
  siteLocations: selectSiteLocations(),
  sites: selectSites(),
  patientCategories: selectPatientCategories(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchSitePatients: (clientRoleId, offset, limit) => dispatch(fetchSitePatients(clientRoleId, offset, limit)),
    searchSitePatients: (keyword) => dispatch(searchSitePatients(keyword)),
    updateSitePatients: (newMessage) => dispatch(updateSitePatients(newMessage)),
    fetchPatientMessages: (patientId) => dispatch(fetchPatientMessages(patientId)),
    markAsReadPatientMessages: (patientId) => dispatch(markAsReadPatientMessages(patientId)),
    readStudyPatientMessages: (patientId) => dispatch(readStudyPatientMessages(patientId)),
    sendStudyPatientMessages: (payload, cb) => dispatch(sendStudyPatientMessages(payload, cb)),
    setChatTextValue: (value) => dispatch(change('chatPatient', 'body', value)),
    clientCreditsFetched: (payload) => dispatch(clientCreditsFetched(payload)),
    change: (field, value) => dispatch(change('globalPMS', field, value)),
    incrementStudyUnreadMessages: (studyId) => dispatch(incrementStudyUnreadMessages(studyId)),
    addMessagesCountStat: (payload) => dispatch(addMessagesCountStat(payload)),
    subtractStudyUnreadMessages: (studyId, count) => dispatch(subtractStudyUnreadMessages(studyId, count)),
    fetchPatientCategories: () => dispatch(fetchPatientCategories()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GlobalPMSModal);
