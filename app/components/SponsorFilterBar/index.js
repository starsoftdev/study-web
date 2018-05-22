/* eslint-disable react/jsx-first-prop-new-line */

import React, { Component, PropTypes } from 'react';
import Select from 'react-select';
import { translate } from '../../../common/utilities/localization';

class FilterBar extends Component {
  static propTypes = {
    sites: PropTypes.object.isRequired,
    sponsorSchedules: PropTypes.array.isRequired,
    protocols: PropTypes.array.isRequired,
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
    const { protocols, sites } = nextProps;

    if (protocols.length) {
      const protocolOptions = [{ label: translate('portals.component.sponsorFilterBar.allLabel'), value: 'all' }].concat(protocols.map(protocol => ({
        label: protocol.protocolNumber,
        value: protocol.protocolNumber,
      })));

      this.setState({
        protocolOptions,
      });
    }

    if (!sites.fetching && sites.details.length) {
      const siteLocationOptions = [{ label: translate('portals.component.sponsorFilterBar.allLabel'), value: 'all' }].concat(sites.details.map(site => ({
        label: (site.principalInvestigator) ? `${site.principalInvestigator} (${site.site_name})` : `${translate('portals.component.sponsorFilterBar.notApplicable')} (${site.site_name})`,
        value: (site.principalInvestigator) ? site.principalInvestigator : site.site_id,
      })));

      this.setState({
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
    const { filter } = this.props;
    const { siteLocationOptions, protocolOptions } = this.state;

    return (
      <form action="#" className="form-search clearfix alt">
        <div className="fields-holder">
          <div className="pull-left no-left-padding custom-select">
            <Select
              className="form-control data-search"
              value={filter.protocol}
              options={protocolOptions}
              disabled={false}
              placeholder={translate('portals.component.sponsorFilterBar.protocolPlaceholder')}
              onChange={(option) => this.handleFilterChange('protocol', option)}
            />
          </div>
          <div className="pull-left custom-select no-right-padding">
            <Select
              className="form-control data-search"
              disabled={this.state.protocol === null}
              options={siteLocationOptions}
              value={filter.siteLocation}
              placeholder={translate('portals.component.sponsorFilterBar.piPlaceholder')}
              onChange={(option) => this.handleFilterChange('siteLocation', option)}
            />
          </div>
        </div>
      </form>
    );
  }
}

export default FilterBar;
