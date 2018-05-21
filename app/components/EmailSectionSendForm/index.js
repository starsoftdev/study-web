import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Form from 'react-bootstrap/lib/Form';
import { toastr } from 'react-redux-toastr';

import Input from '../Input/index';
import formValidator from './validator';
import { selectClientCredits } from '../../containers/App/selectors';
import { translate } from '../../../common/utilities/localization';

const formName = 'PatientDetailModal.Email';

const mapStateToProps = createStructuredSelector({
  clientCredits: selectClientCredits(),
});


@reduxForm({
  form: formName,
  validate: formValidator,
})
@connect(mapStateToProps, null)
class EmailSectionSendForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    change: React.PropTypes.func.isRequired,
    submitEmailBlast: React.PropTypes.func.isRequired,
    switchCompose: React.PropTypes.func.isRequired,
    noBackBtn: React.PropTypes.bool,
    clientCredits: React.PropTypes.object,
  };

  handleSubmitEmailBlast(e) {
    e.preventDefault();
    const { clientCredits, submitEmailBlast } = this.props;
    if (clientCredits.details.emailCredits === 0 || clientCredits.details.emailCredits === null) {
      toastr.error('', translate('client.component.emailSectionSendForm.toastrCreditsError'));
    } else {
      submitEmailBlast(e);
    }
  }

  render() {
    const { submitEmailBlast, switchCompose, noBackBtn, clientCredits } = this.props;
    const disabled = (clientCredits.details.emailCredits === 0 || clientCredits.details.emailCredits === null);
    return (
      <Form onSubmit={submitEmailBlast} className="item emails-info">
        <div className="emails-info-holder">
          <div className="sender-field-holder">
            <div className="sender-field-prev">
              {translate('client.component.emailSectionSendForm.from')}
            </div>
            <Field
              name="email"
              component={Input}
              bsClass="form-control sender"
              className="sender-field"
              type="text"
              placeholder={translate('client.component.emailSectionSendForm.placeholderEmail')}
            />
          </div>
          <Field
            name="subject"
            component={Input}
            bsClass="form-control subject"
            type="text"
            placeholder={translate('client.component.emailSectionSendForm.placeholderSubject')}
          />
          <Field
            name="message"
            component={Input}
            componentClass="textarea"
            className="message-box"
            bsClass="form-control"
            placeholder={translate('client.component.emailSectionSendForm.placeholderMessage')}
          />
        </div>
        <div className="btns-section">
          {!noBackBtn &&
            <input type="button" value={translate('client.component.emailSectionSendForm.back')} className="btn btn-gray-outline left" onClick={switchCompose} />
          }
          <div
            className="btn btn-default lightbox-opener pull-right"
            onClick={(e) => this.handleSubmitEmailBlast(e)}
            disabled={disabled}
          >
            {translate('client.component.emailSectionSendForm.send')}
          </div>
        </div>
      </Form>
    );
  }
}

export default EmailSectionSendForm;
