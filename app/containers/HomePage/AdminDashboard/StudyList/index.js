import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field } from 'redux-form';
import { map, indexOf } from 'lodash';
import classNames from 'classnames';
import Button from 'react-bootstrap/lib/Button';
import { StickyContainer, Sticky } from 'react-sticky';
import ReactSelect from '../../../../components/Input/ReactSelect';
import EditInformationModal from '../EditStudyForms/EditInformationModal';
import LandingPageModal from '../EditStudyForms/LandingPageModal';
import ThankyouPageModal from '../EditStudyForms/ThankyouPageModal';
import PatientThankyouPageModal from '../EditStudyForms/PatientThankyouPageModal';
import StudyLeftItem from './StudyLeftItem';
import StudyRightItem from './StudyRightItem';
import { Modal } from 'react-bootstrap';
import CenteredModal from '../../../../components/CenteredModal';
import moment from 'moment-timezone';
import { defaultRanges, DateRange } from 'react-date-range';
import { selectStudies, selectPaginationOptions } from '../selectors';

class StudyList extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    studies: PropTypes.array,
    paginationOptions: PropTypes.object,
    change: PropTypes.func,
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
    this.showThankyouPageModal = this.showThankyouPageModal.bind(this);
    this.showPatientThankyouPageModal = this.showPatientThankyouPageModal.bind(this);
    this.changeRange = this.changeRange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onTableScroll = this.onTableScroll.bind(this);

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
      showThankyouPageModal: false,
      showPatientThankyouPageModal: false,
      studies: bindSelection(props.studies),
      selectedAllStudies: false,
      selectedStudyCount: 0,
    };
  }

  onTableScroll(e, v) {
    console.log('scroll', e, v);
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
    console.log('studyid', studyId, checked);
    let selectedAllStudies = true;
    let selectedStudyCount = 0;
    const studies = map(this.state.studies, (study) => {
      const c = study.studyInfo.id === studyId ? checked : study.selected;
      selectedAllStudies = selectedAllStudies && c;
      if (c === true) selectedStudyCount++;
      return {
        ...study,
        selected: c,
      };
    });
    this.setState({
      selectedAllStudies,
      studies,
      selectedStudyCount,
    });
  }

  changeStudyStatus(studyIds, status) {
    console.log('studyid', studyIds, status);
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
    const studies = map(this.state.studies, (study) => {
      if (study.selected) {
        return {
          ...study,
          status: 'active',
        };
      }
      return study;
    });

    this.setState({
      studies,
    });
  }

  deactivateStudies() {
    const studies = map(this.state.studies, (study) => {
      if (study.selected) {
        return {
          ...study,
          status: 'deactive',
        };
      }
      return study;
    });

    this.setState({
      studies,
    });
  }

  adSetStudies() {
  }

  historyStudies() {

  }

  loadItems() {
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
    this.setState({
      showLandingPageModal: visible,
    });
  }

  showThankyouPageModal(visible) {
    this.setState({
      showThankyouPageModal: visible,
    });
  }

  showPatientThankyouPageModal(visible) {
    this.setState({
      showPatientThankyouPageModal: visible,
    });
  }

  showEditInformationModal(visible) {
    this.setState({
      showEditInformationModal: visible,
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
    console.log('state', this.state);
    const { studies, selectedStudyCount, selectedAllStudies } = this.state;
    const studyListLeftContents = studies.map((item, index) =>
      <StudyLeftItem
        {...item}
        key={index}
        onSelectStudy={this.toggleStudy}
        onStatusChange={this.changeStudyStatus}
      />
    );
    const studyListRightContents = studies.map((item, index) =>
      <StudyRightItem {...item} key={index} />
    );

    const campaignOptions = [{ label: 'Newest', id: 0 },
                           { label: '10', value: 10, id: 1 },
                           { label: '9', value: 9, id: 2 },
                           { label: '8', value: 8, id: 3 },
                           { label: '7', value: 7, id: 4 },
                           { label: '6', value: 6, id: 5 },
                           { label: '5', value: 5, id: 6 },
                           { label: '4', value: 4, id: 7 },
                           { label: '3', value: 3, id: 8 },
                           { label: '2', value: 2, id: 9 },
                           { label: 'Oldest', value: -1, id: 10 },
    ];

    return (
      <div className={classNames('table-container', { 'btns-active' : selectedStudyCount > 0 })}>
        { selectedStudyCount > 0 &&
          <Sticky topOffset={-364} className={classNames('clearfix', 'top-head', 'top-head-fixed', 'active')}>
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
                    onClick={() => this.showThankyouPageModal(true)}
                  > Thank You Page </Button>
              }
              {
                selectedStudyCount === 1 &&
                  <Button
                    bsStyle="primary"
                    className="pull-left"
                    data-class="btn-deactivate"
                    onClick={() => this.showPatientThankyouPageModal(true)}
                  > Patient Thank You Page </Button>
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
            <h2 className="pull-left">{studies.length} STUDIES</h2>
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
                />
              </div>
              <Button
                bsStyle="primary"
                className="pull-left"
                onClick={() => { this.showDateRangeModal(); }}
              >
                <i className="icomoon-icon_calendar"></i>
                &nbsp;Date Range
              </Button>
              <Button
                bsStyle="primary"
                className="pull-left"
                onClick={() => {}}
              >
                <i className="icomoon-icon_download"></i>
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
                  theme={{
                    DateRange: {
                      display: 'inline-grid',
                    },
                  }}
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
          <StickyContainer className="table-area">
            <div className="table-left" data-table="">
              <Sticky topOffset={-200} className="table-top">
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
                          <span className="text-uppercase">Status <i className="caret-arrow"></i></span>
                          <span className="counter">Active: 4</span>
                          <span className="counter">Inactive: 1</span>
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
            <div className="table-right" data-table="">
              <div className="scroll-holder jcf-scrollable">
                <div className="table-inner" onScroll={this.onTableScroll}>
                  <Sticky topOffset={-200} className="table-top">
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
            </div>
          </StickyContainer>
        </div>
        <EditInformationModal
          openModal={this.state.showEditInformationModal}
          onClose={() => { this.showEditInformationModal(false); }}
        />
        <LandingPageModal
          openModal={this.state.showLandingPageModal}
          onClose={() => { this.showLandingPageModal(false); }}
        />
        <ThankyouPageModal
          openModal={this.state.showThankyouPageModal}
          onClose={() => { this.showThankyouPageModal(false); }}
        />
        <PatientThankyouPageModal
          openModal={this.state.showPatientThankyouPageModal}
          onClose={() => { this.showPatientThankyouPageModal(false); }}
        />
      </div>
    );
  }
}

const bindSelection = (studies) =>
  map(studies, (study) => ({
    ...study,
    selected: false,
  }));

const mapStateToProps = createStructuredSelector({
  studies: selectStudies(),
  paginationOptions: selectPaginationOptions(),
});

export default connect(mapStateToProps)(StudyList);
