import React, { PropTypes, Component } from 'react';
import _ from 'lodash';
import { Field } from 'redux-form';

import Input from '../../components/Input/index';
import ReactSelect from '../../components/Input/ReactSelect';
import { normalizePhoneDisplay, normalizePhoneForServer } from '../../common/helper/functions';

class RenderPatientsList extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    change: PropTypes.func.isRequired,
    updateFields: PropTypes.func.isRequired,
    addField: PropTypes.func.isRequired,
    changeField: PropTypes.func.isRequired,
    patients: PropTypes.array,
    rowsCounts: PropTypes.object,
    fields: PropTypes.any,
    duplicates: PropTypes.array,
    blur: React.PropTypes.func,
    emptyRowRequiredError: React.PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.addNewFields = this.addNewFields.bind(this);
    this.removeField = this.removeField.bind(this);
    this.changeField = this.changeField.bind(this);
    this.onPhoneBlur = this.onPhoneBlur.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
  }

  componentDidMount() {
    const { fields, patients } = this.props;

    // console.log('componentDidMount', patients);
    if (patients && patients.length) {
      if (fields.length) {
        fields.removeAll();
      }
      _.forEach(patients, (item) => {
        const patient = item;
        if (patient.phone) {
          patient.phone = normalizePhoneDisplay(patient.phone);
        }
        fields.push(patient);
      });
    }
  }

  onPhoneBlur(event, name) {
    const { blur } = this.props;
    const formattedPhoneNumber = normalizePhoneDisplay(event.target.value);
    blur(name, formattedPhoneNumber);
  }

  changeField(event, name, index) {
    const { changeField } = this.props;
    let value = (name === 'gender') ? event : event.target.value;
    const agePattern = /[^\d]+/g;
    const bmiPattern = /[^\d.]+/g;

    if (name === 'age' && value !== 'N/A') {
      value = value.replace(agePattern, '');
    }

    if (name === 'bmi' && value !== 'N/A') {
      value = value.replace(bmiPattern, '');
    }

    changeField(value, name, index);
  }

  addNewFields() {
    const { fields, addField } = this.props;
    fields.push();
    addField();
  }

  removeField(index) {
    const { fields, updateFields } = this.props;

    updateFields(index);
    fields.remove(index);
  }

  validateEmail(email) {
    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(email);
  }

  render() {
    const { patients, fields, rowsCounts, emptyRowRequiredError, duplicates } = this.props;
    const genderOptions = [
      {
        label: 'Male',
        value: 'male',
      }, {
        label: 'Female',
        value: 'female',
      },
    ];

    return (
      <div>
        <div className="fields-holder array clearfix">
          {
            fields.map((patient, index) => {
              let phoneHasError = false;
              let emailHasError = false;
              const duplicateIndex = _.findIndex(duplicates, (d) => { return d === patients[index].phone; });

              if (duplicateIndex !== -1) {
                phoneHasError = true;
              }

              if ((!patients[index].phone || patients[index].phone === '') && emptyRowRequiredError.hasEmpty) {
                phoneHasError = true;
              }

              if (patients[index].phone && normalizePhoneForServer(patients[index].phone).length < 12) {
                phoneHasError = true;
              }

              if ((!patients[index].email || patients[index].email === '') && emptyRowRequiredError.hasEmpty) {
                emailHasError = true;
              }

              if (patients[index].email) {
                emailHasError = !this.validateEmail(patients[index].email);
              }

              return (
                <div className="field-row" key={index}>
                  <div className="field trash pull-left">
                    <span
                      className="icomoon-icon_trash remove"
                      onClick={() => this.removeField(index)}
                    />
                  </div>
                  <div className="field name pull-left">
                    <Field
                      name={`patients[${index}].name`}
                      component={Input}
                      value={patient.name ? patient.name : null}
                      className={((!patients[index].name || patients[index].name === '') && emptyRowRequiredError.hasEmpty) ? 'has-error' : ''}
                      type="text"
                      onChange={(e) => { this.changeField(e, 'name', index); }}
                    />
                  </div>
                  <div className="field email pull-left">
                    <Field
                      name={`patients[${index}].email`}
                      component={Input}
                      value={patient.email || ''}
                      className={emailHasError ? 'has-error' : ''}
                      type="text"
                      onChange={(e) => { this.changeField(e, 'email', index); }}
                    />
                  </div>
                  <div className="field phone pull-left">
                    <Field
                      name={`patients[${index}].phone`}
                      component={Input}
                      value={patient.phone || ''}
                      className={phoneHasError ? 'has-error' : ''}
                      type="tel"
                      onChange={(e) => { this.changeField(e, 'phone', index); }}
                      onBlur={(event) => {
                        this.onPhoneBlur(event, `patients[${index}].phone`);
                      }}
                    />
                  </div>
                  <div className="field age pull-left">
                    <Field
                      name={`patients[${index}].age`}
                      component={Input}
                      value={patient.age || ''}
                      type="text"
                      onChange={(e) => { this.changeField(e, 'age', index); }}
                    />
                  </div>
                  <div className="field gender pull-left">
                    <Field
                      name={`patients[${index}].gender`}
                      placeholder="Select Gender"
                      component={ReactSelect}
                      value={patient.gender || ''}
                      options={genderOptions}
                      onChange={(e) => { this.changeField(e, 'gender', index); }}
                    />
                  </div>
                  <div className="field bmi pull-left">
                    <Field
                      name={`patients[${index}].bmi`}
                      component={Input}
                      value={patient.bmi || ''}
                      type="text"
                      onChange={(e) => { this.changeField(e, 'bmi', index); }}
                    />
                  </div>
                </div>);
            })
          }
        </div>
        <div className="counters">
          <div className={`counter name ${(fields.length <= 10) ? 'scroll-fix' : ''}`}>
            {rowsCounts.name}
          </div>
          <div className="counter email">
            {rowsCounts.email}
          </div>
          <div className="counter phone">
            {rowsCounts.phone}
          </div>
          <div className="counter age">
            {rowsCounts.age}
          </div>
          <div className={`counter gender ${(fields.length <= 10) ? 'scroll-fix' : ''}`}>
            {rowsCounts.gender}
          </div>
          <div className="counter bmi">
            {rowsCounts.bmi}
          </div>
        </div>
        <div className="text-left">
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.addNewFields}
          >
            + Add Patient
          </button>
        </div>
      </div>

    );
  }
}

export default RenderPatientsList;
