import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm, change } from 'redux-form';
import _ from 'lodash';

import Input from '../../components/Input';
import { selectSavedSite } from '../../containers/App/selectors';
import { selectEditSiteFormValues } from './selectors';
import formValidator from './validator';
import LoadingSpinner from '../../components/LoadingSpinner';
import FormGeosuggest from '../../components/Input/Geosuggest';
import './styles.less';
import moment from 'moment-timezone';
import ReactSelect from '../../components/Input/ReactSelect';

const formName = 'editSite';

const mapStateToProps = createStructuredSelector({
  savedSite: selectSavedSite(),
  formValues: selectEditSiteFormValues(),
});

const mapDispatchToProps = (dispatch) => ({
  change: (field, value) => dispatch(change(formName, field, value)),
});

@reduxForm({ form: formName, validate: formValidator })
@connect(mapStateToProps, mapDispatchToProps)

class EditSiteForm extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    change: PropTypes.func.isRequired,
    savedSite: PropTypes.object,
    handleSubmit: PropTypes.func,
    isEdit: PropTypes.bool,
    initialValues: PropTypes.object,
    formValues: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.onSuggestSelect = this.onSuggestSelect.bind(this);

    const timezones = moment.tz.names();
    const regionOptions = [];
    const regionWithTimezones = [];

    for (const tz of timezones) {
      const parsedRegion = tz.substr(0, tz.indexOf('/'));
      const parsedTimezone = tz.substr(tz.indexOf('/') + 1);

      if (!parsedRegion) {
        regionWithTimezones[parsedTimezone] = [];

        regionWithTimezones[parsedTimezone].push({
          label: parsedTimezone.replace(/_/g, ' '),
          value: parsedTimezone,
        });

        regionOptions.push({
          label: parsedTimezone.replace(/_/g, ' '),
          value: parsedTimezone,
        });
      } else if (regionWithTimezones[parsedRegion]) {
        regionWithTimezones[parsedRegion].push({
          label: parsedTimezone.replace(/_/g, ' '),
          value: parsedTimezone,
        });
      } else {
        regionWithTimezones[parsedRegion] = [];

        regionWithTimezones[parsedRegion].push({
          label: parsedTimezone.replace(/_/g, ' '),
          value: parsedTimezone,
        });

        regionOptions.push({
          label: parsedRegion,
          value: parsedRegion,
        });
      }
    }

    this.state = {
      regionOptions,
      regionWithTimezones,
    };
  }

  onSuggestSelect(e) {
    const { change } = this.props;
    let city = '';
    let state = '';
    let postalCode = '';
    let streetNmber = '';
    let route = '';

    if (e.gmaps && e.gmaps.address_components) {
      const addressComponents = e.gmaps.address_components;

      for (const val of addressComponents) {
        if (!city) {
          city = _.find(val.types, (o) => (o === 'locality'));
          if (city) {
            change('city', val.long_name);
          }
        }
        if (!state) {
          state = _.find(val.types, (o) => (o === 'administrative_area_level_1'));
          if (state) {
            change('state', val.short_name);
          }
        }
        if (!postalCode) {
          postalCode = _.find(val.types, (o) => (o === 'postal_code'));
          if (postalCode) {
            change('zip', val.long_name);
          }
        }
        if (!streetNmber && _.find(val.types, (o) => (o === 'street_number'))) {
          streetNmber = val.short_name;
        }
        if (!route && _.find(val.types, (o) => (o === 'route'))) {
          route = val.short_name;
        }
        if (streetNmber && route) {
          this.geoSuggest.update(`${streetNmber} ${route}`);
          change('address', `${streetNmber} ${route}`);
        }
      }
      change('address', e.label);
    } else {
      const addressArr = e.label.split(',');
      if (addressArr[1]) {
        change('city', addressArr[1]);
      }
      if (addressArr[2]) {
        change('state', addressArr[2]);
      }
      this.geoSuggest.update(`${addressArr[0]}`);
      change('address', `${addressArr[0]}`);
    }
  }

  render() {
    const { savedSite, handleSubmit, isEdit } = this.props;

    let timezoneOptions = [];

    if (this.props.formValues.selectedRegion) {
      timezoneOptions = this.state.regionWithTimezones[this.props.formValues.selectedRegion];
    }

    return (
      <form className="form-lightbox form-edit-site" onSubmit={handleSubmit}>
        <div className="edit-site form-fields">
          <div className="field-row">
            <strong className="label required">
              <label>SITE NAME</label>
            </strong>
            <div className="field">
              <Field
                name="name"
                component={Input}
                type="text"
                disabled={savedSite.saving}
              />
            </div>
          </div>
          <div className="field-row">
            <strong className="label required">
              <label>PRINCIPAL INVESTIGATOR</label>
            </strong>
            <div className="field">
              <div className="row">
                <div className="col pull-left">
                  <Field
                    name="piFirstName"
                    component={Input}
                    type="text"
                    placeholder="First Name"
                    disabled={savedSite.saving}
                  />
                </div>
                <div className="col pull-left">
                  <Field
                    name="piLastName"
                    component={Input}
                    type="text"
                    placeholder="Last Name"
                    disabled={savedSite.saving}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="field-row">
            <strong className="label required">
              <label>SITE PHONE</label>
            </strong>
            <div className="field">
              <Field
                name="phoneNumber"
                component={Input}
                type="text"
                disabled={savedSite.saving}
              />
            </div>
          </div>
          <div className="field-row">
            <strong className="label required">
              <label>SITE ADDRESS</label>
            </strong>
            <div className="field">
              <Field
                name="address"
                component={FormGeosuggest}
                refObj={(el) => { this.geoSuggest = el; }}
                onSuggestSelect={this.onSuggestSelect}
                initialValue={isEdit ? this.props.initialValues.address : ''}
                placeholder=""
              />
            </div>
          </div>
          <div className="field-row">
            <strong className="label required">
              <label>CITY</label>
            </strong>
            <div className="field">
              <Field
                name="city"
                component={Input}
                type="text"
                disabled={savedSite.saving}
              />
            </div>
          </div>
          <div className="field-row">
            <strong className="label required">
              <label>STATE / PROVINCE</label>
            </strong>
            <div className="field">
              <Field
                name="state"
                component={Input}
                type="text"
                disabled={savedSite.saving}
              />
            </div>
          </div>
          <div className="field-row">
            <strong className="label required">
              <label>POSTAL CODE</label>
            </strong>
            <div className="field">
              <Field
                name="zip"
                component={Input}
                type="text"
                disabled={savedSite.saving}
              />
            </div>
          </div>
          <div className="field-row">
            <strong className="label required"><label>Time Zone</label></strong>
            <Field
              name="selectedRegion"
              component={ReactSelect}
              placeholder="Select Region"
              options={this.state.regionOptions}
              disabled={savedSite.saving}
              className="field"
            />
          </div>
          <div className="field-row">
            <strong className="label"><label></label></strong>
            <Field
              name="selectedTimezone"
              component={ReactSelect}
              placeholder="Select Time Zone"
              options={timezoneOptions}
              disabled={savedSite.saving}
              className="field"
            />
          </div>
          <div className="btn-block text-right">
            <button type="submit" className="btn btn-default btn-add-row" disabled={savedSite.saving}>
              {savedSite.saving
                ? <span><LoadingSpinner showOnlyIcon size={20} /></span>
                : <span>{isEdit ? 'Update' : 'Submit'}</span>
              }
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default EditSiteForm;
