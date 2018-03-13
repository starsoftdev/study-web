import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';
import Button from 'react-bootstrap/lib/Button';
import Input from '../../components/Input';
import ReactSelect from '../../components/Input/ReactSelect';
import { selectSearchPatientsFormError } from './selectors';
import { selectPatientCategories, selectPatients } from '../../containers/PatientDatabasePage/selectors';
import { selectValues } from '../../common/selectors/form.selector';
import { selectIndications, selectSources, selectSiteLocations, selectCurrentUser } from '../../containers/App/selectors';
import formValidator from './validator';
import LoadingSpinner from '../../components/LoadingSpinner';
import PatientActionButtons from '../../containers/PatientDatabasePage/PatientActionButtons';

import ReactMultiSelect from '../../components/Input/ReactMultiSelect';

const formName = 'searchPatients';

const mapStateToProps = createStructuredSelector({
  textBlastFormValues: selectValues('PatientDatabase.TextBlastModal'),
  formValues: selectValues(formName),
  hasError: selectSearchPatientsFormError(),
  indications: selectIndications(),
  patientCategories: selectPatientCategories(),
  patients: selectPatients(),
  sources: selectSources(),
  sites: selectSiteLocations(),
  user: selectCurrentUser(),
});

@reduxForm({ form: formName, validate: formValidator })
@connect(mapStateToProps, null)
export default class SearchPatientsForm extends Component {
  static propTypes = {
    textBlastFormValues: PropTypes.object,
    formValues: PropTypes.object,
    handleSubmit: PropTypes.func,
    hasError: PropTypes.bool,
    indications: PropTypes.array,
    onSubmit: PropTypes.func,
    paginationOptions: PropTypes.object,
    patientCategories: PropTypes.object,
    patients: PropTypes.object,
    searchPatients: PropTypes.func,
    sites: PropTypes.array,
    sources: PropTypes.array,
    user: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      searchTimer: null,
    };

