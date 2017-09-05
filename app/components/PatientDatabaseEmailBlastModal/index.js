/**
 * Created by mike on 10/6/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import { change, Field, reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import classNames from 'classnames';
import { toastr } from 'react-redux-toastr';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import Modal from 'react-bootstrap/lib/Modal';
import formValidator from './validator';
import CenteredModal from '../CenteredModal/index';
import Input from '../Input/index';
import { removePatientsFromTextBlast, submitEmailBlast } from '../../containers/PatientDatabasePage/actions';
// import { submitEmailBlast } from '../../containers/StudyPage/actions';
import { selectValues, selectSyncErrors } from '../../common/selectors/form.selector';
import { selectCurrentUser } from '../../containers/App/selectors';
import { selectPatients, selectTotalPatients } from '../../containers/PatientDatabasePage/selectors';

const formName = 'PatientDatabase.TextBlastModal';

@reduxForm({
  form: formName,
  validate: formValidator,
})
class PatientDatabaseEmailBlastModal extends React.Component {
  static propTypes = {
    bsClass: React.PropTypes.string,
    className: React.PropTypes.any,
    change: React.PropTypes.func.isRequired,
    currentUser: React.PropTypes.object,
    dialogClassName: React.PropTypes.string,
    formValues: React.PropTypes.object,
    formSyncErrors: React.PropTypes.object,
    onClose: React.PropTypes.func.isRequired,
    onHide: React.PropTypes.func.isRequired,
    removePatients: React.PropTypes.func.isRequired,
    role: React.PropTypes.string,
    show: React.PropTypes.bool.isRequired,
    style: React.PropTypes.object,
    submitEmailBlast: React.PropTypes.func.isRequired,
    patients: React.PropTypes.object,
    totalPatients: React.PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.submitTextBlast = this.submitTextBlast.bind(this);
    this.renderPatientCount = this.renderPatientCount.bind(this);
    this.textAreaChange = this.textAreaChange.bind(this);
    this.onHide = this.onHide.bind(this);
    this.onClose = this.onClose.bind(this);
    this.state = {
      enteredCharactersLength: 0,
      total: 0,
    };
  }

  componentWillReceiveProps(newProps) {
    const { formValues, patients, totalPatients } = newProps;

    let total = 0;
    if (patients.total === null) {
      total = totalPatients;
    } else if (!formValues.selectAllUncheckedManually && formValues.patients && formValues.patients.length > 0) {
      total = patients.total - ((formValues.uncheckedPatients && formValues.uncheckedPatients.length > 0) ? formValues.uncheckedPatients.length : 0);
    } else if ((formValues.patients && formValues.patients.length > 0) || (formValues.patients && formValues.patients.length === 0 && formValues.uncheckedPatients.length > 0)) {
      total = formValues.patients.length;
    }

    this.setState({ total });
  }

  onHide() {
    const { onHide } = this.props;
    onHide();
  }

  onClose() {
    const { change, onClose } = this.props;
    // clear message value after the form is submitted and is successful
    onClose();
    change('email', '');
    change('subject', '');
    change('message', '');
  }

  submitTextBlast(event) {
    event.preventDefault();
    const { formSyncErrors, formValues, submitEmailBlast, currentUser } = this.props;
    if (!formSyncErrors.message && !formSyncErrors.patients) {
      submitEmailBlast(formValues.queryParams.filter, formValues.uncheckedPatients, formValues.message, formValues.email, formValues.subject, currentUser.roleForClient.id, this.onClose);
    } else if (formSyncErrors.message) {
      toastr.error('', formSyncErrors.message);
    } else if (formSyncErrors.patients) {
      toastr.error('', formSyncErrors.patients);
    } else if (formSyncErrors.from) {
      toastr.error('', formSyncErrors.from);
    } else if (formSyncErrors.subject) {
      toastr.error('', formSyncErrors.subject);
    }
  }

  textAreaChange() {
    setTimeout(() => {
      const textarea = this.textarea;
      const value = textarea.value;
      this.setState({ enteredCharactersLength: value ? value.length : 0 }, () => {
      });
    }, 0);
  }

  renderPatientCount() {
    const { formValues } = this.props;
    if (formValues.patients && formValues.patients.length > 0) {
      return (
        <span className="emails-counter">
          <span className="counter">{this.state.total}</span>
          <span className="text"> Patients</span>
        </span>
      );
    }
    return null;
  }

  render() {
    const { show, className } = this.props;
    const { enteredCharactersLength } = this.state;
    const disabled = enteredCharactersLength === 0;

    return (
      <Modal
        show={show}
        className={classNames('patient-database-text-blast', className)}
        id="text-blast-popup"
        dialogComponentClass={CenteredModal}
        onHide={this.onHide}
        backdrop
        keyboard
      >
        <Modal.Header>
          <Modal.Title>
            <strong className="title">Email Blast</strong>
          </Modal.Title>
          <a className="close" onClick={this.onHide}>
            <i className="icomoon-icon_close" />
          </a>
        </Modal.Header>
        <Modal.Body>
          <Form className="text-email-blast-form no-sidebar user-active">
            <div className="form-holder">
              <div className="scroll-holder">
                <div className="sub-holder">
                  <div className="subject-field">
                    <FormControl type="text" className="recievers" placeholder="To" disabled />
                    {this.renderPatientCount()}
                  </div>
                  <Field
                    name="email"
                    component={Input}
                    className="sender-field"
                    type="text"
                    placeholder="Type email address..."
                    required
                    ref={(from) => {
                      this.from = from;
                    }}
                  />
                  <Field
                    name="subject"
                    component={Input}
                    className="subject-field"
                    type="text"
                    placeholder="Type subject..."
                    required
                    ref={(subject) => {
                      this.subject = subject;
                    }}
                  />
                  <Field
                    name="message"
                    component={Input}
                    componentClass="textarea"
                    className="email-message"
                    placeholder="Type a message..."
                    maxLength="160"
                    required
                    onChange={this.textAreaChange}
                    ref={(textarea) => {
                      this.textarea = textarea;
                    }}
                  />
                  <div className="footer">
                    <div
                      className="btn btn-default lightbox-opener pull-right"
                      onClick={(e) => (disabled ? null : this.submitTextBlast(e))}
                      disabled={disabled === 0}
                    >
                      Send
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  patients: selectPatients(),
  formValues: selectValues(formName),
  formSyncErrors: selectSyncErrors(formName),
  currentUser: selectCurrentUser(),
  totalPatients: selectTotalPatients(),
});

function mapDispatchToProps(dispatch) {
  return {
    change: (field, value) => dispatch(change(formName, field, value)),
    removePatients: () => dispatch(removePatientsFromTextBlast()),
    submitEmailBlast: (patients, uncheckedPatients, message, from, subject, clientRoleId, onClose) => dispatch(submitEmailBlast(patients, uncheckedPatients, message, from, subject, clientRoleId, onClose)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientDatabaseEmailBlastModal);
