import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';

import ReactMultiCheckBox from '../../../../components/Input/ReactMultiCheckbox';
import formValidator from './validator';

const formName = 'dashboardFilters';
const mapStateToProps = createStructuredSelector({
});

const filterOptions = {
  statusOptions : [
    {
      id: 1,
      label: 'Active',
      value: 'active',
    }, {
      id: 2,
      label: 'Inactive',
      value: 'inactive',
    },
  ],

  colorOptions : [
    {
      id: 1,
      label: 'Red',
      value: 'red',
    }, {
      id: 2,
      label: 'Yellow',
      value: 'yellow',
    }, {
      id: 3,
      label: 'Green',
      value: 'green',
    }, {
      id: 4,
      label: 'Purple',
      value: 'purple',
    },
  ],

  tierOptions : [
    {
      id: 1,
      label: 'Tier 1',
      value: '1',
    }, {
      id: 2,
      label: 'Tier 2',
      value: '2',
    }, {
      id: 3,
      label: 'Tier 3',
      value: '3',
    }, {
      id: 4,
      label: 'Tier 4',
      value: '4',
    },
  ],

  nearbyStudiesOptions : [
    {
      id: 1,
      label: 'Find',
      value: 'find',
    },
  ],

  addressOptions : [
    {
      id: 1,
      label: 'Find',
      value: 'find',
    },
  ],

  percentageOptions : [
    {
      id: 1,
      label: '<',
      value: 'lt',
    }, {
      id: 2,
      label: '>',
      value: 'gt',
    }, {
      id: 3,
      label: '=',
      value: 'eq',
    },
  ],
};

@reduxForm({ form: formName, validate: formValidator, destroyOnUnmount: false })
@connect(mapStateToProps)

