/**
 * Created by mike on 10/11/16.
 */

import React from 'react';
import moment from 'moment-timezone';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Modal from 'react-bootstrap/lib/Modal';

import CenteredModal from '../../../components/CenteredModal/index';
import { SchedulePatientModalType } from '../../../common/constants/index';
import { selectCurrentUser } from '../../App/selectors';
import * as Selector from '../selectors';
import PatientDetailSection from './PatientDetailSection';
import NotesSection from './NotesSection';
import TextSection from './TextSection';
import EmailSection from './EmailSection';
import OtherSection from './OtherSection';
import { normalizePhoneDisplay } from '../../../common/helper/functions';
import {
  showScheduledModal,
  fetchPatientDetails,
  switchToNoteSectionDetail,
  switchToTextSectionDetail,
  switchToEmailSectionDetail,
  readStudyPatientMessages,
  updatePatientSuccess,
} from '../actions';

import { markAsReadPatientMessages, deleteMessagesCountStat } from '../../App/actions';
import {
  selectSocket,
} from '../../GlobalNotifications/selectors';

export class PatientDetailModal extends React.Component {
  static propTypes = {
    params: React.PropTypes.object,
    carousel: React.PropTypes.object,
    currentPatientNotes: React.PropTypes.array,
    currentPatientCategory: React.PropTypes.object,
    currentPatient: React.PropTypes.object,
    currentUser: React.PropTypes.object,
    site: React.PropTypes.object,
    openPatientModal: React.PropTypes.bool.isRequired,
    fetchPatientDetails: React.PropTypes.func.isRequired,
    onClose: React.PropTypes.func.isRequired,
    showScheduledModal: React.PropTypes.func.isRequired,
    studyId: React.PropTypes.number.isRequired,
    socket: React.PropTypes.any,
    switchToNoteSection: React.PropTypes.func.isRequired,
    switchToTextSection: React.PropTypes.func.isRequired,
    switchToEmailSection: React.PropTypes.func.isRequired,
    switchToOtherSection: React.PropTypes.func.isRequired,
    readStudyPatientMessages: React.PropTypes.func.isRequired,
    markAsReadPatientMessages: React.PropTypes.func,
    deleteMessagesCountStat: React.PropTypes.func,
    ePMS: React.PropTypes.bool,
    updatePatientSuccess: React.PropTypes.func,
    patientCategories: React.PropTypes.array,
    onPatientDraggedToScheduled: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.onSelectText = this.onSelectText.bind(this);
    this.renderOtherSection = this.renderOtherSection.bind(this);
    this.renderPatientDetail = this.renderPatientDetail.bind(this);
    this.renderScheduledTime = this.renderScheduledTime.bind(this);
    this.state = {
      showScheduledPatientModal: false,
      socketBinded: false,
    };
    this.onSelectText = this.onSelectText.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const { socket, currentPatient, currentPatientCategory, fetchPatientDetails } = newProps;

    if (socket && this.state.socketBinded === false && currentPatient) {
      socket.on('notifyUnsubscribePatient', () => {
        fetchPatientDetails(currentPatient.id, currentPatientCategory.id);
      });

      socket.on('notifySubscribePatient', () => {
        fetchPatientDetails(currentPatient.id, currentPatientCategory.id);
      });

      this.setState({ socketBinded: true });
    } else if (!newProps.currentPatient && this.state.socketBinded) {
      socket.removeAllListeners('notifyUnsubscribePatient');
      socket.removeAllListeners('notifySubscribePatient');

      this.setState({ socketBinded: false });
    }
  }

  componentWillUnmount() {
    const { socket } = this.props;

    socket.removeAllListeners('notifyUnsubscribePatient');
    socket.removeAllListeners('notifySubscribePatient');
  }

  onSelectText() {
    const {
      switchToTextSection,
      readStudyPatientMessages,
      deleteMessagesCountStat,
      currentPatient,
      updatePatientSuccess,
      currentPatientCategory,
    } = this.props;
    readStudyPatientMessages(currentPatient.id);
    deleteMessagesCountStat(currentPatient.unreadMessageCount);
    updatePatientSuccess(currentPatient.id, currentPatientCategory.id, {
      unreadMessageCount: 0,
    });
    switchToTextSection();
  }

  renderOtherSection() {
    const { currentPatient, currentPatientCategory, site, params } = this.props;
    if (currentPatient) {
      const formattedPatient = Object.assign({}, currentPatient);
      if (currentPatient.dob) {
        const dob = moment(currentPatient.dob);
        formattedPatient.dobMonth = dob.month() + 1;
        formattedPatient.dobDay = dob.date();
        formattedPatient.dobYear = dob.year();
      }
      formattedPatient.patientCategoryId = currentPatientCategory.id;
      return (
        <OtherSection initialValues={formattedPatient} site={site} params={params} currentPatientCategory={currentPatientCategory} />
      );
    }
    return null;
  }

