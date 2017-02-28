import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';
import Input from '../../../components/Input';

@reduxForm({ form: 'dashboardAddIndicationForm' })

export class AddIndicationForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    isEdit: PropTypes.bool,
  }

  render() {
    return (
      <form action="#" className="form-lightbox dashboard-lightbox">

        <div className="field-row">
          <strong className="label required">
            <label className="add-exposure-level">Indication</label>
          </strong>
          <div className="field">
            <Field
              name="indication"
              component={Input}
              type="text"
            />
          </div>
        </div>

        <div className="field-row">
          <strong className="label required">
            <label className="add-exposure-level">TIER</label>
          </strong>
          <div className="field">
            <Field
              name="tier"
              component={Input}
              type="text"
            />
          </div>
        </div>

        <div className="field-row">
          <strong className="label">
            <label className="add-exposure-level">RUBY</label>
          </strong>
          <div className="field">
            <Field
              name="ruby"
              component={Input}
              type="text"
            />
          </div>
        </div>

        <div className="field-row">
          <strong className="label">
            <label className="add-exposure-level">DIAMOND</label>
          </strong>
          <div className="field">
            <Field
              name="diamond"
              component={Input}
              type="text"
            />
          </div>
        </div>

        <div className="field-row">
          <strong className="label">
            <label className="add-exposure-level">PLATINUM</label>
          </strong>
          <div className="field">
            <Field
              name="platinum"
              component={Input}
              type="text"
            />
          </div>
        </div>

        <div className="field-row">
          <strong className="label">
            <label className="add-exposure-level">GOLD</label>
          </strong>
          <div className="field">
            <Field
              name="gold"
              component={Input}
              type="text"
            />
          </div>
        </div>

        <div className="field-row">
          <strong className="label">
            <label className="add-exposure-level">SILVER</label>
          </strong>
          <div className="field">
            <Field
              name="silver"
              component={Input}
              type="text"
            />
          </div>
        </div>

        <div className="field-row">
          <strong className="label">
            <label className="add-exposure-level">BRONZE</label>
          </strong>
          <div className="field">
            <Field
              name="bronze"
              component={Input}
              type="text"
            />
          </div>
        </div>

        <div className="field-row text-right no-margins">
          {this.props.isEdit &&
            <a className="btn btn-gray-outline">Delete</a>
          }
          <button type="submit" className="btn btn-primary">{this.props.isEdit ? 'Update' : 'Submit'}</button>
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
)(AddIndicationForm);
