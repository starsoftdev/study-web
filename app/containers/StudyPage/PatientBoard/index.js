/**
 * Created by mike on 9/20/16.
 */

import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { createStructuredSelector } from 'reselect';
import * as Selector from '../selectors';
import { push } from 'react-router-redux';
import moment from 'moment';
import _ from 'lodash';
import { touch, change } from 'redux-form';

import PatientCategory from './PatientCategory';
import PatientDetailModal from '../PatientDetail/PatientDetailModal';
import ScheduledPatientModal from '../ScheduledPatientModal/index';
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
} from '../actions';
import { selectCurrentUser, selectIndications } from '../../App/selectors';
import { markAsReadPatientMessages } from '../../App/actions';
import { fields } from '../ScheduledPatientModal/validator';

import Scroll from 'react-scroll';
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
    site: React.PropTypes.object.isRequired,
    protocol: React.PropTypes.object.isRequired,
    indications: React.PropTypes.array.isRequired,
    indicationId: React.PropTypes.number.isRequired,
    touchSchedulePatientModal: React.PropTypes.func.isRequired,
    submitSchedule: React.PropTypes.func.isRequired,
    schedulePatientFormErrors: React.PropTypes.object,
    selectedDate: React.PropTypes.object,
    markAsReadPatientMessages: React.PropTypes.func,
    studyId: React.PropTypes.number,
    setFormValueByName: React.PropTypes.func,
    ePMS: React.PropTypes.bool,
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

  onPatientDraggedToScheduled(patientId, patientCategoryId) {
    const { setCurrentPatientId, setCurrentPatientCategoryId, showScheduledModal } = this.props;
    setCurrentPatientId(patientId);
    setCurrentPatientCategoryId(patientCategoryId);
    showScheduledModal();
  }

  onPatientTextClick(category, patient) {
    const {
      currentPatientId,
      fetchPatientDetails,
      setCurrentPatientId,
      setCurrentPatientCategoryId,
      setOpenPatientModal, switchToTextSection,
      studyId,
      readStudyPatientMessages,
      markAsReadPatientMessages,
    } = this.props;
    const show = (patient && currentPatientId !== patient.id) || false;
    if (show) {
      setCurrentPatientId(patient.id);
      setCurrentPatientCategoryId(category.id);
      fetchPatientDetails(patient.id);
      readStudyPatientMessages(patient.id, studyId);
      markAsReadPatientMessages(patient.id, studyId);
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
    const { schedulePatientFormValues, schedulePatientFormErrors, currentPatient, site, protocol, currentUser, indicationId, selectedDate, patientCategories, currentPatientCategoryId, touchSchedulePatientModal } = this.props;

    if (schedulePatientFormErrors) {
      touchSchedulePatientModal();
      return;
    }

    const defaultDate = moment().startOf('day');
    const scheduledDate = selectedDate || defaultDate;
    const formValues = schedulePatientFormValues;
    let currentCallReminderId;

    if (currentPatient.callReminders && currentPatient.callReminders[0]) {
      currentCallReminderId = currentPatient.callReminders[0].id;
    }

    const submitData = {
      id: currentCallReminderId,
      siteLocation: site.name,
      indication: _.find(this.props.indications, { id: indicationId }).name,
      protocolNumber: protocol.number,
      patientId: currentPatient.id,
      patientName: `${currentPatient.firstName} ${currentPatient.lastName}`,
      userId: currentUser.id,
      time: moment(scheduledDate).add(formValues.amPm === 'AM' ?
      formValues.hours % 12 :
      (formValues.hours % 12) + 12, 'hours').add(formValues.minutes, 'minutes').toISOString(),
      textReminder: formValues.textReminder || false,
      timezone: currentUser.timezone,
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
    const { patientCategories, openPatientModal, openScheduledModal, hideScheduledModal, ePMS, currentPatient } = this.props;
    return (
      <div className="clearfix patients-list-area-holder">
        <div className={classNames('patients-list-area', { 'form-active': openPatientModal && !openScheduledModal })}>
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
          <ScheduledPatientModal show={openScheduledModal && currentPatient != null} onHide={hideScheduledModal} handleSubmit={this.onPatientScheduleSubmit} handleDateChange={this.handleDateChange} />
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
  indicationId: Selector.selectIndicationId(),
  site: Selector.selectSite(),
  protocol: Selector.selectProtocol(),
  selectedDate: Selector.selectSelectedDate(),
  currentUser: selectCurrentUser(),
  indications: selectIndications(),
});

const mapDispatchToProps = (dispatch) => (
  {
    fetchPatientDetails: (patientId) => dispatch(fetchPatientDetails(patientId)),
    setCurrentPatientId: (id) => dispatch(setCurrentPatientId(id)),
    setCurrentPatientCategoryId: (id) => dispatch(setCurrentPatientCategoryId(id)),
    setOpenPatientModal: (show) => dispatch(setOpenPatientModal(show)),
    showScheduledModal: () => dispatch(showScheduledModal()),
    hideScheduledModal: () => dispatch(hideScheduledModal()),
    switchToNoteSection: () => dispatch(switchToNoteSectionDetail()),
    switchToTextSection: () => dispatch(switchToTextSectionDetail()),
    changeScheduledDate: (date) => dispatch(changeScheduledDate(date)),
    push: (url) => dispatch(push(url)),
    readStudyPatientMessages: (patientId, studyId) => dispatch(readStudyPatientMessages(patientId, studyId)),
    markAsReadPatientMessages: (patientId, studyId) => dispatch(markAsReadPatientMessages(patientId, studyId)),
    setFormValueByName: (name, attrName, value) => dispatch(change(name, attrName, value)),
    touchSchedulePatientModal: () => dispatch(touch('ScheduledPatientModal', ...fields)),
    submitSchedule: (data, fromCategoryId, scheduleCategoryId) => dispatch(submitSchedule(data, fromCategoryId, scheduleCategoryId)),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(PatientBoard);
