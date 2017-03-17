import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';

import ReactMultiCheckBox from '../../../../components/Input/ReactMultiCheckbox';
import formValidator from './validator';
import _ from 'lodash';

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
      label: '< 10 Miles',
      value: 10,
    }, {
      id: 2,
      label: '< 25 Miles',
      value: 25,
    }, {
      id: 3,
      label: '< 50 Miles',
      value: 50,
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
    handleSubmit: PropTypes.func,
    fetchStudiesAccordingToFilters: PropTypes.func,
    initialValues: PropTypes.object,
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
    console.log('initSearch - updated filter', value, key);
    this.props.fetchStudiesAccordingToFilters(value, key);
  }

  render() {
    const { handleSubmit } = this.props;

    const exposureLevelOptions = [];
    _.forEach(this.props.levels, (level, key) => {
      exposureLevelOptions.push({
        id: (key + 1),
        value: level.id,
        label: level.name,
      });
    });

    const siteNamesOptions = [];
    _.forEach(this.props.siteNames, (item, key) => {
      siteNamesOptions.push({
        id: (key + 1),
        value: item.name,
        label: item.name,
      });
    });

    const siteLocationsOptions = [];
    _.forEach(this.props.siteLocations, (item, key) => {
      siteLocationsOptions.push({
        id: (key + 1),
        value: item.id,
        label: item.location,
      });
    });

    const indicationsOptions = [];
    _.forEach(this.props.indications, (item, key) => {
      indicationsOptions.push({
        id: (key + 1),
        value: item.id,
        label: item.name,
      });
    });

    const sponsorsOptions = [];
    _.forEach(this.props.sponsors, (item, key) => {
      sponsorsOptions.push({
        id: (key + 1),
        value: item.id,
        label: item.name,
      });
    });

    const protocolsOptions = [];
    _.forEach(this.props.protocols, (item, key) => {
      protocolsOptions.push({
        id: (key + 1),
        value: item.id,
        label: item.number,
      });
    });

    const croOptions = [];
    _.forEach(this.props.cro, (item, key) => {
      croOptions.push({
        id: (key + 1),
        value: item.id,
        label: item.name,
      });
    });

    const smOptions = [];
    _.forEach(this.props.usersByRoles.sm, (item, key) => {
      smOptions.push({
        id: (key + 1),
        value: item.id,
        label: `${item.first_name} ${item.last_name}`,
      });
    });

    const bdOptions = [];
    _.forEach(this.props.usersByRoles.bd, (item, key) => {
      bdOptions.push({
        id: (key + 1),
        value: item.id,
        label: `${item.first_name} ${item.last_name}`,
      });
    });

    const aeOptions = [];
    _.forEach(this.props.usersByRoles.ae, (item, key) => {
      aeOptions.push({
        id: (key + 1),
        value: item.id,
        label: `${item.first_name} ${item.last_name}`,
      });
    });


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
              initialValue={this.props.initialValues.status}
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
              dataSource={filterOptions.colorOptions}
              initialValue={this.props.initialValues.color}
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
              initialValue={this.props.initialValues.tier}
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
              initialValue={this.props.initialValues.exposureLevel}
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
              multiple
              includeAllOption
              onChange={(e) => this.initSearch(e, 'nearbyStudies')}
              dataSource={filterOptions.nearbyStudiesOptions}
              customSearchIconClass="icomoon-icon_search2"
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
              initialValue={this.props.initialValues.siteLocation}
              customSearchIconClass="icomoon-icon_search2"
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
              initialValue={this.props.initialValues.siteNumber}
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
              initialValue={this.props.initialValues.indication}
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
              initialValue={this.props.initialValues.protocol}
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
              initialValue={this.props.initialValues.sponsor}
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
              initialValue={this.props.initialValues.cro}
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
              initialValue={this.props.initialValues.percentage}
              customSearchIconClass="icomoon-icon_search2"
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
              initialValue={this.props.initialValues.sm}
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
              includeAllOption
              onChange={(e) => this.initSearch(e, 'bd')}
              dataSource={bdOptions}
              initialValue={this.props.initialValues.bd}
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
              includeAllOption
              onChange={(e) => this.initSearch(e, 'ae')}
              dataSource={aeOptions}
              initialValue={this.props.initialValues.ae}
              customSearchIconClass="icomoon-icon_search2"
            />
          </div>
        </div>
      </form>
    );
  }
}

export default FiltersForm;
