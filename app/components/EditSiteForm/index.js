import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';

import Input from 'components/Input';
import { selectEditSiteFormError } from './selectors';
import { selectSelectedSiteDetailsForForm, selectSavedSite } from 'containers/SitesUsersPage/selectors';
import formValidator from './validator';
import LoadingSpinner from 'components/LoadingSpinner';

const mapStateToProps = createStructuredSelector({
  initialValues: selectSelectedSiteDetailsForForm(),
  savedSite: selectSavedSite(),
  hasError: selectEditSiteFormError(),
});

@reduxForm({ form: 'editSite', validate: formValidator })
@connect(mapStateToProps, null)

class EditSiteForm extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    savedSite: PropTypes.object,
    hasError: PropTypes.bool,
    handleSubmit: PropTypes.func,
  };

  render() {
    const { savedSite, hasError, handleSubmit } = this.props;

    return (
      <form className="form-edit-site" onSubmit={handleSubmit}>
        <div className="edit-site scroll-holder jcf--scrollable">
          <div className="row form-group">
            <strong className="required col-sm-4">
              <label>SITE NAME</label>
            </strong>
            <div className="field col-sm-8">
              <Field
                name="name"
                component={Input}
                type="text"
                disabled={savedSite.saving}
              />
            </div>
          </div>
          <div className="row form-group">
            <strong className="required col-sm-4">
              <label>PRINCIPAL INVESTIGATOR</label>
            </strong>
            <div className="field col-sm-8">
              <div className="row">
                <div className="col-sm-6">
                  <Field
                    name="piFirstName"
                    component={Input}
                    type="text"
                    placeholder="First Name"
                    disabled={savedSite.saving}
                  />
                </div>
                <div className="col-sm-6">
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
          <div className="row form-group">
            <strong className="required col-sm-4">
              <label>SITE PHONE</label>
            </strong>
            <div className="field col-sm-8">
              <Field
                name="phone"
                component={Input}
                type="text"
                disabled={savedSite.saving}
              />
            </div>
          </div>
          <div className="row form-group">
            <strong className="required col-sm-4">
              <label>SITE ADDRESS</label>
            </strong>
            <div className="field col-sm-8">
              <Field
                name="address"
                component={Input}
                type="text"
                disabled={savedSite.saving}
              />
            </div>
          </div>
          <div className="row form-group">
            <strong className="required col-sm-4">
              <label>CITY</label>
            </strong>
            <div className="field col-sm-8">
              <Field
                name="city"
                component={Input}
                type="text"
                disabled={savedSite.saving}
              />
            </div>
          </div>
          <div className="row form-group">
            <strong className="required col-sm-4">
              <label>STATE / PROVINCE</label>
            </strong>
            <div className="field col-sm-8">
              <Field
                name="state"
                component={Input}
                type="text"
                disabled={savedSite.saving}
              />
            </div>
          </div>
          <div className="row form-group">
            <strong className="required col-sm-4">
              <label>POSTAL CODE</label>
            </strong>
            <div className="field col-sm-8">
              <Field
                name="zip"
                component={Input}
                type="text"
                disabled={savedSite.saving}
              />
            </div>
          </div>
          <div className="btn-block text-right">
            <button type="submit" className="btn btn-default btn-add-row" disabled={hasError || savedSite.saving}>
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
