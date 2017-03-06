import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';
import Input from '../../../components/Input';
import ReactSelect from '../../../components/Input/ReactSelect';
import formValidator from './validator';
import LoadingSpinner from '../../../components/LoadingSpinner';
import _ from 'lodash';

@reduxForm({ form: 'dashboardAddClientAdminsForm', validate: formValidator })

export class AddUserForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    isEdit: PropTypes.bool,
    handleSubmit: PropTypes.func,
    saving: PropTypes.bool,
    deleting: PropTypes.bool,
    roles: PropTypes.object,
    onDelete: PropTypes.func,
    initialValues: PropTypes.object,
  }

  render() {
    const options = [];
    _.forEach(this.props.roles.details, (item) => {
      options.push({
        label: item.name.toUpperCase(),
        value: item.id,
      });
    });


    return (
      <form className="form-lightbox dashboard-lightbox" onSubmit={this.props.handleSubmit}>

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
          <strong className="label required">
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
            <a className="btn btn-gray-outline" onClick={() => { this.props.onDelete(this.props.initialValues.user_id); }}>
              {this.props.deleting
                ? <span><LoadingSpinner showOnlyIcon size={20} className="saving-user" /></span>
                : <span>{'Delete'}</span>
              }
            </a>
          }

          <button type="submit" className="btn btn-primary">
            {this.props.saving
              ? <span><LoadingSpinner showOnlyIcon size={20} className="saving-user" /></span>
              : <span>{this.props.isEdit ? 'Update' : 'Submit'}</span>
            }
          </button>
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
