import React, { Component, PropTypes } from 'react';
import { change, Field, reduxForm } from 'redux-form';
import { cloneDeep, concat, findIndex, mapKeys, pullAt } from 'lodash';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { StickyContainer } from 'react-sticky';
import classNames from 'classnames';

import Filter from './index';
import { clearCustomFilters, removeCustomFilter } from '../../containers/AdminHome/actions';
import { selectCustomFilters, selectFilterFormValues } from '../../containers/AdminHome/selectors';

@reduxForm({ form: 'filterPanel', destroyOnUnmount: false })
export class FilterQueryForm extends Component {
  static propTypes = {
    resetForm: React.PropTypes.func.isRequired,
    change: React.PropTypes.func.isRequired,
    clearCustomFilters: React.PropTypes.func.isRequired,
    removeCustomFilter: React.PropTypes.func.isRequired,
    fetchStudiesAccordingToFilters: React.PropTypes.func.isRequired,
    filtersFormValues: PropTypes.object.isRequired,
    customFilters: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);

    this.formatFilterName = this.formatFilterName.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
    this.removeFilter = this.removeFilter.bind(this);
    this.mapFilterValues = this.mapFilterValues.bind(this);
  }

  formatFilterName(filter) {
    const name = filter.name;
    return { ...filter, name };
  }

  clearFilters() {
    const { resetForm, clearCustomFilters } = this.props;
    clearCustomFilters();
    resetForm();
  }

  removeFilter(filter) {
    const { removeCustomFilter, change, filtersFormValues } = this.props;
    const filters = cloneDeep(filtersFormValues);

    if (filter.type === 'search') {
      removeCustomFilter(filter);

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

  render() {
    const { filtersFormValues, customFilters, fetchStudiesAccordingToFilters } = this.props;

    const filters = concat(this.mapFilterValues(filtersFormValues), customFilters);
    if (filters.length > 0) {
      return (
        <StickyContainer className={classNames('filters-section', { 'bar-active': (filters.length > 0) }, { 'filters-added': (filters.length > 0) })}>
          <div className="filters-bar">
            <div className="filters-holder search-filters">
              <strong className="title">FILTERS</strong>
              <div className="holder">
                {filters.map((filter, index) =>
                  <Field
                    name={filter.name}
                    key={index}
                    options={this.formatFilterName(filter)}
                    component={Filter}
                    onClose={() => this.removeFilter(filter)}
                  />
                )}
              </div>
            </div>
            <div className="gray-outline">
              <button className="pull-right btn btn-clear clear" onClick={() => this.clearFilters()}>
                Clear
              </button>
              <button className="pull-right btn btn-default" onClick={() => fetchStudiesAccordingToFilters(null, null, false, null)}>
                Apply
              </button>
            </div>
          </div>
        </StickyContainer>
      );
    } else {
      return null;
    }
  }
}


const mapStateToProps = createStructuredSelector({
  filtersFormValues: selectFilterFormValues(),
  customFilters: selectCustomFilters(),
});

const mapDispatchToProps = (dispatch) => ({
  change: (formName, name, value) => dispatch(change(formName, name, value)),
  clearCustomFilters: () => dispatch(clearCustomFilters()),
  removeCustomFilter: (filter) => dispatch(removeCustomFilter(filter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterQueryForm);
