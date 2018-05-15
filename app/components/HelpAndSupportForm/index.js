/**
*
* HelpAndSupportForm
*
*/

import React from 'react';

import { Field, reduxForm, initialize } from 'redux-form'; // eslint-disable-line
import { connect } from 'react-redux';

import Input from '../../components/Input';
import ReactSelect from '../../components/Input/ReactSelect';
import helpAndSupportFormValidator from './validator';
import { translate } from '../../../common/utilities/localization';

const formName = 'helpAndSupport';
const mapDispatchToProps = (dispatch) => ({
  initialize: (data) => dispatch(initialize(formName, data)),
});
@reduxForm({ form: formName, validate: helpAndSupportFormValidator })
@connect(null, mapDispatchToProps)
class HelpAndSupportForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    initialize: React.PropTypes.func.isRequired,
    error: React.PropTypes.object,
    handleSubmit: React.PropTypes.func.isRequired,
    siteLocations: React.PropTypes.array,
    reset: React.PropTypes.func.isRequired,
    submitting: React.PropTypes.bool.isRequired,
    currentUser: React.PropTypes.object,
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
      bDisabled = !(currentUser.roleForClient.canPurchase || currentUser.roleForClient.canRedeemRewards || currentUser.roleForClient.name === 'Super Admin');
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
    const { handleSubmit, submitting, siteLocations } = this.props;
    const { bDisabled, defaultValue } = this.state;

    return (
      <form onSubmit={handleSubmit}>
        <div className="form-fields">
          <div className="field-row">
            <strong className="label required"><label>{translate('client.component.helpAndSupportForm.labelSiteLocation')}</label></strong>
            <div className="field">
              <Field
                name="siteLocation"
                component={ReactSelect}
                placeholder={translate('client.component.helpAndSupportForm.placeholderSiteLocation')}
                options={siteLocations}
                disabled={bDisabled}
                selectedValue={defaultValue || undefined}
              />
            </div>
          </div>
          <div className="field-row">
            <strong className="label required"><label>{translate('client.component.helpAndSupportForm.labelName')}</label></strong>
            <div className="field">
              <div className="row">
                <Field
                  name="firstName"
                  component={Input}
                  type="text"
                  placeholder={translate('client.component.helpAndSupportForm.placeholderFirstName')}
                  className="col pull-left"
                />
                <Field
                  name="lastName"
                  component={Input}
                  type="text"
                  placeholder={translate('client.component.helpAndSupportForm.placeholderLastName')}
                  className="col pull-right"
                />
              </div>
            </div>
          </div>

          <div className="field-row">
            <strong className="label required"><label>{translate('client.component.helpAndSupportForm.labelEmail')}</label></strong>
            <Field
              name="email"
              component={Input}
              type="email"
              className="field"
            />
          </div>

          <div className="field-row textarea">
            <strong className="label required"><label>{translate('client.component.helpAndSupportForm.labelMessage')}</label></strong>
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
              value={translate('client.component.helpAndSupportForm.submitBtn')}
              className="btn btn-default"
              disabled={submitting}
            />
          </div>
        </div>
      </form>
    );
  }
}

export default HelpAndSupportForm;
