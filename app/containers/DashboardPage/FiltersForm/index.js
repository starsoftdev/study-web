import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';

import ReactMultiCheckBox from 'components/Input/ReactMultiCheckbox';
import formValidator from './validator';

const formName = 'dashboardFilters';
const mapStateToProps = createStructuredSelector({
});

const filterOptions = {
  statusOptions : [
    {
      id: 1,
      label: 'Active',
      value: 'Active',
    }, {
      id: 2,
      label: 'Inactive',
      value: 'Inactive',
    },
  ],

  colorOptions : [
    {
      id: 1,
      label: 'Red',
      value: 'Red',
    }, {
      id: 2,
      label: 'Yellow',
      value: 'Yellow',
    }, {
      id: 3,
      label: 'Green',
      value: 'Green',
    }, {
      id: 4,
      label: 'Purple',
      value: 'Purple',
    },
  ],

  tierOptions : [
    {
      id: 1,
      label: 'Tier 1',
      value: 'tier1',
    }, {
      id: 2,
      label: 'Tier 2',
      value: 'tier2',
    }, {
      id: 3,
      label: 'Tier 3',
      value: 'tier3',
    }, {
      id: 4,
      label: 'Tier 4',
      value: 'tier4',
    },
  ],

  exposureLevelOptions : [
    {
      id: 1,
      label: 'Diamond',
      value: 'Diamond',
    }, {
      id: 2,
      label: 'Platinum',
      value: 'Platinum',
    }, {
      id: 3,
      label: 'Gold',
      value: 'Gold',
    }, {
      id: 4,
      label: 'Silver',
      value: 'Silver',
    }, {
      id: 5,
      label: 'Bronze',
      value: 'Bronze',
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

  siteLocationOptions : [
    {
      id: 1,
      label: 'Ace Chemicals',
      value: 'Ace Chemicals',
    }, {
      id: 2,
      label: 'Acme Corporation',
      value: 'Acme Corporation',
    }, {
      id: 3,
      label: 'Kord Enterprise',
      value: 'Kord Enterprise',
    },
  ],

  siteNumberOptions : [
    {
      id: 1,
      label: 'Option 1',
      value: 'Option 1',
    }, {
      id: 2,
      label: 'Option 2',
      value: 'Option 2',
    }, {
      id: 3,
      label: 'Option 3',
      value: 'Option 3',
    },
  ],

  indicationOptions : [
    {
      id: 1,
      label: 'Acne',
      value: 'Acne',
    }, {
      id: 2,
      label: 'Low Back Pain',
      value: 'Low Back Pain',
    }, {
      id: 3,
      label: 'Migraine',
      value: 'Migraine',
    },
  ],

  protocolOptions : [
    {
      id: 1,
      label: 'ALK-502',
      value: 'ALK-502',
    }, {
      id: 2,
      label: 'A40910259',
      value: 'A40910259',
    }, {
      id: 3,
      label: 'Col Mig-302',
      value: 'Col Mig-302',
    },
  ],

  sponsorOptions : [
    {
      id: 1,
      label: 'Pfizer',
      value: 'Pfizer',
    }, {
      id: 2,
      label: 'Company 2',
      value: 'Company 2',
    }, {
      id: 3,
      label: 'Company 3',
      value: 'Company 3',
    },
  ],

  croOptions : [
    {
      id: 1,
      label: 'Inc_Research',
      value: 'Inc_Research',
    }, {
      id: 2,
      label: 'InVentiv',
      value: 'InVentiv',
    }, {
      id: 3,
      label: 'Quintiles',
      value: 'Quintiles',
    },
  ],

  percentageOptions : [
    {
      id: 1,
      label: '<',
      value: '<',
    }, {
      id: 2,
      label: '>',
      value: '>',
    }, {
      id: 3,
      label: '=',
      value: '=',
    },
  ],

  smOptions : [
    {
      id: 1,
      label: 'Will Graham',
      value: 'Will Graham',
    }, {
      id: 2,
      label: 'Alan Walker',
      value: 'Alan Walker',
    }, {
      id: 3,
      label: 'Penny Worth',
      value: 'Penny Worth',
    },
  ],

  bdOptions : [
    {
      id: 1,
      label: 'Bruce Wayne',
      value: 'Bruce Wayne',
    }, {
      id: 2,
      label: 'Ray Palmer',
      value: 'Ray Palmer',
    }, {
      id: 3,
      label: 'Oliver Queen',
      value: 'Oliver Queen',
    },
  ],

  aeOptions : [
    {
      id: 1,
      label: 'Richard Hendriks',
      value: 'Richard Hendriks',
    }, {
      id: 2,
      label: 'Mary Stuart',
      value: 'Mary Stuart',
    }, {
      id: 3,
      label: 'Austin Baron',
      value: 'Austin Baron',
    },
  ],

};


@reduxForm({ form: formName, validate: formValidator, destroyOnUnmount: false })
@connect(mapStateToProps, null)

class FiltersForm extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func,
  };

  initSearch(value, key) {
    console.log('initSearch - updated filter', value, key);
  }

  render() {
    const { handleSubmit } = this.props;

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
              dataSource={filterOptions.exposureLevelOptions}
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
              dataSource={filterOptions.siteLocationOptions}
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
              dataSource={filterOptions.siteNumberOptions}
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
              dataSource={filterOptions.indicationOptions}
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
              dataSource={filterOptions.protocolOptions}
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
              dataSource={filterOptions.sponsorOptions}
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
              dataSource={filterOptions.croOptions}
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
              multiple
              onChange={(e) => this.initSearch(e, 'percentage')}
              dataSource={filterOptions.percentageOptions}
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
              dataSource={filterOptions.smOptions}
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
              dataSource={filterOptions.bdOptions}
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
              dataSource={filterOptions.bdOptions}
              customSearchIconClass="icomoon-icon_search2"
            />
          </div>
        </div>
      </form>
    );
  }
}

export default FiltersForm;
