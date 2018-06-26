import classNames from 'classnames';
import _, { map, mapKeys, concat, findIndex, pullAt, isArray } from 'lodash';
import moment from 'moment-timezone';
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import { change, reset } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import { StickyContainer } from 'react-sticky';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import rd3 from 'react-d3';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { defaultStaticRanges } from '../../../common/constants/dateRanges';
import { getMomentFromDate } from '../../../utils/time';

import CenteredModal from '../../../components/CenteredModal';
import FiltersForm from './FiltersForm';
import StudyList from './StudyList';
import FilterQueryForm from '../../../components/Filter/FilterQueryForm';

import {
  selectFilterFormValues,
  selectLevels,
  selectSiteNames,
  selectSiteLocations,
  selectIndications,
  selectSponsors,
  selectProtocols,
  selectCro,
  selectUsersByRoles,
  selectStudiesTotals,
  selectAllCustomNotificationEmails,
  selectPaginationOptions,
  selectDashboardfive9List,
} from './selectors';
import {
  changeStudyStatusDashboard,
  clearFilters,
  fetchFive9List,
  fetchStudiesDashboard,
  fetchTotalsDashboard,
  fetchSiteLocations,
  fetchStudyCampaignsDashboard,
  updateTwilioNumbers,
} from './actions';
import { selectSources } from '../../App/selectors';
import {
  addCustomEmailNotification,
  addEmailNotificationUser,
  fetchCro,
  fetchLevels,
  fetchIndications,
  fetchSources,
  fetchSponsors,
  fetchProtocols,
  fetchUsersByRole,
} from '../../App/actions';

const PieChart = rd3.PieChart;
const LineChart = rd3.LineChart;
const formName = 'dashboardFilters';

const mapStateToProps = createStructuredSelector({
  allCustomNotificationEmails: selectAllCustomNotificationEmails(),
  cro: selectCro(),
  filtersFormValues: selectFilterFormValues(),
  five9List: selectDashboardfive9List(),
  indications: selectIndications(),
  protocols: selectProtocols(),
  levels: selectLevels(),
  siteNames: selectSiteNames(),
  siteLocations: selectSiteLocations(),
  sponsors: selectSponsors(),
  totals: selectStudiesTotals(),
  usersByRoles: selectUsersByRoles(),
  paginationOptions: selectPaginationOptions(),
  sources: selectSources(),
});

