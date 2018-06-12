import classNames from 'classnames';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment-timezone';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import { Field, change, reduxForm, reset } from 'redux-form';
import { StickyContainer, Sticky } from 'react-sticky';
import InfiniteScroll from 'react-infinite-scroller';
import { defaultStaticRanges } from '../../../../common/constants/dateRanges';
import { getMomentFromDate } from '../../../../utils/time';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import { DashboardNoteSearch } from '../AdminDashboardNoteSearch/index';
import { DashboardNoteTable } from '../AdminDashboardNoteTable';

import { selectValues } from '../../../../common/selectors/form.selector';
import ReactSelect from '../../../../components/Input/ReactSelect';
import CampaignPageModal from '../../../../components/CampaignPageModal';
import CallTrackingPageModal from '../../../../components/CallTrackingPageModal';
import LandingPageModal from '../../../../components/LandingPageModal';
import ThankYouPageModal from '../../../../components/ThankYouPageModal/index';
import PatientThankYouEmailModal from '../../../../components/PatientThankYouEmailModal';
import LeadGenModal from '../../../../components/LeadGenModal';
import CenteredModal from '../../../../components/CenteredModal';
import AddEmailNotificationForm from '../../../../components/AddEmailNotificationForm';
import EditInformationModal from '../../../../components/EditStudyForms/EditInformationModal';
import {
  selectStudies,
  selectPaginationOptions,
  selectDashboardEditNoteProcess,
  selectDashboardNote,
} from '../selectors';
import StudyLeftItem from './StudyLeftItem';
import StudyRightItem from './StudyRightItem';
import {
  setHoverRowIndex,
  fetchNote,
  addNote,
  editNote,
  deleteNote,
  toggleStudy,
  toggleAllStudies,
} from '../actions';
import { submitToClientPortal } from '../../../DashboardPortalsPage/actions';

const mapStateToProps = createStructuredSelector({
  editNoteProcess: selectDashboardEditNoteProcess(),
  editStudyValues: selectValues('Dashboard.EditStudyForm'),
  note: selectDashboardNote(),
  paginationOptions: selectPaginationOptions(),
  studies: selectStudies(),
});

const mapDispatchToProps = (dispatch) => ({
  change: (formName, name, value) => dispatch(change(formName, name, value)),
  setHoverRowIndex: (index) => dispatch(setHoverRowIndex(index)),
  submitToClientPortal: (id) => dispatch(submitToClientPortal(id)),
  fetchNote: (studyId) => dispatch(fetchNote(studyId)),
  addNote: (payload) => dispatch(addNote(payload)),
  editNote: (payload) => dispatch(editNote(payload)),
  clearCampaignFilter: () => dispatch(reset('campaignFilter')),
  deleteNote: (payload) => dispatch(deleteNote(payload)),
  setFilterFormValues: (key, value) => dispatch(change('dashboardFilters', key, value)),
  toggleStudy: (id, status) => dispatch(toggleStudy(id, status)),
  toggleAllStudies: (status) => dispatch(toggleAllStudies(status)),
});

