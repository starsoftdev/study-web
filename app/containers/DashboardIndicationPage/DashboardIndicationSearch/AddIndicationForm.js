import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';
import Input from '../../../components/Input';

@reduxForm({ form: 'dashboardAddIndicationForm' })

export class AddIndicationForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    isEdit: PropTypes.bool,
    handleSubmit: PropTypes.func,
    levels: PropTypes.object,
  }

  render() {
    const { levels } = this.props;
    const levelArr = levels.details.map((level) =>
      <div className="field-row" key={level.id}>
        <strong className="label">
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
    );
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
