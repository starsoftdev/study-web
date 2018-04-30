/**
 * Created by mike on 10/18/16.
 */

import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { reduxForm, change, reset } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import { toastr } from 'react-redux-toastr';
import { submitEmail, fetchEmails } from '../actions';
import { selectSubmittingEmail, selectEmails } from '../selectors';
import { selectValues, selectSyncErrors } from '../../../common/selectors/form.selector';
import { selectCurrentUser } from '../../../containers/App/selectors';

import EmailSectionList from '../../../components/EmailSectionList/index';
import EmailSectionSendForm from '../../../components/EmailSectionSendForm/index';
import formValidator from '../../../components/EmailSectionSendForm/validator';

const formName = 'PatientDetailModal.Email';

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
  formValues: selectValues(formName),
  formSyncErrors: selectSyncErrors(formName),
  submittingEmail: selectSubmittingEmail(),
  emails: selectEmails(),
});

const mapDispatchToProps = (dispatch) => ({
  change: (field, value) => dispatch(change(formName, field, value)),
  fetchEmails: (studyId, patientId) => dispatch(fetchEmails(studyId, patientId)),
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
    fetchEmails: React.PropTypes.func.isRequired,
    emails: React.PropTypes.object,
    clearForm: React.PropTypes.func.isRequired,
    submittingEmail: React.PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.submitEmailBlast = this.submitEmailBlast.bind(this);
    this.switchCompose = this.switchCompose.bind(this);

    this.state = {
      compose: false,
      noEmailsFetched: false,
    };
  }

  componentWillReceiveProps(newProps) {
    const { clearForm, fetchEmails, studyId, currentPatient } = this.props;
    if (this.props.submittingEmail !== newProps.submittingEmail && !newProps.submittingEmail) {
      clearForm();
      this.switchCompose();
    }
    if (newProps.active && !this.props.active) {
      if (currentPatient.id) {
        this.switchCompose(false);
        this.setState({ noEmailsFetched: false });
        fetchEmails(studyId, currentPatient.id);
      }
    }
    if (this.props.emails.fetching && !newProps.emails.fetching && newProps.emails.details.length === 0) {
      this.switchCompose(true);
      this.setState({ noEmailsFetched: true });
    }
  }

  submitEmailBlast(event) {
    event.preventDefault();
    const { submitEmail, studyId, currentPatient, currentUser, formSyncErrors, formValues } = this.props;
    if (_.isEmpty(formSyncErrors) && currentPatient.email) {
      submitEmail(studyId, currentPatient.id, currentUser, formValues.email, formValues.message, formValues.subject);
    } else if (!currentPatient.email) {
      toastr.error('', 'Error! Patient email field is empty.');
    } else if (formSyncErrors.email) {
      toastr.error('', formSyncErrors.email);
    } else if (formSyncErrors.subject) {
      toastr.error('', formSyncErrors.subject);
    } else if (formSyncErrors.message) {
      toastr.error('', formSyncErrors.message);
    }
  }

  switchCompose(value = null) {
    if (typeof value === 'boolean') {
      this.setState({ compose: value });
    } else {
      this.setState({ compose: !this.state.compose });
    }
  }

  render() {
    const { active, change, emails } = this.props;
    const { compose, noEmailsFetched } = this.state;
    return (
      <div className={`item emails-info ${active ? 'active' : ''}`}>
        {(!compose) &&
        <EmailSectionList
          switchCompose={this.switchCompose}
          emails={emails}
        />
        }

        {compose &&
        <EmailSectionSendForm
          submitEmailBlast={this.submitEmailBlast}
          switchCompose={this.switchCompose}
          change={change}
          noBackBtn={noEmailsFetched}
        />
        }
      </div>
    );
  }
}

export default EmailSection;
