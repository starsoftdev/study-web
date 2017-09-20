import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm, change, blur } from 'redux-form';

import { normalizePhoneDisplay } from '../../../app/common/helper/functions';
import { selectSavedSite, selectTimezone } from '../../containers/App/selectors';
import Input from '../../components/Input/index';
import FormGeosuggest from '../../components/Input/Geosuggest';
import LoadingSpinner from '../../components/LoadingSpinner';
import { selectEditSiteFormValues } from './selectors';
import formValidator from './validator';
import { getTimezone } from '../../containers/App/actions';
import { formatTimezone } from '../../utils/time';
const formName = 'editSite';

const mapStateToProps = createStructuredSelector({
  savedSite: selectSavedSite(),
  formValues: selectEditSiteFormValues(),
  timezone: selectTimezone(),
});

const mapDispatchToProps = (dispatch) => ({
  change: (field, value) => dispatch(change(formName, field, value)),
  blur: (field, value) => dispatch(blur(formName, field, value)),
  getTimezone: (lat, lng) => dispatch(getTimezone(lat, lng)),
});

const toShortCode = country => {
  switch (country) {
    case 'United States':
      return 'us';
    case 'United Kingdom':
      return 'uk';
    case 'Brazil':
      return 'br';
    case 'France':
      return 'fr';
    case 'Germany':
      return 'de';
    case 'Italy':
      return 'it';
    case 'Czech Republic':
      return 'cz';
    case 'Japan':
      return 'jp';
    case 'Poland':
      return 'pl';
    case 'Canada':
      return 'ca';
    default:
      return 'us';
  }
};

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
    getTimezone: PropTypes.func,
    timezone: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.onSuggestSelect = this.onSuggestSelect.bind(this);
    this.onPhoneBlur = this.onPhoneBlur.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const { change, timezone } = this.props;
    if (newProps.timezone && newProps.timezone !== timezone) {
      console.log('new timzone', newProps.timezone);
      change('timezone', formatTimezone(newProps.timezone));
    }
  }

  onPhoneBlur(event) {
    const { blur } = this.props;
    const formattedPhoneNumber = normalizePhoneDisplay(event.target.value);
    blur('phoneNumber', formattedPhoneNumber);
  }

  onSuggestSelect(e) {
    const { change, getTimezone } = this.props;
    let city = '';
    let state = '';
    let countryCode = '';
    let postalCode = '';
    let streetNmber = '';
    let route = '';
    if (e.location) {
      console.log('location', e.location);
      getTimezone(e.location.lat, e.location.lng);
    }

    if (e.gmaps && e.gmaps.address_components) {
      const addressComponents = e.gmaps.address_components;

      const addr = e.label;
      for (const val of addressComponents) {
        if (!city) {
          city = _.find(val.types, (o) => (o === 'locality'));
          const city2 = _.find(val.types, (o) => (o === 'administrative_area_level_2'));
          if (city) {
            change('city', val.long_name);
          } else if (city2) {
            change('city', val.long_name);
          }
        }
        if (!state) {
          state = _.find(val.types, (o) => (o === 'administrative_area_level_1'));
          if (state) {
            change('state', val.short_name);
          }
        }
        if (!countryCode) {
          countryCode = _.find(val.types, (o) => (o === 'country'));
          if (state) {
            change('countryCode', val.short_name);
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
      if (addressArr[3]) {
        change('countryCode', toShortCode(addressArr[3]));
      }
      this.geoSuggest.update(`${addressArr[0]}`);
      change('address', `${addressArr[0]}`);
    }
    this.valid = true;
  }

  render() {
    const { savedSite, handleSubmit, isEdit } = this.props;

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
                onFocus={() => {
                  this.valid = false;
                }}
                onBlur={() => {
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
            <strong className="label">
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
              <label>COUNTRY</label>
            </strong>
            <div className="field">
              <Field
                name="countryCode"
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
            <div className="field">
              <Field
                name="timezone"
                placeholder="Timezone"
                component={Input}
                type="text"
                isDisabled
              />
            </div>
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
