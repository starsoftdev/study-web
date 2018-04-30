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
import moment from 'moment-timezone';
import _ from 'lodash';
import { touch, change } from 'redux-form';
import * as Scroll from 'react-scroll';

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
  updatePatientSuccess,
} from '../../containers/StudyPage/actions';
import { selectCurrentUser, selectSites } from '../../containers/App/selectors';
import { markAsReadPatientMessages, deleteMessagesCountStat } from '../../containers/App/actions';
import { fields } from '../../containers/StudyPage/ScheduledPatientModal/validator';
import * as Selector from '../../containers/StudyPage/selectors';
import PatientCategory from './PatientCategory';
import { selectValues } from '../../common/selectors/form.selector';
const scroll = Scroll.animateScroll;

@DragDropContext(HTML5Backend)
class PatientBoard extends React.Component {
  static propTypes = {
    params: React.PropTypes.object,
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
    sites: React.PropTypes.array,
    submitSchedule: React.PropTypes.func.isRequired,
    schedulePatientFormErrors: React.PropTypes.object,
    selectedDate: React.PropTypes.object,
    markAsReadPatientMessages: React.PropTypes.func,
    deleteMessagesCountStat: React.PropTypes.func,
    studyId: React.PropTypes.number,
    setFormValueByName: React.PropTypes.func,
    ePMS: React.PropTypes.bool,
    fetchingPatients: React.PropTypes.any,
    updatePatientSuccess: React.PropTypes.func,
    loadMore: React.PropTypes.func,
    paginationOptions: React.PropTypes.object,
    studyPatientsFilter: React.PropTypes.object,
    patientCategoriesTotals: React.PropTypes.array,
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
    this.loadItems = this.loadItems.bind(this);
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
      fetchPatientDetails(patient.id, category.id);
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
      deleteMessagesCountStat,
    } = this.props;
    const show = (patient && currentPatientId !== patient.id) || false;
    if (show) {
      setCurrentPatientId(patient.id);
      setCurrentPatientCategoryId(category.id);
      fetchPatientDetails(patient.id, category.id);
      readStudyPatientMessages(patient.id);
      // markAsReadPatientMessages(patient.id);
      deleteMessagesCountStat(patient.unreadMessageCount);
      this.props.updatePatientSuccess(patient.id, category.id, {
        unreadMessageCount: 0,
      });
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
    const { schedulePatientFormValues, schedulePatientFormErrors, currentPatient, currentUser, selectedDate, patientCategories, currentPatientCategoryId, sites, touchSchedulePatientModal } = this.props;

    if (schedulePatientFormErrors) {
      touchSchedulePatientModal();
      return;
    }

    const patientSite = _.find(sites, site => site.id === currentPatient.site_id);
    let timezone;
    if (currentUser.roleForClient.isAdmin) {
      timezone = patientSite ? patientSite.timezone : currentUser.timezone;
    } else {
      timezone = patientSite ? patientSite.timezone : currentUser.roleForClient.site.timezone;
    }

    const scheduledDate = selectedDate ? selectedDate.startOf('day') : moment().tz(timezone).startOf('day');
    const formValues = schedulePatientFormValues;
    let currentAppointmentId;

    const time = scheduledDate.hour(formValues.period === 'AM' ? formValues.hour % 12 : (formValues.hour % 12) + 12).minute(formValues.minute).utc();

    if (currentPatient.appointments && currentPatient.appointments[0]) {
      currentAppointmentId = currentPatient.appointments[0].id;
    }

    const submitData = {
      id: currentAppointmentId,
      patientId: currentPatient.id,
      clientRoleId: currentUser.roleForClient.id,
      time,
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
    let scrollBottom;
    if (event.target.scrollingElement) {
      scrollTop = event.target.scrollingElement.scrollTop;
      scrollBottom = scrollTop + window.innerHeight;
    } else {
      // for firefox compatibility
      scrollTop = event.pageY;
      scrollBottom = scrollTop + window.innerHeight;
    }
    if (scrollBottom >= event.target.scrollingElement.scrollHeight) {
      this.loadItems();
    }
    this.setState({
      stick: scrollTop >= 654,
    });
  }

  showModal() {
    const { currentPatientId, currentPatientCategoryId, fetchPatientDetails, openPatientModal } = this.props;
    // have a way to show the modal from the state, and also from an argument, so that we can handle both modal opening from page transitions and modal opening from a user action like a click
    if (openPatientModal) {
      fetchPatientDetails(currentPatientId, currentPatientCategoryId);
      const options = {
        duration: 500,
      };
      scroll.scrollTo(633, options);
    }
  }

  loadItems() {
    if (this.props.paginationOptions.hasMoreItems && !this.props.fetchingPatients) {
      this.props.loadMore(this.props.studyPatientsFilter, true);
    }
  }

  render() {
    const { patientCategories, openPatientModal, openScheduledModal, ePMS, currentPatient, fetchingPatients, params, paginationOptions, patientCategoriesTotals } = this.props;
    return (
      <div className="clearfix patients-list-area-holder">
        <div className={classNames('patients-list-area', { 'form-active': openPatientModal && !openScheduledModal })}>
          {(fetchingPatients) && <LoadingSpinner showOnlyIcon={false} noMessage />}
          <nav className="nav-status">
            <ul className={classNames('list-inline', { stick: this.state.stick })}>
              {patientCategories.map(patientCategory => (
                <PatientCategory
                  key={patientCategory.id}
                  patientCategoriesTotals={patientCategoriesTotals}
                  category={patientCategory}
                  onPatientClick={this.onPatientClick}
                  onPatientTextClick={this.onPatientTextClick}
                  onPatientDraggedToScheduled={this.onPatientDraggedToScheduled}
                  hasMoreItems={paginationOptions.hasMoreItems}
                  loadMore={this.loadMore}
                />
              ))}
            </ul>
          </nav>
          <PatientDetailModal
            onClose={this.closePatientModal}
            params={params}
            ePMS={ePMS}
            patientCategories={patientCategories}
            onPatientDraggedToScheduled={this.onPatientDraggedToScheduled}
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
  sites: selectSites(),
  studyId: Selector.selectStudyId(),
  selectedDate: Selector.selectSelectedDate(),
  currentUser: selectCurrentUser(),
  studyPatientsFilter: selectValues('filterStudyPatients'),
});

const mapDispatchToProps = (dispatch) => (
  {
    fetchPatientDetails: (patientId, patientCategoryId) => dispatch(fetchPatientDetails(patientId, patientCategoryId)),
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
    deleteMessagesCountStat: (payload) => dispatch(deleteMessagesCountStat(payload)),
    setFormValueByName: (name, attrName, value) => dispatch(change(name, attrName, value)),
    touchSchedulePatientModal: () => dispatch(touch('ScheduledPatientModal', ...fields)),
    submitSchedule: (data, fromCategoryId, scheduleCategoryId) => dispatch(submitSchedule(data, fromCategoryId, scheduleCategoryId)),
    updatePatientSuccess: (patientId, patientCategoryId, payload) => dispatch(updatePatientSuccess(patientId, patientCategoryId, payload)),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(PatientBoard);
