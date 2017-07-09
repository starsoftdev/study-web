/**
 * Created by mike on 10/11/16.
 */

import React from 'react';
import moment from 'moment-timezone';
import classNames from 'classnames';
import Collapse from 'react-bootstrap/lib/Collapse';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
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
  switchToOtherSectionDetail,
  readStudyPatientMessages,
  updatePatientSuccess,
} from '../actions';

import { markAsReadPatientMessages } from '../../App/actions';
import {
  selectSocket,
} from '../../GlobalNotifications/selectors';

export class PatientDetailModal extends React.Component {
  static propTypes = {
    carousel: React.PropTypes.object,
    currentPatientNotes: React.PropTypes.array,
    currentPatientCategory: React.PropTypes.object,
    currentPatient: React.PropTypes.object,
    currentUser: React.PropTypes.object,
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
    ePMS: React.PropTypes.bool,
    updatePatientSuccess: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.onSelectText = this.onSelectText.bind(this);
    this.renderOtherSection = this.renderOtherSection.bind(this);
    this.renderPatientDetail = this.renderPatientDetail.bind(this);
    this.renderScheduledTime = this.renderScheduledTime.bind(this);
    this.state = {
      showScheduledPatientModal: false,
    };
    this.onSelectText = this.onSelectText.bind(this);

    this.state = {
      socketBinded: false,
    };
  }

  componentWillReceiveProps(newProps) {
    const { socket, currentPatient, fetchPatientDetails } = newProps;

    if (socket && this.state.socketBinded === false && currentPatient) {
      socket.on('notifyUnsubscribePatient', () => {
        fetchPatientDetails(currentPatient.id);
      });

      socket.on('notifySubscribePatient', () => {
        fetchPatientDetails(currentPatient.id);
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
      markAsReadPatientMessages,
      currentPatient,
      updatePatientSuccess,
      currentPatientCategory,
    } = this.props;
    readStudyPatientMessages(currentPatient.id);
    markAsReadPatientMessages(currentPatient.id);
    updatePatientSuccess({
      patientId: currentPatient.id,
      patientCategoryId: currentPatientCategory.id,
      unreadMessageCount: 0,
    });
    switchToTextSection();
  }

  renderOtherSection() {
    const { carousel, currentPatient, currentUser } = this.props;
    if (currentPatient) {
      const formattedPatient = Object.assign({}, currentPatient);
      if (currentPatient.dob) {
        const dob = moment(currentPatient.dob);
        formattedPatient.dobMonth = dob.month() + 1;
        formattedPatient.dobDay = dob.date();
        formattedPatient.dobYear = dob.year();
      }
      return (
        <OtherSection active={carousel.other} initialValues={formattedPatient} currentUser={currentUser} />
      );
    }
    return null;
  }

  renderPatientDetail() {
    const { currentPatient } = this.props;

    if (currentPatient) {
      const formattedPatient = Object.assign({}, currentPatient);
      formattedPatient.phone = normalizePhoneDisplay(currentPatient.phone);
      return (
        <PatientDetailSection initialValues={formattedPatient} />
      );
    }
    return null;
  }
  renderScheduledTime() {
    const { currentPatientCategory, currentPatient, showScheduledModal } = this.props;
    if (currentPatientCategory && currentPatientCategory.name === 'Scheduled') {
      if (currentPatient && currentPatient.appointments && currentPatient.appointments.length > 0) {
        return (
          <a className="modal-opener" onClick={() => showScheduledModal(SchedulePatientModalType.UPDATE)}>
            <span className="date">{moment(currentPatient.appointments[0].time).format('MM/DD/YY')}</span>
            <span> at </span>
            <span className="time">{moment(currentPatient.appointments[0].time).format('hh:mm A')} </span>
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
    const { ePMS, carousel, currentPatientCategory, currentPatient, currentUser, openPatientModal, onClose, studyId,
      socket, switchToNoteSection, switchToEmailSection, switchToOtherSection, currentPatientNotes } = this.props;
    return (
      <Collapse
        dimension="width"
        in={openPatientModal}
        timeout={250}
        className="patients-list-form"
      >
        <div className="form-area">
          <div className="form-head">
            <strong className="title">{currentPatientCategory ? currentPatientCategory.name : null}</strong>
            {this.renderScheduledTime()}
            <a className="btn-close" onClick={onClose}>
              <i className="glyphicon glyphicon-menu-right" />
            </a>
          </div>
          {this.renderPatientDetail()}
          <div className="column">
            <div id="carousel-example-generic" className="carousel slide popup-slider">
              <ol className="carousel-indicators">
                <li className={classNames({ active: carousel.note })} onClick={switchToNoteSection}>Note</li>
                <li className={classNames({ text: true, active: carousel.text })} onClick={this.onSelectText}>Text</li>
                <li className={classNames({ active: carousel.email })} onClick={switchToEmailSection}>Email</li>
                <li className={classNames({ active: carousel.other })} onClick={switchToOtherSection}>Other</li>
              </ol>
              <div className="carousel-inner" role="listbox">
                <NotesSection
                  active={carousel.note}
                  currentUser={currentUser}
                  currentPatient={currentPatient}
                  notes={currentPatientNotes}
                  studyId={studyId}
                />
                <TextSection active={carousel.text} socket={socket} studyId={studyId} currentUser={currentUser} currentPatient={currentPatient} ePMS={ePMS} />
                <EmailSection active={carousel.email} />
                {this.renderOtherSection()}
              </div>
            </div>
          </div>
        </div>
      </Collapse>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
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
  fetchPatientDetails: (patientId) => dispatch(fetchPatientDetails(patientId)),
  switchToNoteSection: () => dispatch(switchToNoteSectionDetail()),
  switchToTextSection: () => dispatch(switchToTextSectionDetail()),
  switchToEmailSection: () => dispatch(switchToEmailSectionDetail()),
  switchToOtherSection: () => dispatch(switchToOtherSectionDetail()),
  readStudyPatientMessages: (patientId) => dispatch(readStudyPatientMessages(patientId)),
  markAsReadPatientMessages: (patientId) => dispatch(markAsReadPatientMessages(patientId)),
  updatePatientSuccess: (payload) => dispatch(updatePatientSuccess(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PatientDetailModal);
