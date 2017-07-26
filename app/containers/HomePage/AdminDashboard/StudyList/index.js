import classNames from 'classnames';
import _, { map, indexOf } from 'lodash';
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment-timezone';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import { defaultRanges, DateRange } from 'react-date-range';
import { Field, change } from 'redux-form';
import { StickyContainer, Sticky } from 'react-sticky';
import InfiniteScroll from 'react-infinite-scroller';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import { DashboardNoteSearch } from '../AdminDashboardNoteSearch/index';
import { DashboardNoteTable } from '../AdminDashboardNoteTable';

import ReactSelect from '../../../../components/Input/ReactSelect';
import CampaignPageModal from '../../../../components/CampaignPageModal';
import LandingPageModal from '../../../../components/LandingPageModal';
import ThankYouPageModal from '../../../../components/ThankYouPageModal/index';
import PatientThankYouEmailModal from '../../../../components/PatientThankYouEmailModal';
import CenteredModal from '../../../../components/CenteredModal';
import AddEmailNotificationForm from '../../../../components/AddEmailNotificationForm';
import EditInformationModal from '../../../../components/EditStudyForms/EditInformationModal';
import {
  selectStudies,
  selectPaginationOptions,
  selectAddNotificationProcess,
  selectDashboardEditNoteProcess,
  selectDashboardNote,
  selectStudyIndicationTags,
} from '../selectors';
import StudyLeftItem from './StudyLeftItem';
import StudyRightItem from './StudyRightItem';
import { normalizePhoneForServer, normalizePhoneDisplay } from '../../../../common/helper/functions';
import { setHoverRowIndex, setEditStudyFormValues, fetchNote, addNote, editNote, deleteNote, fetchStudyIndicationTag } from '../actions';
import { submitToClientPortal } from '../../../DashboardPortalsPage/actions';
import {
  removeCustomEmailNotification,
} from '../../../../containers/App/actions';

