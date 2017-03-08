/**
 * Created by mike on 10/11/16.
 */

import React from 'react';
import Collapse from 'react-bootstrap/lib/Collapse';
import Input from '../../../../components/Input/index';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import Form from 'react-bootstrap/lib/Form';

export class PatientThankyouPageModal extends React.Component {
  static propTypes = {
    openModal: React.PropTypes.bool.isRequired,
    onClose: React.PropTypes.func.isRequired,
  };

  render() {
    const initText = 'Hi Oliver Queen, Thanks for signing up for this research study! Please call (226) 646-2764 to schedule your appointment today and tell them Studykik sent you! Healthcare will be changed globally by your participation.  Thank you, StudyKIK';

    const { openModal, onClose } = this.props;
    return (
      <Collapse dimension="width" in={openModal} timeout={250} className="patient-thankyou-slider">
        <div>
          <div className="slider-area">
            <div className="head">
              <div className="inner-head">
                <strong className="title">Patient Thank You Page</strong>
                <a href="#" className="btn-right-arrow" onClick={onClose}><i className="glyphicon glyphicon-menu-right"></i></a>
              </div>
            </div>
            <Form className="holder" onSubmit={this.onSubmit}>
              <div className="frame">
                <div className="field-row textarea">
                  <div className="field">
                    <Field
                      type="text"
                      name="text"
                      text={initText}
                      component={Input}
                      componentClass="textarea"
                      className="thx-msg"
                    />
                  </div>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </Collapse>
    );
  }
}

export default connect()(PatientThankyouPageModal);
