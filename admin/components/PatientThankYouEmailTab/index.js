import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Field, reduxForm, change } from 'redux-form';
import Button from 'react-bootstrap/lib/Button';
import Input from '../../../common/components/Input/index';
import LoadingSpinner from '../LoadingSpinner';
import { selectLanding, selectUpdatePatientThankYouEmailProcess } from '../../containers/AdminStudyEdit/selectors';
import formValidator from './validator';

const formName = 'patientEmailBlockForm';

@reduxForm({
  form: formName,
  validate: formValidator,
})

export class PatientThankYouEmailTab extends Component {
  static propTypes = {
    handleSubmit: React.PropTypes.func.isRequired,
    change: React.PropTypes.func.isRequired,
    landing: React.PropTypes.object,
    updatePatientThankYouEmailProcess: React.PropTypes.any,
  };

  componentWillReceiveProps(newProps) {
    const { change } = this.props;

    if (this.props.landing.fetching && !newProps.landing.fetching) {
      if (newProps.landing.details.thankYouPage) {
        change('thankYouEmailBlock', newProps.landing.details.thankYouPage.thankYouEmailBlock);
        change('thankYouEmailSubject', newProps.landing.details.thankYouPage.thankYouEmailSubject);
      }
    }
  }

  render() {
    return (
      <div className="patient-thankyou-slider">
        <div className="slider-area">
          <form
            className="holder email-block-form"
            onSubmit={this.props.handleSubmit}
            noValidate="novalidate"
          >
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
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  landing: selectLanding(),
  updatePatientThankYouEmailProcess: selectUpdatePatientThankYouEmailProcess(),
});

function mapDispatchToProps(dispatch) {
  return {
    change: (name, value) => dispatch(change(formName, name, value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientThankYouEmailTab);
