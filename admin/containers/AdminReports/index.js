/*
 * AdminReports
 *
 */

import React, { Component, PropTypes } from 'react';
import { change, reset, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _, { cloneDeep, concat, findIndex, mapKeys, pullAt } from 'lodash';

import StatsBox from '../../components/StatsBox';
import FiltersPageForm from '../../components/FiltersPageForm';
import RangePopups from '../../components/RangePopups';
import FilterQueryForm from '../../components/Filter/FilterQueryForm';
import { selectFilterFormValues } from './selectors';
const formName = 'adminReportsFilters';

const mapStateToProps = createStructuredSelector({
  filtersFormValues: selectFilterFormValues(),
});

const mapDispatchToProps = (dispatch) => ({
  change: (formName, name, value) => dispatch(change(formName, name, value)),
  resetForm: () => dispatch(reset(formName)),
});

@reduxForm({
  form: 'adminFilter',
  enableReinitialize: true,
})
@connect(mapStateToProps, mapDispatchToProps)
export class AdminReports extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    change: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    filtersFormValues: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      customFilters: [],
    };

    this.addFilter = this.addFilter.bind(this);
    this.updateFilters = this.updateFilters.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
    this.removeFilter = this.removeFilter.bind(this);
    this.mapFilterValues = this.mapFilterValues.bind(this);
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
    this.props.change('adminReportsFilters', key, value);
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

      change('adminReportsFilters', 'search', []);
    } else if (filters[filter.name]) {
      pullAt(filters[filter.name], findIndex(filters[filter.name], ['label', filter.value]));
      pullAt(filters[filter.name], findIndex(filters[filter.name], ['label', 'All']));

      change('adminReportsFilters', filter.name, filters[filter.name]);
    }
  }

  mapFilterValues(filters) {
    const newFilters = [];
    mapKeys(filters, (filterValues, key) => {
      if (key !== 'campaign' && key !== 'search') {
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
    });
    return newFilters;
  }

  render() {
    const { customFilters } = this.state;
    const { resetForm, change, filtersFormValues } = this.props;

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
          resetForm={resetForm}
        />
        }
        <RangePopups />
        <StatsBox />
      </div>
    );
  }
}

export default AdminReports;
