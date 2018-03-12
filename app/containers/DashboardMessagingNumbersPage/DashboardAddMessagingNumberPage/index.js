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
    const country = [
      { label: 'United States', value: 'US', id: 0 },
      { label: 'Argentina', value: 'AR', id: 1 },
      { label: 'Australia', value: 'AU', id: 2 },
      { label: 'Austria', value: 'AT', id: 3 },
      { label: 'Barbados', value: 'BB', id: 4 },
      { label: 'Belarus', value: 'BY', id: 5 },
      { label: 'Belgium', value: 'BE', id: 6 },
      { label: 'Benin', value: 'BJ', id: 7 },
      { label: 'Bolivia', value: 'BO', id: 8 },
      { label: 'Botswana', value: 'BW', id: 9 },
      { label: 'Brazil', value: 'BR', id: 10 },
      { label: 'Bulgaria', value: 'BG', id: 11 },
      { label: 'Canada', value: 'CA', id: 12 },
      { label: 'Cayman Island', value: 'KY', id: 13 },
      { label: 'Chile', value: 'CL', id: 14 },
      { label: 'Colombia', value: 'CO', id: 15 },
      { label: 'Croatia', value: 'HR', id: 16 },
      { label: 'Cyprus', value: 'CY', id: 17 },
      { label: 'Czech Republic', value: 'CZ', id: 18 },
      { label: 'Denmark', value: 'DE', id: 19 },
      { label: 'Dominican Republic', value: 'DO', id: 20 },
      { label: 'El Salvador', value: 'SV', id: 21 },
      { label: 'Estonia', value: 'EE', id: 22 },
      { label: 'Finland', value: 'FI', id: 23 },
      { label: 'France', value: 'FR', id: 24 },
      { label: 'Germany', value: 'DE', id: 25 },
      { label: 'Ghana', value: 'GH', id: 26 },
      { label: 'Greece', value: 'GR', id: 27 },
      { label: 'Grenada', value: 'GD', id: 28 },
      { label: 'Guatemala', value: 'GT', id: 29 },
      { label: 'Guinea', value: 'GN', id: 30 },
      { label: 'Hong Kong', value: 'HK', id: 31 },
      { label: 'Hungary', value: 'HU', id: 32 },
      { label: 'Iceland', value: 'IS', id: 33 },
      { label: 'Indonesia', value: 'ID', id: 34 },
      { label: 'Ireland', value: 'IE', id: 35 },
      { label: 'Israel', value: 'IL', id: 36 },
      { label: 'Italy', value: 'IT', id: 37 },
      { label: 'Jamaica', value: 'JM', id: 38 },
      { label: 'Japan', value: 'JP', id: 39 },
      { label: 'Kenya', value: 'KE', id: 40 },
      { label: 'Korea Repbulic of', value: 'KR', id: 41 },
      { label: 'Latvia', value: 'LV', id: 42 },
      { label: 'Lithuania', value: 'LT', id: 43 },
      { label: 'Luxembourg', value: 'LU', id: 44 },
      { label: 'Macau', value: 'MO', id: 45 },
      { label: 'Malaysia', value: 'MY', id: 46 },
      { label: 'Mali', value: 'ML', id: 47 },
      { label: 'Malta', value: 'MT', id: 48 },
      { label: 'Mauritius', value: 'MU', id: 49 },
      { label: 'Mexico', value: 'MX', id: 50 },
      { label: 'Moldova', value: 'MD', id: 51 },
      { label: 'Netherlands', value: 'NL', id: 52 },
      { label: 'New Zealand', value: 'NZ', id: 53 },
      { label: 'Nigeria', value: 'NG', id: 54 },
      { label: 'Norway', value: 'NO', id: 55 },
      { label: 'Panama', value: 'PA', id: 56 },
      { label: 'Peru', value: 'PE', id: 57 },
      { label: 'Philippines', value: 'PH', id: 58 },
      { label: 'Poland', value: 'PO', id: 59 },
      { label: 'Portugal', value: 'PT', id: 60 },
      { label: 'Puerto Rico', value: 'PR', id: 61 },
      { label: 'Romania', value: 'RO', id: 62 },
      { label: 'Serbia', value: 'RS', id: 63 },
      { label: 'Singapore', value: 'SG', id: 64 },
      { label: 'Slovakia', value: 'SK', id: 65 },
      { label: 'Slovenia', value: 'SI', id: 66 },
      { label: 'South Africa', value: 'ZA', id: 67 },
      { label: 'Spain', value: 'ES', id: 68 },
      { label: 'Sweden', value: 'SE', id: 69 },
      { label: 'Switzerland', value: 'CH', id: 70 },
      { label: 'Taiwan', value: 'TW', id: 71 },
      { label: 'Thailand', value: 'TH', id: 72 },
      { label: 'Trinidad and Tobago', value: 'TT', id: 73 },
      { label: 'United Arab Emirates', value: 'AE', id: 74 },
      { label: 'United Kingdom', value: 'GB', id: 75 },
      { label: 'Venezuela', value: 'VE', id: 76 },
      { label: 'Vietnam', value: 'VN', id: 77 },
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
