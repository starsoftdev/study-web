import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';
import Input from 'components/Input';
import LoadingSpinner from 'components/LoadingSpinner';
import MultiSelectCheckbox from 'components/Input/MultiSelectCheckbox';
import formValidator from './validator';
import { selectEditUserProcess, selectDeleteUserProcess } from 'containers/SponsorManageUsers/selectors';

const mapStateToProps = createStructuredSelector({
  editUserProcess: selectEditUserProcess(),
  deleteUserProcess: selectDeleteUserProcess(),
});

@reduxForm({ form: 'editSponsorUserForm', validate: formValidator })
@connect(mapStateToProps, null)

class EditSponsorUserForm extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isEdit: PropTypes.bool,
    item: PropTypes.object,
    onEdit: PropTypes.func,
    handleSubmit: PropTypes.func,
    editUserProcess: PropTypes.object,
    deleteUserProcess: PropTypes.object,
    protocolOptions: PropTypes.array,
    onDelete: PropTypes.func,
  };

  render() {
    const { isEdit } = this.props;

    return (
      <form className="form-study form-lightbox" onSubmit={this.props.handleSubmit}>
        <div className="field-row">
          <strong className="required label">
            <label>NAME</label>
          </strong>
          <div className="field">
            <div className="row">
              <div className="col pull-left">
                <Field
                  name="firstName"
                  component={Input}
                  type="text"
                  placeholder="First Name"
                  isDisabled={isEdit}
                />
              </div>
              <div className="col pull-left">
                <Field
                  name="lastName"
                  component={Input}
                  type="text"
                  placeholder="Last Name"
                  isDisabled={isEdit}
                />
              </div>
            </div>
          </div>
        </div>

        {
          !isEdit &&
            <div className="field-row">
              <strong className="required label">
                <label>EMAIL</label>
              </strong>
              <div className="field">
                <Field
                  name="email"
                  component={Input}
                  type="text"
                  placeholder="Email"
                />
              </div>
            </div>
        }

        <div className="field-row label-top">
          <strong className="required label">
            <label>PROTOCOL</label>
          </strong>
          <div className="field">
            <Field
              name="protocols"
              component={MultiSelectCheckbox}
              options={this.props.protocolOptions}
            />
          </div>
        </div>

        <div className="btn-block btns text-right">
          {isEdit &&
            <a className="btn btn-gray-outline lightbox-opener" onClick={this.props.onDelete} disabled={this.props.deleteUserProcess.deleting}>
              {this.props.deleteUserProcess.deleting
                ? <span><LoadingSpinner showOnlyIcon size={20} /></span>
                : <span>Remove</span>
              }
            </a>
          }
          <button type="submit" className="btn btn-default" disabled={this.props.editUserProcess.saving}>
            {this.props.editUserProcess.saving
              ? <span><LoadingSpinner showOnlyIcon size={20} className="saving-user" /></span>
              : <span>{isEdit ? 'Update' : 'Submit'}</span>
            }
          </button>
        </div>

      </form>
    );
  }
}

export default EditSponsorUserForm;
