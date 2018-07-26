import React, { Component, PropTypes } from 'react';
import { Field, reduxForm, reset, change, blur } from 'redux-form';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import Input from '../../../common/components/Input';
import LoadingSpinner from '../LoadingSpinner';
import formValidator from './validator';

import { updateFacebookLandingPage, fetchLanding } from '../../containers/AdminStudyEdit/actions';
import { selectSyncErrorBool, selectValues } from '../../common/selectors/form.selector';
import { selectLanding, selectFacebookLandingPageUpdateProcess } from '../../containers/AdminStudyEdit/selectors';
import { selectCurrentUser } from '../../containers/App/selectors';

const formName = 'adminLeadGenForm';

@reduxForm({
  form: formName,
  validate: formValidator,
})
export class LeadGenEdit extends Component { // eslint-disable-line react/prefer-stateless-func
  static propTypes = {
    currentUser: React.PropTypes.any,
    submitForm: React.PropTypes.func.isRequired,
    fetchLanding:  React.PropTypes.func.isRequired,
    change: React.PropTypes.func.isRequired,
    blur: React.PropTypes.func.isRequired,
    resetForm: React.PropTypes.func.isRequired,
    formError: React.PropTypes.bool.isRequired,
    studyId: PropTypes.any,
    newList: React.PropTypes.any,
    landing: React.PropTypes.object,
    updateFacebookLandingPageProcess: React.PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      initialValuesEntered: false,
    };
  }

  componentWillMount() {
    const { studyId, fetchLanding } = this.props;

    if (studyId) {
      fetchLanding(studyId);
    }
  }

  componentWillReceiveProps(newProps) {
    const { change } = this.props;

    if (newProps.landing && newProps.landing.details) {
      const landing = newProps.landing.details;

      if (!this.state.initialValuesEntered) {
        this.setState({
          initialValuesEntered: true,
        }, () => {
          change('facebookPageId', landing.facebookLandingForm ? landing.facebookLandingForm.facebookPage.facebookPageId : '');
          change('facebookPageToken', landing.facebookLandingForm ? landing.facebookLandingForm.facebookPage.facebookPageToken : '');
          change('facebookFormName', landing.facebookLandingForm ? landing.facebookLandingForm.facebookFormName : '');
          change('facebookFormId', landing.facebookLandingForm ? landing.facebookLandingForm.id : null);
          change('facebookPageInnerId', landing.facebookLandingForm ? landing.facebookLandingForm.facebookPage.id : null);
        });
      }
    }
  }

  componentWillUnmount() {
    const { resetForm } = this.props;
    resetForm();
  }

  handleSubmit(ev) {
    ev.preventDefault();
    const { formError, newList, submitForm, studyId, currentUser } = this.props;
    if (formError) {
      return;
    }

    if (studyId) {
      const list = Object.assign({ studyId, userId: currentUser.id }, newList);
      submitForm(list);
    }
  }

  render() {
    return (
      <div id="leadGenEdit">
        <Form onSubmit={this.handleSubmit}>
          <div className="field-row">
            <strong className="label required">
              <label htmlFor="facebook-url">FACEBOOK PAGE ID</label>
            </strong>
            <div className="field">
              <Field
                id="facebook-url"
                type="text"
                name="facebookPageId"
                component={Input}
              />
            </div>
          </div>
          <div className="field-row">
            <strong className="label required">
              <label htmlFor="facebook-url">FACEBOOK TOKEN</label>
            </strong>
            <div className="field">
              <Field
                id="facebook-url"
                type="text"
                name="facebookPageToken"
                component={Input}
              />
            </div>
          </div>
          <div className="field-row">
            <strong className="label required">
              <label htmlFor="facebook-url">FACEBOOK FORM NAME</label>
            </strong>
            <div className="field">
              <Field
                id="facebook-url"
                type="text"
                name="facebookFormName"
                component={Input}
              />
            </div>
          </div>


          <div className="field-row text-right">
            <Button type="submit" bsStyle="primary" className="fixed-small-btn">
              {this.props.updateFacebookLandingPageProcess.saving
                ? <span><LoadingSpinner showOnlyIcon size={20} className="saving-user" /></span>
                : <span>Update</span>
              }
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    change: (name, value) => dispatch(change(formName, name, value)),
    blur: (field, value) => dispatch(blur(formName, field, value)),
    submitForm: (values) => dispatch(updateFacebookLandingPage(values)),
    fetchLanding: (studyId) => dispatch(fetchLanding(studyId)),
    resetForm: () => dispatch(reset(formName)),
  };
}

const mapStateToProps = createStructuredSelector({
  formError: selectSyncErrorBool(formName),
  newList: selectValues(formName),
  landing: selectLanding(),
  updateFacebookLandingPageProcess: selectFacebookLandingPageUpdateProcess(),
  currentUser: selectCurrentUser(),
});

export default connect(mapStateToProps, mapDispatchToProps)(LeadGenEdit);
