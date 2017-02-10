import React, { PropTypes, Component } from 'react';
import { Field, change } from 'redux-form';
import Checkbox from 'components/Input/Checkbox';
import { forEach, filter } from 'lodash';

class RenderEmailsList extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
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
    this.addNewFileds = this.addNewFileds.bind(this);

    this.state = {
      addEmailModalShow: false,
    };
  }

  componentDidMount() {
    //this.addNewFileds(this.props.emailFields);
  }

  addNewFileds(values) {
    forEach(values, (Object) => {
      this.props.fields.push(Object);
    });
    this.props.dispatch(change('editStudy', 'checkAllInput', false));
  }

  addEmailNotificationFields(values) {
    this.props.fields.push(values);
    this.closeAddEmailModal();
    this.props.dispatch(change('editStudy', 'checkAllInput', false));
  }

  addEmailNotificationClick() {
    this.props.addEmailNotification();
  }

  closeAddEmailModal() {
    this.props.closeEmailNotification();
  }

  selectAll(e) {
    if (this.props.formValues.emailNotifications) {
      forEach(this.props.formValues.emailNotifications, (value, index) => {
        this.props.dispatch(change('editStudy', `emailNotifications[${index}].isChecked`, e));
      });
    }
  }

  selectEmail(e) {
    if (this.props.formValues.checkAllInput && !e) {
      this.props.dispatch(change('editStudy', 'checkAllInput', false));
    } else if (!this.props.formValues.checkAllInput && e) {
      const checkedArr = filter(this.props.formValues.emailNotifications, (o) => o.isChecked);
      if ((checkedArr.length + 1) === this.props.formValues.emailNotifications.length) {
        this.props.dispatch(change('editStudy', 'checkAllInput', true));
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
                <span className="first-name">{formValues.emailNotifications[index].firstName} </span>
                <span className="last-name">{formValues.emailNotifications[index].lastName} </span>
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