@reduxForm({
  form: 'campaignFilter',
  enableReinitialize: true,
})
@connect(mapStateToProps, mapDispatchToProps)
export default class StudyList extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    addCustomEmailNotification: PropTypes.func.isRequired,
    addEmailNotificationUser: PropTypes.func.isRequired,
    addNote: PropTypes.func,
    change: PropTypes.func.isRequired,
    changeStudyStatusDashboard: PropTypes.func.isRequired,
    clearCampaignFilter: PropTypes.func,
    deleteNote: PropTypes.func,
    editNoteProcess: PropTypes.object,
    editStudyValues: PropTypes.object,
    editNote: PropTypes.func,
    fetchNote: PropTypes.func,
    fetchStudyCampaignsDashboard: PropTypes.func.isRequired,
    fetchStudiesAccordingToFilters: PropTypes.func.isRequired,
    updateFilters: PropTypes.func.isRequired,
    filtersFormValues: PropTypes.object,
    five9List: PropTypes.object,
    allCustomNotificationEmails: PropTypes.object,
    levels: PropTypes.array,
    note: PropTypes.object,
    paginationOptions: PropTypes.object,
    setFilterFormValues: PropTypes.func,
    setHoverRowIndex: PropTypes.func,
    sources: PropTypes.array,
    studies: PropTypes.object,
    submitToClientPortal: PropTypes.func,
    toggleAllStudies: PropTypes.func.isRequired,
    toggleStudy: PropTypes.func,
    totals: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.toggleAllStudies = this.toggleAllStudies.bind(this);
    this.toggleStudy = this.toggleStudy.bind(this);
    this.activateStudies = this.activateStudies.bind(this);
    this.deactivateStudies = this.deactivateStudies.bind(this);
    this.loadItems = this.loadItems.bind(this);
    this.showDateRangeModal = this.showDateRangeModal.bind(this);
    this.hideDateRangeModal = this.hideDateRangeModal.bind(this);
    this.showEditInformationModal = this.showEditInformationModal.bind(this);
    this.showLandingPageModal = this.showLandingPageModal.bind(this);
    this.showThankYouPageModal = this.showThankYouPageModal.bind(this);
    this.showPatientThankYouPageModal = this.showPatientThankYouPageModal.bind(this);
    this.showLeadGenPageModal = this.showLeadGenPageModal.bind(this);
    this.showCampaignPageModal = this.showCampaignPageModal.bind(this);
    this.showCallTrackingModal = this.showCallTrackingModal.bind(this);
    this.changeRange = this.changeRange.bind(this);
    this.handleChange = this.handleChange.bind(this, 'dateRange');
    this.campaignChanged = this.campaignChanged.bind(this);
    this.sourceChanged = this.sourceChanged.bind(this);

    this.addEmailNotificationClick = this.addEmailNotificationClick.bind(this);
    this.closeAddEmailModal = this.closeAddEmailModal.bind(this);
    this.addEmailNotificationSubmit = this.addEmailNotificationSubmit.bind(this);

    this.handleScroll = this.handleScroll.bind(this);
    this.handleBodyScroll = this.handleBodyScroll.bind(this);
    this.handleStickyStateChange = this.handleStickyStateChange.bind(this);
    this.closeNoteModal = this.closeNoteModal.bind(this);
    this.showNoteModal = this.showNoteModal.bind(this);
    this.setNoteModalClass = this.setNoteModalClass.bind(this);


    this.state = {
      showDateRangeModal: false,
      rangePicker : {},
      datePicker : null,
      firstDayOfWeek : null,
      dateRange : {
        startDate: moment().clone().subtract(30, 'days').toDate(),
        endDate: new Date(),
        key: 'selection',
      },
      customAddEmailModal: false,
      showEditInformationModal: false,
      showLandingPageModal: false,
      showThankYouPageModal: false,
      showPatientThankYouPageModal: false,
      showLeadGenPageModal: false,
      showCampaignPageModal: false,
      showCallTrackingModal:false,
      addEmailModalShow: false,
      isFixedBottomScroll: false,
      fixedScrollWidth: false,
      fixedScrollContainerWidth: 3015,

      stickyLeftOffset: false,

      showNoteModal: false,
      hideNoteModal: false,
      adminStudyId: null,
    };
  }

  componentWillMount() {
    // this.props.fetchNote();
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleBodyScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleBodyScroll);
  }

  setNoteModalClass(hidden = false) {
    this.setState({ hideNoteModal: hidden });
  }

  handleScroll(event) {
    const scrollLeft = event.target.scrollLeft;
    this.rightDivHeader.refs.children.scrollLeft = scrollLeft;
    this.rightDivParentHeader.scrollLeft = scrollLeft;
  }

  handleBodyScroll(event) {
    if (event.target.scrollingElement) {
      const scrollTop = event.target.scrollingElement.scrollTop;
      const scrollHeight = event.target.scrollingElement.scrollHeight;

      if ((window.innerHeight + scrollTop < 1130) || (scrollHeight - window.innerHeight - scrollTop < 80)) {
        if (this.state.isFixedBottomScroll) {
          this.setState({ isFixedBottomScroll: false });
        }
      } else if (!this.state.isFixedBottomScroll || this.state.fixedScrollWidth !== this.tableRight.clientWidth) {
        this.setState({ isFixedBottomScroll: true, fixedScrollWidth: this.tableRight.clientWidth, fixedScrollContainerWidth: (3015 + this.tableRight.clientWidth) });
      }
    }
  }

  toggleAllStudies(checked) {
    const { toggleAllStudies } = this.props;
    toggleAllStudies(checked);
  }

  toggleStudy(studyId, checked) {
    const { toggleStudy } = this.props;
    toggleStudy(studyId, checked);
    this.showEditInformationModal(false);
  }

  activateStudies() {
    const { changeStudyStatusDashboard, studies } = this.props;
    const selectedStudies = studies.details.filter(s => s.selected).map(s => s.study_id);

    changeStudyStatusDashboard(selectedStudies, 'active', true);
  }

  deactivateStudies() {
    const { changeStudyStatusDashboard, studies } = this.props;
    const selectedStudies = studies.details.filter(s => s.selected).map(s => s.study_id);

    changeStudyStatusDashboard(selectedStudies, 'inactive', true);
  }

  loadItems() {
    this.props.fetchStudiesAccordingToFilters(null, null, true, null);
  }

  showDateRangeModal() {
    this.setState({ showDateRangeModal: true });
  }

  hideDateRangeModal() {
    this.setState({ showDateRangeModal: false });
  }

  handleChange(which, payload) {
    if (payload.selection) {
      this.setState({
        [which] : payload.selection,
      });
    }
  }

  changeRange() {
    // TODO: update filter
    this.hideDateRangeModal();
  }

  showLandingPageModal(visible) {
    if (visible) {
      this.setState({
        showEditInformationModal: false,
        showLandingPageModal: true,
        showThankYouPageModal: false,
        showPatientThankYouPageModal: false,
        showLeadGenPageModal: false,
        showCampaignPageModal: false,
        showCallTrackingModal: false,
      });
    } else {
      this.setState({
        showLandingPageModal: false,
      });
    }
  }

  showThankYouPageModal(visible) {
    if (visible) {
      this.setState({
        showEditInformationModal: false,
        showLandingPageModal: false,
        showThankYouPageModal: true,
        showPatientThankYouPageModal: false,
        showLeadGenPageModal: false,
        showCampaignPageModal: false,
        showCallTrackingModal: false,
      });
    } else {
      this.setState({
        showThankYouPageModal: false,
      });
    }
  }

  showPatientThankYouPageModal(visible) {
    if (visible) {
      this.setState({
        showEditInformationModal: false,
        showLandingPageModal: false,
        showThankYouPageModal: false,
        showPatientThankYouPageModal: true,
        showLeadGenPageModal: false,
        showCampaignPageModal: false,
        showCallTrackingModal: false,
      });
    } else {
      this.setState({
        showPatientThankYouPageModal: false,
      });
    }
  }

  showLeadGenPageModal(visible) {
    if (visible) {
      this.setState({
        showEditInformationModal: false,
        showLandingPageModal: false,
        showThankYouPageModal: false,
        showPatientThankYouPageModal: false,
        showLeadGenPageModal: true,
        showCampaignPageModal: false,
      });
    } else {
      this.setState({
        showLeadGenPageModal: false,
      });
    }
  }

  showEditInformationModal(visible) {
    if (visible) {
      this.setState({
        showEditInformationModal: true,
        showLandingPageModal: false,
        showThankYouPageModal: false,
        showPatientThankYouPageModal: false,
        showLeadGenPageModal: false,
        showCampaignPageModal: false,
        showCallTrackingModal: false,
      });
    } else {
      this.setState({
        showEditInformationModal: false,
      });
    }
  }

  showCampaignPageModal(visible) {
    if (visible) {
      this.setState({
        showEditInformationModal: false,
        showLandingPageModal: false,
        showThankYouPageModal: false,
        showPatientThankYouPageModal: false,
        showLeadGenPageModal: false,
        showCampaignPageModal: true,
        showCallTrackingModal: false,
      });
    } else {
      this.setState({
        showCampaignPageModal: false,
      });
    }
  }

  showCallTrackingModal(visible) {
    if (visible) {
      this.setState({
        showEditInformationModal: false,
        showLandingPageModal: false,
        showThankYouPageModal: false,
        showPatientThankYouPageModal: false,
        showCampaignPageModal: false,
        showCallTrackingModal: true,
      });
    } else {
      this.setState({
        showCallTrackingModal: false,
      });
    }
  }

  campaignChanged(val) {
    const { setFilterFormValues, updateFilters } = this.props;
    setFilterFormValues('campaign', val);
    this.toggleAllStudies(false);
    updateFilters('campaign', val);
  }

  sourceChanged(val) {
    const { setFilterFormValues, updateFilters } = this.props;
    setFilterFormValues('source', val);
    this.toggleAllStudies(false);
    updateFilters('source', val);
  }

  addEmailNotificationClick(custom = false) {
    this.setState({ addEmailModalShow: true, customAddEmailModal: custom });
  }

  closeAddEmailModal(custom = false) {
    this.setState({ addEmailModalShow: false, customAddEmailModal: custom });
  }

  addEmailNotificationSubmit(values) {
    const { addEmailNotificationUser, addCustomEmailNotification, editStudyValues } = this.props;
    const { customAddEmailModal } = this.state;
    if (!customAddEmailModal) {
      addEmailNotificationUser({
        ...values,
        clientId: editStudyValues.client_id,
        clientRole: {
          siteId: editStudyValues.site,
        },
      });
    } else {
      addCustomEmailNotification({
        ...values,
        type: 'inactive',
        clientId: editStudyValues.client_id,
        studyId: editStudyValues.study_id,
      });
    }

    this.closeAddEmailModal();
  }

  handleStickyStateChange(e) {
    if (e && this.rightDivHeader) {
      this.rightDivHeader.refs.children.scrollLeft = this.rightDivParentHeader.scrollLeft;
      this.setState({ stickyLeftOffset: this.rightDivHeader.refs.children.offsetLeft });
    } else {
      this.setState({ stickyLeftOffset: false });
    }
  }

  showNoteModal(studyId) {
    this.props.fetchNote(studyId);
    this.setState({
      showNoteModal: true,
      adminStudyId: studyId,
    });
  }

  closeNoteModal() {
    this.setState({
      showNoteModal: false,
    });
  }

  renderDateFooter() {
    const { dateRange } = this.state;
    if (dateRange.startDate) {
      const format = 'MMM D, YYYY';
      if (getMomentFromDate(dateRange.startDate).isSameOrAfter(getMomentFromDate(dateRange.endDate), 'day')) {
        return (
          <span className="time">
            {getMomentFromDate(dateRange.startDate).format(format)}
          </span>
        );
      }
      return (
        <span className="time">
          {getMomentFromDate(dateRange.startDate).format(format)} - {getMomentFromDate(dateRange.endDate).format(format)}
        </span>
      );
    }
    return null;
  }

  renderEditStudyActionButtons(selectedStudies) {
    if (selectedStudies.length === 1) {
      return (
        <span>
          <Button
            bsStyle="primary"
            className="pull-left"
            data-class="btn-deactivate"
            onClick={() => this.showLandingPageModal(true)}
          > Landing Page </Button>
          <Button
            bsStyle="primary"
            className="pull-left"
            data-class="btn-deactivate"
            onClick={() => this.showThankYouPageModal(true)}
          > Thank You Page </Button>
          <Button
            bsStyle="primary"
            className="pull-left"
            data-class="btn-deactivate"
            onClick={() => this.showPatientThankYouPageModal(true)}
          > Patient Thank You Email </Button>
          <Button
            bsStyle="primary"
            className="pull-left"
            data-class="btn-deactivate"
            onClick={() => this.showCallTrackingModal(true)}
          > Media Tracking </Button>
          <Button
            bsStyle="primary"
            className="pull-left"
            data-class="btn-deactivate"
            onClick={() => this.showLeadGenPageModal(true)}
          > LEAD GEN </Button>
          <Button
            bsStyle="primary"
            className="pull-left"
            data-class="btn-deactivate"
            onClick={() => this.showCampaignPageModal(true)}
          > Campaign </Button>
          <Button
            bsStyle="primary"
            className="pull-left"
            data-class="btn-deactivate"
            onClick={() => this.showEditInformationModal(true)}
          > Info </Button>
          <Button
            bsStyle="primary"
            className="pull-left"
            data-class="btn-deactivate"
          > History </Button>
        </span>
      );
    }
    return null;
  }

  render() {
    const { studies, totals } = this.props;

    const studyListLeftContents = studies.details.map((item, index) =>
      <StudyLeftItem
        item={item}
        key={index}
        id={index}
        onSelectStudy={this.toggleStudy}
        showNoteModal={this.showNoteModal}
        changeStudyStatusDashboard={this.props.changeStudyStatusDashboard}
        setHoverRowIndex={this.props.setHoverRowIndex}
        submitToClientPortal={this.props.submitToClientPortal}
      />
    );
    const studyListRightContents = studies.details.map((item, index) =>
      <StudyRightItem
        item={item}
        key={index}
        setHoverRowIndex={this.props.setHoverRowIndex}
        filtersFormValues={this.props.filtersFormValues}
      />
    );


    const maxCampaignCount = totals.details ? parseInt(totals.details.max_campaign_count) : 0;

    let campaignOptions = [];
    for (let i = 1; i <= maxCampaignCount; i++) {
      campaignOptions.push({ label: i, value: i });
    }
    if (totals.details && totals.details.current_campaign_count && totals.details.current_campaign_count > 0) {
      campaignOptions.push({ label: 'Current', value: 'current' });
    }

    campaignOptions = campaignOptions.reverse();

    const selectedStudies = studies.details.filter(s => s.selected);

    const sourcesOptions = [];
    this.props.sources.forEach(item => {
      sourcesOptions.push({ label: item.type, value: item.id });
    });
    sourcesOptions.unshift({ label: 'All', value: -1 });

    if (studies.details.length > 0) {
      return (
        <div>
          <div className={classNames({ 'btns-active': selectedStudies.length > 0 })}>
            {selectedStudies.length > 0 &&
            <Sticky className={classNames('clearfix', 'top-head', 'top-head-fixed', 'active')} topOffset={-268}>
              <strong className="title"><span className="studies-counter"> {selectedStudies.length}</span> <span
                className="text" data-one="STUDY" data-two="STUDIES"
              > SELECTED</span></strong>
              <div className="btns-area">
                <Button
                  bsStyle="primary"
                  className="pull-left"
                  data-class="btn-activate"
                  onClick={this.activateStudies}
                >
                  Activate
                </Button>
                <Button
                  bsStyle="primary"
                  className="pull-left"
                  data-class="btn-deactivate"
                  onClick={this.deactivateStudies}
                >
                  Deactivate
                </Button>
                {this.renderEditStudyActionButtons(selectedStudies)}
              </div>
            </Sticky>
            }
            <div className="study-tables fixed-top">
              {totals &&
              <div className="head">
                <h2 className="pull-left">{totals.details.total_studies || 0} STUDIES</h2>
                <div className="btns pull-right">
                  <form className="campaign-filter">
                    <div className="select pull-left">
                      <Field
                        name="source-search"
                        className="data-search source-search"
                        component={ReactSelect}
                        placeholder="Select Source"
                        searchPlaceholder="Search"
                        searchable
                        options={sourcesOptions}
                        customSearchIconClass="icomoon-icon_search2"
                        onChange={this.sourceChanged}
                      />
                    </div>
                    <div className="select pull-left">
                      <Field
                        name="campaign-search"
                        className="campaign-search"
                        component={ReactSelect}
                        placeholder="Select Campaign"
                        searchPlaceholder="Search"
                        searchable
                        options={campaignOptions}
                        customSearchIconClass="icomoon-icon_search2"
                        onChange={this.campaignChanged}
                      />
                    </div>
                    <Button
                      bsStyle="primary"
                      className="pull-left"
                      onClick={() => {
                        this.showDateRangeModal();
                      }}
                    >
                      <i className="icomoon-icon_calendar" />
                      &nbsp;Date Range
                    </Button>
                    <Button
                      bsStyle="primary"
                      className="pull-left"
                      onClick={() => {
                      }}
                    >
                      <i className="icomoon-icon_download" />
                      &nbsp;Download
                    </Button>
                  </form>
                </div>
                <Modal
                  id="date-range"
                  className="date-range-modal"
                  dialogComponentClass={CenteredModal}
                  show={this.state.showDateRangeModal}
                  onHide={() => {
                    this.hideDateRangeModal();
                  }}
                  backdrop
                  keyboard
                >
                  <Modal.Header>
                    <Modal.Title>Date Range</Modal.Title>
                    <a
                      className="lightbox-close close" onClick={() => {
                        this.hideDateRangeModal();
                      }}
                    >
                      <i className="icomoon-icon_close" />
                    </a>
                  </Modal.Header>
                  <Modal.Body>
                    <DateRangePicker
                      onChange={this.handleChange}
                      moveRangeOnFirstSelection={false}
                      showMonthAndYearPickers={false}
                      months={2}
                      direction="horizontal"
                      ranges={[this.state.dateRange]}
                      staticRanges={defaultStaticRanges}
                      inputRanges={[]}
                    />
                    <div className="dateRange-helper">
                      <div className="emit-border"><br /></div>
                      <div className="right-part">
                        <div className="btn-block text-right">
                          {this.renderDateFooter()}
                          <Button
                            onClick={() => {
                              this.changeRange();
                            }}
                          >
                            Submit
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Modal.Body>
                </Modal>
              </div>
              }
              <InfiniteScroll
                pageStart={0}
                loadMore={this.loadItems}
                initialLoad={false}
                hasMore={this.props.paginationOptions.hasMoreItems}
              >
                <StickyContainer className="table-area">
                  <div className="table-left" data-table="">
                    <Sticky
                      className={classNames('table-top', (selectedStudies.length > 0 ? 'sticky-selected' : 'sticky-unselected'))}
                      topOffset={-268}
                    >
                      <table className="table table-study">
                        <thead>
                          <tr className="default-cursor">
                            <th>
                              <span className={selectedStudies.length === studies.details.length ? 'sm-container checked' : 'sm-container'}>
                                <span
                                  className="input-style"
                                  onClick={() => this.toggleAllStudies(!(selectedStudies.length === studies.details.length))}
                                >
                                  <input name="all" type="checkbox" />
                                </span>
                              </span>
                            </th>
                            <th>
                              <div>
                                <span className="text-uppercase">Status</span>
                                <span className="counter">Active: {totals.details.total_active || 0}</span>
                                <span className="counter">Inactive: {totals.details.total_inactive || 0}</span>
                              </div>
                            </th>
                            <th>
                              <div>#</div>
                            </th>
                            <th>
                              <div>STUDY INFO</div>
                            </th>
                            <th>
                              <div>SITE INFO</div>
                            </th>
                            <th>
                              <div>INDICATION</div>
                            </th>
                          </tr>
                        </thead>
                      </table>
                    </Sticky>
                    <table className="table table-study">
                      <tbody>
                        {studyListLeftContents}
                      </tbody>
                    </table>
                  </div>
                  <div
                    className="table-right"
                    data-table=""
                    ref={(tableRight) => {
                      this.tableRight = tableRight;
                    }}
                  >
                    <div className="scroll-holder jcf-scrollable">
                      <div
                        className="table-inner"
                        ref={(rightDivParentHeader) => {
                          this.rightDivParentHeader = rightDivParentHeader;
                        }}
                      >
                        <Sticky
                          className={classNames('table-top', (selectedStudies.length > 0 ? 'sticky-selected' : 'sticky-unselected'))}
                          topOffset={-268}
                          ref={(rightDivHeader) => {
                            this.rightDivHeader = rightDivHeader;
                          }}
                          onStickyStateChange={this.handleStickyStateChange}
                          stickyStyle={{ left: this.state.stickyLeftOffset || 'auto' }}
                        >
                          <table className="table table-study">
                            <thead>
                              <tr className="default-cursor">
                                <th>
                                  <div>ADDRESS</div>
                                </th>
                                <th>
                                  <div>EXPOSURE LEVEL</div>
                                </th>
                                <th>
                                  <div>GOAL</div>
                                </th>
                                <th>
                                  <div>PATIENTS</div>
                                </th>
                                <th>
                                  <div>DAYS</div>
                                </th>
                                <th>
                                  <div>CAMPAIGN</div>
                                </th>
                                <th>
                                  <div>PAGE VIEWS</div>
                                </th>
                                <th>
                                  <div>FACEBOOK CLICKS</div>
                                </th>
                                <th>
                                  <div>REWARDS</div>
                                </th>
                                <th>
                                  <div>CREDITS</div>
                                </th>
                                <th>
                                  <div>TEXTS</div>
                                </th>
                                <th>
                                  <div>
                                    <span>NEW PATIENT</span>
                                    <span
                                      className="counter"
                                    >{totals.details.count_not_contacted_campaign_total || 0}</span>
                                    <span
                                      className="counter"
                                    >{totals.details.count_not_contacted_total || 0}</span>
                                  </div>
                                </th>
                                <th>
                                  <div>
                                    <span>CALL ATTEMPTED</span>
                                    <span
                                      className="counter"
                                    >{totals.details.call_attempted_campaign_total || 0}</span>
                                    <span className="counter">{totals.details.call_attempted_total || 0}</span>
                                  </div>
                                </th>
                                <th>
                                  <div>
                                    <span>NOT QUALIFIED</span>
                                    <span className="counter">{totals.details.dnq_campaign_total || 0}</span>
                                    <span className="counter">{totals.details.dnq_total || 0}</span>
                                  </div>
                                </th>
                                <th>
                                  <div>
                                    <span>ACTION NEEDED</span>
                                    <span
                                      className="counter"
                                    >{totals.details.action_needed_campaign_total || 0}</span>
                                    <span className="counter">{totals.details.action_needed_total || 0}</span>
                                  </div>
                                </th>
                                <th>
                                  <div>
                                    <span>SCHEDULED</span>
                                    <span
                                      className="counter"
                                    >{totals.details.scheduled_campaign_total || 0}</span>
                                    <span className="counter">{totals.details.scheduled_total || 0}</span>
                                  </div>
                                </th>
                                <th>
                                  <div>
                                    <span>CONSENTED</span>
                                    <span
                                      className="counter"
                                    >{totals.details.consented_campaign_total || 0}</span>
                                    <span className="counter">{totals.details.consented_total || 0}</span>
                                  </div>
                                </th>
                                <th>
                                  <div>
                                    <span>SCREEN FAILED</span>
                                    <span
                                      className="counter"
                                    >{totals.details.screen_failed_campaign_total || 0}</span>
                                    <span className="counter">{totals.details.screen_failed_total || 0}</span>
                                  </div>
                                </th>
                                <th>
                                  <div>
                                    <span>RANDOMIZED</span>
                                    <span
                                      className="counter"
                                    >{totals.details.randomized_campaign_total || 0}</span>
                                    <span className="counter">{totals.details.randomized_total || 0}</span>
                                  </div>
                                </th>
                              </tr>
                            </thead>
                          </table>
                        </Sticky>
                        <table className="table table-study">
                          <tbody>
                            {studyListRightContents}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div
                      onScroll={this.handleScroll}
                      ref={(rightDiv) => {
                        this.rightDiv = rightDiv;
                      }}
                      style={{ width: (this.state.fixedScrollWidth || 'auto') }}
                      className={classNames('dashboard-scroll-wrap', (this.state.isFixedBottomScroll ? 'dashboard-scroll-wrap-fixed' : ''))}
                    >
                      <div
                        className="dashboard-scroll-container"
                        style={{ width: (this.state.fixedScrollContainerWidth || 802) }}
                      />
                    </div>
                  </div>
                </StickyContainer>
                {studies.fetching &&
                <div className="dashboard-studies-spinner"><LoadingSpinner showOnlyIcon /></div>}
              </InfiniteScroll>
            </div>
            <EditInformationModal
              addEmailNotificationClick={this.addEmailNotificationClick}
              onClose={() => {
                this.showEditInformationModal(false);
              }}
              openModal={this.state.showEditInformationModal}
              study={selectedStudies[0]}
            />
            {this.state.showLandingPageModal &&
              (
                <LandingPageModal
                  isOnTop={this.state.landingPageOnTop}
                  onClose={() => {
                    this.showLandingPageModal(false);
                  }}
                  openModal={this.state.showLandingPageModal}
                  studies={studies.details}
                />
              )
            }
            {this.state.showThankYouPageModal &&
              (
                <ThankYouPageModal
                  isOnTop={this.state.thankYouPageOnTop}
                  onClose={() => {
                    this.showThankYouPageModal(false);
                  }}
                  openModal={this.state.showThankYouPageModal}
                  studies={studies.details}
                />
              )
            }
            {this.state.showPatientThankYouPageModal &&
              (
                <PatientThankYouEmailModal
                  isOnTop={this.state.patientThankYouEmailPageOnTop}
                  onClose={() => {
                    this.showPatientThankYouPageModal(false);
                  }}
                  openModal={this.state.showPatientThankYouPageModal}
                  studies={studies.details}
                />
              )
            }
            {this.state.showLeadGenPageModal &&
              (
                <LeadGenModal
                  onClose={() => {
                    this.showLeadGenPageModal(false);
                  }}
                  openModal={this.state.showLeadGenPageModal}
                  studies={studies.details}
                />
              )
            }
            <CampaignPageModal
              five9List={this.props.five9List}
              isOnTop={this.state.campaignPageOnTop}
              levels={this.props.levels}
              onClose={() => {
                this.showCampaignPageModal(false);
              }}
              openModal={this.state.showCampaignPageModal}
              study={selectedStudies[0]}
            />
            <CallTrackingPageModal
              onClose={() => {
                this.showCallTrackingModal(false);
              }}
              openModal={this.state.showCallTrackingModal}
              study={selectedStudies[0]}
            />
            <Modal
              className={`admin-note-modal ${this.state.hideNoteModal ? 'invisible' : ''}`}
              id="notes"
              dialogComponentClass={CenteredModal}
              show={this.state.showNoteModal}
              onHide={this.closeNoteModal}
              backdrop
              keyboard
            >
              <Modal.Header>
                <Modal.Title>{this.state.adminStudyId}</Modal.Title>
                <a className="lightbox-close close" onClick={this.closeNoteModal}>
                  <i className="icomoon-icon_close" />
                </a>
              </Modal.Header>
              <Modal.Body>
                <div className="holder clearfix">
                  <div className="form-admin-note">
                    <DashboardNoteSearch
                      studyId={this.state.adminStudyId}
                      addNote={this.props.addNote}
                      editNoteProcess={this.props.editNoteProcess}
                      hideParentModal={this.setNoteModalClass}
                    />
                    <DashboardNoteTable
                      studyId={this.state.adminStudyId}
                      tableName="Notes"
                      note={this.props.note}
                      editNoteProcess={this.props.editNoteProcess}
                      editNote={this.props.editNote}
                      deleteNote={this.props.deleteNote}
                      hideParentModal={this.setNoteModalClass}
                    />
                  </div>
                </div>
              </Modal.Body>
            </Modal>
            <Modal
              dialogComponentClass={CenteredModal}
              show={this.state.addEmailModalShow}
              onHide={this.closeAddEmailModal}
              backdrop
              keyboard
            >
              <Modal.Header>
                <Modal.Title>ADD EMAIL NOTIFICATION</Modal.Title>
                <a className="lightbox-close close" onClick={this.closeAddEmailModal}>
                  <i className="icomoon-icon_close" />
                </a>
              </Modal.Header>
              <Modal.Body>
                <AddEmailNotificationForm
                  onSubmit={this.addEmailNotificationSubmit}
                  custom={this.state.customAddEmailModal}
                />
              </Modal.Body>
            </Modal>
          </div>
        </div>
      );
    }
    // if there are no studies
    return (
      <div></div>
    );
  }
}
