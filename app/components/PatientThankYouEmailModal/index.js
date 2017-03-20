/**
 * Created by mike on 10/11/16.
 */

import React from 'react';
import { createStructuredSelector } from 'reselect';
import Collapse from 'react-bootstrap/lib/Collapse';
import Input from '../Input/index';
import { connect } from 'react-redux';
import { Field, reduxForm, reset, touch, change } from 'redux-form';
import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import { selectSyncErrorBool, selectValues } from '../../common/selectors/form.selector';
import { updatePatientThankYouEmail, resetPatientThankYouEmailState } from '../../containers/HomePage/AdminDashboard/actions';
import { selectUpdatePatientThankYouEmailProcess } from '../../containers/HomePage/AdminDashboard/selectors';
import { fetchLanding } from '../../containers/App/actions';
import { selectLanding } from '../../containers/App/selectors';

import formValidator, { fields } from './validator';
import './styles.less';

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
    dispatch: React.PropTypes.func.isRequired,
    resetForm: React.PropTypes.func.isRequired,
    resetState: React.PropTypes.func.isRequired,
    formError: React.PropTypes.bool.isRequired,
    studies: React.PropTypes.any,
    newList: React.PropTypes.any,
    landing: React.PropTypes.object,
    updatePatientThankYouEmailProcess: React.PropTypes.any,
    touchFields: React.PropTypes.func.isRequired,
    onClose: React.PropTypes.func.isRequired,
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
    // console.log('componentWillReceiveProps', newProps, this.state);
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
        let landing = null;
        let thankYouPage = null;
        let study = null;

        if (this.props.landing) {
          study = this.props.landing;

          for (const studySource of study.studySources) {
            if (studySource.landingPage) {
              landing = studySource.landingPage;
              thankYouPage = landing.thankYouPage;
            }
          }
        }

        if (!this.state.initialValuesEntered) {
          this.props.dispatch(change(formName, 'thankYouEmailBlock', thankYouPage.thankYouEmailBlock));
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
      fetchLanding(this.state.selected.study_id);
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
    /* const initText =
      'Hi Oliver Queen, Thanks for signing up for this research study! ' +
      'Please call (226) 646-2764 to schedule your appointment today and tell them Studykik sent you! ' +
      'Healthcare will be changed globally by your participation.  ' +
      'Thank you, StudyKIK';*/

    const { openModal, onClose } = this.props;
    return (
      <Collapse dimension="width" in={openModal} timeout={250} className="patient-thankyou-slider">
        <div>
          <div className="slider-area">
            <div className="head">
              <div className="inner-head">
                <strong className="title">Patient Thank You Email</strong>
                <a href="#" className="btn-right-arrow" onClick={onClose}><i className="glyphicon glyphicon-menu-right"></i></a>
              </div>
            </div>
            <Form
              className="holder email-block-form"
              onSubmit={this.handleSubmit}
              noValidate="novalidate"
            >
              <div className="frame">
                <Field
                  type="text"
                  name="thankYouEmailBlock"
                  component={Input}
                  componentClass="textarea"
                  className="field-row"
                  bsClass="form-control thx-msg"
                />
                <div className="field-row text-right">
                  <Button bsStyle="primary" type="submit" disabled={false}>Submit</Button>
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
    submitForm: (values) => dispatch(updatePatientThankYouEmail(values)),
    resetState: () => dispatch(resetPatientThankYouEmailState()),
    fetchLanding: (studyId) => dispatch(fetchLanding(studyId)),
    resetForm: () => dispatch(reset(formName)),
    touchFields: () => dispatch(touch(formName, ...fields)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientThankYouEmailModal);
