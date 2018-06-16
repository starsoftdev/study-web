import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { StickyContainer } from 'react-sticky';
import classNames from 'classnames';

import Filter from './index';

@reduxForm({ form: 'filterPanel', destroyOnUnmount: false })
export default class FilterQueryForm extends Component {
  static propTypes = {
    clearFilters: React.PropTypes.func.isRequired,
    filters: React.PropTypes.array.isRequired,
    removeFilter: React.PropTypes.func.isRequired,
    resetForm: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.formatFilterName = this.formatFilterName.bind(this);
  }

  formatFilterName(filter) {
    const name = filter.name;
    return { ...filter, name };
  }

  render() {
    const { filters, clearFilters, removeFilter } = this.props;
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
                  onClose={() => removeFilter(filter)}
                />
              )}
            </div>
          </div>
          <div className="gray-outline">
            <button className="pull-right btn btn-clear clear" onClick={() => clearFilters()}>
              Clear
            </button>
            <button className="pull-right btn btn-default" onClick={() => {}}>
              Apply
            </button>
          </div>
        </div>
      </StickyContainer>
    );
  }
}
