import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import Form from 'react-bootstrap/lib/Form';
import Input from '../../../app/components/Input/index';
import CenteredModal from '../../../app/components/CenteredModal/index';

import formValidator from './validator';

const formName = 'listNow';

@reduxForm({
  form: formName,
  validate: formValidator,
})

class ListNowModal extends React.Component {
  static propTypes = {
    handleSubmit: React.PropTypes.func.isRequired,
    resetForm: React.PropTypes.func.isRequired,
    onHide: React.PropTypes.func.isRequired,
    show: React.PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.onHide = this.onHide.bind(this);
  }

  onHide() {
    const { onHide, resetForm } = this.props;
    resetForm();
    onHide();
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <Modal
        show={this.props.show}
        form={formName}
        id="list-now"
        dialogComponentClass={CenteredModal}
        backdrop
        keyboard
      >
        <Modal.Header>
          <Modal.Title>
            <strong>list now</strong>
          </Modal.Title>
          <a className="close" onClick={this.onHide}>
            <i className="icomoon-icon_close" />
          </a>
        </Modal.Header>
        <Modal.Body>
          <div className="scroll-holder jcf--scrollable">
            <span>
              Please provide your information below and a StudyKIK project Manage will contact you shortly!
            </span>
            <Form
              className="form-lightbox"
              onSubmit={handleSubmit}
              noValidate="novalidate"
            >
              <div className="field-row">
                <strong className="label required">
                  <label htmlFor="import-patient-email"> full name </label>
                </strong>
                <Field
                  name="name"
                  component={Input}
                  type="text"
                  className="field"
                  id=""
                  required
                />
              </div>
              <div className="field-row">
                <strong className="label required">
                  <label htmlFor="import-patient-phone"> company </label>
                </strong>
                <Field
                  name="company"
                  component={Input}
                  type="text"
                  className="field"
                  id=""
                  required
                />
              </div>
              <div className="field-row">
                <strong className="label required">
                  <label htmlFor="import-patient-phone"> email </label>
                </strong>
                <Field
                  name="email"
                  component={Input}
                  type="text"
                  className="field"
                  id=""
                  required
                />
              </div>
              <div className="field-row">
                <strong className="label required">
                  <label htmlFor="import-patient-phone"> phone </label>
                </strong>
                <Field
                  name="phone"
                  component={Input}
                  type="tel"
                  className="field"
                  id=""
                  required
                />
              </div>
              <div className="text-right">
                <Button type="submit" disabled={false}>Submit</Button>
              </div>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    resetForm: () => dispatch(reset(formName)),
  };
}

export default connect(null, mapDispatchToProps)(ListNowModal);
