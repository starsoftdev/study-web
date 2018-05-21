import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';
import formValidator from './validatorIndication';
import LoadingSpinner from '../../../components/LoadingSpinner';
import Input from '../../../components/Input';

@reduxForm({ form: 'dashboardAddIndicationForm', validate: formValidator })

export class AddIndicationForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    isEdit: PropTypes.bool,
    handleSubmit: PropTypes.func,
    initialValues: PropTypes.object,
    levels: PropTypes.object,
    deleting: PropTypes.bool,
    saving: PropTypes.bool,
    onDelete: PropTypes.func,
  }

  render() {
    const { levels } = this.props;
    const levelArr = levels.details.map((level) => (
      (!level.isArchived)
        ? <div className="field-row" key={level.id}>
          <strong className="label required">
            <label className="add-exposure-level">{level.name}</label>
          </strong>
          <div className="field">
            <Field
              name={level.name}
              component={Input}
              type="text"
            />
          </div>
        </div>
        : null
    ));
    return (
      <form action="#" className="form-lightbox dashboard-lightbox" onSubmit={this.props.handleSubmit}>

        <div className="field-row">
          <strong className="label required">
            <label className="add-exposure-level">Indication</label>
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

        {levelArr}

        <div className="field-row text-right no-margins">
          {this.props.isEdit &&
            <a className="btn btn-gray-outline" onClick={() => { this.props.onDelete(this.props.initialValues.id); }}>
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
)(AddIndicationForm);
