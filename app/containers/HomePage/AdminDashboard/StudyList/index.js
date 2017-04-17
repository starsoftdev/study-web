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

import ReactSelect from '../../../../components/Input/ReactSelect';
import LandingPageModal from '../../../../components/LandingPageModal';
import ThankYouPageModal from '../../../../components/ThankYouPageModal';
import PatientThankYouEmailModal from '../../../../components/PatientThankYouEmailModal';
import CenteredModal from '../../../../components/CenteredModal';
import AddEmailNotificationForm from '../../../../components/AddEmailNotificationForm';
import EditInformationModal from '../EditStudyForms/EditInformationModal';
import { selectStudies, selectPaginationOptions, selectAddNotificationProcess } from '../selectors';
import StudyLeftItem from './StudyLeftItem';
import StudyRightItem from './StudyRightItem';
import { normalizePhoneForServer, normalizePhoneDisplay } from '../../../../common/helper/functions';
import { setHoverRowIndex } from '../actions';
class StudyList extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    allClientUsers: PropTypes.object,
    addNotificationProcess: PropTypes.object,
    addEmailNotificationUser: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
    changeStudyStatusDashboard: PropTypes.func.isRequired,
    cro: PropTypes.array,
    editStudyValues: PropTypes.object,
    fetchAllClientUsersDashboard: PropTypes.func.isRequired,
    fetchStudyCampaignsDashboard: PropTypes.func.isRequired,
    fetchStudiesAccordingToFilters: PropTypes.func.isRequired,
    indications: PropTypes.array,
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


    this.state = {
      showDateRangeModal: false,
      rangePicker : {},
      datePicker : null,
      firstDayOfWeek : null,
      dateRange : {
        startDate: moment().clone().subtract(30, 'days'),
        endDate: moment(),
      },
      showEditInformationModal: false,
      showLandingPageModal: false,
      showThankYouPageModal: false,
      showPatientThankYouPageModal: false,
      studies: bindSelection(props.studies),
      selectedAllStudies: false,
      selectedStudyCount: 0,
      editStudyInitValues: {},
      addEmailModalShow: false,
      isFixedBottomScroll: false,
      fixedScrollWidth: false,

      openedPages: [],
      landingPageOnTop: false,
      thankYouPageOnTop: false,
      patientThankYouEmailPageOnTop: false,
      editStudyPageOnTop: false,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleBodyScroll);
  }

  componentWillReceiveProps(newProps) {
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

  setEditStudyFormValues(study) {
    const { change } = this.props;
    _.forEach(study, (item, key) => {
      if (key === 'recruitment_phone') {
        change('dashboardEditStudyForm', key, normalizePhoneDisplay(item));
      } else {
        change('dashboardEditStudyForm', key, item);
      }
    });
    change('dashboardEditStudyForm', 'site_location_form', study.site_id);
    change('dashboardEditStudyForm', 'messagingNumber', study.text_number_id);

    this.props.fetchAllClientUsersDashboard({ clientId: study.client_id, siteId: study.site_id });
    this.props.fetchStudyCampaignsDashboard(study.study_id);
  }

  handleScroll(event) {
    const scrollLeft = event.target.scrollLeft;

    this.rightDivHeader.scrollLeft = scrollLeft;
  }

  handleBodyScroll(event) {
    const scrollTop = event.target.scrollingElement.scrollTop;
    const scrollHeight = event.target.scrollingElement.scrollHeight;

    if ((window.innerHeight + scrollTop < 1130) || (scrollHeight - window.innerHeight - scrollTop < 80)) {
      if (this.state.isFixedBottomScroll) {
        this.setState({ isFixedBottomScroll: false });
      }
    } else if (!this.state.isFixedBottomScroll || this.state.fixedScrollWidth !== this.tableRight.clientWidth) {
      this.setState({ isFixedBottomScroll: true, fixedScrollWidth: this.tableRight.clientWidth });
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
    const pages = this.state.openedPages;
    if (visible) {
      pages.push('landingPageOnTop');
      this.setState({
        showLandingPageModal: visible,
        landingPageOnTop: visible,
        thankYouPageOnTop: false,
        patientThankYouEmailPageOnTop: false,
        editStudyPageOnTop: false,

        openedPages: pages,
      });
    } else {
      pages.pop();
      this.setState({
        showLandingPageModal: visible,
        landingPageOnTop: visible,
        [pages[(pages.length - 1)]]: true,

        openedPages: pages,
      });
    }
  }

  showThankYouPageModal(visible) {
    const pages = this.state.openedPages;
    if (visible) {
      pages.push('thankYouPageOnTop');
      this.setState({
        showThankYouPageModal: visible,
        landingPageOnTop: false,
        thankYouPageOnTop: visible,
        patientThankYouEmailPageOnTop: false,
        editStudyPageOnTop: false,

        openedPages: pages,
      });
    } else {
      pages.pop();
      this.setState({
        showThankYouPageModal: visible,
        thankYouPageOnTop: visible,
        [pages[(pages.length - 1)]]: true,

        openedPages: pages,
      });
    }
  }

  showPatientThankYouPageModal(visible) {
    const pages = this.state.openedPages;
    if (visible) {
      pages.push('patientThankYouEmailPageOnTop');
      this.setState({
        showPatientThankYouPageModal: visible,
        landingPageOnTop: false,
        thankYouPageOnTop: false,
        patientThankYouEmailPageOnTop: visible,
        editStudyPageOnTop: false,

        openedPages: pages,
      });
    } else {
      pages.pop();
      this.setState({
        showPatientThankYouPageModal: visible,
        patientThankYouEmailPageOnTop: visible,
        [pages[(pages.length - 1)]]: true,

        openedPages: pages,
      });
    }
  }

  showEditInformationModal(visible) {
    const pages = this.state.openedPages;
    if (visible) {
      pages.push('editStudyPageOnTop');
      this.setState({
        showEditInformationModal: visible,
        landingPageOnTop: false,
        thankYouPageOnTop: false,
        patientThankYouEmailPageOnTop: false,
        editStudyPageOnTop: visible,

        openedPages: pages,
      });
    } else {
      pages.pop();
      this.setState({
        showEditInformationModal: visible,
        editStudyPageOnTop: visible,
        [pages[(pages.length - 1)]]: true,

        openedPages: pages,
      });
    }
    // change('dashboardEditStudyForm', 'messagingNumber', this.props.editStudyValues.text_number_id);
  }

  campaignChanged(e) {
    const { change } = this.props;
    change('dashboardFilters', 'campaign', e);
    this.props.fetchStudiesAccordingToFilters(e, 'campaign');
  }

  updateStudy(params) {
    const newParam = Object.assign({}, params);
    newParam.recruitment_phone = normalizePhoneForServer(params.recruitment_phone);
    this.props.updateDashboardStudy(newParam);
  }

  addEmailNotificationClick() {
    this.setState({ addEmailModalShow: true });
    // this.props.onHide(true);
  }

  closeAddEmailModal() {
    this.setState({ addEmailModalShow: false });
    // this.props.onShow();
  }

  addEmailNotificationSubmit(values) {
    this.props.addEmailNotificationUser({
      ...values,
      clientId: this.props.editStudyValues.client_id,
      addForNotification: true,
      studyId: this.props.editStudyValues.study_id,
      clientRole:{
        siteId: this.props.editStudyValues.site_id,
      },
    });

    this.closeAddEmailModal();
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
        onSelectStudy={this.toggleStudy}
        onStatusChange={this.changeStudyStatus}
        changeStudyStatusDashboard={this.props.changeStudyStatusDashboard}
        setHoverRowIndex={this.props.setHoverRowIndex}
      />
    );
    const studyListRightContents = studies.map((item, index) =>
      <StudyRightItem
        item={item}
        key={index}
        setHoverRowIndex={this.props.setHoverRowIndex}
      />
    );


    const maxCampaignCount = this.props.totals.details.max_campaign_count ? parseInt(this.props.totals.details.max_campaign_count) : 0;

    let campaignOptions = [];
    for (let i = 1; i <= maxCampaignCount; i++) {
      if (i === 1) {
        campaignOptions.push({ label: 'Oldest', value: 'oldest' });
      } else if (i === maxCampaignCount) {
        campaignOptions.push({ label: 'Newest', value: 'newest' });
      } else {
        campaignOptions.push({ label: i, value: i });
      }
    }

    campaignOptions = campaignOptions.reverse();

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
                        onClick={() => this.showEditInformationModal(true)}
                      > Edit </Button>
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
                          placeholder="Campaign"
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
                    loader={<span>Loading...</span>}
                  >
                    <StickyContainer className="table-area">
                      <div className="table-left" data-table="">
                        <Sticky className={classNames('table-top', (selectedStudyCount > 0 ? 'sticky-selected' : 'sticky-unselected'))} topOffset={-270}>
                          <table className="table table-study">
                            <thead>
                              <tr>
                                <th>
                                  <span className={selectedAllStudies ? 'sm-container checked' : 'sm-container'}>
                                    <span className="input-style" onClick={() => this.toggleAllstudies(!selectedAllStudies)}>
                                      <input name="all" type="checkbox" />
                                    </span>
                                  </span>
                                </th>
                                <th>
                                  <div>
                                    <span className="text-uppercase">Status <i className="caret-arrow" /></span>
                                    <span className="counter">Active: {this.props.totals.details.total_active || 0}</span>
                                    <span className="counter">Inactive: {this.props.totals.details.total_inactive || 0}</span>
                                  </div>
                                </th>
                                <th>
                                  <div onClick={this.sortBy} data-sort="orderNumber" className={`${(this.props.paginationOptions.activeSort === 'orderNumber') ? this.props.paginationOptions.activeDirection : ''}`}>#<i className="caret-arrow" /></div>
                                </th>
                                <th>
                                  <div onClick={this.sortBy} data-sort="studyInfo" className={`${(this.props.paginationOptions.activeSort === 'studyInfo') ? this.props.paginationOptions.activeDirection : ''}`}>STUDY INFO<i className="caret-arrow" /></div>
                                </th>
                                <th>
                                  <div onClick={this.sortBy} data-sort="siteInfo" className={`${(this.props.paginationOptions.activeSort === 'siteInfo') ? this.props.paginationOptions.activeDirection : ''}`}>SITE INFO<i className="caret-arrow" /></div>
                                </th>
                                <th>
                                  <div onClick={this.sortBy} data-sort="indication" className={`${(this.props.paginationOptions.activeSort === 'indication') ? this.props.paginationOptions.activeDirection : ''}`}>INDICATION<i className="caret-arrow" /></div>
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
                            ref={(rightDivHeader) => {
                              this.rightDivHeader = rightDivHeader;
                            }}
                          >
                            <Sticky className={classNames('table-top', (selectedStudyCount > 0 ? 'sticky-selected' : 'sticky-unselected'))} topOffset={-270}>
                              <table className="table table-study">
                                <thead>
                                  <tr>
                                    <th>
                                      <div onClick={this.sortBy} data-sort="location" className={`${(this.props.paginationOptions.activeSort === 'location') ? this.props.paginationOptions.activeDirection : ''}`}>LOCATION<i className="caret-arrow" /></div>
                                    </th>
                                    <th>
                                      <div onClick={this.sortBy} data-sort="exposureLevel" className={`${(this.props.paginationOptions.activeSort === 'exposureLevel') ? this.props.paginationOptions.activeDirection : ''}`}>EXPOSURE LEVEL<i className="caret-arrow" /></div>
                                    </th>
                                    <th>
                                      <div onClick={this.sortBy} data-sort="goal" className={`${(this.props.paginationOptions.activeSort === 'goal') ? this.props.paginationOptions.activeDirection : ''}`}>GOAL<i className="caret-arrow" /></div>
                                    </th>
                                    <th>
                                      <div onClick={this.sortBy} data-sort="patients" className={`${(this.props.paginationOptions.activeSort === 'patients') ? this.props.paginationOptions.activeDirection : ''}`}>PATIENTS<i className="caret-arrow" /></div>
                                    </th>
                                    <th>
                                      <div onClick={this.sortBy} data-sort="days" className={`${(this.props.paginationOptions.activeSort === 'days') ? this.props.paginationOptions.activeDirection : ''}`}>DAYS<i className="caret-arrow" /></div>
                                    </th>
                                    <th>
                                      <div onClick={this.sortBy} data-sort="campaign" className={`${(this.props.paginationOptions.activeSort === 'campaign') ? this.props.paginationOptions.activeDirection : ''}`}>CAMPAIGN<i className="caret-arrow" /></div>
                                    </th>
                                    <th>
                                      <div onClick={this.sortBy} data-sort="pageViews" className={`${(this.props.paginationOptions.activeSort === 'pageViews') ? this.props.paginationOptions.activeDirection : ''}`}>PAGE VIEWS<i className="caret-arrow" /></div>
                                    </th>
                                    <th>
                                      <div onClick={this.sortBy} data-sort="facebook" className={`${(this.props.paginationOptions.activeSort === 'facebook') ? this.props.paginationOptions.activeDirection : ''}`}>FACEBOOK CLICKS<i className="caret-arrow" /></div>
                                    </th>
                                    <th>
                                      <div onClick={this.sortBy} data-sort="rewards" className={`${(this.props.paginationOptions.activeSort === 'rewards') ? this.props.paginationOptions.activeDirection : ''}`}>REWARDS<i className="caret-arrow" /></div>
                                    </th>
                                    <th>
                                      <div onClick={this.sortBy} data-sort="credits" className={`${(this.props.paginationOptions.activeSort === 'credits') ? this.props.paginationOptions.activeDirection : ''}`}>CREDITS<i className="caret-arrow" /></div>
                                    </th>
                                    <th>
                                      <div onClick={this.sortBy} data-sort="texts" className={`${(this.props.paginationOptions.activeSort === 'texts') ? this.props.paginationOptions.activeDirection : ''}`}>TEXTS<i className="caret-arrow" /></div>
                                    </th>
                                    <th>
                                      <div onClick={this.sortBy} data-sort="newPatients" className={`${(this.props.paginationOptions.activeSort === 'newPatients') ? this.props.paginationOptions.activeDirection : ''}`}>NEW PATIENT<i className="caret-arrow" /></div>
                                    </th>
                                    <th>
                                      <div onClick={this.sortBy} data-sort="callAttempted" className={`${(this.props.paginationOptions.activeSort === 'callAttempted') ? this.props.paginationOptions.activeDirection : ''}`}>CALL ATTEMPTED<i className="caret-arrow" /></div>
                                    </th>
                                    <th>
                                      <div onClick={this.sortBy} data-sort="notQualified" className={`${(this.props.paginationOptions.activeSort === 'notQualified') ? this.props.paginationOptions.activeDirection : ''}`}>NOT QUALIFIED<i className="caret-arrow" /></div>
                                    </th>
                                    <th>
                                      <div onClick={this.sortBy} data-sort="actionNeeded" className={`${(this.props.paginationOptions.activeSort === 'actionNeeded') ? this.props.paginationOptions.activeDirection : ''}`}>ACTION NEEDED<i className="caret-arrow" /></div>
                                    </th>
                                    <th>
                                      <div onClick={this.sortBy} data-sort="scheduled" className={`${(this.props.paginationOptions.activeSort === 'scheduled') ? this.props.paginationOptions.activeDirection : ''}`}>SCHEDULED<i className="caret-arrow" /></div>
                                    </th>
                                    <th>
                                      <div onClick={this.sortBy} data-sort="consented" className={`${(this.props.paginationOptions.activeSort === 'consented') ? this.props.paginationOptions.activeDirection : ''}`}>CONSENTED<i className="caret-arrow" /></div>
                                    </th>
                                    <th>
                                      <div onClick={this.sortBy} data-sort="randomized" className={`${(this.props.paginationOptions.activeSort === 'randomized') ? this.props.paginationOptions.activeDirection : ''}`}>RANDOMIZED<i className="caret-arrow" /></div>
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
                          <div className="dashboard-scroll-container" />
                        </div>
                      </div>
                    </StickyContainer>
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
                  levels={this.props.levels}
                  indications={this.props.indications}
                  fetchAllClientUsersDashboard={this.props.fetchAllClientUsersDashboard}
                  allClientUsers={this.props.allClientUsers}
                  formValues={this.props.editStudyValues}
                  addEmailNotificationClick={this.addEmailNotificationClick}
                  messagingNumbers={this.props.messagingNumbers}
                  isOnTop={this.state.editStudyPageOnTop}
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
                    <AddEmailNotificationForm onSubmit={this.addEmailNotificationSubmit} />
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
});

const mapDispatchToProps = (dispatch) => ({
  change: (formName, name, value) => dispatch(change(formName, name, value)),
  setHoverRowIndex: (index) => dispatch(setHoverRowIndex(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StudyList);
