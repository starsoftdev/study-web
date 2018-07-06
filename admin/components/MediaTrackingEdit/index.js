import React, { Component, PropTypes } from 'react';
import { Field, reduxForm, FieldArray, change, reset, touch } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/lib/Form';
import Button from 'react-bootstrap/lib/Button';

import Toggle from '../Input/Toggle';
import LoadingSpinner from '../LoadingSpinner';
import formValidator from './validator';
import RenderLeads from '../RenderLeads';
import { selectValues, selectSyncErrorBool, selectFormFieldNames } from '../../common/selectors/form.selector';
import { selectMessagingNumbers } from '../../containers/App/selectors';
import { selectEditMediaTypesProcess } from '../../containers/AdminStudyEdit/selectors';
import { deleteMediaType, editMediaTypes } from '../../containers/AdminStudyEdit/actions';
import { fetchMediaTypes, fetchMessagingNumbers } from '../../containers/App/actions';

const formName = 'MediaTrackingForm';

@reduxForm({
  form: formName,
  validate: formValidator,
})

export class MediaTrackingEdit extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    studyId: PropTypes.any,
    study: PropTypes.object,
    editMediaTypesProcess: PropTypes.object,
    formValues: PropTypes.object,
    mediaTrackingFormError: PropTypes.bool,
    mediaTrackingFields: PropTypes.array,
    messagingNumbers: PropTypes.object,
    fetchMediaTypes: PropTypes.func,
  };

  constructor() {
    super();

    this.submitMediaTrackingForm = this.submitMediaTrackingForm.bind(this);
  }

  submitMediaTrackingForm() {
    console.log('submitting form');
  }

  render() {
    const saving = false;
    const { studyId, messagingNumbers, formValues, study } = this.props;
    const landingPageUrl = study ? study.landingPageUrl : '';

    return (
      <div id="MediaTrackingEdit">
        <Form
          className="holder landing-holder"
          onSubmit={this.submitMediaTrackingForm}
          noValidate="novalidate"
        >
          <div className="frame">
            <div className="field-row">
              <strong className="label">
                <label>MEDIA TRACKING</label>
              </strong>
              <div className="field">
                <Field
                  name="mediaTracking"
                  component={Toggle}
                />
              </div>
            </div>
            <div className="field-row">
              <FieldArray
                name="mediaType"
                component={RenderLeads}
                isAdmin
                formValues={formValues}
                messagingNumbers={messagingNumbers}
                deleteMediaType={deleteMediaType}
                landingPageUrl={landingPageUrl}
                studyId={studyId}
              />
            </div>
            <div className="field-row text-right">
              <Button type="submit" bsStyle="primary" className="fixed-small-btn">
                {saving
                  ? <span><LoadingSpinner showOnlyIcon size={20} className="saving-user" /></span>
                  : <span>Update</span>
                }
              </Button>
            </div>
          </div>
        </Form>
      </div>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  editMediaTypesProcess: selectEditMediaTypesProcess(),
  formValues: selectValues(formName),
  mediaTrackingFormError: selectSyncErrorBool(formName),
  mediaTrackingFields: selectFormFieldNames(formName),
  messagingNumbers: selectMessagingNumbers(),
});

const mapDispatchToProps = (dispatch) => {
  return {
    change: (name, value) => dispatch(change(formName, name, value)),
    deleteMediaType: (studyId, studySourceId, index) => dispatch(deleteMediaType(studyId, studySourceId, index)),
    fetchMediaTypes: (studyId) => dispatch(fetchMediaTypes(studyId)),
    resetForm: () => dispatch(reset(formName)),
    touchMediaTracking: (fields) => dispatch(touch(formName, ...fields)),
    fetchMessagingNumbers: () => dispatch(fetchMessagingNumbers()),
    editMediaTypes: (studyId, mediaTypes, mediaTracking) => dispatch(editMediaTypes(studyId, mediaTypes, mediaTracking)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MediaTrackingEdit);
