/* eslint-disable react/jsx-first-prop-new-line */

import React, { Component, PropTypes } from 'react';
import Select from 'react-select';
import _ from 'lodash';

import 'react-select/dist/react-select.min.css';

class FilterBar extends Component {
  static propTypes = {
    sites: PropTypes.array.isRequired,
    fetchingSites: PropTypes.bool,
    filter: PropTypes.object.isRequired,
    updateFilter: PropTypes.func.isRequired,
  }

  handleFilterChange = (field, option) => {
    const newValue = option ? option.value : '';

    this.props.updateFilter(field, newValue);
  }

  render() {
    const {
      sites,
      fetchingSites,
      filter,
    } = this.props;

    const siteLocationOptions = sites.map(s => ({
      label: s.name,
      value: s.name,
    }));
    const selectedSite = sites.filter(s => s.name === filter.siteLocation)[0];
    const protocolOptions = !selectedSite ? [] : selectedSite.studies.map(study => ({
      label: study.protocolNumber,
      value: study.protocolNumber,
    }));
    const indications = !selectedSite ? [] : selectedSite.studies.map(study => ({
      label: study.indication,
      value: study.indication,
    }));

    const indicationOptions = _.uniqBy(indications, 'value');

    return (
      <form action="#" className="form-search clearfix alt">
        <div className="fields-holder">
          <div className="search-area pull-left">
            <div className="field">
              <input type="search" id="search" className="form-control keyword-search" placeholder="Search"
                onChange={(ev) => this.handleFilterChange('patientName', ev.target)}
              />
              <label htmlFor="search"><i className="icon-icon_search2"></i></label>
            </div>
          </div>
          <div className="pull-left custom-select">
            <Select
              className="data-search"
              value={filter.siteLocation}
              disabled={fetchingSites}
              options={siteLocationOptions}
              placeholder="--Select Site Location--"
              onChange={(option) => this.handleFilterChange('siteLocation', option)}
            />
          </div>
          <div className="pull-left custom-select">
            <Select
              className="data-search"
              value={filter.indication}
              options={indicationOptions}
              placeholder="--Select Indication--"
              onChange={(option) => this.handleFilterChange('indication', option)}
            />
          </div>
          <div className="pull-left custom-select">
            <Select
              className="data-search"
              value={filter.protocol}
              options={protocolOptions}
              placeholder="--Select Protocol--"
              onChange={(option) => this.handleFilterChange('protocol', option)}
            />
          </div>
        </div>
      </form>
    );
  }
}

export default FilterBar;
