import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';
import Button from 'react-bootstrap/lib/Button';
import { map } from 'lodash';

import Input from '../../../components/Input';
import ReactSelect from '../../../components/Input/ReactSelect';
import { selectSearchPatientsFormError } from './selectors';
import { selectPatientCategories, selectPatients, selectPatientDatabaseFormValues } from '../../../containers/PatientDatabasePage/selectors';
import { selectIndications, selectSources } from '../../../containers/App/selectors';
import formValidator from './validator';
import LoadingSpinner from '../../../components/LoadingSpinner';
import './styles.less';

const mapStateToProps = createStructuredSelector({
  indications: selectIndications(),
  sources: selectSources(),
  patientCategories: selectPatientCategories(),
  patients: selectPatients(),
  hasError: selectSearchPatientsFormError(),
  formValues: selectPatientDatabaseFormValues(),
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
    formValues: PropTypes.object,
    onSubmit: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.initSearch = this.initSearch.bind(this);
  }

  initSearch(e, name) {
    const params = this.props.formValues;
    if (e.target) {
      params[e.target.name] = e.target.value;
    } else {
      params[name] = e;
    }

    this.props.onSubmit(params, true);
  }

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
      <form className="form-search" onSubmit={handleSubmit}>
        <div className="fields-holder clearfix">

          <div className="search-area pull-left">
            <span className="title">
            </span>
            <div className="field">
              <Field
                name="name"
                component={Input}
                type="text"
                placeholder="Search"
                className="keyword-search"
                disabled={patients.fetching}
                onChange={(e) => this.initSearch(e, 'name')}
              />
              <label htmlFor="search">
                <i className="icomoon-icon_search2" />
              </label>
            </div>
          </div>

          <div className="select-holder indication pull-left">
            <span className="title">
              <label>Include Indication</label>
            </span>
            <div className="field">
              <Field
                name="includeIndication"
                component={ReactSelect}
                placeholder="Select Indication"
                options={indicationOptions}
                multi
                joinValues
                objectValue
                clearable={false}
                disabled={patients.fetching}
                className="multiSelectWrap"
                onChange={(e) => this.initSearch(e, 'includeIndication')}
              />
            </div>
          </div>

          <div className="select-holder indication pull-left">
            <span className="title">
              <label>Exclude Indication</label>
            </span>
            <div className="field">
              <Field
                name="excludeIndication"
                component={ReactSelect}
                placeholder="Select Indication"
                options={indicationOptions}
                multi
                joinValues
                objectValue
                clearable={false}
                disabled={patients.fetching}
                className="multiSelectWrap"
                onChange={(e) => this.initSearch(e, 'excludeIndication')}
              />
            </div>
          </div>

          <div className="gender gender pull-left">
            <span className="title">
              <label>Gender</label>
            </span>
            <div className="field">
              <Field
                name="gender"
                component={ReactSelect}
                placeholder="Select Gender"
                options={genderOptions}
                disabled={patients.fetching}
                onChange={(e) => this.initSearch(e, 'gender')}
              />
            </div>
          </div>

          <div className="select-holder pull-left clear-left">
            <span className="title">
              <label>Status</label>
            </span>
            <div className="field">
              <Field
                name="status"
                component={ReactSelect}
                placeholder="Select Status"
                options={statusOptions}
                disabled={patients.fetching}
                onChange={(e) => this.initSearch(e, 'status')}
              />
            </div>
          </div>

          <div className="select-holder pull-left">
            <span className="title">
              <label>Source</label>
            </span>
            <div className="field">
              <Field
                name="source"
                component={ReactSelect}
                placeholder="Select Source"
                options={sourceOptions}
                disabled={patients.fetching}
                onChange={(e) => this.initSearch(e, 'source')}
              />
            </div>
          </div>

          <div className="age-range pull-left">
            <span className="title">
              <label>Age Range</label>
            </span>
            <div className="col-holder clearfix">
              <div className="col pull-left">
                <Field
                  name="ageFrom"
                  className="age-from"
                  placeholder="From"
                  component={Input}
                  type="text"
                  disabled={patients.fetching}
                  onChange={(e) => this.initSearch(e, 'ageFrom')}
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
                  onChange={(e) => this.initSearch(e, 'ageTo')}
                />
              </div>
              <span className="sign">-</span>
            </div>
          </div>

          <div className="bmi pull-left">
            <span className="title">
              <label>BMI</label>
            </span>
            <div className="col-holder clearfix">
              <div className="col pull-left">
                <Field
                  name="bmiFrom"
                  className="bmi-from"
                  placeholder="From"
                  component={Input}
                  type="text"
                  disabled={patients.fetching}
                  onChange={(e) => this.initSearch(e, 'bmiFrom')}
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
                  onChange={(e) => this.initSearch(e, 'bmiTo')}
                />
              </div>
              <span className="sign">-</span>
            </div>
          </div>
          <div className="hidden">
            <Button type="submit" bsStyle="primary" className="btn-search" disabled={patients.fetching || hasError}>
              {(patients.fetching)
                ? <LoadingSpinner showOnlyIcon size={20} className="fetching-patients" />
                : <span>Search</span>
              }
            </Button>
          </div>
        </div>
      </form>
    );
  }
}

export default SearchPatientsForm;
