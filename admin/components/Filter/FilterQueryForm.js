import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { StickyContainer } from 'react-sticky';
import classNames from 'classnames';
import Button from 'react-bootstrap/lib/Button';

import Filter from './index';

@reduxForm({ form: 'filterPanel', destroyOnUnmount: false })
export default class FilterQueryForm extends React.Component {
  static propTypes = {
    clearFilters: React.PropTypes.func.isRequired,
    filters: React.PropTypes.array.isRequired,
    removeFilter: React.PropTypes.func.isRequired,
    resetForm: React.PropTypes.func.isRequired,
    searchType: React.PropTypes.any,
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
    const { filters, clearFilters, removeFilter, searchType } = this.props;
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
                  searchType={searchType}
                  onClose={() => removeFilter(filter)}
                />
              )}
            </div>
          </div>
          <div className="gray-outline">
            <Button bsStyle="clear" className="pull-right" onClick={() => clearFilters()}>
              Clear
            </Button>
            <Button className="pull-right" onClick={() => {}}>
              Apply
            </Button>
          </div>
        </div>
      </StickyContainer>
    );
  }
}
