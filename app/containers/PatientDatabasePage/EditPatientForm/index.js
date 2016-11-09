import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';
import { map } from 'lodash';
import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';

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
      <Form className="form-lightbox form-edit-patient-information" onSubmit={handleSubmit}>
        <div className="field-row form-group">
          <strong className="label required">
            <label>NAME</label>
          </strong>
          <div className="field">
            <div className="row">
              <div className="col pull-left">
                <Field
                  name="firstName"
                  component={Input}
                  type="text"
                  placeholder="First Name"
                  disabled={savedPatient.saving}
                />
              </div>
              <div className="col pull-right">
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
        <div className="field-row form-group">
          <strong className="label required">
            <label>Email</label>
          </strong>
          <Field
            name="email"
            component={Input}
            type="text"
            className="field"
            disabled={savedPatient.saving}
          />
        </div>
        <div className="field-row form-group">
          <strong className="label required">
            <label>PHONE</label>
          </strong>
          <Field
            name="phone"
            component={Input}
            type="text"
            className="field"
            disabled={savedPatient.saving}
          />
        </div>
        <div className="field-row form-group">
          <strong className="label">
            <label>Indications</label>
          </strong>
          <Field
            name="indications"
            component={ReactSelect}
            placeholder="Search..."
            options={indicationOptions}
            multi
            joinValues
            objectValue
            clearable={false}
            disabled={savedPatient.saving}
            className="multiSelectWrap field"
          />
        </div>
        <div className="field-row form-group">
          <strong className="label">
            <label>Age</label>
          </strong>
          <Field
            name="age"
            component={Input}
            type="text"
            className="field"
            disabled={savedPatient.saving}
          />
        </div>
        <div className="field-row form-group">
          <strong className="label">
            <label>GENDER</label>
          </strong>
          <Field
            name="gender"
            component={ReactSelect}
            className="field"
            placeholder="Select"
            options={genderOptions}
            disabled={savedPatient.saving}
          />
        </div>
        <div className="field-row form-group">
          <strong className="label">
            <label>BMI</label>
          </strong>
          <Field
            name="bmi"
            component={Input}
            className="field"
            type="text"
            disabled={savedPatient.saving}
          />
        </div>
        <div className="field-row form-group">
          <strong className="label">
            <label>STATUS</label>
          </strong>
          <div className="field">
            <Field
              name="status"
              component={ReactSelect}
              placeholder="Select"
              options={statusOptions}
              disabled={savedPatient.saving}
            />
          </div>
        </div>
        <div className="field-row form-group">
          <strong className="label">
            <label>SOURCE</label>
          </strong>
          <Field
            name="source"
            component={ReactSelect}
            className="field"
            placeholder="Select"
            options={sourceOptions}
            disabled={savedPatient.saving}
          />
        </div>
        <div className="btn-block text-right">
          <Button type="submit" className="btn-add-row" disabled={hasError || savedPatient.saving}>
            {savedPatient.saving
              ? <span><LoadingSpinner showOnlyIcon size={20} className="saving-patient" /></span>
              : <span>Submit</span>
            }
          </Button>
        </div>
      </Form>
    );
  }
}

export default EditPatientForm;
