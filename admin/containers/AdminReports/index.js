/*
 * AdminReports
 *
 */

import React, { Component, PropTypes } from 'react';
import { Field, change, reset, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import _, { concat, mapKeys, cloneDeep, pullAt, findIndex } from 'lodash';

import StatsBox from '../../components/StatsBox';
import CenteredModal from '../../components/CenteredModal';
import RangePopups from '../../components/RangePopups';
import FiltersModalForm from '../../components/FiltersModalForm';
import FilterQueryForm from '../../components/Filter/FilterQueryForm';
import ReactSelect from '../../components/Input/ReactSelect';
import { selectFilterFormValues } from './selectors';
const formName = 'adminReportsFilters';

const filterOptions = {
  searchOptions : [
    {
      label: '1',
      value: '1',
    }, {
      label: '2',
      value: '2',
    }, {
      label: '3',
      value: '3',
    },
  ],
};

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
      prevTotalsFilters: [],
      prevOffset: null,
    };

    this.addFilter = this.addFilter.bind(this);
    this.updateFilters = this.updateFilters.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
    this.removeFilter = this.removeFilter.bind(this);
    this.openFiltersModal = this.openFiltersModal.bind(this);
    this.closeFiltersModal = this.closeFiltersModal.bind(this);
    this.searchFilterSubmit = this.searchFilterSubmit.bind(this);
    this.mapFilterValues = this.mapFilterValues.bind(this);

    this.filtersFormValues = {};
    this.searchType = null;
    this.searchValue = null;
  }

  addFilter(options) {
    const { customFilters } = this.state;
    if (customFilters.length === 0 && options.value !== null) {
      const newOptions = {
        ...options,
        onClose: () => this.removeFilter({ name: 'search' }),
        onSubmit: this.searchFilterSubmit,
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
      prevTotalsFilters: {},
      prevOffset: null,
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

  openFiltersModal() {
    this.setState({ modalOpen: true });
  }

  closeFiltersModal() {
    this.setState({ modalOpen: false });
  }

  searchFilterSubmit(e) {
    const { change } = this.props;
    change('adminReportsFilters', 'search', { value: e });
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
    const { resetForm, filtersFormValues } = this.props;

    const filters = concat(this.mapFilterValues(filtersFormValues), customFilters);

    return (
      <div id="adminReportsPage" className="admin-reports">
        <div className="fixed-header clearfix">
          <h1 className="main-heading pull-left">Admin portal</h1>
          <div className="filters-btns pull-right">
            <Button className="pull-right" onClick={this.openFiltersModal}>
              Filters
            </Button>
            <div className="field pull-right">
              <Field
                name="study-search"
                className="pull-right"
                component={ReactSelect}
                placeholder="Study Number"
                searchable
                options={filterOptions.searchOptions}
                onChange={(e) => this.addFilter({
                  name: 'Study Number',
                  type: 'search',
                  value: e,
                })}
              />
            </div>
            {this.state.modalOpen &&
              <Modal dialogComponentClass={CenteredModal} className="filter-modal" id="filter-modal" show={this.state.modalOpen} onHide={this.closeFiltersModal}>
                <Modal.Header>
                  <Modal.Title>Filters</Modal.Title>
                  <a className="lightbox-close close" onClick={this.closeFiltersModal}>
                    <i className="icomoon-icon_close" />
                  </a>
                </Modal.Header>
                <Modal.Body>
                  <div className="holder clearfix">
                    <div className="form-lightbox">
                      <FiltersModalForm
                        initialValues={filtersFormValues}
                        handleSubmit={() => {}}
                        updateFilters={this.updateFilters}
                      />
                    </div>
                  </div>
                </Modal.Body>
              </Modal>
            }
          </div>
        </div>
        {(filters.length > 0) &&
          <FilterQueryForm
            clearFilters={this.clearFilters}
            filters={filters}
            removeFilter={this.removeFilter}
            resetForm={resetForm}
            searchType={this.searchType}
          />
        }
        <RangePopups />
        <StatsBox />
      </div>
    );
  }
}

export default AdminReports;
