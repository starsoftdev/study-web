/**
*
* SetNewPasswordForm
*
*/

import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import { Field, reduxForm } from 'redux-form';

import setNewPasswordFormValidator from './validator';
import Input from '../../components/Input';


@reduxForm({
  form: 'setNewPassword',
  validate: setNewPasswordFormValidator,
})
class SetNewPasswordForm extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    handleSubmit: React.PropTypes.func.isRequired,
    submitting: React.PropTypes.bool.isRequired,
  };

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <form
        onSubmit={handleSubmit}
        className="form-horizontal"
      >
        <FormGroup>
          <Field
            name="password"
            type="password"
            component={Input}
            className="col-sm-12"
          />
        </FormGroup>

        <FormGroup>

          <Col sm={6} smPush={6}>
            <button
              type="submit"
              disabled={submitting}
              className="btn btn-default pull-right"
            >
              Submit
            </button>
          </Col>


        </FormGroup>

      </form>
    );
  }
}

export default SetNewPasswordForm;
