import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from 'react-bootstrap/lib/Button';

import Filter from './index';

@reduxForm({ form: 'filterPanel', destroyOnUnmount: false })
export default class FilterQueryForm extends React.Component {
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
    let name = filter.name;
    if (name === 'siteLocation') {
      name = 'Site Location';
    }
    if (name === 'exposureLevel') {
      name = 'Exposure Level';
    }
    if (name === 'siteNumber') {
      name = 'Site Number';
    }
    return { ...filter, name };
  }

  render() {
    const { filters, clearFilters, removeFilter } = this.props;
    if (filters.length > 0) {
      return (
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
                  onChange={(e) => {
                    if (filter.onChange) {
                      filter.onChange(e);
                    }
                  }}
                  onSubmit={(e) => {
                    if (filter.onSubmit) {
                      filter.onSubmit(e);
                    }
                  }}
                />
              )}
            </div>
          </div>
          <div className="gray-outline">
            <Button className="pull-right" onClick={() => clearFilters()}>
              Clear
            </Button>
            <Button className="pull-right" onClick={() => {}}>
              Apply
            </Button>
          </div>
        </div>
      );
    }
    return null;
  }
}
