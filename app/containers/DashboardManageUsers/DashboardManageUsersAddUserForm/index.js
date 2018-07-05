import _ from 'lodash';
import React, { PropTypes } from 'react';
import { Field, reduxForm, blur } from 'redux-form';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { normalizePhoneDisplay } from '../../../../app/common/helper/functions';
import Input from '../../../components/Input';
import ReactSelect from '../../../components/Input/ReactSelect';
import LoadingSpinner from '../../../components/LoadingSpinner';
import formValidator from './validator';

const formName = 'dashboardAddClientAdminsForm';

function mapDispatchToProps(dispatch) {
  return {
    blur: (field, value) => dispatch(blur(formName, field, value)),
  };
}

@reduxForm({ form: formName, validate: formValidator })
@connect(null, mapDispatchToProps)

export class AddUserForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    blur: PropTypes.func.isRequired,
    isEdit: PropTypes.bool,
    handleSubmit: PropTypes.func,
    saving: PropTypes.bool,
    deleting: PropTypes.bool,
    roles: PropTypes.object,
    onDelete: PropTypes.func,
    initialValues: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.onPhoneBlur = this.onPhoneBlur.bind(this);
  }

  onPhoneBlur(event) {
    const { blur } = this.props;
    const formattedPhoneNumber = normalizePhoneDisplay(event.target.value);
    blur('phone', formattedPhoneNumber);
  }

  render() {
    const options = [];
    _.forEach(this.props.roles.details, (item) => {
      let roleName = item.name;

      switch (roleName) {
        case 'sm':
          roleName = 'AD OPERATION';
          break;
        case 'bd':
          roleName = 'BUSINESS DEVELOPMENT';
          break;
        case 'ae':
          roleName = 'PROJECT MANAGER';
          break;
        case 'cc':
          roleName = 'CALL CENTER';
          break;
        case 'callCenterManager':
          roleName = 'CALL CENTER MANAGER';
          break;
        default:
          roleName = item.name.toUpperCase();
          // return roleName as is (e.g. TEST)
      }

      options.push({
        label: roleName,
        value: item.id,
      });
    });


    return (
      <form
        className="form-lightbox dashboard-lightbox"
        onSubmit={this.props.handleSubmit}
        noValidate="novalidate"
      >
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
          <strong className="label">
            <label className="add-exposure-level">Phone</label>
          </strong>
          <div className="field">
            <Field
              name="phone"
              component={Input}
              type="text"
              onBlur={this.onPhoneBlur}
            />
          </div>
        </div>

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddUserForm);
