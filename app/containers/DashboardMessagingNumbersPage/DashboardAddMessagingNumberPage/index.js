/*
 *
 * DashboardAddMessagingNumberPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Helmet from 'react-helmet';
import { Field, reduxForm } from 'redux-form';
import Form from 'react-bootstrap/lib/Form';

import ReactSelect from '../../../components/Input/ReactSelect';
import Checkbox from '../../../components/Input/Checkbox';
import Input from '../../../components/Input/';
import { addMessagingNumber } from '../actions';
import { selectDashboardEditMessagingNumberProcess } from '../selectors';

const formName = 'dashboardAddMessagingNumberForm';

@reduxForm({
  form: formName,
})
export class DashboardAddMessagingNumberPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    submitForm: PropTypes.func,
    addMessagingNumber: PropTypes.func,
    editMessagingNumberProcess: PropTypes.object,
  }

  render() {
    const country = [{ label: 'USA', value: 'USA', id: 0 },
      { label: 'Canada', value: 'Canada', id: 1 },
      { label: 'UK', value: 'UK', id: 2 },
      { label: 'France', value: 'France', id: 3 },
      { label: 'Italy', value: 'Italy', id: 4 },
      { label: 'Germany', value: 'Germany', id: 5 },
      { label: 'Brazil', value: 'Brazil', id: 6 },
      { label: 'Chile', value: 'Chile', id: 7 },
      { label: 'Colombia', value: 'Colombia', id: 8 },
      { label: 'Cuba', value: 'Cuba', id: 9 },
      { label: 'Czech Republic', value: 'Czech Republic', id: 10 },
      { label: 'Denmark', value: 'Denmark', id: 11 },
      { label: 'Fiji', value: 'Fiji', id: 12 },
      { label: 'Australia', value: 'Australia', id: 13 },
      { label: 'Hungary', value: 'Hungary', id: 14 },
      { label: 'Iceland', value: 'Iceland', id: 15 },
      { label: 'Japan', value: 'Japan', id: 16 },
      { label: 'Luxembourg', value: 'Luxembourg', id: 17 },
      { label: 'Malaysia', value: 'Malaysia', id: 18 },
    ];

    return (
      <div className="container-fluid dashboard-portals dashboard-add-messaging-number">
        <Helmet title="Add Messaging Number - StudyKIK" />
        <h2 className="main-heading">Add Messaging Number</h2>
        <Form className="form-search selects-form clearfix">
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
                />
              </div>
              <strong className="label">
                <label htmlFor="mms">MMS</label>
              </strong>
            </div>
          </div>
          <div className="fields-holder row second-row">
            <div className="pull-left col custom-select no-left-padding">
              <a className="btn btn-default" onClick={this.props.submitForm}>Submit</a>
            </div>
          </div>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  editMessagingNumberProcess: selectDashboardEditMessagingNumberProcess(),
});

function mapDispatchToProps(dispatch) {
  return {
    addMessagingNumber: (payload) => dispatch(addMessagingNumber(payload)),
    submitForm: (values) => dispatch(addMessagingNumber(values)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardAddMessagingNumberPage);
