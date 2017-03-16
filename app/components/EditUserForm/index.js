import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm, change } from 'redux-form';

import Input from '../../components/Input';
import Toggle from '../../components/Input/Toggle';
import ReactSelect from '../../components/Input/ReactSelect';
import { selectEditUserFormSiteValue } from './selectors';
import { selectSavedUser } from '../../containers/App/selectors';
import formValidator from './validator';
import LoadingSpinner from '../../components/LoadingSpinner';

const mapStateToProps = createStructuredSelector({
  savedUser: selectSavedUser(),
  site: selectEditUserFormSiteValue(),
});

@reduxForm({ form: 'editUser', validate: formValidator })
@connect(mapStateToProps, null)

class EditUserForm extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    savedUser: PropTypes.object,
    siteOptions: PropTypes.array,
    site: PropTypes.string,
    handleSubmit: PropTypes.func,
    onDelete: PropTypes.func,
    deleting: PropTypes.bool,
    isEdit: PropTypes.bool,
    newSiteLocation: PropTypes.number,
    Purchase: PropTypes.bool,
    Redeem: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);
    this.state = {
      fFlag: true,
    };
  }

  componentDidMount() {
    this.props.dispatch(change('editUser', 'purchase', this.props.Purchase));
    this.props.dispatch(change('editUser', 'reward', this.props.Redeem));
    const nSite = (this.props.newSiteLocation || this.props.newSiteLocation === 0) ? this.props.newSiteLocation.toString() : null;
    this.props.dispatch(change('editUser', 'site', nSite));
    // if (!this.props.site) {
    //   this.props.dispatch(change('editUser', 'site', '0'));
    // }
  }

  handleSelect() {
    if (this.state) {
      this.setState({
        fFlag: false,
      });
    }
  }

  render() {
    const { savedUser, siteOptions, site, handleSubmit, onDelete, deleting, isEdit, newSiteLocation } = this.props;
    let clientRolePanelContent = null;

    if (!site || site === '0' || (newSiteLocation && newSiteLocation === 0)) {
      clientRolePanelContent = (
        <div className="client-role">
          <div className="field-row">
            <strong className="label">
              <label>PURCHASE</label>
            </strong>
            <div className="field">
              <Field
                name="purchase"
                component={Toggle}
                disabled={savedUser.saving || deleting}
              />
            </div>
          </div>
          <div className="field-row">
            <strong className="label">
              <label>REWARDS</label>
            </strong>
            <div className="field">
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
        <div className="edit-user form-fields">
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
                    disabled={savedUser.saving || deleting}
                  />
                </div>
                <div className="col pull-left">
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
          <div className="field-row">
            <strong className="required label">
              <label>EMAIL</label>
            </strong>
            <div className="field">
              <Field
                name="email"
                component={Input}
                type="text"
                disabled={savedUser.saving || deleting}
              />
            </div>
          </div>
          <div className="field-row">
            <strong className="required label">
              <label>SITE LOCATION</label>
            </strong>
            <div className="field">
              <Field
                name="site"
                component={ReactSelect}
                placeholder="Select Site Location"
                options={siteOptions}
                disabled={savedUser.saving || deleting}
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
                : <span>{isEdit ? 'Update' : 'Submit'}</span>
              }
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default EditUserForm;
