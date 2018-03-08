/*
 *
 * DashboardAddMessagingNumberPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Helmet from 'react-helmet';
import { Field, reduxForm, change } from 'redux-form';
import Form from 'react-bootstrap/lib/Form';

import ReactSelect from '../../../components/Input/ReactSelect';
import Checkbox from '../../../components/Input/Checkbox';
import Input from '../../../components/Input/';
import { addMessagingNumber, fetchAvailableNumber } from '../actions';
import { selectDashboardAvailableNumber, selectDashboardAddMessagingNumberFormValues } from '../selectors';
import formValidator from './validator';
import LoadingSpinner from '../../../components/LoadingSpinner';
import DashboardAvailableNumbersTable from './DashboardAvailableNumbersTable';
const formName = 'dashboardAddMessagingNumberForm';

@reduxForm({
  form: formName,
  validate: formValidator,
})
export class DashboardAddMessagingNumberPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    submitForm: PropTypes.func,
    addMessagingNumber: PropTypes.func,
    availableNumber: PropTypes.object,
    formValues: PropTypes.object,
    handleSubmit: PropTypes.func,
    change: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.state = {
      any: true,
      voice: false,
      sms: false,
      mms: false,
    };
  }

  onSubmitForm = (e) => {
    e.preventDefault();
    this.props.submitForm(this.props.formValues);
  }

  handleAny = () => {
    this.props.change('any', true);
    this.props.change('voice', false);
    this.props.change('sms', false);
    this.props.change('mms', false);
  }

  handleVoice = (e) => {
    this.props.change('any', !(e || this.props.formValues.sms || this.props.formValues.mms));
    this.props.change('voice', e);
  }

  handleSMS = (e) => {
    this.props.change('any', !(e || this.props.formValues.voice || this.props.formValues.mms));
    this.props.change('sms', e);
  }

  handleMMS = (e) => {
    this.props.change('any', !(e || this.props.formValues.voice || this.props.formValues.sms));
    this.props.change('mms', e);
  }

  render() {
    const country = [{ label: 'USA', value: 'US', id: 0 },
      { label: 'Canada', value: 'CA', id: 1 },
      { label: 'UK', value: 'GB', id: 2 },
      { label: 'France', value: 'FR', id: 3 },
      { label: 'Italy', value: 'IT', id: 4 },
      { label: 'Germany', value: 'DE', id: 5 },
      { label: 'Brazil', value: 'BR', id: 6 },
      { label: 'Chile', value: 'CL', id: 7 },
      { label: 'Colombia', value: 'CO', id: 8 },
      // { label: 'Cuba', value: 'CB', id: 9 },
      { label: 'Czech Republic', value: 'CZ', id: 10 },
      { label: 'Denmark', value: 'DK', id: 11 },
      // { label: 'Fiji', value: 'FJ', id: 12 },
      { label: 'Australia', value: 'AU', id: 13 },
      { label: 'Hungary', value: 'HU', id: 14 },
      { label: 'Iceland', value: 'IS', id: 15 },
      { label: 'Japan', value: 'JP', id: 16 },
      { label: 'Luxembourg', value: 'LU', id: 17 },
      // { label: 'Malaysia', value: 'MY', id: 18 },
    ];

    return (
      <div className="container-fluid dashboard-portals dashboard-add-messaging-number">
        <Helmet title="Add Messaging Number - StudyKIK" />
        <h2 className="main-heading">Add Messaging Number</h2>
        <Form className="form-search selects-form clearfix" onSubmit={this.props.handleSubmit(this.props.submitForm)}>
          <div className="fields-holder row">
            <div className="col custom-select no-left-padding">
              <Field
                name="country"
                component={ReactSelect}
                placeholder="Select Country"
                searchPlaceholder="Search"
                searchable
                options={country}
                customSearchIconClass="icomoon-icon_search2"
              />
            </div>
          </div>
          <div className="fields-holder row second-row">
            <div className="col custom-select no-left-padding">
              <Field
                name="areaCode"
                component={Input}
                placeholder="Area Code"
              />
            </div>
          </div>
          <div className="fields-holder row second-row">
            <div className="inline-checkbox">
              <div className="field">
                <Field
                  type="checkbox"
                  name="any"
                  component={Checkbox}
                  onChange={this.handleAny}
                />
              </div>
              <strong className="label">
                <label htmlFor="any">Any</label>
              </strong>
            </div>
            <div className="inline-checkbox">
              <div className="field">
                <Field
                  type="checkbox"
                  name="voice"
                  component={Checkbox}
                  onChange={this.handleVoice}
                />
              </div>
              <strong className="label">
                <label htmlFor="voice">Voice</label>
              </strong>
            </div>
            <div className="inline-checkbox">
              <div className="field">
                <Field
                  type="checkbox"
                  name="sms"
                  component={Checkbox}
                  onChange={this.handleSMS}
                />
              </div>
              <strong className="label">
                <label htmlFor="sms">SMS</label>
              </strong>
            </div>
            <div className="inline-checkbox">
              <div className="field">
                <Field
                  type="checkbox"
                  name="mms"
                  component={Checkbox}
                  onChange={this.handleMMS}
                />
              </div>
              <strong className="label">
                <label htmlFor="mms">MMS</label>
              </strong>
            </div>
          </div>
          <div className="fields-holder row second-row">
            <div className="pull-left col custom-select no-left-padding">
              <button type="submit" className="btn btn-default">
                {this.props.availableNumber.fetching
                  ? <span><LoadingSpinner showOnlyIcon size={20} className="saving-user" /></span>
                  : <span>Submit</span>
                }
              </button>
            </div>
          </div>
        </Form>
        {
          !this.props.availableNumber.fetching && this.props.availableNumber.details.length > 0 &&
          <DashboardAvailableNumbersTable
            availableNumber={this.props.availableNumber}
          />
        }
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  availableNumber: selectDashboardAvailableNumber(),
  formValues: selectDashboardAddMessagingNumberFormValues(),
  initialValues: () => ({ country: 'US', any: true }),
});

function mapDispatchToProps(dispatch) {
  return {
    addMessagingNumber: (payload) => dispatch(addMessagingNumber(payload)),
    submitForm: (values) => dispatch(fetchAvailableNumber(values)),
    change: (name, value) => dispatch(change(formName, name, value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardAddMessagingNumberPage);
