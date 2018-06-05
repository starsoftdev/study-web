/*
 * AdminHome
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
import ExpandableSection from '../../components/ExpandableSection';
import MediaStatsTable from '../../components/MediaStatsTable';
import CenteredModal from '../../components/CenteredModal';
import FiltersModalForm from '../../components/FiltersModalForm';
import FilterQueryForm from '../../components/Filter/FilterQueryForm';
import ReactSelect from '../../components/Input/ReactSelect';
import { selectFilterFormValues } from './selectors';
import Input from '../../../app/components/Input';
const formName = 'adminDashboardFilters';

const filterOptions = {
  searchOptions : [
    {
      label: 'Study Number',
      value: 'studyNumber',
    }, {
      label: 'Postal Code',
      value: 'postalCode',
    }, {
      label: 'Address',
      value: 'address',
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
export class AdminHome extends Component { // eslint-disable-line react/prefer-stateless-function
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

    this.mapSearchLabels = this.mapSearchLabels.bind(this);
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
    if (customFilters.length === 0) {
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
    this.props.change('adminDashboardFilters', key, value);
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

      change('adminDashboardFilters', 'search', []);
    } else if (filters[filter.name]) {
      pullAt(filters[filter.name], findIndex(filters[filter.name], ['label', filter.value]));
      pullAt(filters[filter.name], findIndex(filters[filter.name], ['label', 'All']));

      change('adminDashboardFilters', filter.name, filters[filter.name]);
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
    change('adminDashboardFilters', 'search', { value: e });
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

  mapSearchLabels(type) {
    switch (type) {
      case 'studyNumber':
        return 'Study Number';
      case 'postalCode':
        return 'Postal Code';
      case 'address':
        return 'Address';
      default:
        return 'Search';
    }
  }

  render() {
    const { customFilters } = this.state;
    const { resetForm, filtersFormValues } = this.props;

    const filters = concat(this.mapFilterValues(filtersFormValues), customFilters);

    return (
      <div id="adminHomePage" className="admin-dashboard">
        <div className="fixed-header clearfix">
          <h1 className="main-heading pull-left">Admin portal</h1>
          <div className="filters-btns pull-right">
            <Button className="pull-right" onClick={this.openFiltersModal}>
              Filters
            </Button>
            <div className="field admin-search-value pull-right">
              <Button
                className="btn-enter"
                type="submit"
                onClick={() => this.addFilter({
                  name: this.mapSearchLabels(this.searchType),
                  type: 'search',
                  value: this.searchValue,
                })}
              >
                <i className="icomoon-icon_search2" />
              </Button>
              <Field
                name="admin-search-value"
                component={Input}
                type="text"
                placeholder="Search"
                onChange={(e) => {
                  this.searchValue = e.target.value;
                }}
              />
            </div>
            <Field
              name="admin-search-type"
              className="admin-search-type pull-right"
              component={ReactSelect}
              placeholder="Select Type"
              searchable
              options={filterOptions.searchOptions}
              onChange={(e) => {
                this.searchType = e;
              }}
            />
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
          />
        }
        <StatsBox />
        <div id="mediaStatsBox">
          <ExpandableSection content={<MediaStatsTable />} />
        </div>
      </div>
    );
  }
}

export default AdminHome;
