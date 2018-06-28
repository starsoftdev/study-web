/*
 * AdminReports
 *
 */

import React, { Component, PropTypes } from 'react';
import { change, reset, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _ from 'lodash';

import StatsBox from '../../components/StatsBox';
import FiltersPageForm from '../../components/FiltersPageForm';
import ReportTabs from '../../components/ReportTabs';
import RangePopups from '../../components/RangePopups';
import FilterQueryForm from '../../components/Filter/FilterQueryForm';
import {
  clearCustomFilters, clearFilters, clearStudies, fetchCro, fetchIndications, fetchProtocols, fetchSources,
  fetchSponsors, fetchStudiesForAdmin, fetchTotalsForAdmin, fetchUsersByRole,
} from '../App/actions';
import { selectCustomFilters, selectSources, selectStudiesPaginationOptions, selectTotals, selectFilterFormValues,
  selectMediaTotals, selectStudies,
} from '../App/selectors';
const formName = 'adminReportsFilters';

@reduxForm({
  form: 'adminFilter',
  enableReinitialize: true,
})
export class AdminReportsPage extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    change: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    filtersFormValues: PropTypes.object.isRequired,
    changeAdminFilters: PropTypes.func.isRequired,
    fetchStudiesForAdmin: PropTypes.func,
    fetchTotalsForAdmin: PropTypes.func,
    fetchSources: PropTypes.func,
    studies: PropTypes.object,
    totals: PropTypes.object,
    mediaTotals: PropTypes.object,
    sources: PropTypes.array,
    indications: PropTypes.array,
    protocols: PropTypes.object,
    sponsors: PropTypes.object,
    cro: PropTypes.object,
    usersByRoles: PropTypes.object,
    customFilters: PropTypes.array.isRequired,
    fetchIndications: PropTypes.func,
    fetchProtocols: PropTypes.func,
    fetchSponsors: PropTypes.func,
    fetchCro: PropTypes.func,
    fetchUsersByRole: PropTypes.func,
    clearFilters: PropTypes.func,
    clearStudies: PropTypes.func,
    clearCustomFilters: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      activateManually: null,
      prevTotalsFilters: null,
    };

    this.manuallySetActiveTab = this.manuallySetActiveTab.bind(this);
    this.getCurrentFilters = this.getCurrentFilters.bind(this);
    this.applyFilters = this.applyFilters.bind(this);
    this.clearFiltersAndClean = this.clearFiltersAndClean.bind(this);
  }

  componentWillMount() {
    const { sources, fetchSources, indications, fetchIndications, protocols, fetchProtocols, sponsors, fetchSponsors,
      cro, fetchCro, usersByRoles, fetchUsersByRole } = this.props;
    if (!sources || sources.length) {
      fetchSources();
    }
    if (!indications || !indications.length) {
      fetchIndications();
    }
    if (!protocols || !protocols.details.length) {
      fetchProtocols();
    }
    if (!sponsors || !sponsors.details.length) {
      fetchSponsors();
    }
    if (!cro || !cro.details.length) {
      fetchCro();
    }
    if (!usersByRoles || ![...usersByRoles.sm, ...usersByRoles.bd, ...usersByRoles.ae, ...usersByRoles.cc].length) {
      fetchUsersByRole();
    }
    this.applyFilters();
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

  applyFilters() {
    const { change, totals, clearFilters, fetchTotalsForAdmin, fetchStudiesForAdmin, sources } = this.props;
    const { prevTotalsFilters } = this.state;

    const allSources = _.cloneDeep(sources);
    const defaultSource = allSources.find(s => {
      return s.type === 'StudyKIK';
    });
    const filters = this.getCurrentFilters();
    let isEmpty = true;

    _.forEach(filters, (filter) => {
      if (!_.isEmpty(filter)) {
        isEmpty = false;
      }
    });

    const offset = 0;
    const limit = 50;

    if (defaultSource && filters.source === defaultSource.id) {
      change('dashboardFilters', 'source', defaultSource.id);
    } else if (!filters.source) {
      change('dashboardFilters', 'source', null);
    }

    if (isEmpty) {
      clearFilters();
      this.setState({ prevTotalsFilters: null });
    } else if (_.isEqual(prevTotalsFilters, filters)) {
      if (_.isEmpty(totals.details)) {
        fetchTotalsForAdmin(filters);
        fetchStudiesForAdmin(filters, limit, offset);
      }
    } else {
      this.setState({ prevTotalsFilters: _.cloneDeep(filters) });
      fetchTotalsForAdmin(filters);
      fetchStudiesForAdmin(filters, limit, offset);
    }
  }

  manuallySetActiveTab(activeTab) {
    this.setState({ activateManually: activeTab });
  }

  clearFiltersAndClean() {
    const { resetForm, clearCustomFilters, clearStudies } = this.props;
    clearCustomFilters();
    resetForm();
    clearStudies();
    this.setState({ prevTotalsFilters: null });
  }

  render() {
    const { activateManually } = this.state;
    const { resetForm, totals, filtersFormValues, changeAdminFilters, mediaTotals, studies } = this.props;
    const filterUnchanged = _.isEqual(this.state.prevTotalsFilters, this.getCurrentFilters());

    const campaignSelected = (typeof filtersFormValues.campaign === 'string');

    return (
      <div id="adminHomePage" className="admin-dashboard">
        <div className="fixed-header clearfix">
          <h1 className="main-heading pull-left">Admin portal</h1>
          <FiltersPageForm />
        </div>
        <FilterQueryForm
          resetForm={resetForm}
          changeAdminFilters={changeAdminFilters}
          applyFilters={this.applyFilters}
          clearFilters={this.clearFiltersAndClean}
          filterUnchanged={filterUnchanged}
        />
        <RangePopups
          manuallySetActiveTab={this.manuallySetActiveTab}
        />
        <StatsBox
          totals={totals}
          campainSelected={campaignSelected}
        />
        <ReportTabs
          activateManually={activateManually}
          mediaTotals={mediaTotals}
          studies={studies}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  filtersFormValues: selectFilterFormValues(),
  paginationOptions: selectStudiesPaginationOptions(),
  totals: selectTotals(),
  studies: selectStudies(),
  mediaTotals: selectMediaTotals(),
  sources: selectSources(),
  customFilters: selectCustomFilters(),
});

const mapDispatchToProps = (dispatch) => ({
  change: (fName, name, value) => dispatch(change(fName, name, value)),
  changeAdminFilters: (name, value) => dispatch(change(formName, name, value)),
  fetchStudiesForAdmin: (params, limit, offset) => dispatch(fetchStudiesForAdmin(params, limit, offset)),
  fetchTotalsForAdmin: (params, limit, offset) => dispatch(fetchTotalsForAdmin(params, limit, offset)),
  resetForm: () => dispatch(reset(formName)),
  fetchIndications: () => dispatch(fetchIndications()),
  fetchProtocols: () => dispatch(fetchProtocols()),
  fetchSponsors: () => dispatch(fetchSponsors()),
  fetchSources: () => dispatch(fetchSources()),
  fetchUsersByRole: () => dispatch(fetchUsersByRole()),
  fetchCro: () => dispatch(fetchCro()),
  clearFilters: () => dispatch(clearFilters()),
  clearStudies: () => dispatch(clearStudies()),
  clearCustomFilters: () => dispatch(clearCustomFilters()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminReportsPage);
