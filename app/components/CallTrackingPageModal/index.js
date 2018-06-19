/**
 * Created by Younes on 13/07/16.
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Form from 'react-bootstrap/lib/Form';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm, change, FieldArray, touch, reset } from 'redux-form';
import Collapse from 'react-bootstrap/lib/Collapse';
import Button from 'react-bootstrap/lib/Button';

import Toggle from '../../components/Input/Toggle';
import LoadingSpinner from '../LoadingSpinner';
import { selectValues, selectSyncErrorBool, selectFormFieldNames } from '../../common/selectors/form.selector';
import {
  selectMessagingNumbers,
  selectEditMediaTypesProcess,
} from '../../containers/HomePage/AdminDashboard/selectors';
import { fetchMediaTypes } from '../../containers/App/actions';
import RenderLeads from '../../components/RenderLeads';
import formValidator from './validator';
import { fetchMessagingNumbersDashboard, editMediaTypes } from '../../containers/HomePage/AdminDashboard/actions';
import { deleteMediaType } from '../../components/CallTrackingPageModal/actions';

const formName = 'MediaTrackingForm';


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
    touchCallTracking: (fields) => dispatch(touch(formName, ...fields)),
    fetchMessagingNumbersDashboard: () => dispatch(fetchMessagingNumbersDashboard()),
    editMediaTypes: (studyId, mediaTypes, mediaTracking) => dispatch(editMediaTypes(studyId, mediaTypes, mediaTracking)),
  };
};

@reduxForm({
  form: formName,
  validate: formValidator,
})
@connect(mapStateToProps, mapDispatchToProps)
export default class MediaTrackingModal extends React.Component {
  static propTypes = {
    deleteMediaType: PropTypes.func.isRequired,
    study: PropTypes.object,
    fetchMediaTypes: PropTypes.func,
    editMediaTypesProcess: PropTypes.object,
    resetForm: PropTypes.func,
    formValues: PropTypes.object,
    onClose: PropTypes.func.isRequired,
    openModal: PropTypes.bool.isRequired,
    change: PropTypes.func.isRequired,
    mediaTrackingFormError: PropTypes.bool,
    touchCallTracking: PropTypes.func,
    fetchMessagingNumbersDashboard: PropTypes.func.isRequired,
    mediaTrackingFields: PropTypes.array,
    messagingNumbers: PropTypes.object,
    editMediaTypes: PropTypes.func,
    isOnTop: PropTypes.bool,
    array: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      isMediaTypesFetched: false,
      isNumbersFetched: false,
    };

    this.submitCallTrackingForm = this.submitCallTrackingForm.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.openModal && !this.props.openModal && this.props.study.study_id) {
      this.props.fetchMessagingNumbersDashboard();
      this.props.fetchMediaTypes(this.props.study.study_id);
      this.props.change('mediaTracking', this.props.study.mediaTracking);
    }

    if (this.props.messagingNumbers.fetching && !newProps.messagingNumbers.fetching) {
      this.setState({ isNumbersFetched: true });
    }
  }

  onClose() {
    const { onClose, resetForm } = this.props;
    onClose();
    resetForm();
  }

  submitCallTrackingForm(e) {
    const { mediaTrackingFormError, touchCallTracking, mediaTrackingFields, study, formValues } = this.props;
    e.preventDefault();

    if (mediaTrackingFormError) {
      touchCallTracking(mediaTrackingFields);
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

    this.props.editMediaTypes(study.study_id, formValues.mediaType, formValues.mediaTracking);
  }

  render() {
    const { editMediaTypesProcess, deleteMediaType, openModal, messagingNumbers, study } = this.props;
    const landingPageUrl = study ? study.landingPageUrl : '';
    const studyId = study ? study.study_id : null;

    return (
      <Collapse
        dimension="width"
        in={openModal}
        timeout={250}
        className={classNames('landing-slider', (this.props.isOnTop > 0 ? 'slider-on-top' : ''))}
      >
        <div>
          <div className="slider-area">
            <div className="head">
              <div className="inner-head">
                <strong className="title">Media Tracking</strong>
                <a className="btn-right-arrow" onClick={this.onClose}><i className="glyphicon glyphicon-menu-right" /></a>
              </div>
            </div>
            <Form
              className="holder landing-holder"
              onSubmit={this.submitCallTrackingForm}
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
                    formValues={this.props.formValues}
                    messagingNumbers={messagingNumbers}
                    deleteMediaType={deleteMediaType}
                    landingPageUrl={landingPageUrl}
                    studyId={studyId}
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
        </div>
      </Collapse>
    );
  }
}
