import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Modal } from 'react-bootstrap';
import { Field, reduxForm, reset, change } from 'redux-form';
import classNames from 'classnames';
import Button from 'react-bootstrap/lib/Button';
import { StickyContainer } from 'react-sticky';
import _, { map, mapKeys, concat, findIndex, pullAt } from 'lodash';
import './styles.less';
import CenteredModal from '../../../components/CenteredModal';
import FiltersForm from './FiltersForm';
import StudyList from './StudyList';
import Filter from '../../../components/Filter';
// import { selectFilterFormValues } from './FiltersForm/selectors';
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
  selectStudyUpdateProcess,
  selectAllClientUsers,
  selectEditStudyValues,
  selectMessagingNumbers,
} from './selectors';
import rd3 from 'react-d3';
import moment from 'moment-timezone';
import { defaultRanges, DateRange } from 'react-date-range';
import {
  fetchStudiesDashboard,
  fetchSiteNames,
  fetchSiteLocations,
  updateDashboardStudy,
  clearFilters,
  fetchAllClientUsersDashboard,
  fetchStudyCampaignsDashboard,
  changeStudyStatusDashboard,
  toggleStudy,
  fetchMessagingNumbersDashboard,
} from './actions';
import { fetchLevels, fetchIndications, fetchSponsors, fetchProtocols, fetchCro, fetchUsersByRole, addEmailNotificationUser } from '../../App/actions';

const PieChart = rd3.PieChart;
const LineChart = rd3.LineChart;

