import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Helmet from 'react-helmet';
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/lib/Button';
import { map, mapKeys, concat, findIndex, pullAt } from 'lodash';
import './styles.less';
import CenteredModal from 'components/CenteredModal';
import FiltersForm from './FiltersForm';
import ClientRolesList from 'components/ClientRolesList';
import Filter from 'components/Filter';
import { selectFilterFormValues } from './FiltersForm/selectors';

export class DashboardPage extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    filtersFormValues: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      customFilters: [],
      modalFilters: props.filtersFormValues ? props.filtersFormValues : [],
    };

    this.addFilter = this.addFilter.bind(this);
    this.removeFilter = this.removeFilter.bind(this);
    this.openFiltersModal = this.openFiltersModal.bind(this);
    this.closeFiltersModal = this.closeFiltersModal.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      modalFilters: newProps.filtersFormValues,
    });
  }

  addFilter(options) {
    const { customFilters } = this.state;
    customFilters.push(options);
    this.setState({ customFilters });
  }

  removeFilter(filter) {
    const { customFilters, modalFilters } = this.state;
    console.log('remove this filter', filter, customFilters, modalFilters);

    if (filter.name === 'search') {
      pullAt(customFilters, findIndex(customFilters, filter));
      this.setState({ customFilters });
      return;
    }

    if (modalFilters[filter.name]) {
      pullAt(modalFilters[filter.name], findIndex(modalFilters[filter.name], ['label', filter.value]));
      this.setState({ modalFilters });
    }
  }

  saveFilters() {

  }

  clearFilters() {
    this.setState({ filters: [] });
  }

  openFiltersModal() {
    this.setState({ addUserModalOpen: true });
  }

  closeFiltersModal() {
    this.setState({ addUserModalOpen: false });
  }

  handleUserQueryChange(event) {
    this.setState({
      userName: event.target.value,
    });
  }

  mapFilterValues(filters) {
    let newFilters = [];
    mapKeys(filters, (filterValues, key) => {
      newFilters = concat(newFilters, map(filterValues, (v) => {
        return {
          name: key,
          type: key === 'percentage' ? 'compare' : 'value',
          value: v.label,
        };
      }));
    });

    return newFilters;
  }

  render() {
    const { customFilters, modalFilters } = this.state;
    const filters = concat(this.mapFilterValues(modalFilters), customFilters);

    return (
      <div className="dashboard-page container-fluid">
        <Helmet title="STUDYKIK DASHBOARD" />
        <div className="fixed-header clearfix">
          <h2 className="main-heading pull-left">STUDYKIK DASHBOARD</h2>
          <div className="filter-btns pull-right">
            <Button
              bsStyle="primary"
              onClick={() => this.addFilter({
                name: 'search',
                type: 'search',
                value: '',
              })}
            >
              Search
            </Button>
            <Button bsStyle="primary" onClick={this.openFiltersModal}>
              Filters
            </Button>
            <Modal dialogComponentclassName={CenteredModal} className="filter-modal" id="filter-modal" show={this.state.addUserModalOpen} onHide={this.closeFiltersModal}>
              <Modal.Header>
                <Modal.Title>Filters</Modal.Title>
                <a className="lightbox-close close" onClick={this.closeFiltersModal}>
                  <i className="icomoon-icon_close" />
                </a>
              </Modal.Header>
              <Modal.Body>
                <div className="holder clearfix">
                  <div className="form-lightbox">
                    <FiltersForm handleSubmit={this.addUser} />
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </div>
        </div>
        <section className="filters-section">
          {(filters.length > 0) && (
            <div className="filters-bar">
              <div className="filter-holder">
                <strong className="title">FILTERS</strong>
                <div className="filter-btns pull-right">
                  <Button bsStyle="primary" onClick={() => this.saveFilters()}>
                    Save Filters
                  </Button>
                  <Button bsStyle="primary" onClick={() => this.clearFilters()}>
                    Clear
                  </Button>
                </div>
                <form className="form-search clearfix">
                  <div className="fields-holder pull-left">
                    {filters.map((filter, index) =>
                      <Filter key={index} options={filter} initialValues={modalFilters} onClose={() => this.removeFilter(filter)} />
                    )}
                    <Button
                      bsStyle="primary"
                      className="pull-left btn-add-filter"
                      onClick={() => this.addFilter({
                        name: 'search',
                        type: 'search',
                        value: '',
                      })}
                    >+</Button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </section>
        <section>
          <div className="d-stats clearfix">
            <ul className="list-unstyled info-list  pull-left">
              <li>
                <strong className="heading">TODAY:</strong>
                <span className="number">308</span>
              </li>
              <li>
                <strong className="heading">YESTERDAY: </strong>
                <span className="number">749</span>
              </li>
              <li>
                <strong className="heading">CAMPAIGN TOTAL: </strong>
                <span className="number">275390</span>
              </li>
              <li>
                <strong className="heading">GRAND TOTAL: </strong>
                <span className="number">476</span>
              </li>
            </ul>
            <ul className="list-unstyled info-list pull-left">
              <li>
                <strong className="heading">RED: </strong>
                <span className="number">179 <span>(37.61%)</span></span>
              </li>
              <li>
                <strong className="heading">YELLOW: </strong>
                <span className="number">107 <span>(22.48%)</span></span>
              </li>
              <li>
                <strong className="heading">GREEN: </strong>
                <span className="number">165 <span>(34.66%)</span></span>
              </li>
              <li>
                <strong className="heading">PURPLE: </strong>
                <span className="number">25 <span>(5.25%)</span></span>
              </li>
            </ul>
            <div className="chart pull-left">

            </div>
            <ul className="list-unstyled info-list pull-left">
              <li>
                <strong className="heading">TIER 1: </strong>
                <span className="number">261 <span>(58.52%)</span></span>
              </li>
              <li>
                <strong className="heading">TIER 2: </strong>
                <span className="number">78 <span>(17.49%)</span></span>
              </li>
              <li>
                <strong className="heading">TIER 3: </strong>
                <span className="number">65 <span>(14.57%)</span></span>
              </li>
              <li>
                <strong className="heading">TIER 4: </strong>
                <span className="number">42 <span>(9.42%)</span></span>
              </li>
            </ul>
            <div className="chart pull-left">
            </div>
          </div>
          <div className="graph-area clearfix">
            <div className="head clearfix">
              <h2 className="pull-left">PATIENTS PER DAY</h2>
              <span className="counter pull-left">0% OF GOAL 0.49%</span>
              <Button bsStyle="primary" className="lightbox-opener pull-right" onClick={this.openDateRangeModal}>
                <i className="icon-icon_calendar"></i>
            Last 30 days: 08/04/16 - 09/04/16
              </Button>
            </div>
            <div className="graph-holder">
            </div>
          </div>
          <div className="table-container">
            <section className="table-holder form-group client-roles-holder">
            </section>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  filtersFormValues: selectFilterFormValues(),
});

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
