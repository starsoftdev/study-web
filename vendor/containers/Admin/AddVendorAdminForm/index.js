import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';
import Input from '../../../../app/components/Input';
import LoadingSpinner from '../../../../app/components/LoadingSpinner';
import { translate } from '../../../../common/utilities/localization';

@reduxForm({ form: 'addVendorAdminForm' })

export class AddVendorAdminForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    handleSubmit: PropTypes.func,
    saving: PropTypes.bool,
  }

  render() {
    return (
      <form action="#" className="form-lightbox dashboard-lightbox" onSubmit={this.props.handleSubmit}>

        <div className="field-row">
          <strong className="label required">
            <label className="add-exposure-level">{translate('client.page.vendor.admin.company')}</label>
          </strong>
          <div className="field">
            <Field
              name="name"
              component={Input}
              type="text"
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
                  placeholder={translate('client.page.vendor.admin.firstName')}
                />
              </div>

              <div className="col pull-right">
                <Field
                  name="lastName"
                  component={Input}
                  type="text"
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
            />
          </div>
        </div>

        <div className="field-row text-right no-margins">
          <button type="submit" className="btn btn-primary">
            {this.props.saving
              ? <span><LoadingSpinner showOnlyIcon size={20} className="saving-user" /></span>
              : <span>{translate('client.page.vendor.admin.submit')}</span>
            }
          </button>
        </div>

      </form>
    );
  }
}

const mapStateToProps = createStructuredSelector({
});
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddVendorAdminForm);
