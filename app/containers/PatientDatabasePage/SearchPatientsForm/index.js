import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';
import Button from 'react-bootstrap/lib/Button';
import { map } from 'lodash';

import Input from 'components/Input';
import ReactSelect from 'components/Input/ReactSelect';
import { selectSearchPatientsFormError } from './selectors';
import { selectPatientCategories, selectPatients } from 'containers/PatientDatabasePage/selectors';
import { selectIndications, selectSources } from 'containers/App/selectors';
import formValidator from './validator';
import LoadingSpinner from 'components/LoadingSpinner';
import './styles.less';

const mapStateToProps = createStructuredSelector({
  indications: selectIndications(),
  sources: selectSources(),
  patientCategories: selectPatientCategories(),
  patients: selectPatients(),
  hasError: selectSearchPatientsFormError(),
});

@reduxForm({ form: 'searchPatients', validate: formValidator })
@connect(mapStateToProps, null)

class SearchPatientsForm extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    indications: PropTypes.array,
    sources: PropTypes.array,
    patientCategories: PropTypes.object,
    patients: PropTypes.object,
    hasError: PropTypes.bool,
    handleSubmit: PropTypes.func,
  };

  render() {
    const { indications, sources, patientCategories, patients, hasError, handleSubmit } = this.props;
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
        label: 'All',
        value: 'All',
      }, {
        label: 'Male',
        value: 'Male',
      }, {
        label: 'Female',
        value: 'Female',
      },
    ];

    return (
      <form className="form-search-patients" onSubmit={handleSubmit}>
        <div className="search-patients">
          <div className="row form-group">
            <div className="col-sm-3">
              <span className="title">
                <label>Name</label>
              </span>
              <div>
                <Field
                  name="name"
                  component={Input}
                  type="text"
                  placeholder="Search..."
                  disabled={patients.fetching}
                />
              </div>
            </div>
            <div className="col-sm-3">
              <span className="title">
                <label>Include Indication</label>
              </span>
              <div>
                <Field
                  name="includeIndication"
                  component={ReactSelect}
                  placeholder="Search..."
                  options={indicationOptions}
                  multi
                  joinValues
                  objectValue
                  disabled={patients.fetching}
                  className="multiSelectWrap"
                />
              </div>
            </div>
            <div className="col-sm-3">
              <span className="title">
                <label>Exclude Indication</label>
              </span>
              <div>
                <Field
                  name="excludeIndication"
                  component={ReactSelect}
                  placeholder="Search..."
                  options={indicationOptions}
                  multi
                  joinValues
                  objectValue
                  disabled={patients.fetching}
                  className="multiSelectWrap"
                />
              </div>
            </div>
            <div className="col-sm-3">
              <span className="title">
                <label>Gender</label>
              </span>
              <div>
                <Field
                  name="gender"
                  component={ReactSelect}
                  placeholder="Select"
                  options={genderOptions}
                  disabled={patients.fetching}
                />
              </div>
            </div>
          </div>
          <div className="row form-group">
            <div className="col-sm-3">
              <span className="title">
                <label>Status</label>
              </span>
              <div>
                <Field
                  name="status"
                  component={ReactSelect}
                  placeholder="Select"
                  options={statusOptions}
                  disabled={patients.fetching}
                />
              </div>
            </div>
            <div className="col-sm-3">
              <span className="title">
                <label>Source</label>
              </span>
              <div>
                <Field
                  name="source"
                  component={ReactSelect}
                  placeholder="Select"
                  options={sourceOptions}
                  disabled={patients.fetching}
                />
              </div>
            </div>
            <div className="col-sm-3">
              <span className="title">
                <label>Age Range</label>
              </span>
              <div>
                <div className="col pull-left">
                  <Field
                    name="ageFrom"
                    className="age-from"
                    placeholder="From"
                    component={Input}
                    type="text"
                    disabled={patients.fetching}
                  />
                </div>
                <div className="col pull-right">
                  <Field
                    name="ageTo"
                    className="age-to"
                    placeholder="To"
                    component={Input}
                    type="text"
                    disabled={patients.fetching}
                  />
                </div>
                <span className="sign">-</span>
              </div>
            </div>
            <div className="col-sm-3">
              <span className="title">
                <label>BMI Range</label>
              </span>
              <div>
                <div className="col pull-left">
                  <Field
                    name="bmiFrom"
                    className="bmi-from"
                    placeholder="From"
                    component={Input}
                    type="text"
                    disabled={patients.fetching}
                  />
                </div>
                <div className="col pull-right">
                  <Field
                    name="bmiTo"
                    className="bmi-to"
                    placeholder="To"
                    component={Input}
                    type="text"
                    disabled={patients.fetching}
                  />
                </div>
                <span className="sign">-</span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <Button type="submit" bsStyle="primary" className="btn-search" disabled={patients.fetching || hasError}>
                {(patients.fetching)
                  ? <LoadingSpinner showOnlyIcon size={20} className="fetching-patients" />
                  : <span>Search</span>
                }
              </Button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default SearchPatientsForm;
