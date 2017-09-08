import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import { forEach, filter } from 'lodash';

import Checkbox from '../../components/Input/Checkbox';

export default class RenderCustomEmailsList extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    change: PropTypes.func.isRequired,
    formValues: PropTypes.object.isRequired,
    fields: PropTypes.object,
    addEmailNotificationClick: PropTypes.func,
    closeEmailNotification: PropTypes.func,
    removeCustomEmailNotification: PropTypes.func,
    emailFields: PropTypes.array,
  };

  constructor(props) {
    super(props);

    this.addEmailNotificationClick = this.addEmailNotificationClick.bind(this);
    this.selectAll = this.selectAll.bind(this);
    this.selectEmail = this.selectEmail.bind(this);
    this.deleteEmail = this.deleteEmail.bind(this);
  }

  componentDidMount() {
  }

  addEmailNotificationClick() {
    const { addEmailNotificationClick } = this.props;
    addEmailNotificationClick(true);
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
    const { formValues, removeCustomEmailNotification } = this.props;
    removeCustomEmailNotification({
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
