import React, { PropTypes } from 'react';
import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import Input from '../../../../app/components/Input';
import LoadingSpinner from '../../../../app/components/LoadingSpinner';
import { translate } from '../../../../common/utilities/localization';
import { selectAnyTouchedBool, selectSyncErrorBool } from '../../../../common/selectors/form.selector';
import validator from './validator';
const formName = 'VendorAdminPage.AddVendorAdminForm';


const mapStateToProps = createStructuredSelector({
  anyTouched: selectAnyTouchedBool(formName),
  syncError: selectSyncErrorBool(formName),
});
const mapDispatchToProps = {};

@reduxForm({
  form: formName,
  validate: validator,
})
@connect(mapStateToProps, mapDispatchToProps)
export default class AddVendorAdminForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    anyTouched: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    syncError: PropTypes.bool.isRequired,
    saving: PropTypes.bool,
  };

  render() {
    const { anyTouched, handleSubmit, saving, syncError } = this.props;
    return (
      <Form className="form-lightbox dashboard-lightbox" onSubmit={handleSubmit}>

        <div className="field-row">
          <strong className="label required">
            <label className="add-exposure-level">{translate('client.page.vendor.admin.company')}</label>
          </strong>
          <div className="field">
            <Field
              name="vendorName"
              component={Input}
              type="text"
              required
            />
          </div>
        </div>

        <div className="field-row">
          <strong className="label required">
            <label className="add-exposure-level">{translate('client.page.vendor.admin.name')}</label>
          </strong>
          <div className="field">
            <div className="row">
              <div className="col pull-left">
                <Field
                  name="firstName"
                  component={Input}
                  type="text"
                  required
                  placeholder={translate('client.page.vendor.admin.firstName')}
                />
              </div>

              <div className="col pull-right">
                <Field
                  name="lastName"
                  component={Input}
                  type="text"
                  required
                  placeholder={translate('client.page.vendor.admin.lastName')}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="field-row">
          <strong className="label required">
            <label className="add-exposure-level">{translate('client.page.vendor.admin.email')}</label>
          </strong>
          <div className="field">
            <Field
              name="email"
              component={Input}
              type="text"
              required
            />
          </div>
        </div>

        <div className="field-row text-right no-margins">
          <Button bsStyle="primary" type="submit" disabled={!anyTouched || !syncError}>
            {saving
              ? <span><LoadingSpinner showOnlyIcon size={20} className="saving-user" /></span>
              : <span>{translate('client.page.vendor.admin.submit')}</span>
            }
          </Button>
        </div>

      </Form>
    );
  }
}
