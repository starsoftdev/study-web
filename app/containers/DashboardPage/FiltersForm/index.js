import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';

import ReactMultiCheckBox from 'components/Input/ReactMultiCheckbox';
import formValidator from './validator';
import { formOptions } from './staticValues';

const formName = 'dashboardFilters';
const mapStateToProps = createStructuredSelector({
});

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
              dataSource={formOptions.statusOptions}
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
              dataSource={formOptions.colorOptions}
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
              dataSource={formOptions.tierOptions}
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
              dataSource={formOptions.exposureLevelOptions}
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
              dataSource={formOptions.nearbyStudiesOptions}
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
              dataSource={formOptions.siteLocationOptions}
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
              dataSource={formOptions.siteNumberOptions}
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
              dataSource={formOptions.indicationOptions}
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
              dataSource={formOptions.protocolOptions}
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
              dataSource={formOptions.sponsorOptions}
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
              dataSource={formOptions.croOptions}
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
              dataSource={formOptions.percentageOptions}
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
              dataSource={formOptions.smOptions}
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
              dataSource={formOptions.bdOptions}
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
              dataSource={formOptions.bdOptions}
              customSearchIconClass="icomoon-icon_search2"
            />
          </div>
        </div>
      </form>
    );
  }
}

export default FiltersForm;
