import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';
import { map } from 'lodash';

import Input from 'components/Input';
import ReactSelect from 'components/Input/ReactSelect';
import { selectEditPatientFormError } from './selectors';
import { selectPatientCategories, selectSavedPatient } from 'containers/PatientDatabasePage/selectors';
import { selectIndications, selectSources } from 'containers/App/selectors';
import formValidator from './validator';
import LoadingSpinner from 'components/LoadingSpinner';

const mapStateToProps = createStructuredSelector({
  indications: selectIndications(),
  sources: selectSources(),
  patientCategories: selectPatientCategories(),
  savedPatient: selectSavedPatient(),
  hasError: selectEditPatientFormError(),
});

@reduxForm({ form: 'editPatient', validate: formValidator })
@connect(mapStateToProps, null)

class EditPatientForm extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    indications: PropTypes.array,
    sources: PropTypes.array,
    patientCategories: PropTypes.object,
    savedPatient: PropTypes.object,
    hasError: PropTypes.bool,
    handleSubmit: PropTypes.func,
  };

  render() {
    const { indications, sources, patientCategories, hasError, savedPatient, handleSubmit } = this.props;
    const indicationOptions = map(indications, indicationIterator => ({
      label: indicationIterator.name,
      value: indicationIterator.id,
    }));
    const sourceOptions = map(sources, sourceIterator => ({
      label: sourceIterator.type,
      value: sourceIterator.id,
    }));
    const statusOptions = map(patientCategories.details, patientCategoryIterator => ({
      label: patientCategoryIterator.name,
      value: patientCategoryIterator.id,
    }));
    const genderOptions = [
      {
        label: 'Male',
        value: 'Male',
      }, {
        label: 'Female',
        value: 'Female',
      },
    ];

    return (
      <form className="form-edit-patient" onSubmit={handleSubmit}>
        <div className="edit-patient scroll-holder jcf--scrollable">
          <div className="row form-group">
            <strong className="required col-sm-4">
              <label>NAME</label>
            </strong>
            <div className="field col-sm-8">
              <div className="row">
                <div className="col-sm-6">
                  <Field
                    name="firstName"
                    component={Input}
                    type="text"
                    placeholder="First Name"
                    disabled={savedPatient.saving}
                  />
                </div>
                <div className="col-sm-6">
                  <Field
                    name="lastName"
                    component={Input}
                    type="text"
                    placeholder="Last Name"
                    disabled={savedPatient.saving}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row form-group">
            <strong className="required col-sm-4">
              <label>EMAIL</label>
            </strong>
            <div className="field col-sm-8">
              <Field
                name="email"
                component={Input}
                type="text"
                disabled={savedPatient.saving}
              />
            </div>
          </div>
          <div className="row form-group">
            <strong className="required col-sm-4">
              <label>PHONE</label>
            </strong>
            <div className="field col-sm-8">
              <Field
                name="phone"
                component={Input}
                type="text"
                disabled={savedPatient.saving}
              />
            </div>
          </div>
          <div className="row form-group">
            <strong className="col-sm-4">
              <label>INDICATIONS</label>
            </strong>
            <div className="field col-sm-8">
              <Field
                name="indications"
                component={ReactSelect}
                placeholder="Search..."
                options={indicationOptions}
                multi
                joinValues
                disabled={savedPatient.saving}
              />
            </div>
          </div>
          <div className="row form-group">
            <strong className="col-sm-4">
              <label>AGE</label>
            </strong>
            <div className="field col-sm-8">
              <Field
                name="age"
                component={Input}
                type="text"
                disabled={savedPatient.saving}
              />
            </div>
          </div>
          <div className="row form-group">
            <strong className="col-sm-4">
              <label>GENDER</label>
            </strong>
            <div className="field col-sm-8">
              <Field
                name="gender"
                component={ReactSelect}
                placeholder="Select"
                options={genderOptions}
                disabled={savedPatient.saving}
              />
            </div>
          </div>
          <div className="row form-group">
            <strong className="col-sm-4">
              <label>BMI</label>
            </strong>
            <div className="field col-sm-8">
              <Field
                name="bmi"
                component={Input}
                type="text"
                disabled={savedPatient.saving}
              />
            </div>
          </div>
          <div className="row form-group">
            <strong className="col-sm-4">
              <label>STATUS</label>
            </strong>
            <div className="field col-sm-8">
              <Field
                name="status"
                component={ReactSelect}
                placeholder="Select"
                options={statusOptions}
                disabled={savedPatient.saving}
              />
            </div>
          </div>
          <div className="row form-group">
            <strong className="col-sm-4">
              <label>SOURCE</label>
            </strong>
            <div className="field col-sm-8">
              <Field
                name="source"
                component={ReactSelect}
                placeholder="Select"
                options={sourceOptions}
                disabled={savedPatient.saving}
              />
            </div>
          </div>
          <div className="btn-block text-right">
            <button type="submit" className="btn btn-default btn-add-row" disabled={hasError || savedPatient.saving}>
              {savedPatient.saving
                ? <span><LoadingSpinner showOnlyIcon size={20} className="saving-patient" /></span>
                : <span>Submit</span>
              }
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default EditPatientForm;
