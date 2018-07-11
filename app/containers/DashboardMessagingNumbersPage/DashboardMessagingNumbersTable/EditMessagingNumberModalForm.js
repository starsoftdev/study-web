import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';
import Input from '../../../components/Input';
import LoadingSpinner from '../../../components/LoadingSpinner';

@reduxForm({ form: 'dashboardMessagingNumberForm' })

export class EditMessagingNumberModalForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    initialValues: PropTypes.object,
    handleSubmit: PropTypes.func,
    saving: PropTypes.bool,
    deleting: PropTypes.bool,
    onDelete: PropTypes.func,
  }

  render() {
    return (
      <form action="#" className="form-lightbox dashboard-lightbox" onSubmit={this.props.handleSubmit}>

        <div className="field-row">
          <strong className="label">
            <label className="add-exposure-level">Messaging Number</label>
          </strong>
          <div className="field disabled">
            <Field
              name="number"
              component={Input}
              type="text"
              isDisabled
            />
          </div>
        </div>
        <div className="field-row">
          <strong className="label">
            <label className="add-exposure-level">Site Location</label>
          </strong>
          <div className="field">
            <Field
              name="site"
              component={Input}
              type="text"
              isDisabled
            />
          </div>
        </div>
        <div className="field-row">
          <strong className="label">
            <label className="add-exposure-level">Study</label>
          </strong>
          <div className="field">
            <Field
              name="study"
              component={Input}
              type="text"
              isDisabled
            />
          </div>
        </div>
        <div className="field-row">
          <strong className="label">
            <label className="add-exposure-level">Friendly Name</label>
          </strong>
          <div className="field">
            <Field
              name="name"
              component={Input}
              type="text"
            />
          </div>
        </div>

        <div className="field-row text-right no-margins">
          <a className="btn btn-gray-outline" onClick={() => { this.props.onDelete(this.props.initialValues.id); }}>
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
)(EditMessagingNumberModalForm);
