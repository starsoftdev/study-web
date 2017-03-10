import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Modal } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import classNames from 'classnames';
import Button from 'react-bootstrap/lib/Button';
import { StickyContainer } from 'react-sticky';
import { map, mapKeys, concat, findIndex, pullAt } from 'lodash';
import './styles.less';
import CenteredModal from '../../../components/CenteredModal';
import FiltersForm from './FiltersForm';
import StudyList from './StudyList';
import Filter from '../../../components/Filter';
// import { selectFilterFormValues } from './FiltersForm/selectors';
import { selectFilterFormValues } from './selectors';
import rd3 from 'react-d3';
import moment from 'moment-timezone';
import { defaultRanges, DateRange } from 'react-date-range';

const PieChart = rd3.PieChart;
const LineChart = rd3.LineChart;

@reduxForm({ form: 'filterPanel', destroyOnUnmount: false })
export class AdminDashboard extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    filtersFormValues: PropTypes.object,
    paginationOptions: PropTypes.object,
    studies: PropTypes.array,
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
    console.log('add filter', newOptions);
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
      this.setState({ modalFilters });
    }
  }

  saveFilters() {

  }

  clearFilters() {
    this.setState({ customFilters: [],
      modalFilters: [] });
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
    let newFilters = [];
    mapKeys(filters, (filterValues, key) => {
      newFilters = concat(newFilters, map(filterValues, (v) => ({
        name: key,
        type: key === 'percentage' ? 'compare' : 'value',
        value: v.label,
      })));
    });

    return newFilters;
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

    console.log('render filter', filters);
    const pieData1 = [
      { label: 'RED', value: 179, percent: 37.61, color: '#dd0000' },
      { label: 'YELLOW', value: 107, percent: 22.48, color: '#f9ce15' },
      { label: 'GREEN', value: 165, percent: 34.66, color: '#7dbc00' },
      { label: 'PURPLE', value: 25, percent: 5.25, color: '#873fbd' },
    ];

    const pieData2 = [
      { label: 'TIER 1', value: 261, percent: 54.52, color: '#00afef' },
      { label: 'TIER 2', value: 78, percent: 17.49, color: '#f78e1e' },
      { label: 'TIER 3', value: 65, percent: 14.57, color: '#a0cf67' },
      { label: 'TIER 4', value: 42, percent: 9.42, color: '#949ca1' },
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
                      onChange={(e) => { console.log('onChange-filter', e); }}
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
                <span className="number">308</span>
              </li>
              <li>
                <strong className="heading">YESTERDAY: </strong>
                <span className="number">749</span>
              </li>
              <li>
                <strong className="heading">CAMPAIGN TOTAL: </strong>
                <span className="number">275390</span>
              </li>
              <li>
                <strong className="heading">GRAND TOTAL: </strong>
                <span className="number">476</span>
              </li>
            </ul>
            <ul className="list-unstyled info-list pull-left">
              {
                map(pieData1, (data, index) => {
                  const colorClass = data.label.toLowerCase();
                  return (
                    <li key={index}>
                      <strong className={`heading color ${colorClass}`}>{data.label}: </strong>
                      <span className="number">{data.value} <span>({data.percent})</span></span>
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
                      <span className="number">{data.value} <span>({data.percent})</span></span>
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
          <StudyList />
        </StickyContainer>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  filtersFormValues: selectFilterFormValues(),
});

export default connect(mapStateToProps)(AdminDashboard);
