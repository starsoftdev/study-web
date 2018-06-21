/*
 * AdminHome
 *
 */

import React, { Component, PropTypes } from 'react';
import { change, reset, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { cloneDeep, concat, findIndex, mapKeys, pullAt } from 'lodash';

import StatsBox from '../../components/StatsBox';
import ExpandableSection from '../../components/ExpandableSection';
import FiltersPageForm from '../../components/FiltersPageForm';
import MediaStatsTable from '../../components/MediaStatsTable';
import FilterQueryForm from '../../components/Filter/FilterQueryForm';
import StudyInfo from '../../components/StudyInfo';
import { fetchTotalsAdmin, fetchStudiesAdmin, fetchSources } from './actions';
import { selectFilterFormValues, selectStudiesTotals, selectStudies, selectSources } from './selectors';
const formName = 'adminDashboardFilters';

const mapStateToProps = createStructuredSelector({
  filtersFormValues: selectFilterFormValues(),
  totals: selectStudiesTotals(),
  studies: selectStudies(),
  sources: selectSources(),
});

const mapDispatchToProps = (dispatch) => ({
  change: (formName, name, value) => dispatch(change(formName, name, value)),
  resetForm: () => dispatch(reset(formName)),
  fetchTotalsAdmin: (filters, limit, offset) => dispatch(fetchTotalsAdmin(filters, limit, offset)),
  fetchStudiesAdmin: (params, limit, offset) => dispatch(fetchStudiesAdmin(params, limit, offset)),
  fetchSources: () => dispatch(fetchSources()),
});

@reduxForm({
  form: 'adminFilter',
  enableReinitialize: true,
})
@connect(mapStateToProps, mapDispatchToProps)
export class AdminHomePage extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    change: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    fetchTotalsAdmin: PropTypes.func.isRequired,
    fetchStudiesAdmin: PropTypes.func,
    fetchSources: PropTypes.func,
    totals: PropTypes.object,
    studies: PropTypes.object,
    sources: PropTypes.array,
    filtersFormValues: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      customFilters: [],
      prevOffset: null,
    };

    this.addFilter = this.addFilter.bind(this);
    this.updateFilters = this.updateFilters.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
    this.removeFilter = this.removeFilter.bind(this);
    this.mapFilterValues = this.mapFilterValues.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setDates = this.setDates.bind(this);
  }

  componentDidMount() {
    const filters = this.props.filtersFormValues;
    const defaultSource = { id: 1 };
    const offset = 0;
    const limit = 1000000; // temp value before API didn't change

    filters.source = defaultSource.id;

    // TODO: need to fetch data from another custom API endpoints instead of existed ones
    this.props.fetchSources();
    this.props.fetchTotalsAdmin(filters, limit, offset);
    this.props.fetchStudiesAdmin(filters, limit, offset);
  }

  componentWillReceiveProps(newProps) {
    console.log('componentWillReceiveProps', newProps.filtersFormValues);

    if (newProps.filtersFormValues.campaign !== this.props.filtersFormValues.campaign) {
      const offset = 0;
      const limit = 1000000; // temp value before API didn't change
      this.props.fetchTotalsAdmin({ ...newProps.filtersFormValues, source: 1 }, limit, offset);
    }
  }

  addFilter(options) {
    const { customFilters } = this.state;
    if (customFilters.length === 0) {
      const newOptions = {
        ...options,
        onClose: () => this.removeFilter({ name: 'search' }),
      };
      customFilters.push(newOptions);
      this.setState({ customFilters });
    }
  }

  updateFilters(key, value) {
    this.props.change('adminDashboardFilters', key, value);
  }

  clearFilters() {
    const { resetForm } = this.props;
    this.setState({
      customFilters: [],
    });
    resetForm();
  }

  removeFilter(filter) {
    const { customFilters } = this.state;
    const { change, filtersFormValues } = this.props;
    const filters = cloneDeep(filtersFormValues);

    if (filter.type === 'search') {
      pullAt(customFilters, findIndex(customFilters, filter));
      this.setState({ customFilters });

      change('adminDashboardFilters', 'search', []);
    } else if (filters[filter.name]) {
      pullAt(filters[filter.name], findIndex(filters[filter.name], ['label', filter.value]));
      pullAt(filters[filter.name], findIndex(filters[filter.name], ['label', 'All']));

      change('adminDashboardFilters', filter.name, filters[filter.name]);
    }
  }

  mapFilterValues(filters) {
    const newFilters = [];
    mapKeys(filters, (filterValues, key) => {
      if (key !== 'campaign' && key !== 'search') {
        filterValues.forEach(v => {
          if ((v.label !== 'All') || (v.label === 'All' && filterValues.length === 1)) {
            newFilters.push({
              name: key,
              type: 'value',
              value: v.label,
            });
          }
        });
      }
    });
    return newFilters;
  }

  setDates(startDate, endDate)  {
    console.log('setDates', startDate, endDate);
  }

  handleSubmit()  {
    const filters = cloneDeep(this.props.filtersFormValues);
    const defaultSource = { id: 1 };
    const offset = 0;
    const limit = 50;

    filters.source = defaultSource.id;

    this.props.fetchTotalsAdmin(filters, limit, offset);
    this.setState({ prevOffset: offset });
  }

  render() {
    const { resetForm, change, filtersFormValues, totals, studies, sources } = this.props;
    const { customFilters } = this.state;

    const campaingSelected = (typeof filtersFormValues.campaign === 'string');

    const filters = concat(this.mapFilterValues(filtersFormValues), customFilters);
    return (
      <div id="adminHomePage" className="admin-dashboard">
        <div className="fixed-header clearfix">
          <h1 className="main-heading pull-left">Admin portal</h1>
          <FiltersPageForm
            change={change}
            resetForm={resetForm}
            updateFilters={this.updateFilters}
            addFilter={this.addFilter}
            filtersFormValues={filtersFormValues}
          />
        </div>
        {(filters.length > 0) &&
          <FilterQueryForm
            clearFilters={this.clearFilters}
            filters={filters}
            removeFilter={this.removeFilter}
            handleSubmit={this.handleSubmit}
            resetForm={resetForm}
          />
        }
        <StatsBox
          totals={totals}
          campaingSelected={campaingSelected}
        />
        <div id="mediaStatsBox">
          <ExpandableSection
            content={
              <MediaStatsTable
                campaingSelected={campaingSelected}
                studies={studies}
                sources={sources}
              />
            }
          />
        </div>
        <StudyInfo
          totals={totals}
          setDates={this.setDates}
          updateFilters={this.updateFilters}
        />
      </div>
    );
  }
}

export default AdminHomePage;
