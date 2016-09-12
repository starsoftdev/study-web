/**
*
* ProfileForm
*
*/

import React from 'react';
import { Field, reduxForm } from 'redux-form'; // eslint-disable-line
import { Modal, Form, FormGroup, Col, FormControl, ControlLabel, Button } from 'react-bootstrap';
import Input from 'components/Input';

const currentUser = {
  firstName: 'test',
  lastName: 'lastname',
  isArchived: false,
  shoppingCart: null,
  username: 'user1',
  email: 'user1@example.com',
  created: '2016-09-05T06:21:16.174Z',
  lastUpdated: '2016-09-05T10:53:15.740Z',
  id: 1,
  site_id: null,
  sponsor_id: null,
};

@reduxForm({ form: 'profile', initialValues: currentUser })
class ProfileForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    currentUser: React.PropTypes.object,
    changePassword: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.openResetPasswordModal.bind(this);
    this.closeResetPasswordModal.bind(this);
    this.updatePassword.bind(this);
  }

  state = {
    passwordResetModalOpen: false,
  }

  openResetPasswordModal() {
    this.setState({ passwordResetModalOpen: true });
  }

  closeResetPasswordModal() {
    this.setState({ passwordResetModalOpen: false });
  }

  updatePassword() {
    this.props.changePassword();
  }
  render() {
    // const { currentUser } = this.props // TODO: fix this after login functionality will be finished
    return (
      <form className="form-study">
        <div className="form-fields">

          <div className="field-row">
            <strong className="label"><label>PROFILE IMAGE</label></strong>
            <div className="img-holder">
              <img src={'test'} alt="" width="56" height="56" /><br />
              <input
                type="button"
                value="Upload Profile Image"
                className="btn btn-default"
              />
            </div>
          </div>

          <div className="field-row">
            <strong className="label"><label>NAME</label></strong>
            <div className="field">
              <div className="row">
                <Field
                  name="firstName"
                  component={Input}
                  type="text"
                  className="col pull-left"
                  isDisabled="true"
                />
                <Field
                  name="lastName"
                  component={Input}
                  type="text"
                  placeholder="Last Name"
                  className="col pull-right"
                  isDisabled="true"
                />
              </div>
            </div>
          </div>

          <div className="field-row">
            <strong className="label"><label>Email</label></strong>
            <Field
              name="email"
              component={Input}
              disabled="true"
              type="text"
              placeholder="Email"
              className="field"
              isDisabled="true"
            />
          </div>

          <div className="field-row">
            <strong className="label"><label>PASSWORD</label></strong>
            <input
              type="button"
              value="Change"
              className="btn btn-default"
              onClick={this.openResetPasswordModal}
            />
          </div>

        </div>

        <Modal className="new-user" show={this.state.passwordResetModalOpen} onHide={this.closeResetPasswordModal}>
          <Modal.Header closeButton>
            <Modal.Title>Reset password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form horizontal>
              <FormGroup controlId="formHorizontalEmail">
                <Col componentClass={ControlLabel} sm={4}>
                  *OLD PASSWORD
                </Col>
                <Col sm={8}>
                  <FormControl type="text" />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalEmail">
                <Col componentClass={ControlLabel} sm={4}>
                  *NEW PASSWORD
                </Col>
                <Col sm={8}>
                  <FormControl type="text" />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalEmail">
                <Col componentClass={ControlLabel} sm={4}>
                  *CONFIRM PASSWORD
                </Col>
                <Col sm={8}>
                  <FormControl type="text" />
                </Col>
              </FormGroup>

              <FormGroup>
                <Col smOffset={2} sm={10}>
                  <Button onClick={this.updatePassword}>
                    UPDATE
                  </Button>
                </Col>
              </FormGroup>

            </Form>
          </Modal.Body>
        </Modal>

      </form>
    );
  }
}

export default ProfileForm;
