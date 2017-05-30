/**
 * Created by mike on 9/20/16.
 */

import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { createStructuredSelector } from 'reselect';
import { push } from 'react-router-redux';
import moment from 'moment';
import _ from 'lodash';
import { touch, change } from 'redux-form';
import Scroll from 'react-scroll';

import { SchedulePatientModalType } from '../../common/constants/index';
import LoadingSpinner from '../../components/LoadingSpinner';
import PatientDetailModal from '../../containers/StudyPage/PatientDetail/PatientDetailModal';
import ScheduledPatientModal from '../../containers/StudyPage/ScheduledPatientModal/index';
import {
  fetchPatientDetails,
  showScheduledModal,
  hideScheduledModal,
  setCurrentPatientCategoryId,
  setCurrentPatientId,
  setOpenPatientModal,
  switchToNoteSectionDetail,
  switchToTextSectionDetail,
  readStudyPatientMessages,
  changeScheduledDate,
  submitSchedule,
} from '../../containers/StudyPage/actions';
import { selectCurrentUser } from '../../containers/App/selectors';
import { markAsReadPatientMessages } from '../../containers/App/actions';
import { fields } from '../../containers/StudyPage/ScheduledPatientModal/validator';
import * as Selector from '../../containers/StudyPage/selectors';
import PatientCategory from './PatientCategory';

const scroll = Scroll.animateScroll;