@reduxForm({ form: 'filterPanel', destroyOnUnmount: false })
export class AdminDashboard extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    dispatch: PropTypes.func,
    filtersFormValues: PropTypes.object,
    paginationOptions: PropTypes.object,
    studies: PropTypes.array,
    resetForm: PropTypes.func,
    fetchStudiesDashboard: PropTypes.func,
    fetchLevels: PropTypes.func,
    levels: PropTypes.array,
    fetchSiteLocations: PropTypes.func,
    fetchSiteNames: PropTypes.func,
    siteNames: PropTypes.array,
    siteLocations: PropTypes.array,
    fetchIndications: PropTypes.func,
    indications: PropTypes.array,
    fetchSponsors: PropTypes.func,
    fetchProtocols: PropTypes.func,
    fetchCro: PropTypes.func,
    sponsors: PropTypes.array,
    protocols: PropTypes.array,
    cro: PropTypes.array,
    fetchUsersByRole: PropTypes.func,
    usersByRoles: PropTypes.object,
    totals: PropTypes.object,
    updateDashboardStudy: PropTypes.func,
    clearFilters: PropTypes.func,
    studyUpdateProcess: PropTypes.object,
    fetchAllClientUsersDashboard: PropTypes.func,
    allClientUsers: PropTypes.object,
    editStudyValues: PropTypes.object,
    addEmailNotificationUser: PropTypes.func,
    fetchStudyCampaignsDashboard: PropTypes.func,
    changeStudyStatusDashboard: PropTypes.func,
    toggleStudy: PropTypes.func,
    fetchMessagingNumbersDashboard: PropTypes.func,
    messagingNumbers: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      customFilters: [],
      modalFilters: props.filtersFormValues ? props.filtersFormValues : [],
      showDateRangeModal: false,
      rangePicker : {},
      datePicker : null,
      firstDayOfWeek : null,
      dateRange : {
        startDate: moment().clone().subtract(30, 'days'),
        endDate: moment(),
      },
    };

    this.addFilter = this.addFilter.bind(this);
    this.removeFilter = this.removeFilter.bind(this);
    this.openFiltersModal = this.openFiltersModal.bind(this);
    this.closeFiltersModal = this.closeFiltersModal.bind(this);
    this.saveFilters = this.saveFilters.bind(this);
    this.handleChange = this.handleChange.bind(this, 'dateRange');
    this.showDateRangeModal = this.showDateRangeModal.bind(this);
    this.hideDateRangeModal = this.hideDateRangeModal.bind(this);
    this.changeRange = this.changeRange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.fetchStudiesAccordingToFilters = this.fetchStudiesAccordingToFilters.bind(this);
    this.percentageFilterChange = this.percentageFilterChange.bind(this);
    this.percentageFilterSubmit = this.percentageFilterSubmit.bind(this);
  }

  componentWillMount() {
    this.props.fetchLevels();
    this.props.fetchSiteNames();
    this.props.fetchSiteLocations();
    this.props.fetchIndications();
    this.props.fetchSponsors();
    this.props.fetchProtocols();
    this.props.fetchCro();
    this.props.fetchUsersByRole();
    this.props.fetchMessagingNumbersDashboard();
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      modalFilters: newProps.filtersFormValues,
    });
  }

  addFilter(options) {
    const { customFilters } = this.state;
    const newOptions = {
      ...options,
      name: options.name + customFilters.length,
    };
    customFilters.push(newOptions);
    this.setState({ customFilters });
  }

  removeFilter(filter) {
    const { customFilters, modalFilters } = this.state;

    if (filter.type === 'search') {
      pullAt(customFilters, findIndex(customFilters, filter));
      this.setState({ customFilters });
      return;
    }

    if (modalFilters[filter.name]) {
      pullAt(modalFilters[filter.name], findIndex(modalFilters[filter.name], ['label', filter.value]));
      pullAt(modalFilters[filter.name], findIndex(modalFilters[filter.name], ['label', 'All']));
      this.setState({ modalFilters });
    }
  }

  saveFilters() {

  }

  clearFilters() {
    this.props.clearFilters();
    this.setState({ customFilters: [],
      modalFilters: [] });
    this.props.resetForm();
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
    this.setState({
      [which] : payload,
    });
  }

  parseDateRange() {
    const { startDate, endDate } = this.state.dateRange;
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
      if (key !== 'campaign') {
        if (key === 'percentage') {
          newFilters.push({
            name: key,
            type: key === 'percentage' ? 'compare' : 'value',
            value: filterValues.value,
            onChange: this.percentageFilterChange,
            onSubmit: this.percentageFilterSubmit,
          });
        } else {
          _.forEach(filterValues, (v) => {
            if (v.label !== 'All') {
              newFilters.push({
                name: key,
                type: key === 'percentage' ? 'compare' : 'value',
                value: v.label,
              });
            }
          });
        }
      }
    });
    return newFilters;
  }

  fetchStudiesAccordingToFilters(value, key) {
    let filters = _.cloneDeep(this.props.filtersFormValues);
    const newFilterValues = _.cloneDeep(value);
    filters = { ...filters, [key]:newFilterValues };

    let isEmpty = true;

    _.forEach(filters, (filter, key) => {
      const initFilter = _.cloneDeep(filter);
      if (key !== 'percentage' && key !== 'campaign') {
        const withoutAll = _.remove(filter, (item) => (item.label !== 'All'));
        filters[key] = withoutAll;
      }

      if (!_.isEmpty(initFilter)) {
        isEmpty = false;
      }
    });

    if (isEmpty) {
      this.props.clearFilters();
    } else {
      this.props.fetchStudiesDashboard(filters);
    }
  }

  percentageFilterChange(e) {
    this.props.dispatch(change('dashboardFilters', 'percentage', e));
  }

  percentageFilterSubmit(e) {
    this.props.dispatch(change('dashboardFilters', 'percentage', { ...this.props.filtersFormValues.percentage, arg: e }));
    this.fetchStudiesAccordingToFilters({ ...this.props.filtersFormValues.percentage, arg: e }, 'percentage');
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
    const { customFilters, modalFilters } = this.state;

    const filters = concat(this.mapFilterValues(modalFilters), customFilters);

    const redCount = parseInt(this.props.totals.details.total_red) || 0;
    const yellowCount = parseInt(this.props.totals.details.total_yellow) || 0;
    const greenCount = parseInt(this.props.totals.details.total_green) || 0;
    const purpleCount = parseInt(this.props.totals.details.total_purple) || 0;

    const colorsTotal = redCount + yellowCount + greenCount + purpleCount;

    const redPercent = redCount ? (redCount / colorsTotal) * 100 : 0;
    const yellowPercent = yellowCount ? (yellowCount / colorsTotal) * 100 : 0;
    const greenPercent = greenCount ? (greenCount / colorsTotal) * 100 : 0;
    const purplePercent = purpleCount ? (purpleCount / colorsTotal) * 100 : 0;

    const tier1Count = parseInt(this.props.totals.details.total_tier_one) || 0;
    const tier2Count = parseInt(this.props.totals.details.total_tier_two) || 0;
    const tier3Count = parseInt(this.props.totals.details.total_tier_three) || 0;
    const tier4Count = parseInt(this.props.totals.details.total_tier_four) || 0;

    const tiersTotal = tier1Count + tier2Count + tier3Count + tier4Count;

    const tier1Percent = tier1Count ? (tier1Count / tiersTotal) * 100 : 0;
    const tier2Percent = tier2Count ? (tier2Count / tiersTotal) * 100 : 0;
    const tier3Percent = tier3Count ? (tier3Count / tiersTotal) * 100 : 0;
    const tier4Percent = tier4Count ? (tier4Count / tiersTotal) * 100 : 0;

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

    const lineData = [
      {
        name: 'Patients',
        values: [{ x: 0, y: 2 }, { x: 1, y: 3 }, { x: 2, y: 1 }, { x: 3, y: 3 }, { x: 4, y: 5 }, { x: 5, y: 1 }, { x: 6, y: 3 }, { x: 7, y: 2 }, { x: 8, y: 4 }, { x: 10, y: 1 }, { x: 12, y: 3 }, { x: 13, y: 1 }, { x: 15, y: 5 }],
      },
    ];

    return (
      <div className="container-fluid admin-dashboard">
        <div className="fixed-header clearfix">
          <h2 className="main-heading pull-left">STUDYKIK DASHBOARD</h2>
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
            <Modal dialogComponentclassName={CenteredModal} className="filter-modal" id="filter-modal" show={this.state.addUserModalOpen} onHide={this.closeFiltersModal}>
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
                      initialValues={this.props.filtersFormValues}
                      fetchStudiesAccordingToFilters={this.fetchStudiesAccordingToFilters}
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
          {(filters.length > 0) && (
            <div className="filters-bar">
              <div className="filters-holder search-filters">
                <strong className="title">FILTERS</strong>
                <div className="btns pull-right">
                  <Button bsStyle="primary" onClick={() => this.saveFilters()}>
                    Save Filters
                  </Button>
                  <Button bsStyle="primary" onClick={() => this.clearFilters()}>
                    Clear
                  </Button>
                </div>
                <div className="holder">
                  {filters.map((filter, index) =>
                    <Field
                      name={filter.name}
                      key={index}
                      options={filter}
                      component={Filter}
                      onClose={() => this.removeFilter(filter)}
                      onChange={(e) => {
                        if (filter.onChange) {
                          filter.onChange(e);
                        }
                      }}
                      onSubmit={(e) => {
                        if (filter.onSubmit) {
                          filter.onSubmit(e);
                        }
                      }

                      }
                    />
                  )}
                  <Button
                    bsStyle="primary"
                    className="add-new-filters btn btn-primary"
                    onClick={() => this.addFilter({
                      name: 'search',
                      type: 'search',
                      value: '',
                    })}
                  ><i className="glyphicon glyphicon-plus"></i></Button>
                </div>
              </div>
            </div>
          )}

          <div className="d-stats clearfix">
            <ul className="list-unstyled info-list  pull-left">
              <li>
                <strong className="heading">TODAY: </strong>
                <span className="number">{this.props.totals.details.total_today || 0}</span>
              </li>
              <li>
                <strong className="heading">YESTERDAY: </strong>
                <span className="number">{this.props.totals.details.total_yesterday || 0}</span>
              </li>
              <li>
                <strong className="heading">CAMPAIGN TOTAL: </strong>
                <span className="number">{this.props.totals.details.total_campaign || 0}</span>
              </li>
              <li>
                <strong className="heading">GRAND TOTAL: </strong>
                <span className="number">{this.props.totals.details.total_grand || 0}</span>
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
                <i className="icomoon-icon_calendar"></i>
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
            usersByRoles={this.props.usersByRoles}
            updateDashboardStudy={this.props.updateDashboardStudy}
            siteLocations={this.props.siteLocations}
            sponsors={this.props.sponsors}
            protocols={this.props.protocols}
            cro={this.props.cro}
            levels={this.props.levels}
            indications={this.props.indications}
            studyUpdateProcess={this.props.studyUpdateProcess}
            fetchAllClientUsersDashboard={this.props.fetchAllClientUsersDashboard}
            allClientUsers={this.props.allClientUsers}
            editStudyValues={this.props.editStudyValues}
            addEmailNotificationUser={this.props.addEmailNotificationUser}
            fetchStudyCampaignsDashboard={this.props.fetchStudyCampaignsDashboard}
            changeStudyStatusDashboard={this.props.changeStudyStatusDashboard}
            toggleStudy={this.props.toggleStudy}
            messagingNumbers={this.props.messagingNumbers}
          />
        </StickyContainer>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  filtersFormValues: selectFilterFormValues(),
  levels: selectLevels(),
  siteNames: selectSiteNames(),
  siteLocations: selectSiteLocations(),
  indications: selectIndications(),
  sponsors: selectSponsors(),
  protocols: selectProtocols(),
  cro: selectCro(),
  usersByRoles: selectUsersByRoles(),
  totals: selectStudiesTotals(),
  studyUpdateProcess: selectStudyUpdateProcess(),
  allClientUsers: selectAllClientUsers(),
  editStudyValues: selectEditStudyValues(),
  messagingNumbers: selectMessagingNumbers(),
});

