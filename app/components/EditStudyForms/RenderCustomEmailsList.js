import React, { PropTypes, Component } from 'react';
import { Field } from 'redux-form';
import { forEach, filter } from 'lodash';

import Checkbox from '../../components/Input/Checkbox';

class RenderCustomEmailsList extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    change: PropTypes.func.isRequired,
    formValues: PropTypes.object.isRequired,
    fields: PropTypes.object,
    addEmailNotification: PropTypes.func,
    closeEmailNotification: PropTypes.func,
    removeCustomEmailNotification: PropTypes.func,
    emailFields: PropTypes.array,
  };

  constructor(props) {
    super(props);

    this.addEmailNotificationClick = this.addEmailNotificationClick.bind(this);
    this.closeAddEmailModal = this.closeAddEmailModal.bind(this);
    this.selectAll = this.selectAll.bind(this);
    this.selectEmail = this.selectEmail.bind(this);
    this.deleteEmail = this.deleteEmail.bind(this);
    this.addEmailNotificationFields = this.addEmailNotificationFields.bind(this);
    this.addNewFields = this.addNewFields.bind(this);

    this.state = {
      addEmailModalShow: false,
    };
  }

  componentDidMount() {
  }

  addNewFields(values) {
    const { change, fields } = this.props;
    forEach(values, (Object) => {
      fields.push(Object);
    });
    change('checkAllCustomInput', false);
  }

  addEmailNotificationFields(values) {
    const { change, fields } = this.props;
    fields.push(values);
    this.closeAddEmailModal();
    change('checkAllCustomInput', false);
  }

  addEmailNotificationClick() {
    const { addEmailNotification } = this.props;
    addEmailNotification(true);
  }

  closeAddEmailModal() {
    const { closeEmailNotification } = this.props;
    closeEmailNotification(true);
  }

  selectAll(e) {
    const { change, formValues } = this.props;
    if (formValues.customEmailNotifications) {
      forEach(formValues.customEmailNotifications, (value, index) => {
        change(`customEmailNotifications[${index}].isChecked`, e);
      });
    }
  }

  selectEmail(e) {
    const { change, formValues } = this.props;
    if (formValues.checkAllCustomInput && !e) {
      change('checkAllCustomInput', false);
    } else if (!formValues.checkAllCustomInput && e) {
      const checkedArr = filter(formValues.customEmailNotifications, (o) => o.isChecked);
      if ((checkedArr.length + 1) === formValues.customEmailNotifications.length) {
        change('checkAllCustomInput', true);
      }
    }
  }

  deleteEmail(emailId) {
    const { formValues } = this.props;
    this.props.removeCustomEmailNotification({
      emailId,
      studyId: formValues.study_id,
    });
  }

  render() {
    const { formValues } = this.props;
    const customEmailNotifications = formValues.customEmailNotifications || [];

    const heading = 'RECEIVE EMAIL NOTIFICATION';
    const buttonText = 'Add Email';

    return (
      <div>
        <div className={customEmailNotifications.length === 0 ? 'heading-area-no-border' : 'heading-area'}>
          <Field
            name="checkAllCustomInput"
            component={Checkbox}
            type="checkbox"
            className="field-active"
            onChange={this.selectAll}
          />
          <strong className="email">{heading}</strong>
        </div>

        <ul className="list-unstyled list-emails">
          {
            customEmailNotifications.map((email, index) =>
              <li key={index}>
                <Field
                  name={`customEmailNotifications[${index}].isChecked`}
                  component={Checkbox}
                  type="checkbox"
                  className="field-active"
                  onChange={this.selectEmail}
                />
                <span className="email">{email.email} </span>
                <span
                  className="icomoon-icon_trash"
                  onClick={() => {
                    this.deleteEmail(email.id);
                  }}
                />
              </li>
            )
          }
        </ul>
        <div className="btn-holder">
          <a className="add-new-email lightbox-opener" onClick={this.addEmailNotificationClick}>{buttonText}</a>
        </div>
      </div>
    );
  }
}

export default RenderCustomEmailsList;
