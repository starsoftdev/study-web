/**
*
* ReferForm
*
*/

import React from 'react';

import { Field, reduxForm, initialize } from 'redux-form';
import { connect } from 'react-redux';

import Input from '../../components/Input';
import ReactSelect from '../../components/Input/ReactSelect';
import referFormValidator from './validator';
import { translate } from '../../../common/utilities/localization';

const formName = 'refer';
const mapDispatchToProps = (dispatch) => ({
  initialize: (data) => dispatch(initialize(formName, data)),
});
@reduxForm({ form: formName, validate: referFormValidator })
@connect(null, mapDispatchToProps)
class ReferForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    error: React.PropTypes.object,
    handleSubmit: React.PropTypes.func.isRequired,
    siteLocations: React.PropTypes.array,
    reset: React.PropTypes.func.isRequired,
    submitting: React.PropTypes.bool.isRequired,
    companyTypes: React.PropTypes.array,
    currentUser: React.PropTypes.object,
    initialize: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      bDisabled: true,
      defaultValue: undefined,
    };
  }

  componentWillMount() {
    const { currentUser } = this.props;
    const isAdmin = currentUser && (currentUser.roleForClient && currentUser.roleForClient.name) === 'Super Admin';
    let bDisabled = true;
    if (currentUser && currentUser.roleForClient) {
      bDisabled = !(currentUser.roleForClient.canPurchase || currentUser.roleForClient.canRedeemRewards || currentUser.roleForClient.name === 'Super Admin' || currentUser.roleForClient.name === 'Admin');
    }
    let defaultValue = null;
    if (!isAdmin && bDisabled) {
      defaultValue = currentUser.site_id;
      if (currentUser && currentUser.roleForClient) {
        defaultValue = currentUser.roleForClient.site_id;
      }
    }
    this.setState({
      bDisabled,
      defaultValue,
    });
  }

  componentDidMount() {
    if (this.state.defaultValue) {
      this.props.initialize({ siteLocation: this.state.defaultValue });
    }
  }


  render() {
    const { submitting, siteLocations, companyTypes, handleSubmit } = this.props;
    const { bDisabled, defaultValue } = this.state;

    return (
      <form onSubmit={handleSubmit}>
        <div className="form-fields">
          <div className="field-row">
            <strong className="label required"><label htmlFor="site-location">{translate('client.component.referForm.labelSiteLocation')}</label></strong>
            <div className="field">
              <Field
                name="siteLocation"
                component={ReactSelect}
                placeholder={translate('client.component.referForm.placeholderSiteLocation')}
                options={siteLocations}
                disabled={bDisabled}
                selectedValue={defaultValue || undefined}
              />
            </div>
          </div>
          <div className="field-row">
            <strong className="label required"><label htmlFor="site-location">{translate('client.component.referForm.labelContactName')}</label></strong>
            <div className="field">
              <div className="row">
                <Field
                  name="firstName"
                  component={Input}
                  type="text"
                  placeholder={translate('client.component.referForm.placeholderFirstName')}
                  className="col pull-left"
                />
                <Field
                  name="lastName"
                  component={Input}
                  type="text"
                  placeholder={translate('client.component.referForm.placeholderLastName')}
                  className="col pull-right"
                />
              </div>
            </div>
          </div>

          <div className="field-row">
            <strong className="label required"><label htmlFor="site-location">{translate('client.component.referForm.labelContactEmail')}</label></strong>
            <Field
              name="email"
              component={Input}
              type="email"
              className="field"
            />
          </div>

          <div className="field-row">
            <strong className="label required"><label htmlFor="site-location">{translate('client.component.referForm.labelContactCompanyName')}</label></strong>
            <Field
              name="companyName"
              component={Input}
              type="text"
              className="field"
            />
          </div>

          <div className="field-row">
            <strong className="label required"><label htmlFor="site-location">{translate('client.component.referForm.labelContactCompanyType')}</label></strong>
            <Field
              name="companyType"
              component={ReactSelect}
              placeholder={translate('client.component.referForm.placeholderCompanyType')}
              options={companyTypes}
              className="field"
            />
          </div>

          <div className="field-row textarea">
            <strong className="label"><label>{translate('client.component.referForm.labelMessage')}</label></strong>
            <Field
              name="message"
              component={Input}
              componentClass="textarea"
              className="field"
            />
          </div>

          <div className="btn-block text-right">
            <input
              type="submit"
              value={translate('client.component.referForm.btnValue')}
              className="btn btn-default"
              disabled={submitting}
            />
          </div>
        </div>
      </form>
    );
  }
}

export default ReferForm;