class FiltersForm extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    fetchStudiesAccordingToFilters: PropTypes.func,
    handleSubmit: PropTypes.func,
    initialValues: PropTypes.object || PropTypes.arrayOf(PropTypes.object),
    levels: PropTypes.array,
    siteNames: PropTypes.array,
    siteLocations: PropTypes.array,
    indications: PropTypes.array,
    sponsors: PropTypes.array,
    protocols: PropTypes.array,
    cro: PropTypes.array,
    usersByRoles: PropTypes.object,
  };

  initSearch(value, key) {
    this.props.fetchStudiesAccordingToFilters(value, key);
  }

  render() {
    const { handleSubmit, initialValues } = this.props;

    const exposureLevelOptions = [];
    _.forEach(this.props.levels, (level, key) => {
      exposureLevelOptions.push({
        id: (key + 1),
        value: level.id,
        label: level.name,
      });
    });

    const siteNamesOptions = [];
    // TODO KIK-3107 and KIK-3108 disable site location search until performance improves
    // _.forEach(this.props.siteLocations, (item, key) => {
    //   siteNamesOptions.push({
    //     id: (key + 1),
    //     value: item.id,
    //     label: item.id.toString(),
    //   });
    // });
    // siteNamesOptions = _.orderBy(siteNamesOptions, 'label');

    const siteLocationsOptions = [];
    // TODO KIK-3107 and KIK-3108 disable site location search until performance improves
    // _.forEach(this.props.siteLocations, (item, key) => {
    //   siteLocationsOptions.push({
    //     id: (key + 1),
    //     value: item.id,
    //     label: item.location,
    //   });
    // });
    // siteLocationsOptions = _.orderBy(siteLocationsOptions, 'label');

    let indicationsOptions = [];
    _.forEach(this.props.indications, (item, key) => {
      indicationsOptions.push({
        id: (key + 1),
        value: item.id,
        label: item.name,
      });
    });
    indicationsOptions = _.orderBy(indicationsOptions, 'label');

    let sponsorsOptions = [];
    _.forEach(this.props.sponsors, (item, key) => {
      sponsorsOptions.push({
        id: (key + 1),
        value: item.id,
        label: item.name,
      });
    });
    sponsorsOptions = _.orderBy(sponsorsOptions, 'label');

    let protocolsOptions = [];
    _.forEach(this.props.protocols, (item, key) => {
      protocolsOptions.push({
        id: (key + 1),
        value: item.id,
        label: item.number,
      });
    });
    protocolsOptions = _.orderBy(protocolsOptions, 'label');
    protocolsOptions = [{ id: (protocolsOptions.length + 1), label: 'None', value: 'none' }].concat(protocolsOptions);

    let croOptions = [];
    _.forEach(this.props.cro, (item, key) => {
      croOptions.push({
        id: (key + 1),
        value: item.id,
        label: item.name,
      });
    });
    croOptions = _.orderBy(croOptions, 'label');

    let smOptions = [];
    _.forEach(this.props.usersByRoles.sm, (item, key) => {
      smOptions.push({
        id: (key + 1),
        value: item.id,
        label: `${item.first_name} ${item.last_name}`,
      });
    });
    smOptions = _.orderBy(smOptions, 'label');

    let bdOptions = [];
    _.forEach(this.props.usersByRoles.bd, (item, key) => {
      bdOptions.push({
        id: (key + 1),
        value: item.id,
        label: `${item.first_name} ${item.last_name}`,
      });
    });
    bdOptions = _.orderBy(bdOptions, 'label');

    let aeOptions = [];
    _.forEach(this.props.usersByRoles.ae, (item, key) => {
      aeOptions.push({
        id: (key + 1),
        value: item.id,
        label: `${item.first_name} ${item.last_name}`,
      });
    });
    aeOptions = _.orderBy(aeOptions, 'label');

    const colorOptions = _.orderBy(filterOptions.colorOptions, 'label');

    return (
      <form className="form-filters" onSubmit={handleSubmit}>
        <div className="filters form-fields">
          <div className="field-row">
            <Field
              name="status"
              className="filter-field"
              component={ReactMultiCheckBox}
              placeholder="STATUS"
              optionLabelKey="label"
              multiple
              includeAllOption
              onChange={(e) => this.initSearch(e, 'status')}
              dataSource={filterOptions.statusOptions}
              initialValue={initialValues.status}
              customSearchIconClass="icomoon-icon_search2"
            />
          </div>

          <div className="field-row">
            <Field
              name="color"
              className="filter-field"
              component={ReactMultiCheckBox}
              placeholder="COLOR"
              optionLabelKey="label"
              multiple
              includeAllOption
              onChange={(e) => this.initSearch(e, 'color')}
              dataSource={colorOptions}
              initialValue={initialValues.color}
              customSearchIconClass="icomoon-icon_search2"
            />
          </div>

          <div className="field-row">
            <Field
              name="tier"
              className="filter-field"
              component={ReactMultiCheckBox}
              placeholder="TIER"
              optionLabelKey="label"
              multiple
              includeAllOption
              onChange={(e) => this.initSearch(e, 'tier')}
              dataSource={filterOptions.tierOptions}
              initialValue={initialValues.tier}
              customSearchIconClass="icomoon-icon_search2"
            />
          </div>

          <div className="field-row">
            <Field
              name="exposureLevel"
              className="filter-field"
              component={ReactMultiCheckBox}
              placeholder="EXPOSURE LEVEL"
              optionLabelKey="label"
              multiple
              includeAllOption
              onChange={(e) => this.initSearch(e, 'exposureLevel')}
              dataSource={exposureLevelOptions}
              initialValue={initialValues.exposureLevel}
              customSearchIconClass="icomoon-icon_search2"
            />
          </div>

          <div className="field-row">
            <Field
              name="nearbyStudies"
              className="filter-field"
              component={ReactMultiCheckBox}
              placeholder="NEARBY STUDIES"
              optionLabelKey="label"
              dataSource={filterOptions.nearbyStudiesOptions}
              customSearchIconClass="icomoon-icon_search2"
              disabled
            />
          </div>

          <div className="field-row">
            <Field
              name="siteLocation"
              className="filter-field"
              component={ReactMultiCheckBox}
              placeholder="SITE LOCATION"
              searchPlaceholder="Search"
              searchable
              optionLabelKey="label"
              multiple
              includeAllOption
              onChange={(e) => this.initSearch(e, 'siteLocation')}
              dataSource={siteLocationsOptions}
              initialValue={initialValues.siteLocation}
              customSearchIconClass="icomoon-icon_search2"
              disabled
            />
          </div>

          <div className="field-row">
            <Field
              name="siteNumber"
              className="filter-field"
              component={ReactMultiCheckBox}
              placeholder="SITE NUMBER"
              searchPlaceholder="Search"
              searchable
              optionLabelKey="label"
              multiple
              includeAllOption
              onChange={(e) => this.initSearch(e, 'siteNumber')}
              dataSource={siteNamesOptions}
              initialValue={initialValues.siteNumber}
              customSearchIconClass="icomoon-icon_search2"
              disabled
            />
          </div>

          <div className="field-row">
            <Field
              name="address"
              className="filter-field"
              component={ReactMultiCheckBox}
              placeholder="ADDRESS"
              optionLabelKey="label"
              dataSource={filterOptions.addressOptions}
              customSearchIconClass="icomoon-icon_search2"
            />
          </div>

          <div className="field-row">
            <Field
              name="indication"
              className="filter-field"
              component={ReactMultiCheckBox}
              placeholder="INDICATION"
              searchPlaceholder="Search"
              searchable
              optionLabelKey="label"
              multiple
              includeAllOption
              onChange={(e) => this.initSearch(e, 'indication')}
              dataSource={indicationsOptions}
              initialValue={initialValues.indication}
              customSearchIconClass="icomoon-icon_search2"
            />
          </div>

          <div className="field-row">
            <Field
              name="protocol"
              className="filter-field"
              component={ReactMultiCheckBox}
              placeholder="PROTOCOL"
              searchPlaceholder="Search"
              searchable
              optionLabelKey="label"
              multiple
              includeAllOption
              onChange={(e) => this.initSearch(e, 'protocol')}
              dataSource={protocolsOptions}
              initialValue={initialValues.protocol}
              customSearchIconClass="icomoon-icon_search2"
            />
          </div>

          <div className="field-row">
            <Field
              name="sponsor"
              className="filter-field"
              component={ReactMultiCheckBox}
              placeholder="SPONSOR"
              searchPlaceholder="Search"
              searchable
              optionLabelKey="label"
              multiple
              includeAllOption
              onChange={(e) => this.initSearch(e, 'sponsor')}
              dataSource={sponsorsOptions}
              initialValue={initialValues.sponsor}
              customSearchIconClass="icomoon-icon_search2"
            />
          </div>

          <div className="field-row">
            <Field
              name="cro"
              className="filter-field"
              component={ReactMultiCheckBox}
              placeholder="CRO"
              searchPlaceholder="Search"
              searchable
              optionLabelKey="label"
              multiple
              includeAllOption
              onChange={(e) => this.initSearch(e, 'cro')}
              dataSource={croOptions}
              initialValue={initialValues.cro}
              customSearchIconClass="icomoon-icon_search2"
            />
          </div>

          <div className="field-row">
            <Field
              name="percentage"
              className="filter-field"
              component={ReactMultiCheckBox}
              placeholder="PERCENTAGE"
              optionLabelKey="label"
              dataSource={filterOptions.percentageOptions}
              initialValue={initialValues.percentage}
              customSearchIconClass="icomoon-icon_search2"
              disabled
            />
          </div>

          <div className="field-row">
            <Field
              name="sm"
              className="filter-field"
              component={ReactMultiCheckBox}
              placeholder="SM"
              searchPlaceholder="Search"
              searchable
              optionLabelKey="label"
              multiple
              includeAllOption
              onChange={(e) => this.initSearch(e, 'sm')}
              dataSource={smOptions}
              initialValue={initialValues.sm}
              customSearchIconClass="icomoon-icon_search2"
            />
          </div>

          <div className="field-row">
            <Field
              name="bd"
              className="filter-field"
              component={ReactMultiCheckBox}
              placeholder="BD"
              optionLabelKey="label"
              multiple
              searchable
              includeAllOption
              onChange={(e) => this.initSearch(e, 'bd')}
              dataSource={bdOptions}
              initialValue={initialValues.bd}
              customSearchIconClass="icomoon-icon_search2"
            />
          </div>

          <div className="field-row">
            <Field
              name="ae"
              className="filter-field"
              component={ReactMultiCheckBox}
              placeholder="AE"
              optionLabelKey="label"
              multiple
              searchable
              includeAllOption
              onChange={(e) => this.initSearch(e, 'ae')}
              dataSource={aeOptions}
              initialValue={initialValues.ae}
              customSearchIconClass="icomoon-icon_search2"
            />
          </div>
        </div>
      </form>
    );
  }
}

export default FiltersForm;
