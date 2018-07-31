import React, { PropTypes } from 'react';
import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import Input from '../../../../common/components/Input';
import ReactSelect from '../../../../common/components/Input/ReactSelect';
import LoadingSpinner from '../../../../app/components/LoadingSpinner';
import { translate } from '../../../../common/utilities/localization';
import { selectSyncErrorBool } from '../../../../common/selectors/form.selector';
import validator from './validator';
const formName = 'VendorAdminPage.AddVendorAdminForm';


const mapStateToProps = createStructuredSelector({
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
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    syncError: PropTypes.bool.isRequired,
    saving: PropTypes.bool,
  };

  render() {
    const { pristine, handleSubmit, saving, syncError } = this.props;
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
              type="email"
              required
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
          <Button bsStyle="primary" type="submit" disabled={pristine || syncError}>
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
