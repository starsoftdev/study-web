/**
 * Created by mike on 10/23/16.
 */

import React from 'react';
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

  componentDidMount() {
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
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DateOfBirthPicker;
