import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm, change } from 'redux-form';
import Input from '../../../../common/components/Input';
import LoadingSpinner from '../../../components/LoadingSpinner';
import formValidator from './validator';
import { translate } from '../../../../common/utilities/localization';
import ReactSelect from '../../../../common/components/Input/ReactSelect';



@reduxForm({ form: 'dashboardEditVendorAdminsForm', validate: formValidator })

export class EditVendorAdminsForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    addMessagingNumberClick: PropTypes.func,
    usersByRoles: PropTypes.object,
    initialValues: PropTypes.object,
    handleSubmit: PropTypes.func,
    saving: PropTypes.bool,
    deleting: PropTypes.bool,
    onDelete: PropTypes.func,
    vendorSites: PropTypes.object,
    change: PropTypes.func,
  }

  render() {
    const roleOptions = [
      {
        label: 'READ',
        value: 'user',
      },
      {
        label: 'READ/WRITE',
        value: 'admin',
      },
    ];

    return (
      <form action="#" className="form-lightbox dashboard-lightbox" onSubmit={this.props.handleSubmit}>

        <div className="field-row">
          <strong className="label required">
            <label className="add-exposure-level">Company</label>
          </strong>
          <div className="field">
            <Field
              name="vendorName"
              component={Input}
              type="text"
            />
          </div>
        </div>

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
        <div className="field-row">
          <strong className="label required">
            <label className="add-exposure-level">{translate('client.page.vendor.admin.role')}</label>
          </strong>
          <div className="field">
            <Field
              name="role"
              component={ReactSelect}
              placeholder="Select Role"
              options={roleOptions}
            />
          </div>
        </div>

        <div className="field-row text-right no-margins">
          <a className="btn btn-gray-outline" onClick={() => { this.props.onDelete(this.props.initialValues.user_id); }} >
            {this.props.deleting
              ? <span><LoadingSpinner showOnlyIcon size={20} className="saving-user" /></span>
              : <span>{'Delete'}</span>
            }
          </a>
          <button type="submit" className="btn btn-primary">
            {this.props.saving
              ? <span><LoadingSpinner showOnlyIcon size={20} className="saving-user" /></span>
              : <span>Update</span>
            }
          </button>
        </div>

      </form>
    );
  }
}

const mapStateToProps = createStructuredSelector({
});
const mapDispatchToProps = (dispatch) => ({
  change: (name, value) => dispatch(change('dashboardEditVendorAdminsForm', name, value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditVendorAdminsForm);
