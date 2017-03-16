/**
 * Created by mike on 10/11/16.
 */

import React from 'react';
import Collapse from 'react-bootstrap/lib/Collapse';
import Button from 'react-bootstrap/lib/Button';
import Checkbox from '../../../../components/Input/Checkbox';
import Input from '../../../../components/Input/index';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import Form from 'react-bootstrap/lib/Form';

export class ThankyouPageModal extends React.Component {
  static propTypes = {
    openModal: React.PropTypes.bool.isRequired,
    onClose: React.PropTypes.func.isRequired,
  };

  render() {
    const { openModal, onClose } = this.props;
    return (
      <Collapse dimension="width" in={openModal} timeout={250} className="thankyou-slider">
        <div>
          <div className="slider-area">
            <div className="head">
              <div className="inner-head">
                <strong className="title">Thank You Page</strong>
                <a href="#" className="btn-right-arrow" onClick={onClose}><i className="glyphicon glyphicon-menu-right"></i></a>
              </div>
            </div>
            <Form className="holder" onSubmit={this.onSubmit}>
              <div className="frame">
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-first-name">Thank You For...</label>
                  </strong>
                  <div className="field">
                    <Field
                      type="text"
                      name="thankyouFor"
                      id="thankyou-for"
                      component={Input}
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-first-name">You Will be...</label>
                  </strong>
                  <div className="field">
                    <Field
                      type="text"
                      id="you-will-be"
                      name="youWillBe"
                      component={Input}
                      required
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-email">Location</label>
                  </strong>
                  <div className="field">
                    <Field
                      type="checkbox"
                      name="shareStudyIcon"
                      component={Checkbox}
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-phone">Mobile Phone</label>
                  </strong>
                  <div className="field">
                    <Field
                      type="checkbox"
                      name="shareStudyIcon"
                      component={Checkbox}
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-phone">Here is the...</label>
                  </strong>
                  <div className="field">
                    <Field
                      type="text"
                      id="here-is-the"
                      name="herIsThe"
                      component={Input}
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-phone">Address</label>
                  </strong>
                  <div className="field">
                    <Field
                      type="text"
                      name="clickcallBtn"
                      component={Input}
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-phone">Looking Forward to...</label>
                  </strong>
                  <div className="field">
                    <Field
                      type="text"
                      name="clickcallNumber"
                      component={Input}
                    />
                  </div>
                </div>
                <div className="field-row text-right">
                  <Button bsStyle="primary"> Submit </Button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </Collapse>
    );
  }
}

export default connect()(ThankyouPageModal);
