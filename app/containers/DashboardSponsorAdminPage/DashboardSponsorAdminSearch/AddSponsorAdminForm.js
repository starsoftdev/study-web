import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { map } from 'lodash';
import { Field, reduxForm } from 'redux-form';
import Input from '../../../components/Input';
import ReactSelect from '../../../components/Input/ReactSelect';
import formValidator from './validator';
import LoadingSpinner from '../../../components/LoadingSpinner';

@reduxForm({ form: 'dashboardAddSponsorAdminForm', validate: formValidator })

export class AddSponsorAdminForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    isEdit: PropTypes.bool,
    sponsorsWithoutAdmin: PropTypes.object,
    usersByRoles: PropTypes.object,
    initialValues: PropTypes.object,
    handleSubmit: PropTypes.func,
    saving: PropTypes.bool,
    deleting: PropTypes.bool,
    onDelete: PropTypes.func,
  }

  render() {
    let sponsors = [];
    sponsors = map(this.props.sponsorsWithoutAdmin.details, (sponsor) => ({
      label: sponsor.name,
      value: sponsor.id,
    }));
    if (this.props.isEdit) {
      sponsors.unshift({
        label: this.props.initialValues.name,
        value: this.props.initialValues.id,
      });
    }

    const bds = map(this.props.usersByRoles.details.bd, (sponsor) => ({
      label: `${sponsor.first_name} ${sponsor.last_name}`,
      value: sponsor.id,
    }));

    const aes = map(this.props.usersByRoles.details.ae, (sponsor) => ({
      label: `${sponsor.first_name} ${sponsor.last_name}`,
      value: sponsor.id,
    }));

    return (
      <form action="#" className="form-lightbox dashboard-lightbox" onSubmit={this.props.handleSubmit}>

        <div className="field-row">
          <strong className="label required">
            <label className="add-exposure-level">Sponsor</label>
          </strong>
          <div className="field">
            <Field
              name="sponsor"
              component={ReactSelect}
              placeholder="Select Sponsor"
              options={sponsors}
            />
          </div>
        </div>

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
              <div className="col pull-left">
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
        {this.props.isEdit && (
          <div className="no-margins">
            <div className="field-row">
              <strong className="label">
                <label className="add-exposure-level">BD</label>
              </strong>
              <div className="field">
                <Field
                  name="bd"
                  component={ReactSelect}
                  placeholder="Select BD"
                  options={bds}
                />
              </div>
            </div>
            <div className="field-row">
              <strong className="label">
                <label className="add-exposure-level">AE</label>
              </strong>
              <div className="field">
                <Field
                  name="ae"
                  component={ReactSelect}
                  placeholder="Select AE"
                  options={aes}
                />
              </div>
            </div>
          </div>
        )}
        <div className="field-row text-right no-margins">
          {this.props.isEdit &&
            <a className="btn btn-gray-outline" onClick={() => { this.props.onDelete(this.props.initialValues.id); }} >
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
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddSponsorAdminForm);
