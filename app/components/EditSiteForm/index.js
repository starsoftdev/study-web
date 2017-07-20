import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm, change, blur } from 'redux-form';
import moment from 'moment-timezone';

import { normalizePhoneDisplay } from '../../../app/common/helper/functions';
import { selectSavedSite } from '../../containers/App/selectors';
import Input from '../../components/Input/index';
import FormGeosuggest from '../../components/Input/Geosuggest';
import ReactSelect from '../../components/Input/ReactSelect';
import LoadingSpinner from '../../components/LoadingSpinner';
import { selectEditSiteFormValues } from './selectors';
import formValidator from './validator';

const formName = 'editSite';

const mapStateToProps = createStructuredSelector({
  savedSite: selectSavedSite(),
  formValues: selectEditSiteFormValues(),
});

const mapDispatchToProps = (dispatch) => ({
  change: (field, value) => dispatch(change(formName, field, value)),
  blur: (field, value) => dispatch(blur(formName, field, value)),
});

@reduxForm({ form: formName, validate: formValidator })
@connect(mapStateToProps, mapDispatchToProps)

class EditSiteForm extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    change: PropTypes.func.isRequired,
    savedSite: PropTypes.object,
    blur: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func,
    isEdit: PropTypes.bool,
    initialValues: PropTypes.object,
    formValues: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.onSuggestSelect = this.onSuggestSelect.bind(this);
    this.onPhoneBlur = this.onPhoneBlur.bind(this);

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

  componentWillReceiveProps(newProps) {
    if (newProps.formValues.selectedRegion !== this.props.formValues.selectedRegion) {
      console.log('region', newProps.formValues.selectedRegion);
      this.props.change('selectedTimezone', '');
    }
  }

  onPhoneBlur(event) {
    const { blur } = this.props;
    const formattedPhoneNumber = normalizePhoneDisplay(event.target.value);
    blur('phoneNumber', formattedPhoneNumber);
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

      const addr = e.label;
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
          streetNmber = val.long_name;
        }
        if (!route && _.find(val.types, (o) => (o === 'route'))) {
          route = val.long_name;
        }
        if (streetNmber && route) {
          this.geoSuggest.update(`${streetNmber} ${route}`);
          change('address', `${streetNmber} ${route}`);
        }
      }
      change('address', addr);
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
    this.valid = true;
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
              <label>SITE PHONE</label>
            </strong>
            <div className="field">
              <Field
                name="phoneNumber"
                component={Input}
                type="text"
                disabled={savedSite.saving}
                onBlur={this.onPhoneBlur}
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
                onFocus={(e) => {
                  this.valid = false;
                }}
                onBlur={(e) => {
                  if (this.valid === false) {
                    this.geoSuggest.update('');
                    this.props.change('address', '');
                  }
                }}
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
                isDisabled
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
                isDisabled
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
                isDisabled
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
