/**
 * Created by mike on 10/18/16.
 */

import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Field, reduxForm, change, reset } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import { toastr } from 'react-redux-toastr';
import Form from 'react-bootstrap/lib/Form';

import Input from '../../../components/Input/index';
import { submitEmail } from '../actions';
import { selectSubmittingEmail } from '../selectors';
import { selectValues, selectSyncErrors } from '../../../common/selectors/form.selector';
import { selectCurrentUser } from '../../../containers/App/selectors';
import formValidator from './emailValidator';

const formName = 'PatientDetailModal.Email';

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

    this.state = {};
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
    if (_.isEmpty(formSyncErrors)) {
      submitEmail(studyId, currentPatient.id, currentUser, formValues.email, formValues.message, formValues.subject);
    } else if (formSyncErrors.message) {
      toastr.error('', formSyncErrors.message);
    } else if (formSyncErrors.email) {
      toastr.error('', formSyncErrors.email);
    } else if (formSyncErrors.subject) {
      toastr.error('', formSyncErrors.subject);
    }
  }

  render() {
    const { active } = this.props;
    return (
      <Form onSubmit={this.submitEmailBlast} className={classNames('item emails-info', { active })}>
        <div className="emails-info-holder">
          <Field
            name="email"
            component={Input}
            bsClass="form-control sender"
            type="text"
            placeholder="Enter your email address"
          />
          <Field
            name="subject"
            component={Input}
            bsClass="form-control subject"
            type="text"
            placeholder="Subject"
          />
          <Field
            name="message"
            component={Input}
            componentClass="textarea"
            className="message-box"
            bsClass="form-control"
            placeholder="Type message..."
          />
        </div>
        <div className="textarea">
          {/* <a href="#" className="btn btn-gray-outline pull-left">back</a>*/}
          <input type="submit" value="Send" className="btn btn-default pull-right" />
        </div>
      </Form>
    );
  }
}

export default EmailSection;
