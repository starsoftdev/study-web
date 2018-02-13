/**
 * Created by Dennis on 1/3/17.
 */

import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from 'react-bootstrap/lib/Button';

import Filter from './index';

@reduxForm({ form: 'filterPanel', destroyOnUnmount: false })
export default class FilterQueryForm extends React.Component {
  static propTypes = {
    addFilter: React.PropTypes.func.isRequired,
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
    const { filters, addFilter, clearFilters, removeFilter } = this.props;
    if (filters.length > 0) {
      return (
        <div className="filters-bar">
          <div className="filters-holder search-filters">
            <strong className="title">FILTERS</strong>
            <div className="btns pull-right">
              <Button className="gray-outline" onClick={() => clearFilters()}>
                Clear
              </Button>
            </div>
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
              <Button
                bsStyle="primary"
                className="add-new-filters btn btn-primary"
                onClick={() => addFilter({
                  name: 'search',
                  type: 'search',
                  value: '',
                })}
              >
                <i className="glyphicon glyphicon-plus" />
              </Button>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }
}
