/*
 * AdminHome
 */

import React, { Component, PropTypes } from 'react';
import { change, reset, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _ from 'lodash';

import StatsBox from '../../components/StatsBox';
import ExpandableSection from '../../components/ExpandableSection';
import FiltersPageForm from '../../components/FiltersPageForm';
import MediaStatsTable from '../../components/MediaStatsTable';
import FilterQueryForm from '../../components/Filter/FilterQueryForm';
import StudyInfo from '../../components/StudyInfo';
import { selectFilterFormValues, selectStudies, selectPaginationOptions } from './selectors';
import { fetchStudiesForAdmin, fetchTotalsForAdmin, clearFilters } from './actions';

const formName = 'adminDashboardFilters';

@reduxForm({
  form: 'adminFilter',
  enableReinitialize: true,
})
export class AdminHome extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    change: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    filtersFormValues: PropTypes.object.isRequired,
    studies: PropTypes.object,
    totals: PropTypes.object,
    fetchStudiesForAdmin: PropTypes.func,
    fetchTotalsForAdmin: PropTypes.func,
    clearFilters: PropTypes.func,
    paginationOptions: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      prevOffset: null,
      prevTotalsFilters: null,
    };

    this.fetchStudiesAccordingToFilters = this.fetchStudiesAccordingToFilters.bind(this);
  }

  componentDidMount() {
    this.fetchStudiesAccordingToFilters(null, null, true, null);
  }

  fetchStudiesAccordingToFilters(value, key, fetchByScroll, otherFiltersFormValues) {
    const { change, totals, paginationOptions, clearFilters, fetchStudiesForAdmin, fetchTotalsForAdmin, filtersFormValues } = this.props;
    const { prevTotalsFilters, prevOffset } = this.state;
    let filters = otherFiltersFormValues || _.cloneDeep(filtersFormValues);

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
      offset = paginationOptions.page * limit;
    }

    if (filters.source === -1) {
      change('dashboardFilters', 'source', null);
      delete filters.source;
    }

    if (isEmpty) {
      clearFilters();
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

  render() {
    const { resetForm, studies } = this.props;

    return (
      <div id="adminHomePage" className="admin-dashboard">
        <div className="fixed-header clearfix">
          <h1 className="main-heading pull-left">Admin portal</h1>
          <FiltersPageForm />
        </div>
        <FilterQueryForm
          resetForm={resetForm}
        />
        <StatsBox />
        <div id="mediaStatsBox">
          <ExpandableSection content={<MediaStatsTable />} />
        </div>
        <StudyInfo studies={studies} />
      </div>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  filtersFormValues: selectFilterFormValues(),
  paginationOptions: selectPaginationOptions(),
  studies: selectStudies(),
});

const mapDispatchToProps = (dispatch) => ({
  change: (formName, name, value) => dispatch(change(formName, name, value)),
  resetForm: () => dispatch(reset(formName)),
  fetchStudiesForAdmin: (params, limit, offset) => dispatch(fetchStudiesForAdmin(params, limit, offset)),
  fetchTotalsForAdmin: (params, limit, offset) => dispatch(fetchTotalsForAdmin(params, limit, offset)),
  clearFilters: () => dispatch(clearFilters()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminHome);
