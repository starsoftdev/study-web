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
import { fetchStudyMediaTypes, deleteStudyMediaType, editStudyMediaTypes } from '../../containers/AdminStudyEdit/actions';
import { fetchMessagingNumbers } from '../../containers/App/actions';

const formName = 'MediaTrackingForm';

@reduxForm({
  form: formName,
  validate: formValidator,
})

export class MediaTrackingEdit extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    study: PropTypes.object,
    formValues: PropTypes.object,
    mediaTrackingFormError: PropTypes.bool,
    mediaTrackingFields: PropTypes.array,
    messagingNumbers: PropTypes.object,
    resetForm: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
    fetchMessagingNumbers: PropTypes.func.isRequired,
    fetchStudyMediaTypes: PropTypes.func,
    editStudyMediaTypes: PropTypes.func,
    deleteStudyMediaType: PropTypes.func.isRequired,
    editMediaTypesProcess: PropTypes.object,
    touchMediaTracking: PropTypes.func.isRequired,
  };

  constructor() {
    super();

    this.submitMediaTrackingForm = this.submitMediaTrackingForm.bind(this);
  }

  componentWillMount() {
    const { study, fetchMessagingNumbers, fetchStudyMediaTypes, change } = this.props;
    if (study.id) {
      fetchMessagingNumbers();
      fetchStudyMediaTypes(study.id);
      change('mediaTracking', this.props.study.mediaTracking);
    }
  }

  componentWillUnmount() {
    this.props.resetForm();
  }

  submitMediaTrackingForm(e) {
    const { mediaTrackingFormError, touchMediaTracking, mediaTrackingFields, study, formValues, editStudyMediaTypes } = this.props;
    e.preventDefault();

    if (mediaTrackingFormError) {
      touchMediaTracking(mediaTrackingFields);
      return;
    }

    // transform the Google URL submission to append http:// in front of it in case it isn't specified
    if (formValues.mediaType && formValues.mediaType.length > 0) {
      for (const mediaType of formValues.mediaType) {
        if (mediaType.googleUrl && !/http(s)?:\/\//g.test(mediaType.googleUrl)) {
          mediaType.googleUrl = `http://${mediaType.googleUrl}`;
        }
      }
    }

    editStudyMediaTypes(study.id, formValues.mediaType, formValues.mediaTracking || false);
  }

  render() {
    const { messagingNumbers, formValues, study, editMediaTypesProcess, deleteStudyMediaType } = this.props;
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
                deleteMediaType={deleteStudyMediaType}
                landingPageUrl={landingPageUrl}
                studyId={study.id}
              />
            </div>
            <div className="field-row text-right">
              <Button type="submit" bsStyle="primary" className="fixed-small-btn">
                {editMediaTypesProcess.saving
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
    deleteStudyMediaType: (studyId, studySourceId, index) => dispatch(deleteStudyMediaType(studyId, studySourceId, index)),
    fetchStudyMediaTypes: (studyId) => dispatch(fetchStudyMediaTypes(studyId)),
    resetForm: () => dispatch(reset(formName)),
    touchMediaTracking: (fields) => dispatch(touch(formName, ...fields)),
    fetchMessagingNumbers: () => dispatch(fetchMessagingNumbers()),
    editStudyMediaTypes: (studyId, mediaTypes, mediaTracking) => dispatch(editStudyMediaTypes(studyId, mediaTypes, mediaTracking)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MediaTrackingEdit);