    this.initSearch = this.initSearch.bind(this);
  }

  // TODO: refactor this method(value of labels no longer "0" it's "All" now)
  initSearch(e, name) {
    const params = this.props.formValues;
    const paramKeys = Object.keys(params);

    // Make sure no zeroes are stored as strings
    // Note: Zeroes represent the 'All' option for a drop down selection.
    // Note: represent of 'All' option for status and source changed
    paramKeys.forEach(key => {
      if (params[key] === '0') {
        params[key] = 0;
      }
    });

    if (e && e.target) {
      if (e.target.value === '0') {
        params[e.target.name] = 0;
      } else {
        params[e.target.name] = e.target.value;
      }
      if (this.state.searchTimer) {
        clearTimeout(this.state.searchTimer);
        this.setState({ searchTimer: null });
      }
      const timerH = setTimeout(() => { this.props.onSubmit(params, true); }, 500);
      this.setState({ searchTimer: timerH });
    } else {
      if (e === '0') {
        params[name] = 0;
      } else if (_.isUndefined(e)) {
        if (name === 'name') {
          params[name] = '';
        } else {
          params[name] = 0;
        }
      } else {
        params[name] = e;
      }

      this.props.onSubmit(params, true);
    }
  }

  generateNumber(type, time) {
    let start;
    let end;

    if (type === 'age') {
      start = 1;
      end = 150;
      const { ageFrom, ageTo } = this.props.formValues;
      if (time === 'from') {
        if (ageTo) {
          end = ageTo;
        }
      } else if (time === 'to') {
        if (ageFrom) {
          start = ageFrom;
        }
      }
    } else {
      start = 1;
      end = 54;
      const { bmiFrom, bmiTo } = this.props.formValues;
      if (time === 'from') {
        if (bmiTo) {
          end = bmiTo;
        }
      } else if (time === 'to') {
        if (bmiFrom) {
          start = bmiFrom;
        }
      }
    }

    const options = [];
    for (let i = start; i <= end; i++) {
      options.push({
        label: i,
        value: i,
      });
    }

    return options;
  }

  render() {
    const { formValues, indications, sources, patientCategories, patients, hasError, handleSubmit, sites, user } = this.props;
    const includeIndicationArr = [];
    let finalIncludeIndication = [];
    const excludeIndicationArr = [];
    let finalExcludeIndication = [];

    for (const val of indications) {
      if (!formValues.includeIndication || formValues.includeIndication.length === 0 || !_.find(formValues.includeIndication, (o) => (o.id === val.id))) {
        includeIndicationArr.push({
          label: val.name,
          value: val.id,
          id: val.id,
        });
      } else {
        finalIncludeIndication.push({
          label: val.name,
          value: val.id,
          id: val.id,
        });
      }

      if (!formValues.excludeIndication || formValues.excludeIndication.length === 0 || !_.find(formValues.excludeIndication, (o) => (o.id === val.id))) {
        excludeIndicationArr.push({
          label: val.name,
          value: val.id,
          id: val.id,
        });
      } else {
        finalExcludeIndication.push({
          label: val.name,
          value: val.id,
          id: val.id,
        });
      }
    }

    finalIncludeIndication = _.concat(finalIncludeIndication, includeIndicationArr);
    finalExcludeIndication = _.concat(finalExcludeIndication, excludeIndicationArr);

    const siteOptions = [{ label: 'All', value: 'All' }].concat(sites.map(siteIterator => ({
      label: siteIterator.name,
      value: siteIterator.id,
    })));
    const sourceOptions = [{ label: 'All', value: 'All' }].concat(sources.map(sourceIterator => ({
      label: sourceIterator.type,
      value: sourceIterator.id,
    })));
    const statusOptions = [{ label: 'All', value: 'All' }].concat(patientCategories.details.map(patientCategoryIterator => ({
      label: patientCategoryIterator.name,
      value: patientCategoryIterator.id,
    })));
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

    const userIsAdmin = user.roleForClient.name === 'Super Admin' || user.roleForClient.name === 'Admin';
    const sitesDropdownDisabled = !userIsAdmin || patients.fetching;
    let defaultSiteLocation;

    if (sites.length > 0 && !userIsAdmin) {
      defaultSiteLocation = _.find(sites, { id: user.roleForClient.site_id }).id;
    }

    const itemTemplate = (controlSelectedValue) => (
      <div key={controlSelectedValue.value}>
        {controlSelectedValue.label}
        <i className="close-icon icomoon-icon_close" />
      </div>
    );

    const selectedItemsTemplate = (controlSelectedValue) => (
      <div>
        {controlSelectedValue.length} item(s) selected
      </div>
    );
    return (
      <div>
        <div className="btns-popups">
          <div className="search-area pull-left">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const name = this.props.formValues.name;
                this.initSearch(name, 'name');
              }}
            >
              <span className="title">
              </span>
              <div className="field">
                <Button
                  className="btn-enter"
                  type="submit"
                  onClick={() => {
                    const name = this.props.formValues.name;
                    this.initSearch(name, 'name');
                  }}
                >
                  <i className="icomoon-icon_search2" />
                </Button>
                <Field
                  name="name"
                  component={Input}
                  type="text"
                  placeholder="Search"
                  className="keyword-search"
                  disabled={patients.fetching}
                />
              </div>
            </form>
          </div>
          <PatientActionButtons textBlastFormValues={this.props.textBlastFormValues} searchPatients={this.props.searchPatients} paginationOptions={this.props.paginationOptions} />
        </div>
        <form className="form-search patient-db-search" onSubmit={handleSubmit}>
          <div className="fields-holder clearfix form-search">
            <div className="select-holder pull-left">
              <span className="title">
                <label>SITE LOCATION</label>
              </span>
              <div className="field">
                <Field
                  name="site"
                  component={ReactSelect}
                  placeholder="Select Site Location"
                  options={siteOptions}
                  selectedValue={defaultSiteLocation}
                  disabled={sitesDropdownDisabled}
                  onChange={(val) => this.initSearch(val, 'site')}
                />
              </div>
            </div>
            <div className="select-holder indication pull-left">
              <span className="title">
                <label>Include Indication</label>
              </span>
              <div className="field">
                <Field
                  name="includeIndication"
                  component={ReactMultiSelect}
                  placeholder="Select Indication"
                  searchPlaceholder="Search"
                  searchable
                  optionLabelKey="label"
                  multiple
                  includeAllOption
                  onChange={(val) => this.initSearch(val, 'includeIndication')}
                  customOptionTemplateFunction={itemTemplate}
                  customSelectedValueTemplateFunction={selectedItemsTemplate}
                  dataSource={finalIncludeIndication}
                  customSearchIconClass="icomoon-icon_search2"
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
                  component={ReactMultiSelect}
                  placeholder="Select Indication"
                  searchPlaceholder="Search"
                  searchable
                  optionLabelKey="label"
                  multiple
                  includeAllOption
                  onChange={(val) => this.initSearch(val, 'excludeIndication')}
                  customOptionTemplateFunction={itemTemplate}
                  customSelectedValueTemplateFunction={selectedItemsTemplate}
                  dataSource={finalExcludeIndication}
                  customSearchIconClass="icomoon-icon_search2"
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
                  onChange={(val) => this.initSearch(val, 'gender')}
                />
              </div>
            </div>
          </div>
          <div className="fields-holder clearfix">
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
                  onChange={(val) => this.initSearch(val, 'status')}
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
                  onChange={(val) => this.initSearch(val, 'source')}
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
                    component={ReactSelect}
                    options={this.generateNumber('age', 'from')}
                    disabled={patients.fetching}
                    onChange={(val) => {
                      this.initSearch(val, 'ageFrom');
                    }}
                  />
                </div>
                <div className="col pull-right">
                  <Field
                    name="ageTo"
                    className="age-to"
                    placeholder="To"
                    component={ReactSelect}
                    options={this.generateNumber('age', 'to')}
                    disabled={patients.fetching}
                    onChange={(val) => {
                      this.initSearch(val, 'ageTo');
                    }}
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
                    component={ReactSelect}
                    options={this.generateNumber('bmi', 'from')}
                    disabled={patients.fetching}
                    onChange={(val) => {
                      this.initSearch(val, 'bmiFrom');
                    }}
                  />
                </div>
                <div className="col pull-right">
                  <Field
                    name="bmiTo"
                    className="bmi-to"
                    placeholder="To"
                    component={ReactSelect}
                    options={this.generateNumber('bmi', 'to')}
                    disabled={patients.fetching}
                    onChange={(val) => {
                      this.initSearch(val, 'bmiTo');
                    }}
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
          <div className="hidden">
            <Button type="submit" bsStyle="primary" className="btn-search" disabled={patients.fetching || hasError}>
              {(patients.fetching)
                ? <LoadingSpinner showOnlyIcon size={20} />
                : <span>Search</span>
              }
            </Button>
          </div>
        </form>
      </div>
    );
  }
}
