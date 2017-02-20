import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';
import ReactSelect from '../../../components/Input/ReactSelect';

@reduxForm({ form: 'dashboardAddMessagingNumberForm' })

export class AddMessagingNumberForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
  }

  render() {
    const messagingNumberOptions = [{ label: '(524) 999-1234', value: 1 }, { label: '(524) 999-1234', value: 2 }, { label: '(524) 999-1234', value: 3 }];

    return (
      <form action="#" className="form-lightbox dashboard-lightbox">

        <div className="field-row">
          <strong className="label required">
            <label className="add-exposure-level">MESSAGING NUMBER</label>
          </strong>
          <div className="field">
            <Field
              name="messagingNumber"
              component={ReactSelect}
              placeholder="Select Messaging Number"
              options={messagingNumberOptions}
            />
          </div>
        </div>

        <div className="field-row text-right no-margins">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = createStructuredSelector({
});
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMessagingNumberForm);
