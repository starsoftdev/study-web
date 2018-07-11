import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';

import Input from '../../components/Input';
import Toggle from '../../components/Input/Toggle';
import ReactSelect from '../../components/Input/ReactSelect';
import { selectEditUserFormSiteValue } from './selectors';
import { selectSavedUser } from '../../containers/App/selectors';
import formValidator from './validator';
import LoadingSpinner from '../../components/LoadingSpinner';
import { translate } from '../../../common/utilities/localization';

const mapStateToProps = createStructuredSelector({
  savedUser: selectSavedUser(),
  site: selectEditUserFormSiteValue(),
});

const formName = 'editUser';

@reduxForm({ form: formName, validate: formValidator })
@connect(mapStateToProps, null)
class EditUserForm extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    savedUser: PropTypes.object,
    siteOptions: PropTypes.array,
    site: PropTypes.string,
    handleSubmit: PropTypes.func,
    onDelete: PropTypes.func,
    deleting: PropTypes.bool,
    isEdit: PropTypes.bool,
    EditPurchase: PropTypes.bool,
    EditRedeem: PropTypes.bool,
    editSelf: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);
    this.state = {
      fFlag: true,
    };
  }

  handleSelect() {
    if (this.state) {
      this.setState({
        fFlag: false,
      });
    }
  }

  render() {
    const { savedUser, siteOptions, site, handleSubmit, onDelete, deleting, isEdit, EditPurchase, EditRedeem, editSelf } = this.props;
    let clientRolePanelContent = null;

    if (!site || site === '0') {
      clientRolePanelContent = (
        <div className="client-role">
          <div className="field-row">
            <strong className="label">
              <label>{translate('client.component.editUserForm.labelPurchase')}</label>
            </strong>
            <div className="field">
              <Field
                name="purchase"
                component={Toggle}
                disabled={savedUser.saving || deleting || !EditPurchase || editSelf}
              />
            </div>
          </div>
          <div className="field-row">
            <strong className="label">
              <label>{translate('client.component.editUserForm.labelRewards')}</label>
            </strong>
            <div className="field">
              <Field
                name="reward"
                component={Toggle}
                disabled={savedUser.saving || deleting || !EditRedeem || editSelf}
              />
            </div>
          </div>
        </div>
      );
    }

    return (
      <form className="form-edit-user" onSubmit={handleSubmit}>
        <div className="edit-user form-fields">
          <div className="field-row">
            <strong className="required label">
              <label>{translate('client.component.editUserForm.labelName')}</label>
            </strong>
            <div className="field">
              <div className="row">
                <div className="col pull-left">
                  <Field
                    name="firstName"
                    component={Input}
                    type="text"
                    placeholder={translate('client.component.editUserForm.placeholderFirstName')}
                    disabled={savedUser.saving || deleting}
                  />
                </div>
                <div className="col pull-left">
                  <Field
                    name="lastName"
                    component={Input}
                    type="text"
                    placeholder={translate('client.component.editUserForm.placeholderLastName')}
                    disabled={savedUser.saving || deleting}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="field-row">
            <strong className="required label">
              <label>{translate('client.component.editUserForm.labelEmail')}</label>
            </strong>
            <div className="field">
              <Field
                name="email"
                component={Input}
                type="text"
                isDisabled={savedUser.saving || deleting}
              />
            </div>
          </div>
          <div className="field-row">
            <strong className="required label">
              <label>{translate('client.component.editUserForm.labelSiteLocation')}</label>
            </strong>
            <div className="field">
              <Field
                name="site"
                component={ReactSelect}
                placeholder={translate('client.component.editUserForm.placeholderSiteLocation')}
                options={siteOptions}
                disabled={savedUser.saving || deleting || editSelf}
                onChange={this.handleSelect}
              />
            </div>
          </div>
          {clientRolePanelContent}
          <div className="btn-block btns text-right">
            {onDelete &&
              <button type="button" className="btn btn-gray-outline" disabled={savedUser.saving || deleting} onClick={onDelete}>
                {deleting
                  ? <span><LoadingSpinner showOnlyIcon size={20} /></span>
                  : <span>Delete</span>
                }
              </button>
            }
            <button type="submit" className="btn btn-default" disabled={savedUser.saving || deleting}>
              {savedUser.saving
                ? <span><LoadingSpinner showOnlyIcon size={20} className="saving-user" /></span>
                : <span>{isEdit ? translate('client.component.editUserForm.btnUpdate') : translate('client.component.editUserForm.btnSubmit')}</span>
              }
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default EditUserForm;
