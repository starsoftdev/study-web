/**
 * Created by mike on 10/11/16.
 */

import React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import Collapse from 'react-bootstrap/lib/Collapse';
import Modal from 'react-bootstrap/lib/Modal';
import ModalBody from 'react-bootstrap/lib/ModalBody';
import ModalHeader from 'react-bootstrap/lib/ModalHeader';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ScheduledPatientModal from '../ScheduledPatientModal';
import { selectCurrentUser } from 'containers/App/selectors';
import * as Selector from '../selectors';
import PatientDetailSection from './PatientDetailSection';
import NotesSection from './NotesSection';
import TextSection from './TextSection';
import EmailSection from './EmailSection';
import OtherSection from './OtherSection';
import { normalizePhoneDisplay } from '../helper/functions';
import {
  showScheduledModal,
  switchToNoteSectionDetail,
  switchToTextSectionDetail,
  switchToEmailSectionDetail,
  switchToOtherSectionDetail,
  readStudyPatientMessages,
} from '../actions';

import { markAsReadPatientMessages } from 'containers/App/actions';
import {
  selectSocket,
} from 'containers/GlobalNotifications/selectors';

export class PatientDetailModal extends React.Component {
  static propTypes = {
    carousel: React.PropTypes.object,
    currentPatientCategory: React.PropTypes.object,
    currentPatient: React.PropTypes.object,
    currentUser: React.PropTypes.object,
    openPatientModal: React.PropTypes.bool.isRequired,
    openScheduledModal: React.PropTypes.bool.isRequired,
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
  }

  onSelectText() {
    const {
      studyId,
      switchToTextSection,
      readStudyPatientMessages,
      markAsReadPatientMessages,
      currentPatient,
    } = this.props;
    readStudyPatientMessages(currentPatient.id, studyId);
    markAsReadPatientMessages(currentPatient.id, studyId);
    switchToTextSection();
  }

  renderOtherSection() {
    const { carousel, currentPatient, currentUser } = this.props;
    if (currentPatient) {
      const formattedPatient = Object.assign({}, currentPatient);
      if (currentPatient.dob) {
        const dob = moment(currentPatient.dob);
        formattedPatient.dobMonth = dob.month();
        formattedPatient.dobDay = dob.day();
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
      if (currentPatient && currentPatient.callReminders) {
        return (
          <a className="modal-opener" onClick={() => showScheduledModal()}>
            <span className="date">{moment(currentPatient.callReminders[0].time).format('MM/DD/YY')}</span>
            <span> at </span>
            <span className="time">{moment(currentPatient.callReminders[0].time).format('hh:mm A')} </span>
          </a>
        );
      }
    }
    return null;
  }

  render() {
    const { carousel, openScheduledModal, currentPatientCategory, currentPatient, currentUser, openPatientModal, onClose, studyId, socket, switchToNoteSection, switchToEmailSection, switchToOtherSection } = this.props;
    return (
      <Collapse dimension="width" in={openPatientModal} timeout={250} className={ openScheduledModal ? 'patients-list-form-OnSchedule' : 'patients-list-form'}>
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
                <NotesSection active={carousel.note} currentUser={currentUser} currentPatient={currentPatient} studyId={studyId} />
                <TextSection active={carousel.text} socket={socket} studyId={studyId} currentUser={currentUser} currentPatient={currentPatient} />
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
  currentPatientCategory: Selector.selectCurrentPatientCategory(),
  openPatientModal: Selector.selectOpenPatientModal(),
  openScheduledModal: Selector.selectOpenScheduledModal(),
  socket: selectSocket(),
  studyId: Selector.selectStudyId(),
});

const mapDispatchToProps = (dispatch) => ({
  showScheduledModal: () => dispatch(showScheduledModal()),
  switchToNoteSection: () => dispatch(switchToNoteSectionDetail()),
  switchToTextSection: () => dispatch(switchToTextSectionDetail()),
  switchToEmailSection: () => dispatch(switchToEmailSectionDetail()),
  switchToOtherSection: () => dispatch(switchToOtherSectionDetail()),
  readStudyPatientMessages: (patientId, studyId) => dispatch(readStudyPatientMessages(patientId, studyId)),
  markAsReadPatientMessages: (patientId, studyId) => dispatch(markAsReadPatientMessages(patientId, studyId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PatientDetailModal);
