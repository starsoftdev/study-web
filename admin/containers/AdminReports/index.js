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
import { selectFilterFormValues } from './selectors';
import { clearFilters, fetchCro, fetchIndications, fetchProtocols, fetchSources, fetchSponsors, fetchUsersByRole } from '../App/actions';
import { selectCustomFilters, selectSources, selectStudiesPaginationOptions, selectTotals } from '../App/selectors';
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
    fetchSources: PropTypes.func,
    totals: PropTypes.object,
    sources: PropTypes.array,
    customFilters: PropTypes.array.isRequired,
    fetchIndications: PropTypes.func,
    fetchProtocols: PropTypes.func,
    fetchSponsors: PropTypes.func,
    fetchCro: PropTypes.func,
    fetchUsersByRole: PropTypes.func,
    clearFilters: PropTypes.func,
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
  }

  componentWillMount() {
    this.props.fetchSources();
    this.props.fetchIndications();
    this.props.fetchProtocols();
    this.props.fetchSponsors();
    this.props.fetchCro();
    this.props.fetchUsersByRole();
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

  manuallySetActiveTab(activeTab) {
    this.setState({ activateManually: activeTab });
  }

  render() {
    const { activateManually } = this.state;
    const { resetForm, totals, filtersFormValues, changeAdminFilters } = this.props;
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
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  filtersFormValues: selectFilterFormValues(),
  paginationOptions: selectStudiesPaginationOptions(),
  totals: selectTotals(),
  sources: selectSources(),
  customFilters: selectCustomFilters(),
});

const mapDispatchToProps = (dispatch) => ({
  change: (fName, name, value) => dispatch(change(fName, name, value)),
  changeAdminFilters: (name, value) => dispatch(change(formName, name, value)),
  resetForm: () => dispatch(reset(formName)),
  fetchIndications: () => dispatch(fetchIndications()),
  fetchProtocols: () => dispatch(fetchProtocols()),
  fetchSponsors: () => dispatch(fetchSponsors()),
  fetchSources: () => dispatch(fetchSources()),
  fetchUsersByRole: () => dispatch(fetchUsersByRole()),
  fetchCro: () => dispatch(fetchCro()),
  clearFilters: () => dispatch(clearFilters()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminReportsPage);
