/**
 * Created by mike on 10/23/16.
 */

import React from 'react';
import moment from 'moment';
import { Field } from 'redux-form';
import ReactSelect from '../../../components/Input/ReactSelect';

class DateOfBirthPicker extends React.Component {
  static propTypes = {
    dayOptions: React.PropTypes.array.isRequired,
    dobMonth: React.PropTypes.number,
    dobDay: React.PropTypes.number,
    dobYear: React.PropTypes.number,
    initialValues: React.PropTypes.object,
    loading: React.PropTypes.bool,
    monthOptions: React.PropTypes.array.isRequired,
    submitting: React.PropTypes.bool,
    submitPatientUpdate: React.PropTypes.func,
    yearOptions: React.PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
    this.changePatientDobMonth = this.changePatientDobMonth.bind(this);
    this.changePatientDobDay = this.changePatientDobDay.bind(this);
    this.changePatientDobYear = this.changePatientDobYear.bind(this);
  }

  componentDidMount() {
  }

  changePatientDobDay(value) {
    const { dobMonth, dobYear, initialValues, submitPatientUpdate } = this.props;
    if (dobMonth && dobYear) {
      const date = moment().year(dobYear).month(dobMonth).day(value);
      submitPatientUpdate(initialValues.id, {
        dob: date,
      });
    }
  }

  changePatientDobMonth(value) {
    const { dobDay, dobYear, initialValues, submitPatientUpdate } = this.props;
    if (dobDay && dobYear) {
      const date = moment().year(dobYear).month(value).day(dobDay);
      submitPatientUpdate(initialValues.id, {
        dob: date,
      });
    }
  }

  changePatientDobYear(value) {
    const { dobDay, dobMonth, initialValues, submitPatientUpdate } = this.props;
    if (dobDay && dobMonth) {
      const date = moment().year(value).month(dobMonth).day(dobDay);
      submitPatientUpdate(initialValues.id, {
        dob: date,
      });
    }
  }

  render() {
    const { dayOptions, loading, monthOptions, submitting, yearOptions } = this.props;
    return (
      <div className="field-row">
        <strong className="label"><label htmlFor="patient-dob">Date of Birth</label></strong>
        <div className="field">
          <div className="row">
            <div className="col-small pull-left">
              <Field
                name="dobMonth"
                component={ReactSelect}
                className="min-height"
                options={monthOptions}
                disabled={submitting || loading}
                placeholder="Month"
                onChange={this.changePatientDobMonth}
              />
            </div>
            <div className="col-small pull-left">
              <Field
                name="dobDay"
                component={ReactSelect}
                className="min-height"
                options={dayOptions}
                disabled={submitting || loading}
                placeholder="Day"
                onChange={this.changePatientDobDay}
              />
            </div>
            <div className="col-small pull-left">
              <Field
                name="dobYear"
                component={ReactSelect}
                className="min-height"
                disabled={submitting || loading}
                options={yearOptions}
                placeholder="Year"
                onChange={this.changePatientDobYear}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DateOfBirthPicker;
