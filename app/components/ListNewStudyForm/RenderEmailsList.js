/**
 *
 * ListNewStudyForm
 *
 */

import React, { PropTypes } from 'react';
import _ from 'lodash';
import { Field } from 'redux-form';
import { Modal } from 'react-bootstrap';
import classNames from 'classnames';

import CenteredModal from '../../components/CenteredModal/index';
import AddEmailNotificationForm from '../../components/AddEmailNotificationForm';
import Checkbox from '../../components/Input/Checkbox';

class RenderEmailsList extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    change: PropTypes.func.isRequired,
    hideAddEmailModal: PropTypes.func.isRequired,
    showAddEmailModal: PropTypes.func.isRequired,
    formValues: PropTypes.object.isRequired,
    listNewStudyState: PropTypes.object.isRequired,
    fields: PropTypes.object,
    addEmailNotificationUser: PropTypes.func,
    currentUserClientId: PropTypes.number,
    currentUser: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.addEmailNotificationClick = this.addEmailNotificationClick.bind(this);
    this.addEmailNotificationSubmit = this.addEmailNotificationSubmit.bind(this);
    this.closeAddEmailModal = this.closeAddEmailModal.bind(this);
    this.selectAll = this.selectAll.bind(this);
    this.selectEmail = this.selectEmail.bind(this);
  }

  addEmailNotificationClick() {
    const { showAddEmailModal, currentUser } = this.props;
    if (currentUser.isAdmin) {
      showAddEmailModal();
    }
  }

  addEmailNotificationSubmit(values) {
    this.props.addEmailNotificationUser({
      ...values,
      clientId: this.props.currentUserClientId,
      clientRole:{
        siteId: this.props.formValues.siteLocation,
      },
    });

    // this.props.fields.push(values);
    // const { change } = this.props;
    // change('checkAllInput', false);

    // this.props.dispatch(hideAddEmailModal());
  }

  closeAddEmailModal() {
    const { hideAddEmailModal } = this.props;
    hideAddEmailModal();
  }

  selectAll(e) {
    const { change, formValues } = this.props;
    const checked = e;
    if (formValues.emailNotifications) {
      _.forEach(formValues.emailNotifications, (value, index) => {
        change(`emailNotifications[${index}].isChecked`, checked);
      });
    }
  }

  selectEmail(e) {
    const { change, formValues } = this.props;
    const checked = e;
    if (formValues.checkAllInput && !checked) {
      change('checkAllInput', false);
    } else if (!formValues.checkAllInput && checked) {
      const checkedArr = _.filter(formValues.emailNotifications, (o) => o.isChecked);
      if ((checkedArr.length + 1) === formValues.emailNotifications.length) {
        change('checkAllInput', true);
      }
    }
  }

  render() {
    const { fields, formValues, currentUser } = this.props;
    return (
      <div>
        <div className={fields.length === 0 ? 'heading-area-no-border' : 'heading-area'}>
          <Field
            name="checkAllInput"
            component={Checkbox}
            type="checkbox"
            className="field-active"
            onChange={this.selectAll}
          />
          <strong className="email">RECEIVE EMAIL NOTIFICATION</strong>
        </div>

        <ul className="list-unstyled list-emails">
          {
            fields.map((email, index) =>
              <li key={index}>
                <Field
                  name={`${email}.isChecked`}
                  component={Checkbox}
                  type="checkbox"
                  className="field-active"
                  onChange={this.selectEmail}
                />
                <span className="first-name">{formValues.emailNotifications[index].firstName} </span>
                <span className="last-name">{formValues.emailNotifications[index].lastName} </span>
              </li>
            )
          }
        </ul>
        <div className="btn-holder">
          <a className={classNames('add-new-email lightbox-opener')} onClick={this.addEmailNotificationClick} disabled={!currentUser.isAdmin}>Add Email Notification</a>
        </div>

        <Modal
          dialogComponentClass={CenteredModal}
          show={this.props.listNewStudyState.showAddEmailModal}
          onHide={this.closeAddEmailModal}
          backdrop
          keyboard
        >
          <Modal.Header>
            <Modal.Title>ADD EMAIL NOTIFICATION</Modal.Title>
            <a className="lightbox-close close" onClick={this.closeAddEmailModal}>
              <i className="icomoon-icon_close" />
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
