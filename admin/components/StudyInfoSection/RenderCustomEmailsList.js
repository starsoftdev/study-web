import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import { forEach, filter } from 'lodash';
import Button from 'react-bootstrap/lib/Button';
import Checkbox from '../../components/Input/Checkbox';
import ReactSelect from '../../components/Input/ReactSelect';

export default class RenderEmailsList extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    change: PropTypes.func.isRequired,
    formValues: PropTypes.object.isRequired,
    fields: PropTypes.object,
    addEmailNotificationClick: PropTypes.func,
    closeEmailNotification: PropTypes.func,
    emailFields: PropTypes.array,
    currentUser: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.addEmailNotificationClick = this.addEmailNotificationClick.bind(this);
    this.selectEmail = this.selectEmail.bind(this);
  }

  componentDidMount() {
  }

  addEmailNotificationClick() {
    const { addEmailNotificationClick } = this.props;
    addEmailNotificationClick(true);
  }

  selectEmail(e, index) {
    const { change } = this.props;
    change(`customEmailNotifications[${index}].isChecked`, (e === 'true'));
  }

  renderEmailList(email, index) {
    const { formValues } = this.props;

    const options = [{value: 'true', label: 'TRUE'}, {value: 'false', label: 'FALSE'}];

    return (
      <li key={index}>
        <div className="field-row right-to-left">
          <strong className="label">
            <label htmlFor="new-patient-phone">{formValues.customEmailNotifications[index].email}</label>
          </strong>
          <div className="field">
            <Field
              name={`${email}.isChecked`}
              component={ReactSelect}
              options={options}
              customSearchIconClass="icomoon-icon_search2"
              onChange={(e) => {this.selectEmail(e, index)}}
            />
          </div>
        </div>
      </li>
    );
  }

  render() {
    const { fields, formValues } = this.props;
    let formValuesLength;

    if (formValues.customEmailNotifications) {
      formValuesLength = formValues.customEmailNotifications.length;
    } else {
      formValuesLength = 0;
    }
    if (fields.length !== formValuesLength && fields.length !== 0) {
      return (
        <div></div>
      );
    }
    return (
      <div>
        <ul className="">
          {
            fields.map((emailNotification, index) => {
              return this.renderEmailList(emailNotification, index);
            })
          }
        </ul>
        <Button onClick={this.addEmailNotificationClick} >Add</Button>
      </div>
    );
  }
}
