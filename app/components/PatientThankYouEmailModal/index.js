/**
 * Created by mike on 10/11/16.
 */

import React from 'react';
import { createStructuredSelector } from 'reselect';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Field, reduxForm, reset, touch, change } from 'redux-form';
import Button from 'react-bootstrap/lib/Button';
import Collapse from 'react-bootstrap/lib/Collapse';
import Form from 'react-bootstrap/lib/Form';
import _ from 'lodash';

import Input from '../Input/index';
import LoadingSpinner from '../LoadingSpinner';
import { selectSyncErrorBool, selectValues } from '../../common/selectors/form.selector';
import { updatePatientThankYouEmail, resetPatientThankYouEmailState } from '../../containers/HomePage/AdminDashboard/actions';
import { selectUpdatePatientThankYouEmailProcess } from '../../containers/HomePage/AdminDashboard/selectors';
import { fetchLanding } from '../../containers/App/actions';
import { selectLanding } from '../../containers/App/selectors';
import formValidator, { fields } from './validator';

const formName = 'patientEmailBlockForm';

@reduxForm({
  form: formName,
  validate: formValidator,
})

export class PatientThankYouEmailModal extends React.Component {
  static propTypes = {
    submitForm: React.PropTypes.func.isRequired,
    fetchLanding:  React.PropTypes.func.isRequired,
    openModal: React.PropTypes.bool.isRequired,
    change: React.PropTypes.func.isRequired,
    resetForm: React.PropTypes.func.isRequired,
    resetState: React.PropTypes.func.isRequired,
    formError: React.PropTypes.bool.isRequired,
    studies: React.PropTypes.any,
    newList: React.PropTypes.any,
    landing: React.PropTypes.object,
    updatePatientThankYouEmailProcess: React.PropTypes.any,
    touchFields: React.PropTypes.func.isRequired,
    onClose: React.PropTypes.func.isRequired,
    isOnTop: React.PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      initialValuesEntered: false,
    };
  }

  componentWillMount() {
    const { studies, fetchLanding } = this.props;

    if (studies) {
      const selected = _.find(studies, { selected: true });
      if (selected) {
        fetchLanding(selected.study_id);
      }
    }
  }

  componentWillReceiveProps(newProps) {
    const { resetState, onClose, change } = this.props;

    if (newProps.landing) {
      const thankYouPage = newProps.landing.thankYouPage;

      if (!this.state.initialValuesEntered && thankYouPage) {
        this.setState({
          initialValuesEntered: true,
        }, () => {
          change('thankYouEmailBlock', thankYouPage.thankYouEmailBlock);
          change('thankYouEmailSubject', thankYouPage.thankYouEmailSubject);
        });
      }
    }

    if (!newProps.updatePatientThankYouEmailProcess.saving && newProps.updatePatientThankYouEmailProcess.success) {
      resetState();
      onClose();
    }
  }

  componentWillUnmount() {
    const { onClose, resetForm } = this.props;
    resetForm();
    onClose();
  }

  handleSubmit(ev) {
    ev.preventDefault();
    const { formError, newList, touchFields, submitForm, studies } = this.props;
    const selected = _.find(studies, { selected: true });
    if (formError) {
      touchFields();
      return;
    }

    const list = Object.assign({ studyId: selected.study_id }, newList);
    submitForm(list);
  }

  render() {
    const { openModal, onClose } = this.props;
    return (
      <Collapse dimension="width" in={openModal} timeout={250} className={classNames('patient-thankyou-slider', (this.props.isOnTop > 0 ? 'slider-on-top' : ''))}>
        <div>
          <div className="slider-area">
            <div className="head">
              <div className="inner-head">
                <strong className="title">Patient Thank You Email</strong>
                <a className="btn-right-arrow" onClick={onClose}><i className="glyphicon glyphicon-menu-right" /></a>
              </div>
            </div>
            <Form
              className="holder email-block-form"
              onSubmit={this.handleSubmit}
              noValidate="novalidate"
            >
              <div className="frame">
                <div className="field-row sub">
                  <strong className="label">
                    <label htmlFor="new-patient-phone">Subject</label>
                  </strong>
                  <div className="field">
                    <Field
                      type="text"
                      name="thankYouEmailSubject"
                      component={Input}
                      componentClass="textarea"
                    />
                  </div>
                </div>
                <div className="field-row msg">
                  <strong className="label">
                    <label htmlFor="new-patient-phone">Body</label>
                  </strong>
                  <div className="field">
                    <Field
                      type="text"
                      name="thankYouEmailBlock"
                      component={Input}
                      componentClass="textarea"
                    />
                  </div>
                </div>
                <div className="field-row text-right">
                  <Button type="submit" bsStyle="primary" className="fixed-small-btn">
                    {this.props.updatePatientThankYouEmailProcess.saving
                      ? <span><LoadingSpinner showOnlyIcon size={20} className="saving-user" /></span>
                      : <span>Update</span>
                    }
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </Collapse>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  formError: selectSyncErrorBool(formName),
  newList: selectValues(formName),
  landing: selectLanding(),
  updatePatientThankYouEmailProcess: selectUpdatePatientThankYouEmailProcess(),
});

function mapDispatchToProps(dispatch) {
  return {
    change: (name, value) => dispatch(change(formName, name, value)),
    submitForm: (values) => dispatch(updatePatientThankYouEmail(values)),
    resetState: () => dispatch(resetPatientThankYouEmailState()),
    fetchLanding: (studyId) => dispatch(fetchLanding(studyId)),
    resetForm: () => dispatch(reset(formName)),
    touchFields: () => dispatch(touch(formName, ...fields)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientThankYouEmailModal);
