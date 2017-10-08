import React, { PropTypes, Component } from 'react';
import _ from 'lodash';
import { Field } from 'redux-form';

import Input from '../../components/Input/index';
import ReactSelect from '../../components/Input/ReactSelect';
import { normalizePhoneDisplay } from '../../common/helper/functions';

class RenderPatientsList extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    change: PropTypes.func.isRequired,
    updateFields: PropTypes.func.isRequired,
    addField: PropTypes.func.isRequired,
    changeField: PropTypes.func.isRequired,
    patients: PropTypes.array,
    rowsCounts: PropTypes.object,
    fields: PropTypes.any,
    blur: React.PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.addNewFields = this.addNewFields.bind(this);
    this.removeField = this.removeField.bind(this);
    this.changeField = this.changeField.bind(this);
    this.onPhoneBlur = this.onPhoneBlur.bind(this);
  }

  componentDidMount() {
    const { fields, patients } = this.props;

    // console.log('componentDidMount', patients);
    if (patients && patients.length) {
      if (fields.length) {
        fields.removeAll();
      }
      _.forEach(patients, (item) => {
        let empty = true;

        _.forEach(item, (prop) => {
          if (prop !== '') {
            empty = false;
          }
        });

        if (item && item !== '' && !empty) {
          const patient = item;
          if (patient.phone) {
            patient.phone = normalizePhoneDisplay(patient.phone);
          }
          fields.push(patient);
        }
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

  render() {
    const { fields, rowsCounts } = this.props;
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
                      type="text"
                      onChange={(e) => { this.changeField(e, 'name', index); }}
                    />
                  </div>
                  <div className="field email pull-left">
                    <Field
                      name={`patients[${index}].email`}
                      component={Input}
                      value={patient.email || ''}
                      type="text"
                      onChange={(e) => { this.changeField(e, 'email', index); }}
                    />
                  </div>
                  <div className="field phone pull-left">
                    <Field
                      name={`patients[${index}].phone`}
                      component={Input}
                      value={patient.phone || ''}
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
        {(fields.length > 0) &&
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
        }
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