const mapDispatchToProps = (dispatch) => ({
  clearFilters: () => dispatch(clearFilters()),
  change: (formName, name, value) => dispatch(change(formName, name, value)),
  addEmailNotificationUser: (payload) => dispatch(addEmailNotificationUser(payload)),
  changeStudyStatusDashboard: (params, status, isChecked) => dispatch(changeStudyStatusDashboard(params, status, isChecked)),
  addCustomEmailNotification: (payload) => dispatch(addCustomEmailNotification(payload)),
  fetchCro: () => dispatch(fetchCro()),
  fetchFive9List: () => dispatch(fetchFive9List()),
  fetchLevels: () => dispatch(fetchLevels()),
  fetchIndications: () => dispatch(fetchIndications()),
  fetchProtocols: () => dispatch(fetchProtocols()),
  fetchSiteLocations: () => dispatch(fetchSiteLocations()),
  fetchSources: () => dispatch(fetchSources()),
  fetchSponsors: () => dispatch(fetchSponsors()),
  fetchStudyCampaignsDashboard: (params) => dispatch(fetchStudyCampaignsDashboard(params)),
  fetchStudiesDashboard: (params, limit, offset) => dispatch(fetchStudiesDashboard(params, limit, offset)),
  fetchTotalsDashboard: (params, limit, offset) => dispatch(fetchTotalsDashboard(params, limit, offset)),
  fetchUsersByRole: () => dispatch(fetchUsersByRole()),
  resetForm: () => dispatch(reset(formName)),
  updateTwilioNumbers: () => dispatch(updateTwilioNumbers()),
  clearCampaignFilter: () => dispatch(reset('campaignFilter')),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class AdminDashboard extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    addEmailNotificationUser: PropTypes.func,
    addCustomEmailNotification: PropTypes.func,
    allCustomNotificationEmails: PropTypes.object,
    change: PropTypes.func.isRequired,
    changeStudyStatusDashboard: PropTypes.func,
    clearFilters: PropTypes.func.isRequired,
    cro: PropTypes.array,
    fetchCro: PropTypes.func,
    fetchFive9List: PropTypes.func,
    fetchIndications: PropTypes.func,
    fetchLevels: PropTypes.func,
    fetchProtocols: PropTypes.func,
    fetchSiteLocations: PropTypes.func,
    fetchSponsors: PropTypes.func,
    fetchStudyCampaignsDashboard: PropTypes.func,
    fetchStudiesDashboard: PropTypes.func,
    fetchSources: PropTypes.func,
    fetchTotalsDashboard: PropTypes.func,
    fetchUsersByRole: PropTypes.func,
    five9List: PropTypes.object,
    filtersFormValues: PropTypes.object.isRequired,
    levels: PropTypes.array,
    indications: PropTypes.array,
    paginationOptions: PropTypes.object,
    protocols: PropTypes.array,
    resetForm: PropTypes.func.isRequired,
    siteNames: PropTypes.array,
    studies: PropTypes.array,
    siteLocations: PropTypes.array,
    sponsors: PropTypes.array,
    totals: PropTypes.object,
    updateTwilioNumbers: PropTypes.func,
    usersByRoles: PropTypes.object,
    clearCampaignFilter: PropTypes.func,
    sources: PropTypes.array,
  };

  constructor(props) {
    super(props);

    this.state = {
      customFilters: [],
      showDateRangeModal: false,
      rangePicker : {},
      datePicker : null,
      firstDayOfWeek : null,
      dateRange : {
        startDate: moment().clone().subtract(30, 'days').toDate(),
        endDate: new Date(),
        key: 'selection',
      },
      prevTotalsFilters: [],
      prevOffset: null,
    };

    this.addFilter = this.addFilter.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
    this.removeFilter = this.removeFilter.bind(this);
    this.openFiltersModal = this.openFiltersModal.bind(this);
    this.closeFiltersModal = this.closeFiltersModal.bind(this);
    this.handleChange = this.handleChange.bind(this, 'dateRange');
    this.showDateRangeModal = this.showDateRangeModal.bind(this);
    this.hideDateRangeModal = this.hideDateRangeModal.bind(this);
    this.changeRange = this.changeRange.bind(this);
    this.fetchStudiesAccordingToFilters = this.fetchStudiesAccordingToFilters.bind(this);
    this.percentageFilterChange = this.percentageFilterChange.bind(this);
    this.percentageFilterSubmit = this.percentageFilterSubmit.bind(this);
    this.nearbyFilterChange = this.nearbyFilterChange.bind(this);
    this.nearbyFilterSubmit = this.nearbyFilterSubmit.bind(this);
    this.searchFilterSubmit = this.searchFilterSubmit.bind(this);
    this.addressFilterSubmit = this.addressFilterSubmit.bind(this);
    this.updateFilters = this.updateFilters.bind(this);
  }

  componentWillMount() {
    this.props.fetchLevels();
    this.props.fetchSiteLocations();
    this.props.fetchIndications();
    this.props.fetchSponsors();
    this.props.fetchProtocols();
    this.props.fetchCro();
    this.props.fetchUsersByRole();
    this.props.fetchSources();
    this.props.fetchFive9List();
  }

  componentWillReceiveProps(newProps) {
    const filters = _.cloneDeep(newProps.filtersFormValues);
    const equal = _.isEqual(filters, this.props.filtersFormValues);
    if (!equal) {
      if (filters.address && !filters.address.value) {
        filters.address = [];
      }

      this.fetchStudiesAccordingToFilters(null, null, false, filters);
    }
  }

  addFilter(options) {
    const { customFilters } = this.state;
    if (customFilters.length === 0) {
      const newOptions = {
        ...options,
        name: options.name + customFilters.length,
        onClose: () => this.removeFilter({ name: 'search' }),
        onSubmit: this.searchFilterSubmit,
      };
      customFilters.push(newOptions);
      this.setState({ customFilters });
    }
  }

  clearFilters() {
    const { clearFilters, resetForm } = this.props;
    clearFilters();
    this.setState({
      customFilters: [],
      prevTotalsFilters: {},
      prevOffset: null,
    });
    resetForm();
    this.props.clearCampaignFilter();
  }

  removeFilter(filter) {
    const { customFilters } = this.state;
    const { change, filtersFormValues } = this.props;
    const filters = _.cloneDeep(filtersFormValues);

    if (filter.type === 'search') {
      pullAt(customFilters, findIndex(customFilters, filter));
      this.setState({ customFilters });

      change(formName, 'search', []);
    } else if (filter.name === 'percentage') {
      change(formName, 'percentage', []);
    } else if (filter.name === 'nearbyStudies') {
      change(formName, 'nearbyStudies', []);
    } else if (filter.name === 'address') {
      change(formName, 'address', []);
    } else if (filters[filter.name]) {
      pullAt(filters[filter.name], findIndex(filters[filter.name], ['label', filter.value]));
      pullAt(filters[filter.name], findIndex(filters[filter.name], ['label', 'All']));

      change(formName, filter.name, filters[filter.name]);
    }
  }

  openFiltersModal() {
    this.setState({ addUserModalOpen: true });
  }

  closeFiltersModal() {
    this.setState({ addUserModalOpen: false });
  }

  handleUserQueryChange(event) {
    this.setState({
      userName: event.target.value,
    });
  }

  showDateRangeModal(ev) {
    if (ev) {
      ev.preventDefault();
    }
    this.setState({ showDateRangeModal: true });
  }

  hideDateRangeModal(ev) {
    if (ev) {
      ev.preventDefault();
    }
    this.setState({ showDateRangeModal: false });
  }

  changeRange() {
    // TODO: update filter
    this.hideDateRangeModal();
  }

  handleChange(which, payload) {
    if (payload.selection) {
      this.setState({
        [which] : payload.selection,
      });
    }
  }

  parseDateRange() {
    const startDate = getMomentFromDate(this.state.dateRange.startDate);
    const endDate = getMomentFromDate(this.state.dateRange.endDate);
    const today = moment();
    const fmt = 'MM/DD/YY';
    let prefix = '';

    if (endDate.format(fmt) === today.format(fmt)) {
      prefix = ' Last ';
    }
    const days = endDate.diff(startDate, 'days');
    return `${prefix} ${days} Days: ${startDate.format(fmt)} - ${endDate.format(fmt)}`;
  }

  mapFilterValues(filters) {
    const newFilters = [];
    mapKeys(filters, (filterValues, key) => {
      if (key !== 'campaign' && key !== 'search') {
        if (key === 'percentage') {
          newFilters.push({
            name: key,
            type: 'compare',
            value: filterValues.value,
            onChange: this.percentageFilterChange,
            onSubmit: this.percentageFilterSubmit,
          });
        } else if (key === 'nearbyStudies') {
          newFilters.push({
            name: key,
            type: 'nearby',
            value: filterValues.value,
            onChange: this.nearbyFilterChange,
            onSubmit: this.nearbyFilterSubmit,
          });
        } else if (key === 'address' && !isArray(filterValues)) {
          newFilters.push({
            name: key,
            type: 'address',
            value: filterValues.value,
            onSubmit: this.addressFilterSubmit,
          });
        } else {
          _.forEach(filterValues, (v) => {
            if ((v.label !== 'All') || (v.label === 'All' && filterValues.length === 1)) {
              newFilters.push({
                name: key,
                type: 'value',
                value: v.label,
              });
            }
          });
        }
      }
    });
    return newFilters;
  }

  updateFilters(key, value) {
    this.props.change(formName, key, value);
  }

  fetchStudiesAccordingToFilters(value, key, fetchByScroll, filtersFormValues) {
    const { change, totals } = this.props;
    const sources = _.cloneDeep(this.props.sources);
    const defaultSource = sources.find(s => { return s.type === 'StudyKIK'; });
    let filters = filtersFormValues || _.cloneDeep(this.props.filtersFormValues);

    if ((value && key) || (key === 'campaign') || (key === 'source')) {
      const newFilterValues = _.cloneDeep(value);
      filters = { ...filters, [key]:newFilterValues };
    }

    let isEmpty = true;

    _.forEach(filters, (filter, k) => {
      const initFilter = _.cloneDeep(filter);
      if (k !== 'search' && k !== 'percentage' && k !== 'campaign' && k !== 'source' && k !== 'nearbyStudies' && k !== 'address') {
        const withoutAll = _.remove(filter, (item) => (item.label !== 'All'));
        filters[k] = withoutAll;
      }

      if (!_.isEmpty(initFilter)) {
        isEmpty = false;
      }
    });

    let offset = 0;
    const limit = 50;

    if (fetchByScroll) {
      offset = this.props.paginationOptions.page * limit;
    }

    if (!filters.source && defaultSource) {
      filters.source = defaultSource.id;
      change(formName, 'source', defaultSource.id);
    }

    if (filters.source === -1) {
      change(formName, 'source', null);
      delete filters.source;
    }

    if (isEmpty) {
      this.props.clearFilters();
    } else if (_.isEqual(this.state.prevTotalsFilters, filters)) {
      if (this.state.prevOffset !== offset || _.isEmpty(totals.details)) {
        this.props.fetchTotalsDashboard(filters, limit, offset);
        this.props.fetchStudiesDashboard(filters, limit, offset);
        this.setState({ prevOffset: offset });
      }
    } else {
      this.setState({ prevTotalsFilters: _.cloneDeep(filters) });
      this.props.fetchTotalsDashboard(filters, limit, offset);
      this.props.fetchStudiesDashboard(filters, limit, offset);
      this.setState({ prevOffset: offset });
    }
  }

  percentageFilterChange(e) {
    const { change } = this.props;
    change(formName, 'percentage', e);
  }

  percentageFilterSubmit(e) {
    const { change } = this.props;
    change(formName, 'percentage', { ...this.props.filtersFormValues.percentage, arg: e });
  }

  nearbyFilterChange(e) {
    const { change } = this.props;
    change(formName, 'nearbyStudies', e);
  }

  nearbyFilterSubmit(e) {
    const { change } = this.props;
    change(formName, 'nearbyStudies', { ...this.props.filtersFormValues.nearbyStudies, arg: e });
  }

  searchFilterSubmit(e) {
    const { change } = this.props;
    change(formName, 'search', { value: e });
  }

  addressFilterSubmit(e) {
    const { change } = this.props;
    change(formName, 'address', { value: e });
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
        <span className="time">{getMomentFromDate(dateRange.startDate).format(format)} - {getMomentFromDate(dateRange.endDate).format(format)}</span>
      );
    }
    return null;
  }

  render() {
    const { customFilters } = this.state;
    const { resetForm, filtersFormValues } = this.props;

    const filters = concat(this.mapFilterValues(filtersFormValues), customFilters);
    const details = this.props.totals.details || {};

    const redCount = parseInt(details.total_red) || 0;
    const yellowCount = parseInt(details.total_yellow) || 0;
    const greenCount = parseInt(details.total_green) || 0;
    const purpleCount = parseInt(details.total_purple) || 0;

    const colorsTotal = redCount + yellowCount + greenCount + purpleCount;

    const redPercent = redCount ? ((redCount / colorsTotal) * 100).toFixed(2) : 0;
    const yellowPercent = yellowCount ? ((yellowCount / colorsTotal) * 100).toFixed(2) : 0;
    const greenPercent = greenCount ? ((greenCount / colorsTotal) * 100).toFixed(2) : 0;
    const purplePercent = purpleCount ? ((purpleCount / colorsTotal) * 100).toFixed(2) : 0;

    const tier1Count = parseInt(details.total_tier_one) || 0;
    const tier2Count = parseInt(details.total_tier_two) || 0;
    const tier3Count = parseInt(details.total_tier_three) || 0;
    const tier4Count = parseInt(details.total_tier_four) || 0;

    const tiersTotal = tier1Count + tier2Count + tier3Count + tier4Count;

    const tier1Percent = tier1Count ? ((tier1Count / tiersTotal) * 100).toFixed(2) : 0;
    const tier2Percent = tier2Count ? ((tier2Count / tiersTotal) * 100).toFixed(2) : 0;
    const tier3Percent = tier3Count ? ((tier3Count / tiersTotal) * 100).toFixed(2) : 0;
    const tier4Percent = tier4Count ? ((tier4Count / tiersTotal) * 100).toFixed(2) : 0;

    const pieData1 = [
      { label: 'RED', value: redCount, percent: redPercent, color: '#dd0000' },
      { label: 'YELLOW', value: yellowCount, percent: yellowPercent, color: '#f9ce15' },
      { label: 'GREEN', value: greenCount, percent: greenPercent, color: '#7dbc00' },
      { label: 'PURPLE', value: purpleCount, percent: purplePercent, color: '#873fbd' },
    ];

    const pieData2 = [
      { label: 'TIER 1', value: tier1Count, percent: tier1Percent, color: '#00afef' },
      { label: 'TIER 2', value: tier2Count, percent: tier2Percent, color: '#f78e1e' },
      { label: 'TIER 3', value: tier3Count, percent: tier3Percent, color: '#a0cf67' },
      { label: 'TIER 4', value: tier4Count, percent: tier4Percent, color: '#949ca1' },
    ];

    const defaultSource = _.find(this.props.sources, (s) => { return s.type === 'StudyKIK'; }) || '';

    const lineData = [
      {
        name: 'Patients',
        values: [{ x: 0, y: 2 }, { x: 1, y: 3 }, { x: 2, y: 1 }, { x: 3, y: 3 }, { x: 4, y: 5 }, { x: 5, y: 1 }, { x: 6, y: 3 }, { x: 7, y: 2 }, { x: 8, y: 4 }, { x: 10, y: 1 }, { x: 12, y: 3 }, { x: 13, y: 1 }, { x: 15, y: 5 }],
      },
    ];

    return (
      <div className="container-fluid admin-dashboard">
        <div className="fixed-header clearfix">
          <h2 className="main-heading pull-left">DASHBOARD</h2>
          <div className="filters-btns pull-right">
            <Button
              bsStyle="primary"
              onClick={() => this.addFilter({
                name: 'search',
                type: 'search',
                value: '',
              })}
            >
              Search
            </Button>
            <Button bsStyle="primary" onClick={this.openFiltersModal}>
              Filters
            </Button>
            <Button bsStyle="primary" onClick={this.props.updateTwilioNumbers}>
              #
            </Button>
            <Modal dialogComponentClass={CenteredModal} className="filter-modal" id="filter-modal" show={this.state.addUserModalOpen} onHide={this.closeFiltersModal}>
              <Modal.Header>
                <Modal.Title>Filters</Modal.Title>
                <a className="lightbox-close close" onClick={this.closeFiltersModal}>
                  <i className="icomoon-icon_close" />
                </a>
              </Modal.Header>
              <Modal.Body>
                <div className="holder clearfix">
                  <div className="form-lightbox">
                    <FiltersForm
                      handleSubmit={this.addUser}
                      initialValues={filtersFormValues}
                      updateFilters={this.updateFilters}
                      levels={this.props.levels}
                      siteNames={this.props.siteNames}
                      siteLocations={this.props.siteLocations}
                      indications={this.props.indications}
                      sponsors={this.props.sponsors}
                      protocols={this.props.protocols}
                      cro={this.props.cro}
                      usersByRoles={this.props.usersByRoles}
                    />
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </div>
        </div>
        <StickyContainer className={classNames('filters-section', { 'bar-active': (filters.length > 0) }, { 'filters-added': (filters.length > 0) })}>
          <FilterQueryForm
            addFilter={this.addFilter}
            clearFilters={this.clearFilters}
            filters={filters}
            removeFilter={this.removeFilter}
            resetForm={resetForm}
          />

          <div className="d-stats clearfix">
            <ul className="list-unstyled info-list  pull-left">
              <li>
                <strong className="heading">TODAY: </strong>
                <span className="number">{details.total_today || 0}</span>
              </li>
              <li>
                <strong className="heading">YESTERDAY: </strong>
                <span className="number">{details.total_yesterday || 0}</span>
              </li>
              <li>
                <strong className="heading">CAMPAIGN TOTAL: </strong>
                <span className="number">{details.total_campaign || 0}</span>
              </li>
              <li>
                <strong className="heading">GRAND TOTAL: </strong>
                <span className="number">{details.total_grand || 0}</span>
              </li>
            </ul>
            <ul className="list-unstyled info-list pull-left">
              {
                map(pieData1, (data, index) => {
                  const colorClass = data.label.toLowerCase();
                  return (
                    <li key={index}>
                      <strong className={`heading color ${colorClass}`}>{data.label}: </strong>
                      <span className="number">{data.value} <span>({`${data.percent}%`})</span></span>
                    </li>
                  );
                })
              }
            </ul>
            <div className="chart pull-left">
              { this.props.totals.fetching && <div className="dashboard-total-spinner"><LoadingSpinner showOnlyIcon /></div> }
              <PieChart
                data={pieData1}
                width={180}
                height={180}
                radius={90}
                innerRadius={0}
                sectorBorderColor="white"
                showOuterLabels={false}
                showInnerLabels={false}
                colors={(data) => data.color}
                colorAccessor={(data) => data}
              />
            </div>
            <ul className="list-unstyled info-list pull-left">
              {
                map(pieData2, (data, index) => {
                  const colorClass = data.label.toLowerCase().replace(' ', '');
                  return (
                    <li key={index}>
                      <strong className={`heading color ${colorClass}`}>{data.label}: </strong>
                      <span className="number">{data.value} <span>({`${data.percent}%`})</span></span>
                    </li>
                  );
                })
              }
            </ul>
            <div className="chart pull-left">
              <PieChart
                data={pieData2}
                width={180}
                height={180}
                radius={90}
                innerRadius={0}
                sectorBorderColor="white"
                showOuterLabels={false}
                showInnerLabels={false}
                colors={(data) => data.color}
                colorAccessor={(data) => data}
              />
            </div>
          </div>
          <div className="graph-area clearfix">
            <div className="head clearfix">
              <h2 className="pull-left">PATIENTS PER DAY</h2>
              <span className="counter pull-left">0% OF GOAL 0.49%</span>
              <Button bsStyle="primary" className="lightbox-opener pull-right" onClick={() => { this.showDateRangeModal(); }}>
                <i className="icomoon-icon_calendar" />
                {this.parseDateRange()}
              </Button>
            </div>
            <div className="graph-holder">
              <LineChart
                data={lineData}
                width="100%"
                height={130}
                viewBoxObject={{
                  x: 0,
                  y: 0,
                  width: 1800,
                  height: 150,
                }}
              />
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
                      <Button onClick={this.changeRange}>
                        Submit
                      </Button>
                    </div>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </div>
          <StudyList
            totals={this.props.totals}
            fetchStudiesAccordingToFilters={this.fetchStudiesAccordingToFilters}
            updateFilters={this.updateFilters}
            levels={this.props.levels}
            sources={this.props.sources}
            addEmailNotificationUser={this.props.addEmailNotificationUser}
            addCustomEmailNotification={this.props.addCustomEmailNotification}
            fetchStudyCampaignsDashboard={this.props.fetchStudyCampaignsDashboard}
            allCustomNotificationEmails={this.props.allCustomNotificationEmails}
            changeStudyStatusDashboard={this.props.changeStudyStatusDashboard}
            paginationOptions={this.props.paginationOptions}
            filtersFormValues={filtersFormValues}
            five9List={this.props.five9List}
            initialValues={{ 'source-search': defaultSource.id, 'campaign-search': 1 }}
          />
        </StickyContainer>
      </div>
    );
  }
}
