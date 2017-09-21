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
    const value = (name === 'gender') ? event : event.target.value;

    console.log('changeField', event, name, index);

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
    const { fields } = this.props;
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
      <div className="fields-holder array clearfix">
        {
          fields.map((patient, index) => <div className={`field-row ${(index === 0) ? 'first' : ''}`} key={index}>
            <span
              className="icomoon-icon_trash remove"
              onClick={() => this.removeField(index)}
            />
            <div className="field name pull-left">
              {(index === 0) &&
                <span className="title">
                  <label htmlFor="import-patient-name">Name</label>
                </span>
                }
              <Field
                name={`patients[${index}].name`}
                component={Input}
                value={patient.name ? patient.name : null}
                type="text"
                onChange={(e) => { this.changeField(e, 'name', index); }}
              />
            </div>
            <div className="field email pull-left">
              {(index === 0) &&
                <span className="title">
                  <label htmlFor="import-patient-email">Email</label>
                </span>
                }
              <Field
                name={`patients[${index}].email`}
                component={Input}
                value={patient.email || ''}
                type="text"
                onChange={(e) => { this.changeField(e, 'email', index); }}
              />
            </div>
            <div className="field phone pull-left">
              {(index === 0) &&
                <span className="title">
                  <label htmlFor="import-patient-phone">Phone</label>
                </span>
                }
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
              {(index === 0) &&
                <span className="title">
                  <label htmlFor="import-patient-phone">Age</label>
                </span>
                }
              <Field
                name={`patients[${index}].age`}
                component={Input}
                value={patient.age || ''}
                type="text"
                onChange={(e) => { this.changeField(e, 'age', index); }}
              />
            </div>
            <div className="field gender pull-left">
              {(index === 0) &&
                <span className="title">
                  <label htmlFor="import-patient-phone">Gender</label>
                </span>
                }
              <Field
                name={`patients[${index}].gender`}
                component={ReactSelect}
                value={patient.gender || ''}
                options={genderOptions}
                onChange={(e) => { this.changeField(e, 'gender', index); }}
              />
            </div>
            <div className="field bmi pull-left">
              {(index === 0) &&
                <span className="title">
                  <label htmlFor="import-patient-phone">BMI</label>
                </span>
                }
              <Field
                name={`patients[${index}].bmi`}
                component={Input}
                value={patient.bmi || ''}
                type="text"
                onChange={(e) => { this.changeField(e, 'bmi', index); }}
              />
            </div>
          </div>
          )
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
