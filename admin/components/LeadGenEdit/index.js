import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from 'react-bootstrap/lib/Button';
import Input from '../Input';
import LoadingSpinner from '../LoadingSpinner';
import formValidator from './validator';

const formName = 'leadGenForm';

@reduxForm({
  form: formName,
  validate: formValidator,
})
export default class LeadGenEdit extends Component { // eslint-disable-line react/prefer-stateless-func
  render() {
    const saving = false;

    return (
      <div id="leadGenEdit">
        <div className="field-row">
          <strong className="label required">
            <label htmlFor="facebook-url">FACEBOOK PAGE ID</label>
          </strong>
          <div className="field">
            <Field
              id="facebook-url"
              type="text"
              name="facebookPageId"
              component={Input}
            />
          </div>
        </div>
        <div className="field-row">
          <strong className="label required">
            <label htmlFor="facebook-url">FACEBOOK TOKEN</label>
          </strong>
          <div className="field">
            <Field
              id="facebook-url"
              type="text"
              name="facebookPageToken"
              component={Input}
            />
          </div>
        </div>
        <div className="field-row">
          <strong className="label required">
            <label htmlFor="facebook-url">FACEBOOK FORM NAME</label>
          </strong>
          <div className="field">
            <Field
              id="facebook-url"
              type="text"
              name="facebookFormName"
              component={Input}
            />
          </div>
        </div>


        <div className="field-row text-right">
          <Button type="submit" bsStyle="primary" className="fixed-small-btn">
            {saving
              ? <span><LoadingSpinner showOnlyIcon size={20} className="saving-user" /></span>
              : <span>Update</span>
            }
          </Button>
        </div>
      </div>
    );
  }
}
