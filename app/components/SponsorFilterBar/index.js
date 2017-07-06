/* eslint-disable react/jsx-first-prop-new-line */

import React, { Component, PropTypes } from 'react';
import Button from 'react-bootstrap/lib/Button';
import Select from 'react-select';
import _ from 'lodash';

class FilterBar extends Component {
  static propTypes = {
    isAdmin: PropTypes.bool.isRequired,
    sites: PropTypes.array.isRequired,
    sponsorSchedules: PropTypes.array.isRequired,
    protocols: PropTypes.array.isRequired,
    fetchingSites: PropTypes.bool,
    filter: PropTypes.object.isRequired,
    updateFilter: PropTypes.func.isRequired,
    currentUser: PropTypes.object,
  }

  state = {
    siteLocation: null,
    indication: null,
    protocol: null,
    siteLocationOptions: [],
    indicationOptions: [],
    protocolOptions: [],
  }

  componentWillReceiveProps(nextProps) {
    const { protocols } = nextProps;

    if (protocols.length) {
      const protocolOptions = [{ label: 'All', value: 'all' }].concat(protocols.map(protocol => ({
        label: protocol.protocolNumber,
        value: protocol.protocolNumber,
      })));
      const siteLocationOptions = [{ label: 'All', value: 'all' }].concat(protocols.map(protocol => ({
        label: protocol.siteName,
        value: protocol.siteId,
      })));


      this.setState({
        protocolOptions,
        siteLocationOptions,
      });
    }
  }

  handleFilterChange = (field, option) => {
    const newValue = option ? option.value : '';

    switch (field) {
      case 'siteLocation':
        this.handleSiteLocationChoose(option);
        break;
      case 'protocol':
        this.handleProtocolChoose(option);
        break;
      default:
        break;
    }

    this.props.updateFilter(field, newValue);
  }

  handleSiteLocationChoose(siteLocationOption) {
    if (siteLocationOption) {
      this.setState({
        siteLocation: siteLocationOption,
      });
    } else {
      this.setState({
        siteLocation: null,
      });
    }
  }

  handleProtocolChoose(protocolOption) {
    if (protocolOption) {
      this.setState({
        protocol: protocolOption,
        siteLocation: null,
      });
    } else {
      this.setState({
        protocol: null,
        siteLocation: null,
      });
    }
  }

  render() {
    const {
      isAdmin,
      fetchingSites,
      filter,
    } = this.props;
    const { siteLocationOptions, protocolOptions } = this.state;
    const { currentUser, sites } = this.props;
    let bDisabled = true;
    let defaultValue = null;
    if (currentUser && currentUser.roleForSponsor) {
      bDisabled = !(currentUser.roleForSponsor.name === 'Super Admin' || currentUser.roleForSponsor.name === 'Admin');
      if (bDisabled) {
        if (sites) {
          const site = _.find(sites, { id: currentUser.roleForClient.site_id });
          if (site) {
            defaultValue = site.name;
          }
        }
      }
    }

    return (
      <form action="#" className="form-search clearfix alt">
        <div className="fields-holder">
          <div className="search-area pull-left no-left-padding custom-select">
            <div className="field">
              <Button className="btn-enter">
                <i className="icomoon-icon_search2" />
              </Button>
              <input type="search" id="search" className="form-control keyword-search" placeholder="Search"
                onChange={(ev) => this.handleFilterChange('patientName', ev.target)}
              />
            </div>
          </div>
          <div className="pull-left custom-select">
            <Select
              className="form-control data-search"
              value={filter.protocol}
              options={protocolOptions}
              disabled={false}
              placeholder={'Select Protocol'}
              onChange={(option) => this.handleFilterChange('protocol', option)}
            />
          </div>
          <div className="pull-left custom-select no-right-padding">
            {(bDisabled)
            ? <Select
              className="form-control data-search"
              disabled={fetchingSites || !isAdmin || this.state.protocol === null}
              options={siteLocationOptions}
              placeholder={this.state.protocol ? 'Select Site Location' : 'N/A'}
              value={defaultValue}
              onChange={(option) => this.handleFilterChange('siteLocation', option)}
            />
            : <Select
              className="form-control data-search"
              disabled={fetchingSites || !isAdmin || this.state.protocol === null}
              options={siteLocationOptions}
              value={filter.siteLocation}
              placeholder={this.state.protocol ? 'Select Site Location' : 'N/A'}
              onChange={(option) => this.handleFilterChange('siteLocation', option)}
            />
            }
          </div>
        </div>
      </form>
    );
  }
}

export default FilterBar;
