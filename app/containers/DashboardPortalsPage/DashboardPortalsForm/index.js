import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';
import ReactSelect from '../../../components/Input/ReactSelect';

@reduxForm({ form: 'dashboardPortalsForm' })

export class DashboardPortalsForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const clients = [{ label: 'Will Graham', value: 1 }, { label: 'Alan Walker', value: 2 }, { label: 'Penny Worth', value: 3 }, { label: 'Bruce Wayne', value: 4 }];

    const sponsors = [{ label: 'Pfizer', value: 1 }, { label: 'Company 1', value: 2 }, { label: 'Company 2', value: 3 }];

    return (
      <form className="form-search selects-form clearfix">
        <div className="fields-holder row">
          <div className="pull-left col custom-select first-custom-select">
            <Field
              name="client"
              component={ReactSelect}
              placeholder="Select Client"
              options={clients}
            />
          </div>
          <div className="pull-left col">
            <button className="btn btn-default">Submit</button>
          </div>
        </div>

        <div className="fields-holder row second-row">
          <div className="pull-left col custom-select">
            <Field
              name="sponsor"
              component={ReactSelect}
              placeholder="Select Sponsor"
              options={sponsors}
            />
          </div>
          <div className="pull-left col">
            <button className="btn btn-default">Submit</button>
          </div>
        </div>
      </form>
    );
  }
}

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPortalsForm);
