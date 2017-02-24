import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';
import Input from '../../../components/Input';

@reduxForm({ form: 'dashboardAddProtocolForm' })

export class AddProtocolForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    isEdit: PropTypes.bool,
  }

  render() {
    return (
      <form action="#" className="form-lightbox dashboard-lightbox">

        <div className="field-row">
          <strong className="label required">
            <label className="add-exposure-level">Protocol</label>
          </strong>
          <div className="field">
            <Field
              name="protocol"
              component={Input}
              type="text"
            />
          </div>
        </div>

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
)(AddProtocolForm);
