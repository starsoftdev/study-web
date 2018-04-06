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
    this.onHide = this.onHide.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      selected: null,
      landingFetched: false,
      initialValuesEntered: false,
    };
  }

  componentWillReceiveProps(newProps) {
    const { resetState, onClose, fetchLanding } = this.props;

    if (newProps.studies) {
      for (const study of newProps.studies) {
        if (study.selected) {
          this.setState({
            selected: study,
          });
        }
      }
    }

    if (newProps.landing) {
      this.setState({
        landingFetched: true,
      }, () => {
        const thankYouPage = newProps.landing.thankYouPage;

        if (!this.state.initialValuesEntered && thankYouPage) {
          const { change } = this.props;
          change('thankYouEmailBlock', thankYouPage.thankYouEmailBlock);
          change('thankYouEmailSubject', thankYouPage.thankYouEmailSubject);
          this.setState({
            initialValuesEntered: true,
          });
        }
      });
    }

    if (this.state.selected && newProps.openModal && !this.state.landingFetched) {
      fetchLanding(this.state.selected.study_id);
    }

    if (!newProps.updatePatientThankYouEmailProcess.saving && newProps.updatePatientThankYouEmailProcess.success) {
      resetState();
      onClose();
    }
  }

  onHide() {
    const { onClose, resetForm } = this.props;
    this.setState({
      landingFetched: false,
      initialValuesEntered: false,
    }, () => {
      resetForm();
      onClose();
    });
  }

  handleSubmit(ev) {
    ev.preventDefault();
    const { formError, newList, touchFields, submitForm } = this.props;
    if (formError) {
      touchFields();
      return;
    }

    const list = Object.assign({ studyId: this.state.selected.study_id }, newList);
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
