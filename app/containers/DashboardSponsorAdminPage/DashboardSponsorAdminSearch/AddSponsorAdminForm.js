import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';
import Input from '../../../components/Input';

@reduxForm({ form: 'dashboardAddSponsorAdminForm' })

export class AddSponsorAdminForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    isEdit: PropTypes.bool,
  }

  render() {
    return (
      <form action="#" className="form-lightbox dashboard-lightbox">

        <div className="field-row">
          <strong className="label required">
            <label className="add-exposure-level">Sponsor</label>
          </strong>
          <div className="field">
            <Field
              name="company"
              component={Input}
              type="text"
              placeholder="Select Sponsor"
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
                  component={Input}
                  type="text"
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
                  component={Input}
                  type="text"
                />
              </div>
            </div>
          </div>
        )}
        <div className="field-row text-right no-margins">
          {this.props.isEdit &&
            <a className="btn btn-gray-outline">Delete</a>
          }
          <button type="submit" className="btn btn-primary">Submit</button>
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
