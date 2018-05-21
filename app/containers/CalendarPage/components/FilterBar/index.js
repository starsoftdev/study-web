/* eslint-disable react/jsx-first-prop-new-line */

import React, { Component, PropTypes } from 'react';
import Button from 'react-bootstrap/lib/Button';
import Select from 'react-select';
import _ from 'lodash';

import { addAllOption } from '../../../../components/Input/ReactSelect';
import { translate } from '../../../../../common/utilities/localization';

class FilterBar extends Component {
  static propTypes = {
    siteLocationOptions: PropTypes.array.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    sites: PropTypes.array.isRequired,
    indications: PropTypes.array.isRequired,
    schedules: PropTypes.array.isRequired,
    protocols: PropTypes.array.isRequired,
    fetchingSites: PropTypes.bool,
    filter: PropTypes.object.isRequired,
    updateFilter: PropTypes.func.isRequired,
    currentUser: PropTypes.object,
  }

  constructor(props) {
    super(props);
    const siteLocationOptions = addAllOption(props.siteLocationOptions);

    this.state = {
      siteLocation: null,
      indication: null,
      protocol: null,
      siteLocationOptions,
      indicationOptions: [],
      protocolOptions: [],
      patientName: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.siteLocationOptions !== nextProps.siteLocationOptions) {
      const siteLocationOptions = addAllOption(nextProps.siteLocationOptions);
      this.setState({
        siteLocationOptions,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { siteLocationOptions, protocols, isAdmin } = this.props;

    if (!isAdmin) {
      if (prevState.siteLocation === null || prevState.siteLocation.siteId !== this.state.siteLocation.siteId || prevProps.protocols !== protocols) {  // prevent recursive render
        const site = siteLocationOptions[0];
        if (site && protocols && protocols.length > 0) {
          this.handleFilterChange('siteLocation', site);
        }
      }
    }
  }

  handleSubmit = (ev) => {
    ev.preventDefault();
    this.handleFilterChange('patientName', this.state.patientName);
  }

  handleFilterChange = (field, option) => {
    const newValue = option ? option.value : '';

    switch (field) {
      case 'siteLocation':
        this.handleSiteLocationChoose(option);
        break;
      case 'indication':
        this.handleIndicationChoose(option);
        break;
      default:
        break;
    }

    this.props.updateFilter(field, newValue);
  }

  handleSiteLocationChoose(siteLocationOption) {
    if (siteLocationOption) {
      const { sites, indications, protocols } = this.props;
      let indicationOptions;

      if (siteLocationOption.value === 'All') {
        const indicationIds = _.chain(sites)
          .map(site => site.studies)
          .flatten()
          .map(study => study.indication_id)
          .uniq()
          .value();
        indicationOptions = indicationIds.map(id => {
          const i = _.find(indications, { id });
          let protocolOptions = _.flatten(sites.map(site => site.studies))
            .filter(s => s.indication_id === id)
            .map(s => {
              const protocolNumber = _.find(protocols, { id: s.protocol_id });
              if (protocolNumber) {
                return {
                  label: protocolNumber.number,
                  value: protocolNumber.number,
                };
              }
              return null;
            }).filter((item) => item);

          protocolOptions = _.uniqBy(protocolOptions, (item) => (item.value));
          protocolOptions = addAllOption(protocolOptions);
          return {
            label: i.name,
            value: i.originalName,
            protocolOptions,
          };
        });
        indicationOptions = addAllOption(indicationOptions, {
          label: translate('portals.component.calendarPage.filterBar.all'),
          value: 'All',
          protocolOptions: addAllOption(_.flatten(sites.map(site => site.studies)).map(s => {
            const protocolNumber = _.find(protocols, { id: s.protocol_id });
            if (protocolNumber) {
              return {
                label: protocolNumber.number,
                value: protocolNumber.number,
              };
            }
            return null;
          }).filter((item) => item)),
        });
      } else {
        const selectedSite = sites.filter(s => s.id === siteLocationOption.siteId)[0];
        if (!selectedSite) {
          throw new Error('SiteLocation options are not properly populated.');
        }
        const indicationIds = _.uniq(selectedSite.studies.map(study => study.indication_id));

        indicationOptions = indicationIds.map(id => {
          const i = _.find(indications, { id });
          let protocolOptions = selectedSite.studies.filter(s => s.indication_id === id)
            .map(s => {
              const protocolNumber = _.find(protocols, { id: s.protocol_id });
              if (protocolNumber) {
                return {
                  label: protocolNumber.number,
                  value: protocolNumber.number,
                };
              }
              return null;
            }).filter((item) => item);
          protocolOptions = addAllOption(protocolOptions);
          return {
            label: i.name,
            value: i.originalName,
            protocolOptions,
          };
        });
        indicationOptions = addAllOption(indicationOptions, {
          label: translate('portals.component.calendarPage.filterBar.all'),
          value: 'All',
          protocolOptions: addAllOption(selectedSite.studies.map(s => {
            const protocolNumber = _.find(protocols, { id: s.protocol_id });
            if (protocolNumber) {
              return {
                label: protocolNumber.number,
                value: protocolNumber.number,
              };
            }
            return null;
          }).filter((item) => item)),
        });
      }


      this.setState({
        siteLocation: siteLocationOption,
        protocol: null,
        indicationOptions,
      });
    } else {
      this.setState({
        siteLocation: null,
        indication: null,
        protocol: null,
        indicationOptions: [],
        protocolOptions: [],
      });
    }
  }

  handleIndicationChoose(indicationOption) {
    if (indicationOption) {
      this.setState({
        indication: indicationOption,
        protocolOptions: indicationOption.protocolOptions,
      });
    } else {
      this.setState({
        indication: null,
        protocol: null,
        protocolOptions: [],
      });
    }
  }

  render() {
    const {
      isAdmin,
      fetchingSites,
      filter,
    } = this.props;
    const { siteLocationOptions } = this.state;
    const { currentUser, sites } = this.props;
    let bDisabled = true;
    let defaultValue = null;
    if (currentUser && currentUser.roleForClient) {
      bDisabled = !(currentUser.roleForClient.canPurchase || currentUser.roleForClient.canRedeemRewards || currentUser.roleForClient.name === 'Super Admin' || currentUser.roleForClient.name === 'Admin');
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
      <form action="#" className="form-search clearfix alt" onSubmit={this.handleSubmit}>
        <div className="fields-holder">
          <div className="search-area pull-left no-left-padding">
            <div className="field">
              <Button
                className="btn-enter"
                type="submit"
                onClick={() => {
                  this.handleFilterChange('patientName', this.state.patientName);
                }}
              >
                <i className="icomoon-icon_search2" />
              </Button>
              <input type="search" id="search" className="form-control keyword-search" placeholder={translate('portals.component.calendarPage.filterBar.searchPlaceholder')}
                onChange={(ev) => {
                  this.setState({
                    patientName: ev.target,
                  });
                }}
              />
            </div>
          </div>
          <div className="search-area pull-left">
            {(bDisabled)
              ? <Select
                className="form-control data-search"
                disabled={fetchingSites || !isAdmin || bDisabled}
                options={siteLocationOptions}
                placeholder={translate('portals.component.calendarPage.filterBar.sitePlaceholder')}
                value={defaultValue}
                onChange={(option) => this.handleFilterChange('siteLocation', option)}
              />
              : <Select
                className="form-control data-search"
                disabled={fetchingSites || !isAdmin || bDisabled}
                options={siteLocationOptions}
                value={filter.siteLocation}
                placeholder={translate('portals.component.calendarPage.filterBar.sitePlaceholder')}
                onChange={(option) => this.handleFilterChange('siteLocation', option)}
              />
            }
          </div>
          <div className="search-area pull-left">
            <Select
              className="form-control data-search"
              value={filter.indication}
              options={this.state.indicationOptions}
              disabled={this.state.siteLocation === null}
              placeholder={translate('portals.component.calendarPage.filterBar.indicationPlaceholder')}
              onChange={(option) => this.handleFilterChange('indication', option)}
            />
          </div>
          <div className="search-area pull-left no-right-padding">
            <Select
              className="form-control data-search"
              value={filter.protocol}
              options={this.state.protocolOptions}
              disabled={this.state.indication === null}
              placeholder={translate('portals.component.calendarPage.filterBar.protocolPlaceholder')}
              onChange={(option) => this.handleFilterChange('protocol', option)}
            />
          </div>
        </div>
      </form>
    );
  }
}

export default FilterBar;
