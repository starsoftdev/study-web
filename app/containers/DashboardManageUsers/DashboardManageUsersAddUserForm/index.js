import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';
import Input from '../../../components/Input';
import ReactSelect from '../../../components/Input/ReactSelect';

@reduxForm({ form: 'dashboardAddClientAdminsForm' })

export class AddUserForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    isEdit: PropTypes.bool,
  }

  render() {
    const options = [{ label: 'Admin', value: 'Admin' }, { label: 'SM', value: 'SM' }, { label: 'BD', value: 'BD' }, { label: 'AE', value: 'AE' }];

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
                  name="firstName"
                  component={Input}
                  type="text"
                  placeholder="First Name"
                />
              </div>

              <div className="col pull-right">
                <Field
                  name="lastName"
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

        {!this.props.isEdit &&
          <div className="field-row">
            <strong className="label">
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
        }

        <div className="field-row">
          <strong className="label">
            <label className="add-exposure-level">Role</label>
          </strong>
          <div className="field">
            <Field
              name="role"
              component={ReactSelect}
              placeholder="Select Role"
              options={options}
            />
          </div>
        </div>

        <div className="field-row text-right no-margins">
          {this.props.isEdit &&
            <a className="btn btn-gray-outline">Delete</a>
          }
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
)(AddUserForm);
