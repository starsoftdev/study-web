import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';
import Input from '../../../components/Input';
import { map } from 'lodash';
import ReactSelect from '../../../components/Input/ReactSelect';

@reduxForm({ form: 'dashboardEditClientAdminsForm' })

export class EditClientAdminsForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    addMessagingNumberClick: PropTypes.func,
    usersByRoles: PropTypes.object,
  }

  render() {
    const messagingNumberOptions = [{ label: '(524) 999-1234', value: 1 }, { label: '(524) 999-1234', value: 2 }, { label: '(524) 999-1234', value: 3 }];

    const bds = map(this.props.usersByRoles.details.bd, (sponsor) => ({
      label: `${sponsor.first_name} ${sponsor.last_name}`,
      value: sponsor.id,
    }));

    const aes = map(this.props.usersByRoles.details.ae, (sponsor) => ({
      label: `${sponsor.first_name} ${sponsor.last_name}`,
      value: sponsor.id,
    }));

    return (
      <form action="#" className="form-lightbox dashboard-lightbox">

        <div className="field-row">
          <strong className="label required">
            <label className="add-exposure-level">Name</label>
          </strong>
          <div className="field">
            <div className="row">
              <div className="col pull-left">
                <Field
                  name="first_name"
                  component={Input}
                  type="text"
                  placeholder="First Name"
                />
              </div>

              <div className="col pull-right">
                <Field
                  name="last_name"
                  component={Input}
                  type="text"
                  placeholder="Last Name"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="field-row">
          <strong className="label required">
            <label className="add-exposure-level">Email</label>
          </strong>
          <div className="field">
            <Field
              name="email"
              component={Input}
              type="text"
            />
          </div>
        </div>

        <div className="field-row">
          <strong className="label required">
            <label className="add-exposure-level">Phone</label>
          </strong>
          <div className="field">
            <Field
              name="phone"
              component={Input}
              type="text"
            />
          </div>
        </div>

        <div className="field-row no-margins">
          <strong className="label">
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

        <div className="field-row add-messaging-number-row">
          <strong className="label"></strong>
          <a className="link-add-messaging-number lightbox-opener" onClick={this.props.addMessagingNumberClick}>+ Add Messaging Number</a>
        </div>

        <div className="field-row">
          <strong className="label">
            <label className="add-exposure-level">DB</label>
          </strong>
          <div className="field">
            <Field
              name="bd"
              component={ReactSelect}
              placeholder="Select DB"
              options={bds}
            />
          </div>
        </div>

        <div className="field-row">
          <strong className="label">
            <label className="add-exposure-level">AE</label>
          </strong>
          <div className="field">
            <Field
              name="ae"
              component={ReactSelect}
              placeholder="Select AE"
              options={aes}
            />
          </div>
        </div>

        <div className="field-row">
          <strong className="label">
            <label className="add-exposure-level">CREDITS</label>
          </strong>
          <div className="field">
            <Field
              name="credits"
              component={Input}
              type="text"
            />
          </div>
        </div>

        <div className="field-row">
          <strong className="label">
            <label className="add-exposure-level">Rewards</label>
          </strong>
          <div className="field">
            <Field
              name="rewards"
              component={Input}
              type="text"
            />
          </div>
        </div>

        <div className="field-row text-right no-margins">
          <a className="btn btn-gray-outline">Delete</a>
          <button type="submit" className="btn btn-primary">Update</button>
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
)(EditClientAdminsForm);
