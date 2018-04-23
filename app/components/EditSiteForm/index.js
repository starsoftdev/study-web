import _ from 'lodash';
import moment from 'moment-timezone';
import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm, change, blur } from 'redux-form';

import { normalizePhoneDisplay } from '../../../app/common/helper/functions';
import { selectFormsTempTimezone, selectSavedSite } from '../../containers/App/selectors';
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
  tempTimezone: selectFormsTempTimezone(),
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
    case 'Hungary':
      return 'hu';
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
    tempTimezone: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.onSuggestSelect = this.onSuggestSelect.bind(this);
    this.onPhoneBlur = this.onPhoneBlur.bind(this);
    this.state = {
      fetchingTimezone: false,
    };
  }

  componentWillReceiveProps(newProps) {
    const { change, tempTimezone, formValues } = this.props;
    if (newProps.tempTimezone && newProps.tempTimezone !== tempTimezone) {
      change('timezone', formatTimezone(newProps.tempTimezone, formValues.city));
      change('timezoneUnparsed', newProps.tempTimezone);

      this.setState({ fetchingTimezone: false });
    }
  }

  onPhoneBlur(event) {
    const { blur } = this.props;
    const formattedPhoneNumber = normalizePhoneDisplay(event.target.value);
    blur('phoneNumber', formattedPhoneNumber);
  }

  onSuggestSelect(e) {
    if (typeof e === 'undefined') {
      return;
    }
    const { change, getTimezone } = this.props;
    let city = '';
    let state = '';
    let countryCode = '';
    let postalCode = '';
    let streetNmber = '';
    let route = '';
    if (e && e.location) {
      getTimezone(e.location.lat, e.location.lng);

      this.setState({ fetchingTimezone: true });
    }

    change('address', e.label);
    if (e.gmaps && e.gmaps.address_components) {
      const addressComponents = e.gmaps.address_components;

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
          } else {
            change('state', '');
          }
        }
        if (!countryCode) {
          countryCode = _.find(val.types, (o) => (o === 'country'));
          if (countryCode) {
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
        }
      }
    } else {
      const addressArr = e.label.split(',');
      if (addressArr[1]) {
        change('city', addressArr[1]);
      }
      if (addressArr[2]) {
        change('state', addressArr[2]);
      } else {
        change('state', '');
      }
      if (addressArr[3]) {
        change('countryCode', toShortCode(addressArr[3]));
      }
      this.geoSuggest.update(`${addressArr[0]}`);
    }
  }

  render() {
    const { handleSubmit, isEdit, initialValues, savedSite } = this.props;
    const { fetchingTimezone } = this.state;

    const submitButtonDisabled = savedSite.saving || fetchingTimezone;

    let isDst = false;
    if (this.props.formValues && this.props.formValues.timezoneUnparsed) {
      isDst = moment().tz(this.props.formValues.timezoneUnparsed).isDST();
    } else if (this.props.initialValues && this.props.initialValues.timezoneUnparsed) {
      isDst = moment().tz(this.props.initialValues.timezoneUnparsed).isDST();
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
                initialValue={isEdit ? initialValues.address : ''}
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
          <div className={classNames('field-row', { 'field-before-dst-label': (isDst) })}>
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
          {
            (isDst === true) &&
            <div className="field-row">
              <strong className="label"><label>&nbsp;</label></strong>
              <div className="field dst-label">This time zone currently observes daylight savings.</div>
            </div>
          }
          <div className="btn-block text-right">
            <button type="submit" className="btn btn-default btn-add-row" disabled={submitButtonDisabled}>
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