class StudyList extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    allClientUsers: PropTypes.object,
    addNotificationProcess: PropTypes.object,
    addEmailNotificationUser: PropTypes.func.isRequired,
    addCustomEmailNotification: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
    changeStudyStatusDashboard: PropTypes.func.isRequired,
    cro: PropTypes.array,
    editStudyValues: PropTypes.object,
    fetchAllClientUsersDashboard: PropTypes.func.isRequired,
    fetchStudyCampaignsDashboard: PropTypes.func.isRequired,
    fetchCustomNotificationEmails: PropTypes.func.isRequired,
    fetchStudyIndicationTag: PropTypes.func.isRequired,
    fetchStudiesAccordingToFilters: PropTypes.func.isRequired,
    removeCustomEmailNotification: PropTypes.func.isRequired,
    indications: PropTypes.array,
    allCustomNotificationEmails: PropTypes.object,
    levels: PropTypes.array,
    messagingNumbers: PropTypes.object,
    paginationOptions: PropTypes.object,
    protocols: PropTypes.array,
    sponsors: PropTypes.array,
    siteLocations: PropTypes.array,
    studies: PropTypes.object,
    studyUpdateProcess: PropTypes.object,
    toggleStudy: PropTypes.func,
    totals: PropTypes.object,
    updateDashboardStudy: PropTypes.func.isRequired,
    usersByRoles: PropTypes.object,
    setHoverRowIndex: PropTypes.func,
    setEditStudyFormValues: PropTypes.func,
    filtersFormValues: PropTypes.object,
    submitToClientPortal: PropTypes.func,
    fetchNote: PropTypes.func,
    note: PropTypes.object,
    addNote: PropTypes.func,
    editNote: PropTypes.func,
    deleteNote: PropTypes.func,
    editNoteProcess: PropTypes.object,
    studyIndicationTags: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.toggleAllstudies = this.toggleAllstudies.bind(this);
    this.toggleStudy = this.toggleStudy.bind(this);
    this.changeStudyStatus = this.changeStudyStatus.bind(this);
    this.activateStudies = this.activateStudies.bind(this);
    this.deactivateStudies = this.deactivateStudies.bind(this);
    this.adSetStudies = this.adSetStudies.bind(this);
    this.historyStudies = this.historyStudies.bind(this);
    this.sortBy = this.sortBy.bind(this);
    this.loadItems = this.loadItems.bind(this);
    this.showDateRangeModal = this.showDateRangeModal.bind(this);
    this.hideDateRangeModal = this.hideDateRangeModal.bind(this);
    this.showEditInformationModal = this.showEditInformationModal.bind(this);
    this.showLandingPageModal = this.showLandingPageModal.bind(this);
    this.showThankYouPageModal = this.showThankYouPageModal.bind(this);
    this.showPatientThankYouPageModal = this.showPatientThankYouPageModal.bind(this);
    this.showCampaignPageModal = this.showCampaignPageModal.bind(this);
    this.changeRange = this.changeRange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.campaignChanged = this.campaignChanged.bind(this);
    this.updateStudy = this.updateStudy.bind(this);

    this.addEmailNotificationClick = this.addEmailNotificationClick.bind(this);
    this.closeAddEmailModal = this.closeAddEmailModal.bind(this);
    this.addEmailNotificationSubmit = this.addEmailNotificationSubmit.bind(this);
    this.setEditStudyFormValues = this.setEditStudyFormValues.bind(this);

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
        startDate: moment().clone().subtract(30, 'days'),
        endDate: moment(),
      },
      customAddEmailModal: false,
      showEditInformationModal: false,
      showLandingPageModal: false,
      showThankYouPageModal: false,
      showPatientThankYouPageModal: false,
      showCampaignPageModal: false,
      studies: bindSelection(props.studies),
      selectedAllStudies: false,
      selectedStudyCount: 0,
      editStudyInitValues: {},
      addEmailModalShow: false,
      isFixedBottomScroll: false,
      fixedScrollWidth: false,
      fixedScrollContainerWidth: 2891,

      stickyLeftOffset: false,

      showNoteModal: false,
      hideNoteModal: false,
      adminSiteId: null,
      adminSiteName: null,
    };
  }

  componentWillMount() {
    this.props.fetchNote();
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleBodyScroll);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.filtersFormValues && newProps.filtersFormValues !== this.props.filtersFormValues) {
      this.toggleAllstudies(false);
    }
    if (this.props.studies.details !== newProps.studies.details) {
      this.setState({
        studies: bindSelection(newProps.studies),
      });
    }
    if (this.props.studyUpdateProcess.saving && !newProps.studyUpdateProcess.saving) {
      this.showEditInformationModal(false);
      this.setEditStudyFormValues(newProps.studyUpdateProcess.study);
    }
    if (this.props.addNotificationProcess.saving && !newProps.addNotificationProcess.saving && newProps.addNotificationProcess.savedUser) {
      let addFields = this.props.editStudyValues.emailNotifications;
      const values = {
        firstName: newProps.addNotificationProcess.savedUser.firstName,
        lastName: newProps.addNotificationProcess.savedUser.lastName,
        userId: newProps.addNotificationProcess.savedUser.id,
        isChecked: true,
      };
      if (!addFields) {
        addFields = [values];
      } else {
        addFields.push(values);
      }
      const { change } = this.props;
      change('dashboardEditStudyForm', 'emailNotifications', addFields);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleBodyScroll);
  }

  setNoteModalClass(hidden = false) {
    this.setState({ hideNoteModal: hidden });
  }

  setEditStudyFormValues(study) {
    const formValues = _.cloneDeep(study);
    formValues.recruitment_phone = normalizePhoneDisplay(formValues.recruitment_phone);
    formValues.site_location_form = study.site_id;
    formValues.messagingNumber = study.text_number_id;

    this.props.setEditStudyFormValues(formValues);

    this.props.fetchCustomNotificationEmails(study.study_id);
    this.props.fetchStudyIndicationTag(study.study_id);
    console.log('***fetching indication tag***');
    this.props.fetchAllClientUsersDashboard({ clientId: study.client_id, siteId: study.site_id });
    this.props.fetchStudyCampaignsDashboard(study.study_id);
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
        this.setState({ isFixedBottomScroll: true, fixedScrollWidth: this.tableRight.clientWidth, fixedScrollContainerWidth: (2891 + this.tableRight.clientWidth) });
      }
    }
  }

  toggleAllstudies(checked) {
    const studies = map(this.state.studies, (study) => ({
      ...study,
      selected: checked,
    }));

    this.setState({
      selectedAllStudies: checked,
      studies,
      selectedStudyCount: checked === true ? studies.length : 0,
    });
  }

  toggleStudy(studyId, checked) {
    this.props.toggleStudy(studyId, checked);
    this.showEditInformationModal(false);

    let selectedAllStudies = true;
    let selectedStudyCount = 0;
    let selectedStudy = null;
    const studies = map(this.state.studies, (study) => {
      const c = study.study_id === studyId ? checked : study.selected;
      selectedAllStudies = selectedAllStudies && c;
      if (c === true) {
        selectedStudyCount++;
        selectedStudy = study;
      }
      return {
        ...study,
        selected: c,
      };
    });

    if (selectedStudyCount === 1) {
      this.setEditStudyFormValues(selectedStudy);
      /* this.setState({ editStudyInitValues: {
        initialValues: {
          ...selectedStudy,
          site_location_form: selectedStudy.site_id,
        },
      } });*/
    }

    this.setState({
      selectedAllStudies,
      studies,
      selectedStudyCount,
    });
  }

  changeStudyStatus(studyIds, status) {
    const studies = map(this.state.studies, (study) => {
      const studyId = study.studyInfo.id;
      const hasStudy = indexOf(studyIds, studyId) > -1;
      if (hasStudy) {
        return {
          ...study,
          status: status ? 'active' : 'deactive',
        };
      }
      return study;
    });

    this.setState({
      studies,
    });
  }

  activateStudies() {
    const selectedStudies = [];
    _.forEach(this.state.studies, (study) => {
      if (study.selected) {
        selectedStudies.push(study.study_id);
      }
    });

    this.props.changeStudyStatusDashboard(selectedStudies, 'active', true);
  }

  deactivateStudies() {
    const selectedStudies = [];
    _.forEach(this.state.studies, (study) => {
      if (study.selected) {
        selectedStudies.push(study.study_id);
      }
    });

    this.props.changeStudyStatusDashboard(selectedStudies, 'inactive', true);
  }

  adSetStudies() {
  }

  historyStudies() {
  }

  loadItems() {
    this.props.fetchStudiesAccordingToFilters(null, null, true);
    // this.props.searchPatients(this.props.paginationOptions.prevSearchFilter, false);
  }

  sortBy(ev) {
    ev.preventDefault();
    // let sort = ev.currentTarget.dataset.sort;
    // let direction = 'up';

    // if (ev.currentTarget.className && ev.currentTarget.className.indexOf('up') !== -1) {
    //   direction = 'down';
    // } else if (ev.currentTarget.className && ev.currentTarget.className.indexOf('down') !== -1) {
    //   direction = null;
    //   sort = null;
    // }

    // this.props.setActiveSort(sort, direction);

    // if (sort !== 'orderNumber') {
    //   this.props.searchPatients({ ...this.props.paginationOptions.prevSearchFilter, sort, direction }, true);
    // } else {
    //   const dir = ((direction === 'down') ? 'desc' : 'asc');
    //   const sortedPatients = _.orderBy(this.props.studies.details, [function (o) {
    //     return o.orderNumber;
    //   }], [dir]);
    //   this.props.sortPatientsSuccess(sortedPatients);
    // }
  }

  showDateRangeModal() {
    this.setState({ showDateRangeModal: true });
  }

  hideDateRangeModal() {
    this.setState({ showDateRangeModal: false });
  }

  handleChange(which, payload) {
    this.setState({
      [which] : payload,
    });
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
        showCampaignPageModal: false,
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
        showCampaignPageModal: false,
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
        showCampaignPageModal: false,
      });
    } else {
      this.setState({
        showPatientThankYouPageModal: false,
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
        showCampaignPageModal: false,
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
        showCampaignPageModal: true,
      });
    } else {
      this.setState({
        showCampaignPageModal: false,
      });
    }
  }

  campaignChanged(e) {
    const { change } = this.props;
    change('dashboardFilters', 'campaign', e);
    this.toggleAllstudies(false);
    this.props.fetchStudiesAccordingToFilters(e, 'campaign');
  }

  updateStudy(params) {
    const newParam = Object.assign({}, params);
    newParam.recruitment_phone = normalizePhoneForServer(params.recruitment_phone);
    this.props.updateDashboardStudy(newParam);
  }

  addEmailNotificationClick(custom = false) {
    this.setState({ addEmailModalShow: true, customAddEmailModal: custom });
  }

  closeAddEmailModal(custom = false) {
    this.setState({ addEmailModalShow: false, customAddEmailModal: custom });
  }

  addEmailNotificationSubmit(values) {
    const { addEmailNotificationUser, addCustomEmailNotification } = this.props;
    const { customAddEmailModal } = this.state;
    if (!customAddEmailModal) {
      addEmailNotificationUser({
        ...values,
        clientId: this.props.editStudyValues.client_id,
        addForNotification: true,
        studyId: this.props.editStudyValues.study_id,
        clientRole:{
          siteId: this.props.editStudyValues.site_id,
        },
      });
    } else {
      addCustomEmailNotification({
        ...values,
        type: 'inactive',
        clientId: this.props.editStudyValues.client_id,
        studyId: this.props.editStudyValues.study_id,
        siteId: this.props.editStudyValues.site_id,
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

  showNoteModal(siteId, siteName) {
    this.setState({
      showNoteModal: true,
      adminSiteId: siteId,
      adminSiteName: siteName,
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
      if (dateRange.startDate.isSameOrAfter(dateRange.endDate, 'day')) {
        return (
          <span className="time">
            {moment(dateRange.startDate).format(format)}
          </span>
        );
      }
      return (
        <span className="time">
          {moment(dateRange.startDate).format(format)} - {moment(dateRange.endDate).format(format)}
        </span>
      );
    }
    return null;
  }

  render() {
    const { studies, selectedStudyCount, selectedAllStudies } = this.state;

    const studyListLeftContents = studies.map((item, index) =>
      <StudyLeftItem
        item={item}
        key={index}
        id={index}
        onSelectStudy={this.toggleStudy}
        onStatusChange={this.changeStudyStatus}
        showNoteModal={this.showNoteModal}
        changeStudyStatusDashboard={this.props.changeStudyStatusDashboard}
        setHoverRowIndex={this.props.setHoverRowIndex}
        submitToClientPortal={this.props.submitToClientPortal}
      />
    );
    const studyListRightContents = studies.map((item, index) =>
      <StudyRightItem
        item={item}
        key={index}
        setHoverRowIndex={this.props.setHoverRowIndex}
        filtersFormValues={this.props.filtersFormValues}
      />
    );


    const maxCampaignCount = this.props.totals.details ? parseInt(this.props.totals.details.max_campaign_count) : 0;

    let campaignOptions = [];
    for (let i = 1; i <= maxCampaignCount; i++) {
      if (i === 1) {
        campaignOptions.push({ label: '1', value: 1 });
      } else {
        campaignOptions.push({ label: i, value: i });
      }
    }
    campaignOptions.push({ label: 'Current', value: 'current' });

    campaignOptions = campaignOptions.reverse();

    const selectedStudies = studies.filter(s => s.selected);

    return (
      <div>
        {(() => {
          if (this.props.studies.details.length > 0) {
            return (
              <div className={classNames({ 'btns-active' : selectedStudyCount > 0 })}>
                { selectedStudyCount > 0 &&
                <Sticky className={classNames('clearfix', 'top-head', 'top-head-fixed', 'active')} topOffset={-268}>
                  <strong className="title"><span className="studies-counter"> { selectedStudyCount }</span> <span className="text" data-one="STUDY" data-two="STUDIES"> SELECTED</span></strong>
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
                    {
                      selectedStudyCount === 1 &&
                      <Button
                        bsStyle="primary"
                        className="pull-left"
                        data-class="btn-deactivate"
                        onClick={() => this.showLandingPageModal(true)}
                      > Landing Page </Button>
                    }
                    {
                      selectedStudyCount === 1 &&
                      <Button
                        bsStyle="primary"
                        className="pull-left"
                        data-class="btn-deactivate"
                        onClick={() => this.showThankYouPageModal(true)}
                      > Thank You Page </Button>
                    }
                    {
                      selectedStudyCount === 1 &&
                      <Button
                        bsStyle="primary"
                        className="pull-left"
                        data-class="btn-deactivate"
                        onClick={() => this.showPatientThankYouPageModal(true)}
                      > Patient Thank You Email </Button>
                    }
                    {
                      selectedStudyCount === 1 &&
                      <Button
                        bsStyle="primary"
                        className="pull-left"
                        data-class="btn-deactivate"
                        onClick={() => this.showCampaignPageModal(true)}
                      > Campaign </Button>
                    }
                    {
                      selectedStudyCount === 1 &&
                      <Button
                        bsStyle="primary"
                        className="pull-left"
                        data-class="btn-deactivate"
                        onClick={() => this.showEditInformationModal(true)}
                      > Info </Button>
                    }
                    {
                      selectedStudyCount === 1 &&
                      <Button
                        bsStyle="primary"
                        className="pull-left"
                        data-class="btn-deactivate"
                        onClick={this.adSetStudies}
                      > Ad Set </Button>
                    }
                    {
                      selectedStudyCount === 1 &&
                      <Button
                        bsStyle="primary"
                        className="pull-left"
                        data-class="btn-deactivate"
                        onClick={this.historyStudies}
                      > History </Button>
                    }
                  </div>
                </Sticky>
                }
                <div className="study-tables fixed-top">
                  <div className="head">
                    <h2 className="pull-left">{this.props.totals.details.total_studies || 0} STUDIES</h2>
                    <div className="btns pull-right">
                      <div className="select pull-left">
                        <Field
                          name="data-search"
                          className="data-search"
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
                        onClick={() => { this.showDateRangeModal(); }}
                      >
                        <i className="icomoon-icon_calendar" />
                        &nbsp;Date Range
                      </Button>
                      <Button
                        bsStyle="primary"
                        className="pull-left"
                        onClick={() => {}}
                      >
                        <i className="icomoon-icon_download" />
                        &nbsp;Download
                      </Button>
                    </div>
                    <Modal
                      id="date-range"
                      className="date-range-modal"
                      dialogComponentClass={CenteredModal}
                      show={this.state.showDateRangeModal}
                      onHide={() => { this.hideDateRangeModal(); }}
                      backdrop
                      keyboard
                    >
                      <Modal.Header>
                        <Modal.Title>Date Range</Modal.Title>
                        <a className="lightbox-close close" onClick={() => { this.hideDateRangeModal(); }}>
                          <i className="icomoon-icon_close" />
                        </a>
                      </Modal.Header>
                      <Modal.Body>
                        <DateRange
                          linkedCalendars
                          ranges={defaultRanges}
                          startDate={this.state.dateRange.startDate ? this.state.dateRange.startDate : moment()}
                          endDate={this.state.dateRange.endDate ? this.state.dateRange.endDate : moment().add(1, 'M')}
                          onInit={this.handleChange}
                          onChange={this.handleChange}
                        />
                        <div className="dateRange-helper">
                          <div className="emit-border"><br /></div>
                          <div className="right-part">
                            <div className="btn-block text-right">
                              {this.renderDateFooter()}
                              <Button onClick={() => { this.changeRange(); }}>
                                Submit
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Modal.Body>
                    </Modal>
                  </div>
                  <InfiniteScroll
                    className="test-test"
                    pageStart={0}
                    loadMore={this.loadItems}
                    initialLoad={false}
                    hasMore={this.props.paginationOptions.hasMoreItems}
                    loader={<LoadingSpinner showOnlyIcon />}
                  >
                    <StickyContainer className="table-area">
                      <div className="table-left" data-table="">
                        <Sticky className={classNames('table-top', (selectedStudyCount > 0 ? 'sticky-selected' : 'sticky-unselected'))} topOffset={-270}>
                          <table className="table table-study">
                            <thead>
                              <tr className="default-cursor">
                                <th>
                                  <span className={selectedAllStudies ? 'sm-container checked' : 'sm-container'}>
                                    <span className="input-style" onClick={() => this.toggleAllstudies(!selectedAllStudies)}>
                                      <input name="all" type="checkbox" />
                                    </span>
                                  </span>
                                </th>
                                <th>
                                  <div>
                                    <span className="text-uppercase">Status</span>
                                    <span className="counter">Active: {this.props.totals.details.total_active || 0}</span>
                                    <span className="counter">Inactive: {this.props.totals.details.total_inactive || 0}</span>
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
                              className={classNames('table-top', (selectedStudyCount > 0 ? 'sticky-selected' : 'sticky-unselected'))} topOffset={-270}
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
                                        <span className="counter">{this.props.totals.details.count_not_contacted_campaign_total || 0}</span>
                                        <span className="counter">{this.props.totals.details.count_not_contacted_total || 0}</span>
                                      </div>
                                    </th>
                                    <th>
                                      <div>
                                        <span>CALL ATTEMPTED</span>
                                        <span className="counter">{this.props.totals.details.call_attempted_campaign_total || 0}</span>
                                        <span className="counter">{this.props.totals.details.call_attempted_total || 0}</span>
                                      </div>
                                    </th>
                                    <th>
                                      <div>
                                        <span>NOT QUALIFIED</span>
                                        <span className="counter">{this.props.totals.details.dnq_campaign_total || 0}</span>
                                        <span className="counter">{this.props.totals.details.dnq_total || 0}</span>
                                      </div>
                                    </th>
                                    <th>
                                      <div>
                                        <span>ACTION NEEDED</span>
                                        <span className="counter">{this.props.totals.details.action_needed_campaign_total || 0}</span>
                                        <span className="counter">{this.props.totals.details.action_needed_total || 0}</span>
                                      </div>
                                    </th>
                                    <th>
                                      <div>
                                        <span>SCHEDULED</span>
                                        <span className="counter">{this.props.totals.details.scheduled_campaign_total || 0}</span>
                                        <span className="counter">{this.props.totals.details.scheduled_total || 0}</span>
                                      </div>
                                    </th>
                                    <th>
                                      <div>
                                        <span>CONSENTED</span>
                                        <span className="counter">{this.props.totals.details.consented_campaign_total || 0}</span>
                                        <span className="counter">{this.props.totals.details.consented_total || 0}</span>
                                      </div>
                                    </th>
                                    <th>
                                      <div>
                                        <span>RANDOMIZED</span>
                                        <span className="counter">{this.props.totals.details.randomized_campaign_total || 0}</span>
                                        <span className="counter">{this.props.totals.details.randomized_total || 0}</span>
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
                          <div className="dashboard-scroll-container" style={{ width: (this.state.fixedScrollContainerWidth || 802) }} />
                        </div>
                      </div>
                    </StickyContainer>
                    { this.props.studies.fetching && <div className="dashboard-studies-spinner"><LoadingSpinner showOnlyIcon /></div> }
                  </InfiniteScroll>
                </div>
                <EditInformationModal
                  {...this.state.editStudyInitValues}
                  onSubmit={this.updateStudy}
                  openModal={this.state.showEditInformationModal}
                  onClose={() => { this.showEditInformationModal(false); }}
                  usersByRoles={this.props.usersByRoles}
                  siteLocations={this.props.siteLocations}
                  study={this.state.studies[0]}
                  sponsors={this.props.sponsors}
                  protocols={this.props.protocols}
                  cro={this.props.cro}
                  indications={this.props.indications}
                  fetchAllClientUsersDashboard={this.props.fetchAllClientUsersDashboard}
                  allClientUsers={this.props.allClientUsers}
                  allCustomNotificationEmails={this.props.allCustomNotificationEmails}
                  removeCustomEmailNotification={this.props.removeCustomEmailNotification}
                  formValues={this.props.editStudyValues}
                  addEmailNotificationClick={this.addEmailNotificationClick}
                  messagingNumbers={this.props.messagingNumbers}
                  isOnTop={this.state.editStudyPageOnTop}
                  setEditStudyFormValues={this.props.setEditStudyFormValues}
                  studyUpdateProcess={this.props.studyUpdateProcess}
                  studyIndicationTags={this.props.studyIndicationTags}
                />
                <LandingPageModal
                  openModal={this.state.showLandingPageModal}
                  studies={this.state.studies}
                  onClose={() => { this.showLandingPageModal(false); }}
                  isOnTop={this.state.landingPageOnTop}
                />
                <ThankYouPageModal
                  openModal={this.state.showThankYouPageModal}
                  studies={this.state.studies}
                  onClose={() => { this.showThankYouPageModal(false); }}
                  isOnTop={this.state.thankYouPageOnTop}
                />
                <PatientThankYouEmailModal
                  openModal={this.state.showPatientThankYouPageModal}
                  studies={this.state.studies}
                  onClose={() => { this.showPatientThankYouPageModal(false); }}
                  isOnTop={this.state.patientThankYouEmailPageOnTop}
                />
                <CampaignPageModal
                  study={selectedStudies[0]}
                  openModal={this.state.showCampaignPageModal}
                  onClose={() => { this.showCampaignPageModal(false); }}
                  isOnTop={this.state.campaignPageOnTop}
                  levels={this.props.levels}
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
                    <Modal.Title>{this.state.adminSiteName}</Modal.Title>
                    <a className="lightbox-close close" onClick={this.closeNoteModal}>
                      <i className="icomoon-icon_close" />
                    </a>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="holder clearfix">
                      <div className="form-admin-note">
                        <DashboardNoteSearch
                          siteId={this.state.adminSiteId}
                          addNote={this.props.addNote}
                          editNoteProcess={this.props.editNoteProcess}
                          hideParentModal={this.setNoteModalClass}
                        />
                        <DashboardNoteTable
                          siteId={this.state.adminSiteId}
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
            );
          }
          return false;
        })()}
      </div>
    );
  }
}

const bindSelection = (studies) =>
  map(studies.details, (study) => ({
    ...study,
    selected: study.selected || false,
  }));

const mapStateToProps = createStructuredSelector({
  studies: selectStudies(),
  paginationOptions: selectPaginationOptions(),
  addNotificationProcess: selectAddNotificationProcess(),
  note: selectDashboardNote(),
  editNoteProcess: selectDashboardEditNoteProcess(),
  studyIndicationTags: selectStudyIndicationTags(),
});

const mapDispatchToProps = (dispatch) => ({
  change: (formName, name, value) => dispatch(change(formName, name, value)),
  setHoverRowIndex: (index) => dispatch(setHoverRowIndex(index)),
  setEditStudyFormValues: (values) => dispatch(setEditStudyFormValues(values)),
  submitToClientPortal: (id) => dispatch(submitToClientPortal(id)),
  fetchNote: () => dispatch(fetchNote()),
  addNote: (payload) => dispatch(addNote(payload)),
  removeCustomEmailNotification: (payload) => dispatch(removeCustomEmailNotification(payload)),
  editNote: (payload) => dispatch(editNote(payload)),
  deleteNote: (payload) => dispatch(deleteNote(payload)),
  fetchStudyIndicationTag: (studyId) => dispatch(fetchStudyIndicationTag(studyId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StudyList);