@DragDropContext(HTML5Backend)
class PatientBoard extends React.Component {
  static propTypes = {
    currentPatientId: React.PropTypes.number,
    currentPatientCategoryId: React.PropTypes.number,
    currentPatient: React.PropTypes.object,
    fetchPatientDetails: React.PropTypes.func.isRequired,
    openPatientModal: React.PropTypes.bool.isRequired,
    openScheduledModal: React.PropTypes.bool.isRequired,
    schedulePatientFormValues: React.PropTypes.object,
    patientCategories: React.PropTypes.array.isRequired,
    setCurrentPatientId: React.PropTypes.func.isRequired,
    setCurrentPatientCategoryId: React.PropTypes.func.isRequired,
    setOpenPatientModal: React.PropTypes.func.isRequired,
    showScheduledModal: React.PropTypes.func.isRequired,
    hideScheduledModal: React.PropTypes.func.isRequired,
    changeScheduledDate: React.PropTypes.func.isRequired,
    switchToNoteSection: React.PropTypes.func.isRequired,
    switchToTextSection: React.PropTypes.func.isRequired,
    push: React.PropTypes.func.isRequired,
    readStudyPatientMessages: React.PropTypes.func.isRequired,
    currentUser: React.PropTypes.object.isRequired,
    touchSchedulePatientModal: React.PropTypes.func.isRequired,
    submitSchedule: React.PropTypes.func.isRequired,
    schedulePatientFormErrors: React.PropTypes.object,
    selectedDate: React.PropTypes.object,
    markAsReadPatientMessages: React.PropTypes.func,
    studyId: React.PropTypes.number,
    setFormValueByName: React.PropTypes.func,
    ePMS: React.PropTypes.bool,
    fetchingPatients: React.PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = {
      showScheduledPatientModal: false,
      stick: false,
    };
    this.onPatientClick = this.onPatientClick.bind(this);
    this.onPatientTextClick = this.onPatientTextClick.bind(this);
    this.onPatientDraggedToScheduled = this.onPatientDraggedToScheduled.bind(this);
    this.closePatientModal = this.closePatientModal.bind(this);
    this.closePatientScheduleModal = this.closePatientScheduleModal.bind(this);
    this.showModal = this.showModal.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.resetFormsValues = this.resetFormsValues.bind(this);
    this.onPatientScheduleSubmit = this.onPatientScheduleSubmit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  onPatientClick(category, patient) {
    const { currentPatientId, fetchPatientDetails, setCurrentPatientId, setCurrentPatientCategoryId, setOpenPatientModal, switchToNoteSection, openPatientModal } = this.props;
    const show = (!openPatientModal || (patient && currentPatientId !== patient.id)) || false;
    if (show) {
      setCurrentPatientId(patient.id);
      setCurrentPatientCategoryId(category.id);
      fetchPatientDetails(patient.id);
      const options = {
        duration: 500,
      };
      scroll.scrollTo(650, options);
      switchToNoteSection();
    }
    // set up the redux state for opening the modal
    setOpenPatientModal(show);
  }

  onPatientDraggedToScheduled(patientId, patientCategoryId, scheduledCategoryId) {
    const { setCurrentPatientId, setCurrentPatientCategoryId, showScheduledModal } = this.props;
    setCurrentPatientId(patientId);
    setCurrentPatientCategoryId(patientCategoryId);
    if (patientCategoryId !== scheduledCategoryId) {
      showScheduledModal(SchedulePatientModalType.CREATE);
    }
  }

  onPatientTextClick(category, patient) {
    const {
      currentPatientId,
      fetchPatientDetails,
      setCurrentPatientId,
      setCurrentPatientCategoryId,
      setOpenPatientModal,
      switchToTextSection,
      readStudyPatientMessages,
      markAsReadPatientMessages,
    } = this.props;
    const show = (patient && currentPatientId !== patient.id) || false;
    if (show) {
      setCurrentPatientId(patient.id);
      setCurrentPatientCategoryId(category.id);
      fetchPatientDetails(patient.id);
      readStudyPatientMessages(patient.id);
      markAsReadPatientMessages(patient.id);
      const options = {
        duration: 500,
      };
      scroll.scrollTo(650, options);
      switchToTextSection();
    } else {
      setCurrentPatientId(-1);
      setCurrentPatientCategoryId(-1);
    }
    // set up the redux state for opening the modal
    setOpenPatientModal(show);
  }

  onPatientScheduleSubmit(e) {
    e.preventDefault();
    const { schedulePatientFormValues, schedulePatientFormErrors, currentPatient, currentUser, selectedDate, patientCategories, currentPatientCategoryId, touchSchedulePatientModal } = this.props;

    if (schedulePatientFormErrors) {
      touchSchedulePatientModal();
      return;
    }

    const defaultDate = moment().startOf('day');
    const scheduledDate = selectedDate || defaultDate;
    const formValues = schedulePatientFormValues;
    let currentAppointmentId;

    if (currentPatient.appointments && currentPatient.appointments[0]) {
      currentAppointmentId = currentPatient.appointments[0].id;
    }

    const submitData = {
      id: currentAppointmentId,
      patientId: currentPatient.id,
      clientId: currentUser.roleForClient.client_id,
      time: moment(scheduledDate).add(formValues.amPm === 'AM' ?
      formValues.hours % 12 :
      (formValues.hours % 12) + 12, 'hours').add(formValues.minutes, 'minutes').toISOString(),
      textReminder: formValues.textReminder || false,
    };

    // Get category info, so that upon successful schedule submission, the patient will be moved into the
    // scheduled category.
    const scheduledCategoryId = _.find(patientCategories, { name: 'Scheduled' }).id;

    this.props.submitSchedule(submitData, currentPatientCategoryId, scheduledCategoryId);
  }

  handleDateChange(date) {
    const { changeScheduledDate } = this.props;
    changeScheduledDate(date);
  }

  closePatientModal() {
    const { setCurrentPatientId, setCurrentPatientCategoryId, setOpenPatientModal } = this.props;
    setCurrentPatientId(-1);
    setCurrentPatientCategoryId(-1);
    this.resetFormsValues();

    // set up the redux state for opening the modal
    setOpenPatientModal(false);
  }

  closePatientScheduleModal() {
    const { setCurrentPatientId, setCurrentPatientCategoryId, hideScheduledModal, openPatientModal } = this.props;
    // do not reset selection if patient detail modal is open
    if (!openPatientModal) {
      setCurrentPatientId(-1);
      setCurrentPatientCategoryId(-1);
      this.resetFormsValues();
    }

    // set up the redux state for opening the modal
    hideScheduledModal();
  }

  resetFormsValues() {
    this.props.setFormValueByName('PatientDetailModal.Notes', 'note', '');
    this.props.setFormValueByName('PatientDetailSection.Text', 'body', '');
  }

  handleScroll(event) {
    let scrollTop;
    if (event.target.scrollingElement) {
      scrollTop = event.target.scrollingElement.scrollTop;
    } else {
      // for firefox compatibility
      scrollTop = event.pageY;
    }
    this.setState({
      stick: scrollTop >= 654,
    });
  }

  showModal() {
    const { currentPatientId, fetchPatientDetails, openPatientModal } = this.props;
    // have a way to show the modal from the state, and also from an argument, so that we can handle both modal opening from page transitions and modal opening from a user action like a click
    if (openPatientModal) {
      fetchPatientDetails(currentPatientId);
      const options = {
        duration: 500,
      };
      scroll.scrollTo(633, options);
    }
  }

  render() {
    const { patientCategories, openPatientModal, openScheduledModal, ePMS, currentPatient, fetchingPatients } = this.props;
    return (
      <div className="clearfix patients-list-area-holder">
        <div className={classNames('patients-list-area', { 'form-active': openPatientModal && !openScheduledModal })}>
          {(fetchingPatients) && <LoadingSpinner showOnlyIcon={false} size={50} />}
          <nav className="nav-status">
            <ul className={classNames('list-inline', { stick: this.state.stick })}>
              {patientCategories.map(patientCategory => (
                <PatientCategory key={patientCategory.id} category={patientCategory} onPatientClick={this.onPatientClick} onPatientTextClick={this.onPatientTextClick} onPatientDraggedToScheduled={this.onPatientDraggedToScheduled} />
              ))}
            </ul>
          </nav>
          <PatientDetailModal
            onClose={this.closePatientModal}
            ePMS={ePMS}
          />
          <ScheduledPatientModal show={openScheduledModal && currentPatient !== null} onHide={this.closePatientScheduleModal} handleSubmit={this.onPatientScheduleSubmit} handleDateChange={this.handleDateChange} />
        </div>
        <div className="patients-form-closer" onClick={this.closePatientModal} />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentPatientId: Selector.selectCurrentPatientId(),
  currentPatient: Selector.selectCurrentPatient(),
  currentPatientCategoryId: Selector.selectCurrentPatientCategoryId(),
  carousel: Selector.selectCarousel(),
  openPatientModal: Selector.selectOpenPatientModal(),
  openScheduledModal: Selector.selectOpenScheduledModal(),
  schedulePatientFormValues: Selector.selectSchedulePatientFormValues(),
  schedulePatientFormErrors: Selector.selectSchedulePatientFormErrors(),
  studyId: Selector.selectStudyId(),
  selectedDate: Selector.selectSelectedDate(),
  currentUser: selectCurrentUser(),
});

const mapDispatchToProps = (dispatch) => (
  {
    fetchPatientDetails: (patientId) => dispatch(fetchPatientDetails(patientId)),
    setCurrentPatientId: (id) => dispatch(setCurrentPatientId(id)),
    setCurrentPatientCategoryId: (id) => dispatch(setCurrentPatientCategoryId(id)),
    setOpenPatientModal: (show) => dispatch(setOpenPatientModal(show)),
    showScheduledModal: (type) => dispatch(showScheduledModal(type)),
    hideScheduledModal: () => dispatch(hideScheduledModal()),
    switchToNoteSection: () => dispatch(switchToNoteSectionDetail()),
    switchToTextSection: () => dispatch(switchToTextSectionDetail()),
    changeScheduledDate: (date) => dispatch(changeScheduledDate(date)),
    push: (url) => dispatch(push(url)),
    readStudyPatientMessages: (patientId) => dispatch(readStudyPatientMessages(patientId)),
    markAsReadPatientMessages: (patientId) => dispatch(markAsReadPatientMessages(patientId)),
    setFormValueByName: (name, attrName, value) => dispatch(change(name, attrName, value)),
    touchSchedulePatientModal: () => dispatch(touch('ScheduledPatientModal', ...fields)),
    submitSchedule: (data, fromCategoryId, scheduleCategoryId) => dispatch(submitSchedule(data, fromCategoryId, scheduleCategoryId)),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(PatientBoard);