  renderPatientDetail() {
    const { currentPatient, currentPatientCategory, site, currentUser, patientCategories, studyId } = this.props;

    if (currentPatient) {
      const formattedPatient = Object.assign({}, currentPatient);
      formattedPatient.phone = normalizePhoneDisplay(currentPatient.phone);
      formattedPatient.patientCategoryId = currentPatientCategory.id;
      return (
        <PatientDetailSection
          initialValues={formattedPatient}
          site={site}
          studyId={studyId}
          currentUser={currentUser}
          patientCategories={patientCategories}
          onPatientDraggedToScheduled={this.props.onPatientDraggedToScheduled}
        />
      );
    }
    return null;
  }

  renderScheduledTime() {
    const { currentPatientCategory, currentPatient, currentUser, showScheduledModal, site } = this.props;
    if (currentPatientCategory && currentPatientCategory.name === 'Scheduled') {
      if (currentPatient && currentPatient.appointments && currentPatient.appointments.length > 0 && currentPatient.appointments[0]) {
        const timezone = site.timezone || currentUser.timezone;
        return (
          <a className="modal-opener" onClick={() => showScheduledModal(SchedulePatientModalType.UPDATE)}>
            <span className="date">{moment.tz(currentPatient.appointments[0].time, timezone).format('MM/DD/YY')}</span>
            <span> at </span>
            <span className="time">{moment.tz(currentPatient.appointments[0].time, timezone).format('hh:mm A (z)')} </span>
          </a>
        );
      }

      return (
        <a className="modal-opener" onClick={() => showScheduledModal(SchedulePatientModalType.CREATE)}>
          No Scheduled Appointment
        </a>
      );
    }
    return null;
  }

  render() {
    const { ePMS, carousel, currentPatient, currentPatientCategory, currentUser, openPatientModal, onClose, studyId,
      socket, switchToNoteSection, switchToEmailSection, currentPatientNotes } = this.props;
    const formattedPatient = Object.assign({}, currentPatient);
    if (currentPatientCategory) {
      formattedPatient.patientCategoryId = currentPatientCategory.id;
    }
    return (
      <Modal
        className="full-page-modal patient-details-modal"
        show={openPatientModal}
        onHide={onClose}
        dialogComponentClass={CenteredModal}
        backdrop
        keyboard
      >
        <Modal.Header>
          <Modal.Title>
            <strong>{currentPatientCategory ? currentPatientCategory.name : null}</strong>
            {this.renderScheduledTime()}
          </Modal.Title>
          <a className="lightbox-close close" onClick={onClose}>
            <i className="icomoon-icon_close" />
          </a>
        </Modal.Header>
        <Modal.Body className="lightbox-card form-lightbox">
          <div className="patients-list-form">
            <div className="left-section">
              {this.renderPatientDetail()}
              {this.renderOtherSection()}
            </div>
            <div className="right-section">
              <div className="column">
                <div id="carousel-example-generic" className={`carousel slide popup-slider ${carousel.other ? 'full-height' : ''}`}>
                  <ol className="carousel-indicators">
                    <li className={classNames({ active: carousel.note })} onClick={switchToNoteSection}>Note</li>
                    <li className={classNames({ text: true, active: carousel.text })} onClick={this.onSelectText}>Text</li>
                    <li className={classNames({ active: carousel.email })} onClick={switchToEmailSection}>Email</li>
                  </ol>
                  <div className="carousel-inner" role="listbox">
                    <NotesSection
                      active={carousel.note}
                      currentUser={currentUser}
                      currentPatient={formattedPatient}
                      notes={currentPatientNotes}
                      studyId={studyId}
                    />
                    <TextSection active={carousel.text} socket={socket} studyId={studyId} currentUser={currentUser} currentPatient={formattedPatient} ePMS={ePMS} />
                    <EmailSection studyId={studyId} currentPatient={formattedPatient} active={carousel.email} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
  site: Selector.selectSite(),
  carousel: Selector.selectCarousel(),
  currentPatient: Selector.selectCurrentPatient(),
  currentPatientNotes: Selector.selectCurrentPatientNotes(),
  currentPatientCategory: Selector.selectCurrentPatientCategory(),
  openPatientModal: Selector.selectOpenPatientModal(),
  socket: selectSocket(),
  studyId: Selector.selectStudyId(),
});

const mapDispatchToProps = (dispatch) => ({
  showScheduledModal: (type) => dispatch(showScheduledModal(type)),
  fetchPatientDetails: (patientId, patientCategoryId) => dispatch(fetchPatientDetails(patientId, patientCategoryId)),
  switchToNoteSection: () => dispatch(switchToNoteSectionDetail()),
  switchToTextSection: () => dispatch(switchToTextSectionDetail()),
  switchToEmailSection: () => dispatch(switchToEmailSectionDetail()),
  readStudyPatientMessages: (patientId) => dispatch(readStudyPatientMessages(patientId)),
  markAsReadPatientMessages: (patientId) => dispatch(markAsReadPatientMessages(patientId)),
  deleteMessagesCountStat: (payload) => dispatch(deleteMessagesCountStat(payload)),
  updatePatientSuccess: (patientId, patientCategoryId, payload) => dispatch(updatePatientSuccess(patientId, patientCategoryId, payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PatientDetailModal);
