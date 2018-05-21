/* eslint-disable no-unused-vars */

import React, { PropTypes } from 'react';
import moment from 'moment-timezone';
import _ from 'lodash';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { SchedulePatientModalType } from '../../common/constants';

import CalendarWidget from './components/CalendarWidget';
import SchedulePatientModal from './components/SchedulePatientModal';
import EditScheduleModal from './components/EditScheduleModal';
import FilterBar from './components/FilterBar';
import SponsorFilterBar from '../../components/SponsorFilterBar/index';
import SponsorCalendarWidget from '../../components/SponsorCalendarWidget/index';
import SponsorAllEventsModal from '../../components/SponsorAllEventsModal/index';
import AllEventsModal from './components/AllEventsModal';
import { translate } from '../../../common/utilities/localization';

import {
  fetchClientSites,
  fetchIndications,
  fetchProtocols,
} from '../../containers/App/actions';
import {
  selectCurrentUser,
  selectUserSites,
  selectIndications,
  selectUserRoleType,
  selectProtocols,
} from '../../containers/App/selectors';

import {
  fetchPatientsByStudy,
  fetchSchedules,
  fetchSponsorSchedules,
  fetchSponsorProtocols,
  fetchSponsorSites,
  submitSchedule,
  deleteSchedule,
  setActiveSort,
} from './actions';
import {
  selectSchedules,
  selectSponsorSchedules,
  selectSponsorProtocols,
  selectSponsorSites,
  selectPatientsByStudy,
  selectPaginationOptions,
} from './selectors';


const getFilteredSchedules = (schedules, filter) =>
  schedules.filter(s =>
    `${s.patient.firstName} ${s.patient.lastName}`.toLowerCase().indexOf(filter.patientName.toLowerCase()) > -1 &&
      (!filter.siteLocation || filter.siteLocation === 'All' || s.sitelocation === filter.siteLocation) &&
      (!filter.indication || filter.indication === 'All' || s.indication === filter.indication) &&
      (!filter.protocol || filter.protocol === 'All' || s.protocolNumber === filter.protocol)
  );

const getFilteredSponsorSchedules = (sponsorSchedules, filter) => sponsorSchedules.filter(s =>
  (!filter.siteLocation || filter.siteLocation === 'all' || s.principalInvestigator === filter.siteLocation || s.siteLocation === filter.siteLocation) &&
    (!filter.protocol || filter.protocol === 'all' || s.protocolNumber === filter.protocol)
);

function numberSequenceCreator(start, end) {
  return _.range(start, end).map(n => {
    if (n < 10) {
      return {
        label: `0${n}`,
        value: n.toString(),
      };
    }
    return {
      label: n.toString(),
      value: n.toString(),
    };
  });
}

const hourOptions = numberSequenceCreator(1, 13);
const minuteOptions = numberSequenceCreator(0, 60);
const periodOptions = [
  { label: translate('portals.page.calendarPage.amLabel'), value: 'AM' },
  { label: translate('portals.page.calendarPage.pmLabel'), value: 'PM' },
];


const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
  sites: selectUserSites(),
  indications: selectIndications(),
  schedules: selectSchedules(),
  sponsorSchedules: selectSponsorSchedules(),
  sponsorProtocols: selectSponsorProtocols(),
  protocols: selectProtocols(),
  sponsorSites: selectSponsorSites(),
  patientsByStudy: selectPatientsByStudy(),
  paginationOptions: selectPaginationOptions(),
  userRoleType: selectUserRoleType(),
});

