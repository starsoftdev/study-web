import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';

import Input from 'components/Input';
import Toggle from 'components/Input/Toggle';
import ReactSelect from 'components/Input/ReactSelect';
import { selectEditUserFormError, selectEditUserFormSiteValue } from './selectors';
import { selectSavedUser } from 'containers/SitesUsersPage/selectors';
import formValidator from './validator';
import LoadingSpinner from 'components/LoadingSpinner';

const mapStateToProps = createStructuredSelector({
  savedUser: selectSavedUser(),
  site: selectEditUserFormSiteValue(),
  hasError: selectEditUserFormError(),
});

@reduxForm({ form: 'editUser', validate: formValidator })
@connect(mapStateToProps, null)

class EditUserForm extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    savedUser: PropTypes.object,
    siteOptions: PropTypes.array,
    site: PropTypes.string,
    hasError: PropTypes.bool,
    handleSubmit: PropTypes.func,
    onDelete: PropTypes.func,
    deleting: PropTypes.bool,
  };

  render() {
    const { savedUser, siteOptions, site, hasError, handleSubmit, onDelete, deleting } = this.props;
    let clientRolePanelContent = null;

    if (site === '0') {
      clientRolePanelContent = (
        <div className="client-role">
          <div className="row form-group">
            <strong className="col-sm-4">
              <label>PURCHASE</label>
            </strong>
            <div className="field col-sm-8">
              <Field
                name="purchase"
                component={Toggle}
                disabled={savedUser.saving || deleting}
              />
            </div>
          </div>
          <div className="row form-group">
            <strong className="col-sm-4">
              <label>REWARD</label>
            </strong>
            <div className="field col-sm-8">
              <Field
                name="reward"
                component={Toggle}
                disabled={savedUser.saving || deleting}
              />
            </div>
          </div>
        </div>
      );
    }

    return (
      <form className="form-edit-user" onSubmit={handleSubmit}>
        <div className="edit-user scroll-holder jcf--scrollable">
          <div className="row form-group">
            <strong className="required col-sm-4">
              <label>NAME</label>
            </strong>
            <div className="field col-sm-8">
              <div className="row">
                <div className="col-sm-6">
                  <Field
                    name="firstName"
                    component={Input}
                    type="text"
                    placeholder="First Name"
                    disabled={savedUser.saving || deleting}
                  />
                </div>
                <div className="col-sm-6">
                  <Field
                    name="lastName"
                    component={Input}
                    type="text"
                    placeholder="Last Name"
                    disabled={savedUser.saving || deleting}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row form-group">
            <strong className="required col-sm-4">
              <label>EMAIL</label>
            </strong>
            <div className="field col-sm-8">
              <Field
                name="email"
                component={Input}
                type="text"
                disabled={savedUser.saving || deleting}
              />
            </div>
          </div>
          <div className="row form-group">
            <strong className="required col-sm-4">
              <label>SITE LOCATION</label>
            </strong>
            <div className="field col-sm-8">
              <Field
                name="site"
                component={ReactSelect}
                placeholder="Select Site Location"
                options={siteOptions}
                disabled={savedUser.saving || deleting}
              />
            </div>
          </div>
          {clientRolePanelContent}
          <div className="btn-block btns text-right">
            {onDelete &&
              <button type="button" className="btn btn-default" disabled={savedUser.saving || deleting} onClick={onDelete}>
                {deleting
                  ? <span><LoadingSpinner showOnlyIcon size={20} className="deleting-user" /></span>
                  : <span>Delete</span>
                }
              </button>
            }
            <button type="submit" className="btn btn-default" disabled={hasError || savedUser.saving || deleting}>
              {savedUser.saving
                ? <span><LoadingSpinner showOnlyIcon size={20} className="saving-user" /></span>
                : <span>Submit</span>
              }
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default EditUserForm;
