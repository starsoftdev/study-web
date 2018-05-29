/**
 * Created by mike on 10/18/16.
 */

import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { reduxForm, change, reset } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import { toastr } from 'react-redux-toastr';
import { submitEmail } from '../actions';
import { selectValues, selectSyncErrors } from '../../../common/selectors/form.selector';
import { selectCurrentUser } from '../../../containers/App/selectors';
import { selectSubmittingEmail } from '../selectors';
import EmailSectionSendForm from './EmailSectionSendForm/index';
import formValidator from './EmailSectionSendForm/validator';
import { translate } from '../../../../common/utilities/localization';

const formName = 'CallCenterPatientPage.Email';

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
  formValues: selectValues(formName),
  formSyncErrors: selectSyncErrors(formName),
  submittingEmail: selectSubmittingEmail(),
});

const mapDispatchToProps = (dispatch) => ({
  change: (field, value) => dispatch(change(formName, field, value)),
  clearForm: () => dispatch(reset(formName)),
  submitEmail: (studyId, currentPatientId, currentUser, message, email, subject) => dispatch(submitEmail(studyId, currentPatientId, currentUser, message, email, subject)),
});

@reduxForm({
  form: formName,
  validate: formValidator,
})

@connect(mapStateToProps, mapDispatchToProps)

class EmailSection extends React.Component {
  static propTypes = {
    studyId: React.PropTypes.any,
    currentPatient: React.PropTypes.object,
    active: React.PropTypes.bool.isRequired,
    formValues: React.PropTypes.object,
    formSyncErrors: React.PropTypes.object,
    change: React.PropTypes.func.isRequired,
    currentUser: React.PropTypes.object,
    submitEmail: React.PropTypes.func.isRequired,
    clearForm: React.PropTypes.func.isRequired,
    submittingEmail: React.PropTypes.bool,
  };
  constructor(props) {
    super(props);

    this.submitEmailBlast = this.submitEmailBlast.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const { clearForm } = this.props;
    if (this.props.submittingEmail !== newProps.submittingEmail && !newProps.submittingEmail) {
      clearForm();
    }
  }

  submitEmailBlast(event) {
    event.preventDefault();
    const { submitEmail, studyId, currentPatient, currentUser, formSyncErrors, formValues } = this.props;
    if (_.isEmpty(formSyncErrors) && currentPatient.email) {
      submitEmail(studyId, currentPatient.id, currentUser, formValues.email, formValues.message, formValues.subject);
    } else if (!currentPatient.email) {
      toastr.error('', translate('client.component.emailSection.toastrEmailError'));
    } else if (formSyncErrors.email) {
      toastr.error('', formSyncErrors.email);
    } else if (formSyncErrors.subject) {
      toastr.error('', formSyncErrors.subject);
    } else if (formSyncErrors.message) {
      toastr.error('', formSyncErrors.message);
    }
  }

  render() {
    const { active, change } = this.props;
    return (
      <div className={`item emails-info ${active ? 'active' : ''}`}>
        <EmailSectionSendForm
          submitEmailBlast={this.submitEmailBlast}
          change={change}
        />
      </div>
    );
  }
}

export default EmailSection;
