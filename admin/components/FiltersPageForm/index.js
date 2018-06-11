import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import CenteredModal from '../../components/CenteredModal';
import FiltersModalForm from '../../components/FiltersModalForm';
import Input from '../../components/Input';
import ReactSelect from '../../components/Input/ReactSelect';

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

export default class FiltersPageForm extends React.Component {
  static propTypes = {
    change: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    updateFilters: PropTypes.func.isRequired,
    addFilter: PropTypes.func.isRequired,
    filtersFormValues: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
    };

    this.mapSearchLabels = this.mapSearchLabels.bind(this);
    this.openFiltersModal = this.openFiltersModal.bind(this);
    this.closeFiltersModal = this.closeFiltersModal.bind(this);

    this.searchType = null;
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

  render() {
    const { filtersFormValues, updateFilters, addFilter } = this.props;

    return (
      <div className="filters-btns pull-right">
        <Button className="pull-right" onClick={this.openFiltersModal}>
          Filters
        </Button>
        <div className="field admin-search-value pull-right">
          <Button
            className="btn-enter"
            type="submit"
            onClick={() => addFilter({
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
                  updateFilters={updateFilters}
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
