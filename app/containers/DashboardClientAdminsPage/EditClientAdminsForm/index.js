import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';
import Input from '../../../components/Input';
import ReactSelect from '../../../components/Input/ReactSelect';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { map } from 'lodash';

@reduxForm({ form: 'dashboardEditClientAdminsForm' })

export class EditClientAdminsForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    addMessagingNumberClick: PropTypes.func,
    usersByRoles: PropTypes.object,
    initialValues: PropTypes.object,
    handleSubmit: PropTypes.func,
    saving: PropTypes.bool,
    deleting: PropTypes.bool,
    onDelete: PropTypes.func,
  }

  render() {
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
            <label className="add-exposure-level">Name</label>
          </strong>
          <div className="field">
            <div className="row">
              <div className="col pull-left">
                <Field
                  name="first_name"
                  component={Input}
                  type="text"
                  placeholder="First Name"
                />
              </div>

              <div className="col pull-right">
                <Field
                  name="last_name"
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

        <div className="field-row">
          <strong className="label required">
            <label className="add-exposure-level">Phone</label>
          </strong>
          <div className="field">
            <Field
              name="phone"
              component={Input}
              type="text"
            />
          </div>
        </div>

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

        <div className="field-row">
          <strong className="label">
            <label className="add-exposure-level">CREDITS</label>
          </strong>
          <div className="field">
            <Field
              name="credits"
              component={Input}
              type="text"
            />
          </div>
        </div>

        <div className="field-row">
          <strong className="label">
            <label className="add-exposure-level">Rewards</label>
          </strong>
          <div className="field">
            <Field
              name="rewards"
              component={Input}
              type="text"
            />
          </div>
        </div>

        <div className="field-row text-right no-margins">
          <a className="btn btn-gray-outline" onClick={() => { this.props.onDelete(this.props.initialValues.user_id); }} >
            {this.props.deleting
              ? <span><LoadingSpinner showOnlyIcon size={20} className="saving-user" /></span>
              : <span>{'Delete'}</span>
            }
          </a>
          <button type="submit" className="btn btn-primary">
            {this.props.saving
              ? <span><LoadingSpinner showOnlyIcon size={20} className="saving-user" /></span>
              : <span>Update</span>
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
)(EditClientAdminsForm);
