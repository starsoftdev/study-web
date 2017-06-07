import React, { PropTypes, Component } from 'react';
import { Field } from 'redux-form';
import { forEach, filter } from 'lodash';

import Checkbox from '../../components/Input/Checkbox';

class RenderEmailsList extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    change: PropTypes.func.isRequired,
    formValues: PropTypes.object.isRequired,
    fields: PropTypes.object,
    addEmailNotification: PropTypes.func,
    closeEmailNotification: PropTypes.func,
    emailFields: PropTypes.array,
  };

  constructor(props) {
    super(props);

    this.addEmailNotificationClick = this.addEmailNotificationClick.bind(this);
    this.closeAddEmailModal = this.closeAddEmailModal.bind(this);
    this.selectAll = this.selectAll.bind(this);
    this.selectEmail = this.selectEmail.bind(this);
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
    change('checkAllInput', false);
  }

  addEmailNotificationFields(values) {
    const { change, fields } = this.props;
    fields.push(values);
    this.closeAddEmailModal();
    change('checkAllInput', false);
  }

  addEmailNotificationClick() {
    const { addEmailNotification } = this.props;
    addEmailNotification();
  }

  closeAddEmailModal() {
    const { closeEmailNotification } = this.props;
    closeEmailNotification();
  }

  selectAll(e) {
    const { change, formValues } = this.props;
    if (formValues.emailNotifications) {
      forEach(formValues.emailNotifications, (value, index) => {
        change(`emailNotifications[${index}].isChecked`, e);
      });
    }
  }

  selectEmail(e) {
    const { change, formValues } = this.props;
    if (formValues.checkAllInput && !e) {
      change('checkAllInput', false);
    } else if (!formValues.checkAllInput && e) {
      const checkedArr = filter(formValues.emailNotifications, (o) => o.isChecked);
      if ((checkedArr.length + 1) === formValues.emailNotifications.length) {
        change('checkAllInput', true);
      }
    }
  }

  render() {
    const { fields, formValues } = this.props;
    const fLength = fields.length;
    let frLength;
    if (formValues.emailNotifications) {
      frLength = formValues.emailNotifications.length;
    } else {
      frLength = 0;
    }
    if (fLength !== frLength && fields.length !== 0) {
      return (
        <div></div>
      );
    }
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
                <span className="email">{formValues.emailNotifications[index].email} </span>
              </li>
            )
          }
        </ul>
        <div className="btn-holder">
          <a className="add-new-email lightbox-opener" onClick={this.addEmailNotificationClick}>Add Email Notification</a>
        </div>
      </div>
    );
  }
}

export default RenderEmailsList;
