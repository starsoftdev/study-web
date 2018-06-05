import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';

import ReactMultiCheckBox from '../Input/ReactMultiCheckbox';
import formValidator from './validator';

const formName = 'adminDashboardFilters';
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
  indicationsOptions : [],
  sponsorsOptions : [],
  protocolsOptions : [],
  croOptions : [],
  adOptions : [],
  smOptions : [],
  bdOptions : [],
};

@reduxForm({ form: formName, validate: formValidator, destroyOnUnmount: false })
@connect(mapStateToProps)

class FiltersModalForm extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    initialValues: PropTypes.object || PropTypes.arrayOf(PropTypes.object),
    updateFilters: PropTypes.func,
    handleSubmit: PropTypes.func,
  };

  initSearch(value, key) {
    this.props.updateFilters(key, value);
  }

  render() {
    const { handleSubmit, initialValues } = this.props;

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
              dataSource={filterOptions.indicationsOptions}
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
              dataSource={filterOptions.protocolsOptions}
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
              dataSource={filterOptions.sponsorsOptions}
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
              dataSource={filterOptions.croOptions}
              initialValue={initialValues.cro}
              customSearchIconClass="icomoon-icon_search2"
            />
          </div>

          <div className="field-row">
            <Field
              name="ad"
              className="filter-field"
              component={ReactMultiCheckBox}
              placeholder="AD OPERATION"
              optionLabelKey="label"
              multiple
              searchable
              includeAllOption
              onChange={(e) => this.initSearch(e, 'ao')}
              dataSource={filterOptions.adOptions}
              initialValue={initialValues.ad}
              customSearchIconClass="icomoon-icon_search2"
            />
          </div>

          <div className="field-row">
            <Field
              name="bd"
              className="filter-field"
              component={ReactMultiCheckBox}
              placeholder="BUSINESS DEVELOPMENT"
              optionLabelKey="label"
              multiple
              searchable
              includeAllOption
              onChange={(e) => this.initSearch(e, 'bd')}
              dataSource={filterOptions.bdOptions}
              initialValue={initialValues.bd}
              customSearchIconClass="icomoon-icon_search2"
            />
          </div>

          <div className="field-row">
            <Field
              name="cc"
              className="filter-field"
              component={ReactMultiCheckBox}
              placeholder="CALL CENTER"
              searchPlaceholder="Search"
              searchable
              optionLabelKey="label"
              multiple
              includeAllOption
              onChange={(e) => this.initSearch(e, 'cc')}
              dataSource={filterOptions.smOptions}
              initialValue={initialValues.cc}
              customSearchIconClass="icomoon-icon_search2"
            />
          </div>
        </div>
      </form>
    );
  }
}

export default FiltersModalForm;
