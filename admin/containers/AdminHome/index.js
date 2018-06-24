/*
 * AdminHome
 */

import React, { Component, PropTypes } from 'react';
import { change, reset } from 'redux-form';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _ from 'lodash';

import StatsBox from '../../components/StatsBox';
import ExpandableSection from '../../components/ExpandableSection';
import FiltersPageForm from '../../components/FiltersPageForm';
import MediaStatsTable from '../../components/MediaStatsTable';
import FilterQueryForm from '../../components/Filter/FilterQueryForm';
import StudyInfo from '../../components/StudyInfo';
import { selectFilterFormValues, selectStudies, selectTotals, selectPaginationOptions, selectCustomFilters } from './selectors';
import { fetchStudiesForAdmin, fetchTotalsForAdmin, clearFilters, clearStudies } from './actions';
import { selectSources } from '../App/selectors';
import { fetchSources, fetchIndications, fetchProtocols, fetchSponsors, fetchCro, fetchUsersByRole } from '../App/actions';

const formName = 'adminDashboardFilters';

export class AdminHome extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    change: PropTypes.func.isRequired,
    changeAdminFilters: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    filtersFormValues: PropTypes.object.isRequired,
    customFilters: PropTypes.array.isRequired,
    studies: PropTypes.object,
    totals: PropTypes.object,
    fetchStudiesForAdmin: PropTypes.func,
    fetchTotalsForAdmin: PropTypes.func,
    fetchIndications: PropTypes.func,
    fetchProtocols: PropTypes.func,
    fetchSponsors: PropTypes.func,
    fetchSources: PropTypes.func,
    fetchCro: PropTypes.func,
    fetchUsersByRole: PropTypes.func,
    clearFilters: PropTypes.func,
    clearStudies: PropTypes.func,
    paginationOptions: PropTypes.object,
    sources: PropTypes.array,
  };

  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      prevOffset: null,
      prevTotalsFilters: null,
    };

    this.fetchStudiesAccordingToFilters = this.fetchStudiesAccordingToFilters.bind(this);
    this.getCurrentFilters = this.getCurrentFilters.bind(this);
  }

  componentWillMount() {
    this.props.fetchSources();
    this.props.fetchIndications();
    this.props.fetchProtocols();
    this.props.fetchSponsors();
    this.props.fetchCro();
    this.props.fetchUsersByRole();
  }

  fetchStudiesAccordingToFilters(value, key, fetchByScroll) {
    const { change, totals, paginationOptions, clearFilters, fetchStudiesForAdmin, fetchTotalsForAdmin, sources, clearStudies } = this.props;
    const { prevTotalsFilters, prevOffset } = this.state;

    const allSources = _.cloneDeep(sources);
    const defaultSource = allSources.find(s => {
      return s.type === 'StudyKIK';
    });
    let filters = this.getCurrentFilters();

    if ((value && key) || (key === 'campaign') || (key === 'source')) {
      const newFilterValues = _.cloneDeep(value);
      filters = { ...filters, [key]:newFilterValues };
    }

    let isEmpty = true;

    _.forEach(filters, (filter) => {
      if (!_.isEmpty(filter)) {
        isEmpty = false;
      }
    });

    if (defaultSource && filters.source === defaultSource.id) {
      change('dashboardFilters', 'source', defaultSource.id);
    } else if (!filters.source) {
      change('dashboardFilters', 'source', null);
    }

    let offset = 0;
    const limit = 50;

    if (fetchByScroll) {
      offset = paginationOptions.page * limit;
    } else {
      clearStudies();
    }

    if (isEmpty) {
      clearFilters();
      this.setState({ prevTotalsFilters: null });
    } else if (_.isEqual(prevTotalsFilters, filters)) {
      if (prevOffset !== offset || _.isEmpty(totals.details)) {
        fetchStudiesForAdmin(filters, limit, offset);
        fetchTotalsForAdmin(filters, limit, offset);
        this.setState({ prevOffset: offset });
      }
    } else {
      this.setState({ prevTotalsFilters: _.cloneDeep(filters) });
      fetchStudiesForAdmin(filters, limit, offset);
      fetchTotalsForAdmin(filters, limit, offset);
      this.setState({ prevOffset: offset });
    }
  }

  getCurrentFilters() {
    const { filtersFormValues, customFilters, sources } = this.props;
    const allSources = _.cloneDeep(sources);
    const defaultSource = allSources.find(s => {
      return s.type === 'StudyKIK';
    });
    let filters = _.cloneDeep(filtersFormValues);

    // adding custom filters and remove unneeded attributes
    if (filters['admin-search-type']) {
      delete filters['admin-search-type'];
    }
    if (filters['admin-search-value']) {
      delete filters['admin-search-value'];
    }
    customFilters.forEach(cf => {
      if (cf.key === 'studyNumber' && cf.value) {
        filters = { ...filters, search: { value: cf.value.trim() } };
      } else if (cf.key === 'address' && cf.value) {
        filters = { ...filters, address: { value: cf.value.trim() } };
      } else if (cf.key === 'postalCode' && cf.value) {
        filters = { ...filters, postalCode: { value: cf.value.trim() } };
      }
    });

    _.forEach(filters, (filter, k) => {
      if (k !== 'search' && k !== 'percentage' && k !== 'campaign' && k !== 'source' && k !== 'postalCode' && k !== 'address') {
        const withoutAll = _.remove(filter, (item) => (item.label !== 'All'));
        filters[k] = withoutAll;
      }
    });

    if (!filters.source && defaultSource) {
      change('dashboardFilters', 'source', defaultSource.id);
      filters.source = defaultSource.id;
    }

    if (filters.source === -1) {
      change('dashboardFilters', 'source', null);
      delete filters.source;
    }

    return filters;
  }

  render() {
    const { resetForm, studies, totals, filtersFormValues, changeAdminFilters, paginationOptions } = this.props;
    const filterUnchanged = _.isEqual(this.state.prevTotalsFilters, this.getCurrentFilters());

    return (
      <div id="adminHomePage" className="admin-dashboard">
        <div className="fixed-header clearfix">
          <h1 className="main-heading pull-left">Admin portal</h1>
          <FiltersPageForm />
        </div>
        <FilterQueryForm
          resetForm={resetForm}
          changeAdminFilters={changeAdminFilters}
          fetchStudiesAccordingToFilters={this.fetchStudiesAccordingToFilters}
          filterUnchanged={filterUnchanged}
        />
        <StatsBox />
        <div id="mediaStatsBox">
          <ExpandableSection content={<MediaStatsTable />} />
        </div>
        <StudyInfo
          studies={studies}
          totals={totals}
          filtersFormValues={filtersFormValues}
          paginationOptions={paginationOptions}
          fetchStudiesAccordingToFilters={this.fetchStudiesAccordingToFilters}
        />
      </div>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  filtersFormValues: selectFilterFormValues(),
  paginationOptions: selectPaginationOptions(),
  studies: selectStudies(),
  totals: selectTotals(),
  sources: selectSources(),
  customFilters: selectCustomFilters(),
});

const mapDispatchToProps = (dispatch) => ({
  change: (fName, name, value) => dispatch(change(fName, name, value)),
  changeAdminFilters: (name, value) => dispatch(change(formName, name, value)),
  resetForm: () => dispatch(reset(formName)),
  fetchStudiesForAdmin: (params, limit, offset) => dispatch(fetchStudiesForAdmin(params, limit, offset)),
  fetchTotalsForAdmin: (params, limit, offset) => dispatch(fetchTotalsForAdmin(params, limit, offset)),
  fetchIndications: () => dispatch(fetchIndications()),
  fetchProtocols: () => dispatch(fetchProtocols()),
  fetchSponsors: () => dispatch(fetchSponsors()),
  fetchSources: () => dispatch(fetchSources()),
  fetchUsersByRole: () => dispatch(fetchUsersByRole()),
  fetchCro: () => dispatch(fetchCro()),
  clearFilters: () => dispatch(clearFilters()),
  clearStudies: () => dispatch(clearStudies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminHome);
