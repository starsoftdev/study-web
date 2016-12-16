import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm, change } from 'redux-form';

import Input from 'components/Input';
import { selectSavedSite } from 'containers/App/selectors';
import formValidator from './validator';
import LoadingSpinner from 'components/LoadingSpinner';
import Geosuggest from 'react-geosuggest';
import './styles.less';
import _ from 'lodash';

const mapStateToProps = createStructuredSelector({
  savedSite: selectSavedSite(),
});

@reduxForm({ form: 'editSite', validate: formValidator })
@connect(mapStateToProps, null)

class EditSiteForm extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    savedSite: PropTypes.object,
    handleSubmit: PropTypes.func,
    isEdit: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.onSuggestSelect = this.onSuggestSelect.bind(this);
  }


  onSuggestSelect(e) {
    let city = '';
    let state = '';
    let postalCode = '';
    let streetNmber = '';
    let route = '';
    this.geoSuggest.update('');
    if (e.gmaps && e.gmaps.address_components) {
      const addressComponents = e.gmaps.address_components;
      for (const val of addressComponents) {
        if (!city) {
          city = _.find(val.types, (o) => (o === 'locality'));
          if (city) {
            this.props.dispatch(change('editSite', 'city', val.long_name));
          }
        }
        if (!state) {
          state = _.find(val.types, (o) => (o === 'administrative_area_level_1'));
          if (state) {
            this.props.dispatch(change('editSite', 'state', val.long_name));
          }
        }
        if (!postalCode) {
          postalCode = _.find(val.types, (o) => (o === 'postal_code'));
          if (postalCode) {
            this.props.dispatch(change('editSite', 'zip', val.long_name));
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
          this.props.dispatch(change('editSite', 'address', `${streetNmber} ${route}`));
        }
      }
    }
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
                name="phone"
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
              {(() => {
                if (isEdit) {
                  return (<Field
                    name="address"
                    component={Input}
                    disabled={savedSite.saving}
                    onChange={this.addressChanged}
                  />);
                }

                return (<Geosuggest
                  ref={(el) => { this.geoSuggest = el; }}
                  onSuggestSelect={this.onSuggestSelect}
                />);
              })()}
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
          <div className="btn-block text-right">
            <button type="submit" className="btn btn-default btn-add-row" disabled={savedSite.saving}>
              {savedSite.saving
                ? <span><LoadingSpinner showOnlyIcon size={20} className="saving-site" /></span>
                : <span>Submit</span>
              }
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default EditSiteForm;