const mapDispatchToProps = (dispatch) => ({
  fetchClientSites: (id) => dispatch(fetchClientSites(id)),
  fetchIndications: () => dispatch(fetchIndications()),
  fetchPatientsByStudy: (studyId, siteId) => dispatch(fetchPatientsByStudy(studyId, siteId)),
  fetchProtocols: (clientRoleId) => dispatch(fetchProtocols(clientRoleId)),
  fetchSponsorProtocols: (sponsorRoleId, searchParams, limit, offset, sort, order) => dispatch(fetchSponsorProtocols(sponsorRoleId, searchParams, limit, offset, sort, order)),
  fetchSchedules: (data) => dispatch(fetchSchedules(data)),
  fetchSponsorSchedules: (sponsorId, searchParams) => dispatch(fetchSponsorSchedules(sponsorId, searchParams)),
  fetchSponsorSites: (sponsorId, searchParams) => dispatch(fetchSponsorSites(sponsorId, searchParams)),
  submitSchedule: (data) => dispatch(submitSchedule(data)),
  deleteSchedule: (scheduleId, clientRoleId) => dispatch(deleteSchedule(scheduleId, clientRoleId)),
  setActiveSort: (sort, direction) => dispatch(setActiveSort(sort, direction)),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class CalendarPage extends React.Component {
  static propTypes = {
    currentUser: PropTypes.any,
    sites: PropTypes.array.isRequired,
    sponsorSites: PropTypes.object.isRequired,
    indications: PropTypes.array.isRequired,
    patientsByStudy: PropTypes.object.isRequired,
    schedules: PropTypes.object.isRequired,
    sponsorSchedules: PropTypes.object.isRequired,
    sponsorProtocols: PropTypes.object.isRequired,
    protocols: PropTypes.object.isRequired,
    fetchClientSites: PropTypes.func.isRequired,
    fetchIndications: PropTypes.func.isRequired,
    fetchPatientsByStudy: PropTypes.func.isRequired,
    fetchProtocols: PropTypes.func.isRequired,
    fetchSponsorProtocols: PropTypes.func.isRequired,
    fetchSchedules: PropTypes.func.isRequired,
    fetchSponsorSchedules: PropTypes.func.isRequired,
    fetchSponsorSites: PropTypes.func.isRequired,
    submitSchedule: PropTypes.func.isRequired,
    deleteSchedule: PropTypes.func.isRequired,
    paginationOptions: PropTypes.object,
    setActiveSort: PropTypes.func,
    userRoleType: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.selectedCellInfo = {};
    this.updateFilter = ::this.updateFilter;
    this.handleCloseModal = this.handleModalVisibility.bind(this, SchedulePatientModalType.HIDDEN);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.sortBy = this.sortBy.bind(this);
  }

  state = {
    filter: {
      patientName: '',
      siteLocation: null,
      indication: null,
      protocol: null,
    },
    modalType: SchedulePatientModalType.HIDDEN,
    showAll: {
      visible: false,
      date: null,
      events: [],
    },
    allModalDeferred: false,
    filteredSchedules: [],
    filteredSponsorSchedules: [],
    localSchedules: [],
    localSponsorSchedules: [],
  };

  componentDidMount() {
    const { currentUser } = this.props;

    if (currentUser.roleForClient) {
      this.props.fetchClientSites(currentUser.roleForClient.client_id);
      this.props.fetchIndications();
      this.props.fetchSchedules({ clientRoleId: currentUser.roleForClient.id });
      this.props.fetchProtocols(currentUser.roleForClient.id);
    } else if (currentUser.roleForSponsor) {
      this.props.fetchSponsorProtocols(currentUser.roleForSponsor.id, {}, 0, 0, null, null);
      this.props.fetchSponsorSchedules(currentUser.roleForSponsor.sponsor_id, {});
      this.props.fetchSponsorSites(currentUser.roleForSponsor.sponsor_id, {});
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.schedules.data !== nextProps.schedules.data || this.props.currentUser.timezone !== nextProps.currentUser.timezone) {
      let timezone = nextProps.currentUser.timezone;
      if (nextProps.currentUser.roleForClient && nextProps.currentUser.roleForClient.site_id) {
        const site = _.first(nextProps.sites, item => item.id === nextProps.currentUser.roleForClient.site_id);
        if (site) {
          timezone = site.timezone;
          console.log('site timezone', timezone);
        }
      }

      const localSchedules = nextProps.schedules.data.map(s => ({
        ...s,
        time: moment(s.time).tz(timezone),
      }));
      this.setState({
        localSchedules,
      });
      this.filterSchedules(localSchedules, this.state.filter);
    }

    if (this.props.sponsorSchedules.data !== nextProps.sponsorSchedules.data || this.props.currentUser.timezone !== nextProps.currentUser.timezone) {
      const timezone = nextProps.currentUser.timezone;
      const localSponsorSchedules = nextProps.sponsorSchedules.data.map(s => ({
        ...s,
        time: moment(s.time).tz(timezone),
      }));
      this.setState({
        localSponsorSchedules,
      });
      this.filterSchedules(localSponsorSchedules, this.state.filter);
    }
  }

  setAllModalDeferred = (allModalDeferred) => {
    this.setState({
      allModalDeferred,
    });
  }

  filterSchedules(schedules, filter) {
    const { currentUser } = this.props;

    if (currentUser && currentUser.roleForClient) {
      this.setState({
        filteredSchedules: getFilteredSchedules(schedules, filter),
      });
    }

    if (currentUser && currentUser.roleForSponsor) {
      this.setState({
        filteredSponsorSchedules: getFilteredSponsorSchedules(schedules, filter),
      });
    }
  }

  handleModalVisibility = (modalType, data) => {
    if (modalType !== SchedulePatientModalType.HIDDEN) {
      this.selectedCellInfo = data;
    } else if (this.state.allModalDeferred) {
      this.handleShowAll(true);
      this.setState({
        allModalDeferred: false,
      });
    }

    this.setState({
      modalType,
    });
  }

  handleShowAll = (visible, events, date) => {
    this.setState({
      showAll: {
        visible,
        events: events || this.state.showAll.events,
        date: date || this.state.showAll.date,
      },
    });
  }

  handleSubmit(data) {
    let submitData;
    const { currentUser } = this.props;

    if (data.siteLocation && data.protocol) { // CREATE
      submitData = {
        patientId: data.patient.value,
        clientRoleId: currentUser.roleForClient.id,
        time: moment(this.selectedCellInfo.selectedDate).add(data.period === 'AM' ?
          data.hour % 12 :
          (data.hour % 12) + 12, 'hours').add(data.minute, 'minutes'),
        textReminder: data.textReminder,
      };
    } else { // UPDATE
      let updatedDate;
      if (data.date) {
        updatedDate = data.date.startOf('day');
      } else {  // React Datepicker doesn't submit its initial value
        updatedDate = moment(this.selectedCellInfo.data.time).startOf('day');
      }
      const nn = updatedDate.clone().add(data.period === 'AM' ?
        data.hour % 12 :
        (data.hour % 12) + 12, 'hours').add(data.minute, 'minutes');
      submitData = {
        id: this.selectedCellInfo.data.id,
        time: updatedDate.clone().add(data.period === 'AM' ?
          data.hour % 12 :
          (data.hour % 12) + 12, 'hours').add(data.minute, 'minutes'),
        clientRoleId: currentUser.roleForClient.id,
        patientId: data.patient.value,
        textReminder: data.textReminder,
      };
    }

    this.setState({
      modalType: SchedulePatientModalType.HIDDEN,
      allModalDeferred: false,
    });
    this.props.submitSchedule(submitData);
  }

  handleDelete(scheduleId) {
    const { currentUser, deleteSchedule } = this.props;
    this.setState({
      modalType: SchedulePatientModalType.HIDDEN,
      allModalDeferred: false,
    });

    deleteSchedule(scheduleId, currentUser.roleForClient.id);
  }

  navigateToToday = () => {
    this.calendarWidget.bigCalendar.refs.inner.navigateToToday();
  }

  updateFilter(field, newValue) {
    const { currentUser } = this.props;
    const newFilter = this.state.filter;
    const schedules = (currentUser && currentUser.roleForSponsor) ? this.state.localSponsorSchedules : this.state.localSchedules;
    newFilter[field] = newValue;

    if (currentUser && currentUser.roleForClient) {
      if (field === 'siteLocation' && !newValue) {
        newFilter.siteLocation = null;
        newFilter.indication = null;
        newFilter.protocol = null;
      }

      if (field === 'indication' && !newValue) {
        newFilter.indication = null;
        newFilter.protocol = null;
      }
    }

    if (currentUser && currentUser.roleForSponsor) {
      if (field === 'siteLocation' && !newValue) {
        newFilter.siteLocation = null;
      }

      if (field === 'protocol' && !newValue) {
        newFilter.protocol = null;
        newFilter.siteLocation = null;
      }
    }

    this.setState({
      filter: newFilter,
    });

    this.filterSchedules(schedules, newFilter);
  }

  sortBy(ev) {
    ev.preventDefault();
    let sort = ev.currentTarget.dataset.sort;
    let direction = 'up';
    const defaultSort = 'orderNumber';

    if (ev.currentTarget.className && ev.currentTarget.className.indexOf('up') !== -1) {
      direction = 'down';
    } else if (ev.currentTarget.className && ev.currentTarget.className.indexOf('down') !== -1) {
      direction = null;
      sort = null;
    }

    this.props.setActiveSort(sort, direction);
  }

  render() {
    const { currentUser, sites, sponsorSites, indications, patientsByStudy, userRoleType, protocols, sponsorProtocols } = this.props;
    const { showAll, localSchedules, localSponsorSchedules } = this.state;
    const fetchingSites = sites.isFetching;
    const fetchingPatientsByStudy = patientsByStudy.isFetching;
    let isAdmin = false;
    let currentSite = null;

    if (currentUser && currentUser.roleForClient) {
      isAdmin = (currentUser.roleForClient.name === 'Super Admin') || (currentUser.roleForClient.name === 'Admin');
    }

    if (currentUser && currentUser.roleForSponsor) {
      isAdmin = (currentUser.roleForSponsor.name === 'Super Admin') || (currentUser.roleForSponsor.name === 'Admin');
    }

    let siteLocationOptions = [];
    if (isAdmin) {
      siteLocationOptions = sites.map(s => ({
        label: s.name,
        value: s.name,
        siteId: s.id,
      }));
    } else {
      let siteId = currentUser.site_id;
      if (currentUser && currentUser.roleForClient) {
        siteId = currentUser.roleForClient.site_id;
      }
      currentSite = _.find(sites, { id: siteId });
      if (currentSite) {     // if site is fetched
        siteLocationOptions = [{
          label: currentSite.name,
          value: currentSite.name,
          siteId: currentSite.id,
        }];
      }
    }

    return (
      <div>
        { userRoleType === 'client' &&
          <div className="container-fluid">
            <Helmet title={translate('portals.page.calendarPage.helmetTitle')} />
            <section className="calendar-section">
              <h2 className="main-heading">{translate('portals.page.calendarPage.pageTitle')}</h2>
              <div className="btn-block"><a className="btn btn-primary" onClick={this.navigateToToday}>{translate('portals.page.calendarPage.todayBtn')}</a></div>
              <FilterBar
                siteLocationOptions={siteLocationOptions}
                isAdmin={isAdmin}
                sites={sites}
                indications={indications}
                protocols={protocols.details}
                schedules={localSchedules}
                fetchingSites={fetchingSites}
                filter={this.state.filter}
                updateFilter={this.updateFilter}
                currentUser={currentUser}
              />
              <CalendarWidget
                currentUser={currentUser}
                sites={sites}
                currentSite={currentSite}
                schedules={this.state.filteredSchedules}
                handleOpenModal={this.handleModalVisibility}
                handleShowAll={this.handleShowAll}
                ref={(c) => { this.calendarWidget = c; }}
              />
              <SchedulePatientModal
                currentUser={currentUser}
                siteLocationOptions={siteLocationOptions}
                isAdmin={isAdmin}
                sites={sites}
                indications={indications}
                protocols={protocols.details}
                onSubmit={this.handleSubmit}
                handleCloseModal={this.handleCloseModal}
                submitting={false}
                selectedCellInfo={this.selectedCellInfo}
                modalType={this.state.modalType}
                patientsByStudy={patientsByStudy}
                schedules={localSchedules}
                fetchingSites={fetchingSites}
                fetchingPatientsByStudy={fetchingPatientsByStudy}
                fetchPatientsByStudy={this.props.fetchPatientsByStudy}
                hourOptions={hourOptions}
                minuteOptions={minuteOptions}
                periodOptions={periodOptions}
                initialValues={{ hour: '0' }}
              />
              <EditScheduleModal
                onSubmit={this.handleSubmit}
                handleDelete={this.handleDelete}
                submitting={false}
                selectedCellInfo={this.selectedCellInfo}
                modalType={this.state.modalType}
                onClose={this.handleCloseModal}
                hourOptions={hourOptions}
                minuteOptions={minuteOptions}
                periodOptions={periodOptions}
              />
              <AllEventsModal
                visible={showAll.visible}
                date={showAll.date}
                events={showAll.events}
                handleCloseModal={() => this.handleShowAll(false)}
                handleEdit={this.handleModalVisibility}
                setAllModalDeferred={this.setAllModalDeferred}
                sortBy={this.sortBy}
                paginationOptions={this.props.paginationOptions}
              />
            </section>
          </div>
        }
        {
          userRoleType === 'sponsor' &&
            <div className="container-fluid">
              <Helmet title={translate('portals.page.calendarPage.helmetTitle')} />
              <section className="sponsor calendar-section">
                <h2 className="main-heading">{translate('portals.page.calendarPage.pageTitle')}</h2>
                <div className="btn-block"><a className="btn btn-primary" onClick={this.navigateToToday}>{translate('portals.page.calendarPage.todayBtn')}</a></div>
                <SponsorFilterBar
                  sites={sponsorSites}
                  protocols={sponsorProtocols.details}
                  sponsorSchedules={localSponsorSchedules}
                  filter={this.state.filter}
                  updateFilter={this.updateFilter}
                  currentUser={currentUser}
                />
                <SponsorCalendarWidget
                  currentUser={currentUser}
                  sites={sponsorSites}
                  currentSite={currentSite}
                  protocols={sponsorProtocols.details}
                  sponsorSchedules={this.state.filteredSponsorSchedules}
                  handleOpenModal={this.handleModalVisibility}
                  handleShowAll={this.handleShowAll}
                  ref={(c) => { this.calendarWidget = c; }}
                />
                <SponsorAllEventsModal
                  visible={showAll.visible}
                  date={showAll.date}
                  events={showAll.events}
                  handleCloseModal={() => this.handleShowAll(false)}
                  sortBy={this.sortBy}
                  paginationOptions={this.props.paginationOptions}
                />
              </section>
            </div>
        }
      </div>
    );
  }
}
