/* eslint-disable no-unused-vars */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CalendarWidget from './components/CalendarWidget';
import SchedulePatientModal from './components/SchedulePatientModal';
import FilterBar from './components/FilterBar';

import moment from 'moment';

import {
  fetchSites,
  fetchIndications,
} from 'containers/App/actions';
import {
  selectCurrentUser,
  selectSites,
  selectIndications,
} from 'containers/App/selectors';

import {
  fetchPatientsByStudy,
  fetchSchedules,
  submitSchedule,
  deleteSchedule,
} from './actions';
import { selectSchedules, selectPatientsByStudy, getFilteredSchedules } from './selectors';

import { SchedulePatientModalType } from 'common/constants';

import './styles.less';

class Calendar extends React.Component {
  static propTypes = {
    currentUser: PropTypes.any,
    sites: PropTypes.array.isRequired,
    patientsByStudy: PropTypes.object.isRequired,
    schedules: PropTypes.object.isRequired,
    fetchSites: PropTypes.func.isRequired,
    fetchPatientsByStudy: PropTypes.func.isRequired,
    fetchSchedules: PropTypes.func.isRequired,
    submitSchedule: PropTypes.func.isRequired,
    deleteSchedule: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.selectedCellInfo = {};
    this.updateFilter = ::this.updateFilter;
    this.handleCloseModal = this.handleModalVisibility.bind(this, SchedulePatientModalType.HIDDEN);
  }

  state = {
    filter: {
      patientName: '',
      siteLocation: null,
      indication: null,
      protocol: null,
    },
    modalType: SchedulePatientModalType.HIDDEN,
    filteredSchedules: [],
  }

  componentDidMount() {
    const { currentUser } = this.props;

    this.props.fetchSites();
    this.props.fetchSchedules({ userId: currentUser.id });
  }

  componentWillReceiveProps(nextProps) {
    this.filterSchedules(nextProps.schedules.data, this.state.filter);
  }

  getTimeComponents(strTime) {
    return {
      hour: ((moment(strTime).hour() + 11) % 12) + 1,
      minute: moment(strTime).minute(),
      period: moment(strTime).hour() >= 12 ? 'PM' : 'AM',
    };
  }

  updateFilter(field, newValue) {
    const newFilter = {
      ...this.state.filter,
      [field]: newValue,
    };

    this.setState({
      filter: newFilter,
    });

    this.filterSchedules(this.props.schedules.data, newFilter);
  }

  filterSchedules(schedules, filter) {
    this.setState({
      filteredSchedules: getFilteredSchedules(schedules, filter),
    });
  }

  handleModalVisibility = (modalType, data) => {
    if (modalType !== SchedulePatientModalType.HIDDEN) {
      this.selectedCellInfo = data;
    }
    this.setState({
      modalType,
    });
  }

  handleSubmit = (data) => {
    let submitData;

    if (data.siteLocation && data.protocol) { // CREATE
      submitData = {
        siteLocation: data.siteLocation,
        indication: data.indication,
        protocolNumber: data.protocol,
        patientId: data.patient,
        // patientId: 1,
        userId: this.props.currentUser.userId,
        time: moment(this.selectedCellInfo.selectedDate).add(data.period === 'AM' ?
          data.hour % 12 :
          (data.hour % 12) + 12, 'hours').add(data.minute, 'minutes').utc().format(),
      };
    } else { // UPDATE
      let updatedDate;
      if (data.date) {
        updatedDate = moment(new Date(data.date));
      } else {  // React Datepicker doesn't submit its initial value
        updatedDate = moment(new Date(this.selectedCellInfo.data.time)).startOf('day');
      }

      submitData = {
        id: this.selectedCellInfo.data.id,
        time: updatedDate.add(data.period === 'AM' ?
          data.hour % 12 :
          (data.hour % 12) + 12, 'hours').add(data.minute, 'minutes').utc().format(),
      };
    }

    this.handleModalVisibility(SchedulePatientModalType.HIDDEN);

    this.props.submitSchedule(submitData);
  }

  handleDelete = (scheduleId) => {
    this.handleModalVisibility(SchedulePatientModalType.HIDDEN);

    this.props.deleteSchedule(scheduleId, this.props.currentUser.userId);
  }

  render() {
    const { sites, patientsByStudy, schedules } = this.props;
    const fetchingSites = sites.isFetching;
    const fetchingPatientsByStudy = patientsByStudy.isFetching;

    return (
      <div className="container-fluid">
        <section className="calendar-section">
          <h2 className="main-heading">CALENDAR</h2>
          <div className="btn-block"><a href="#" className="btn btn-primary">Today</a></div>
          <FilterBar
            sites={sites}
            fetchingSites={fetchingSites}
            filter={this.state.filter}
            updateFilter={this.updateFilter}
          />
          <CalendarWidget
            schedules={this.state.filteredSchedules}
            handleOpenModal={this.handleModalVisibility}
          />
          <SchedulePatientModal
            sites={sites}
            onSubmit={this.handleSubmit}
            handleCloseModal={this.handleCloseModal}
            handleDelete={this.handleDelete}
            submitting={false}
            selectedCellInfo={this.selectedCellInfo}
            modalType={this.state.modalType}
            initialValues={this.selectedCellInfo.data ? this.getTimeComponents(this.selectedCellInfo.data.time) : { period: 'AM' }}
            patientsByStudy={patientsByStudy}
            fetchingSites={fetchingSites}
            fetchingPatientsByStudy={fetchingPatientsByStudy}
            fetchPatientsByStudy={this.props.fetchPatientsByStudy}
          />
        </section>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
  sites: selectSites(),
  schedules: selectSchedules(),
  patientsByStudy: selectPatientsByStudy(),
});

const mapDispatchToProps = {
  fetchSites,
  fetchPatientsByStudy,
  fetchSchedules,
  submitSchedule,
  deleteSchedule,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calendar);
