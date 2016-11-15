import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, FieldArray, reduxForm } from 'redux-form';

import Input from 'components/Input';
import { selectCurrentUserClientId } from 'containers/App/selectors';
import { selectEditStudyFormValues, selectEditStudyFormError } from './selectors';
import { selectEditedStudy } from 'containers/HomePage/selectors';
import RenderEmailsList from './RenderEmailsList';
import formValidator from './validator';
import LoadingSpinner from 'components/LoadingSpinner';
import './styles.less';

const mapStateToProps = createStructuredSelector({
  currentUserClientId: selectCurrentUserClientId(),
  formValues: selectEditStudyFormValues(),
  hasError: selectEditStudyFormError(),
  editedStudy: selectEditedStudy(),
});

@reduxForm({ form: 'editStudy', validate: formValidator })
@connect(mapStateToProps)

class EditStudyForm extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    currentUserClientId: PropTypes.number,
    formValues: PropTypes.object,
    hasError: PropTypes.bool,
    editedStudy: PropTypes.object,
    handleSubmit: PropTypes.func,
  };

  render() {
    const { formValues, hasError, editedStudy, handleSubmit } = this.props;

    return (
      <form className="form-edit-study" onSubmit={handleSubmit}>
        <div className="edit-study">
          <div className="row form-group">
            <strong className="required col-sm-5">
              <label>RECRUITMENT PHONE</label>
            </strong>
            <div className="field col-sm-7">
              <Field
                name="recruitmentPhone"
                component={Input}
                type="text"
              />
            </div>
          </div>
          <div className="row form-group">
            <strong className="required col-sm-5">
              <label>EMAIL NOTIFICATIONS</label>
            </strong>
            <div className="field col-sm-7">
              <div className="emails-list-holder">
                <FieldArray
                  name="emailNotifications"
                  component={RenderEmailsList}
                  formValues={formValues}
                  dispatch={this.props.dispatch}
                />
              </div>
            </div>
          </div>
          <div className="row form-group">
            <strong className="required col-sm-5">
              <label>STUDY AD</label>
            </strong>
            <div className="field col-sm-7">
              <Field
                id="study_file"
                name="studyAd"
                component={Input}
                type="file"
              />
            </div>
          </div>
          <div className="row">
            <div className="field col-sm-12">
              <button type="submit" className="btn btn-default pull-right" disabled={hasError || editedStudy.submitting}>
                {editedStudy.submitting
                  ? <span><LoadingSpinner showOnlyIcon size={20} className="submitting-edit-study" /></span>
                  : <span>Submit</span>
                }
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default EditStudyForm;
