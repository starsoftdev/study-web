import moment from 'moment';
import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import { connect } from 'react-redux';
import { reset, Field, reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';

import Input from '../../../../common/components/Input/index';
import ReactSelect from '../../../../common/components/Input/ReactSelect';
import { translate } from '../../../../common/utilities/localization';
import DateOfBirthPicker from '../../../components/DateOfBirthPicker/index';
import { selectSyncErrors, selectValues, selectFormDidChange } from '../../../common/selectors/form.selector';

import { submitPatientDetails } from '../actions';

import formValidator from './secondaryValidator';

const genderOptions = [{
  label: translate('common.constants.na'),
  value: 'N/A',
}, {
  label: translate('common.constants.male'),
  value: 'Male',
}, {
  label: translate('common.constants.female'),
  value: 'Female',
}];

const formName = 'CallCenterPatientPage.SecondaryInfo';

@reduxForm({
  form: formName,
  validate: formValidator,
  enableReinitialize: true,
})
class SecondaryInfo extends React.Component {
  static propTypes = {
    initialValues: React.PropTypes.object,
    loading: React.PropTypes.bool,
    reset: React.PropTypes.func,
    formSyncErrors: React.PropTypes.object,
    formValues: React.PropTypes.object,
    formDidChange: React.PropTypes.bool,
    submitting: React.PropTypes.bool.isRequired,
    submitPatientDetails: React.PropTypes.func.isRequired,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { formSyncErrors, initialValues, formValues, reset, submitPatientDetails } = this.props;
    if (!formSyncErrors.gender && !formSyncErrors.bmi) {
      const data = {
        gender: null,
        bmi: null,
      };
      if (formValues.gender) {
        data.gender = formValues.gender;
      }
      if (formValues.bmi) {
        data.bmi = parseFloat(formValues.bmi);
      }
      if (formValues.dobDay && formValues.dobMonth && formValues.dobYear) {
        const date = moment().year(formValues.dobYear).month(formValues.dobMonth - 1).date(formValues.dobDay).startOf('day');
        data.dob = date.toISOString();
      }
      submitPatientDetails(initialValues.id, data);
    }
    reset(formName);
  }

  renderGender() {
    const { loading, submitting } = this.props;
    return (
      <div className="field-row">
        <strong className="label">
          <label htmlFor="patient-gender">{translate('container.page.callCenterPatient.label.gender')}</label>
        </strong>
        <div className="field patient-gender">
          <Field
            name="gender"
            component={ReactSelect}
            options={genderOptions}
            disabled={submitting || loading}
            placeholder={translate('container.page.callCenterPatient.placeholder.gender')}
          />
        </div>
      </div>
    );
  }

  renderUpdateButtons = () => {
    const { formDidChange, loading, submitting } = this.props;
    if (formDidChange) {
      return (
        <div className="pull-right buttons">
          <Button bsStyle="primary" onClick={this.handleReset}>
            {translate('container.page.callCenterPatient.button.cancel')}
          </Button>
          <Button type="submit" disabled={submitting || loading}>
            {translate('container.page.callCenterPatient.button.update')}
          </Button>
        </div>
      );
    }
    return null;
  }

  render() {
    const { formValues: { dobDay, dobMonth, dobYear }, loading, submitting } = this.props;
    return (
      <Form className="form-lightbox" onSubmit={this.handleSubmit}>
        <DateOfBirthPicker
          loading={loading}
          submitting={submitting}
          dobDay={dobDay}
          dobMonth={dobMonth}
          dobYear={dobYear}
        />
        {this.renderGender()}
        <div className="field-row">
          <strong className="label">
            <label htmlFor="patient-bmi">{translate('container.page.callCenterPatient.label.bmi')}</label>
          </strong>
          <div className="field">
            <Field
              type="text"
              name="bmi"
              component={Input}
            />
          </div>
        </div>
        {this.renderUpdateButtons()}
        <div className="clearfix" />
      </Form>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  formSyncErrors: selectSyncErrors(formName),
  formValues: selectValues(formName),
  formDidChange: selectFormDidChange(formName),
});

const mapDispatchToProps = (dispatch) => ({
  reset: () => dispatch(reset(formName)),
  submitPatientDetails: (patientId, fields) => dispatch(submitPatientDetails(patientId, fields)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SecondaryInfo);
