/**
 *
 * ListNewStudyForm
 *
 */

import React, { PropTypes } from 'react';
import Input from 'components/Input';
import { Field } from 'redux-form';
import { Modal } from 'react-bootstrap';
import AddEmailNotificationForm from 'components/AddEmailNotificationForm';

import {
  showAddEmailModal,
  hideAddEmailModal,
} from 'containers/ListNewStudyPage/actions';

class RenderEmailsList extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    formValues: PropTypes.object.isRequired,
    listNewStudyState: PropTypes.object.isRequired,
    fields: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.addEmailNotificationClick = this.addEmailNotificationClick.bind(this);
    this.addEmailNotificationSubmit = this.addEmailNotificationSubmit.bind(this);
    this.closeAddEmailModal = this.closeAddEmailModal.bind(this);
  }

  addEmailNotificationClick() {
    this.props.dispatch(showAddEmailModal());
  }

  addEmailNotificationSubmit(values) {
    this.props.fields.push(values);
    this.props.dispatch(hideAddEmailModal());
  }

  closeAddEmailModal() {
    this.props.dispatch(hideAddEmailModal());
  }

  render() {
    const { fields, formValues } = this.props;
    return (
      <div>
        <ul className="list-unstyled list-emails">
          {
            fields.map((email, index) =>
              <li key={index}>
                <span className="jcf-checkbox parent-active jcf-unchecked">
                  <Field
                    name={`${email}.isChecked`}
                    component={Input}
                    type="checkbox"
                    className="field-active"
                  />
                </span>
                <span className="first-name">{formValues.emailNotifications[index].firstName} </span>
                <span className="last-name">{formValues.emailNotifications[index].lastName} </span>
              </li>
            )
          }
        </ul>
        <div className="btn-holder">
          <a className="add-new-email lightbox-opener" onClick={this.addEmailNotificationClick}>Add Email Notification</a>
        </div>

        <Modal className="custom-modal" show={this.props.listNewStudyState.showAddEmailModal} onHide={this.closeAddEmailModal}>
          <Modal.Header>
            <Modal.Title>ADD EMAIL NOTIFICATION</Modal.Title>
            <a className="lightbox-close close" onClick={this.closeAddEmailModal}>
              <i className="icon-icon_close"></i>
            </a>
          </Modal.Header>
          <Modal.Body>
            <AddEmailNotificationForm onSubmit={this.addEmailNotificationSubmit} />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default RenderEmailsList;