function mapDispatchToProps(dispatch) {
  return {
    resetForm: () => dispatch(reset('dashboardFilters')),
    fetchStudiesDashboard: (params) => dispatch(fetchStudiesDashboard(params)),
    fetchLevels: () => dispatch(fetchLevels()),
    fetchSiteNames: () => dispatch(fetchSiteNames()),
    fetchSiteLocations: () => dispatch(fetchSiteLocations()),
    fetchIndications: () => dispatch(fetchIndications()),
    fetchSponsors: () => dispatch(fetchSponsors()),
    fetchProtocols: () => dispatch(fetchProtocols()),
    fetchCro: () => dispatch(fetchCro()),
    fetchUsersByRole: () => dispatch(fetchUsersByRole()),
    updateDashboardStudy: (params) => dispatch(updateDashboardStudy(params)),
    clearFilters: () => dispatch(clearFilters()),
    fetchAllClientUsersDashboard: (params) => dispatch(fetchAllClientUsersDashboard(params)),
    addEmailNotificationUser: (payload) => dispatch(addEmailNotificationUser(payload)),
    fetchStudyCampaignsDashboard: (params) => dispatch(fetchStudyCampaignsDashboard(params)),
    changeStudyStatusDashboard: (params, status, isChecked) => dispatch(changeStudyStatusDashboard(params, status, isChecked)),
    toggleStudy: (id, status) => dispatch(toggleStudy(id, status)),
    fetchMessagingNumbersDashboard: () => dispatch(fetchMessagingNumbersDashboard()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);
