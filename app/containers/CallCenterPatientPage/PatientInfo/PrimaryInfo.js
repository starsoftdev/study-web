import moment from 'moment';
import React from 'react';

import { translate } from '../../../../common/utilities/localization';

function formatDate(date, format = 'MM/DD/YY [at] hh:mm a') {
  return moment(date).format(format);
}

function PrimaryInfo({ patient }) {
  return (
    <Form className="form-lightbox form-patients-list" onSubmit={this.onSubmit}>
      <div className="field-row">
        <strong className="label required">
          <label htmlFor="new-patient-first-name">{translate('container.page.callCenterPatient.label.name')}</label>
        </strong>
        <div className="field">
          <div className="row">
            <div className="col pull-left">
              <Field
                type="text"
                name="firstName"
                component={Input}
                placeholder={translate('client.component.patientDetailSection.placeholderFirstName')}
                isDisabled={submitting}
                required
              />
            </div>
            <div className="col pull-right">
              <Field
                type="text"
                name="lastName"
                component={Input}
                placeholder={translate('client.component.patientDetailSection.placeholderLastName')}
                isDisabled={submitting}
                required
              />
            </div>
          </div>
        </div>
      </div>
      <div className="field-row">
        <strong className="label">
          <label htmlFor="new-patient-email">{translate('container.page.callCenterPatient.label.email')}</label>
        </strong>
        <div className="field">
          <Field
            type="email"
            name="email"
            component={Input}
          />
        </div>
      </div>
      <div className="field-row">
        <strong className="label required">
          <label htmlFor="new-patient-phone">{translate('container.page.callCenterPatient.label.phone')}</label>
        </strong>
        <div className="field">
          <Field
            type="tel"
            name="phone"
            component={Input}
            onBlur={this.onPhoneBlur}
            required
          />
        </div>
      </div>

      <div className="field-row">
        <strong className="label">
          <label>{translate('container.page.callCenterPatient.label.signedUp')}</label>
        </strong>
        <div className="field">
          <time dateTime={initialValues.createdAt}>{moment.tz(initialValues.createdAt, timezone).format(translate('client.component.patientDetailSection.dateMask'))}</time>
        </div>
      </div>

      <div className="field-row">
        <strong className="label">
          <label>{translate('container.page.callCenterPatient.label.updated')}</label>
        </strong>
        <div className="field">
          <time dateTime={initialValues.updatedAt}>{moment.tz(initialValues.updatedAt, timezone).format('MM/DD/YY [at] h:mm A')}</time>
        </div>
      </div>

      <div className="field-row">
        <strong className="label">
          <label htmlFor="unsubscribed">{translate('client.component.patientDetailSection.labelUnsubscribe')}</label>
        </strong>
        <div className="field">
          <Field
            name="unsubscribed"
            type="checkbox"
            component={Checkbox}
            className={unsubscribedClassName}
          />
        </div>
      </div>
      <div className="clearfix" />
    </Form>
  );
}

export default PrimaryInfo;
