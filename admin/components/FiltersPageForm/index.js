import React, { Component, PropTypes } from 'react';
import { Field, change, reduxForm } from 'redux-form';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import CenteredModal from '../../components/CenteredModal';
import FiltersModalForm from '../../components/FiltersModalForm';
import Input from '../../components/Input';
import ReactSelect from '../../components/Input/ReactSelect';
import { selectCustomFilters, selectFilterFormValues } from '../../containers/App/selectors';
import { addCustomFilter, removeCustomFilter } from '../../containers/App/actions';

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

const formName = 'adminDashboardFilters';
@reduxForm({ form: formName, destroyOnUnmount: false })
export class FiltersPageForm extends Component {
  static propTypes = {
    change: PropTypes.func.isRequired,
    filtersFormValues: PropTypes.object.isRequired,
    customFilters: PropTypes.array.isRequired,
    addCustomFilter: PropTypes.func.isRequired,
    removeCustomFilter: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
    };

    this.mapSearchLabels = this.mapSearchLabels.bind(this);
    this.openFiltersModal = this.openFiltersModal.bind(this);
    this.closeFiltersModal = this.closeFiltersModal.bind(this);
    this.updateFilters = this.updateFilters.bind(this);
    this.addFilter = this.addFilter.bind(this);

    this.searchType = 'studyNumber';
    this.searchValue = null;
  }

  openFiltersModal() {
    this.setState({ modalOpen: true });
  }

  closeFiltersModal() {
    this.setState({ modalOpen: false });
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

  updateFilters(key, value) {
    this.props.change(key, value);
  }

  addFilter(options) {
    if (!options.value) {
      return;
    }
    const { customFilters, addCustomFilter, removeCustomFilter } = this.props;
    if (customFilters.length !== 0) {
      removeCustomFilter(options);
    }
    addCustomFilter(options);
  }

  render() {
    const { filtersFormValues } = this.props;

    return (
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
              key: this.searchType,
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
          clearable={false}
          searchable
          selectedValue={this.searchType}
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
    );
  }
}

const mapStateToProps = createStructuredSelector({
  customFilters: selectCustomFilters(),
  filtersFormValues: selectFilterFormValues(),
});

const mapDispatchToProps = (dispatch) => ({
  addCustomFilter: (filter) => dispatch(addCustomFilter(filter)),
  removeCustomFilter: (filter) => dispatch(removeCustomFilter(filter)),
  change: (name, value) => dispatch(change(name, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FiltersPageForm);
