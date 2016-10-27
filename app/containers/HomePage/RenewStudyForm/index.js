import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';
import { map } from 'lodash';
import moment from 'moment';

import Input from 'components/Input';
import ReactSelect from 'components/Input/ReactSelect';
import DatePicker from 'components/Input/DatePicker';
import Toggle from 'components/Input/Toggle';
import { selectRenewStudyFormError,
  selectRenewStudyFormExposureLevelValue,
  selectRenewStudyFormCampaignLengthValue,
  selectRenewStudyFormPatientMessagingSuiteValue,
  selectRenewStudyFormCallTrackingValue,
  selectRenewStudyFormStartDateValue,
  selectRenewStudyFormNotesValue,
} from './selectors';
import formValidator from './validator';
import LoadingSpinner from 'components/LoadingSpinner';
import './styles.less';

const mapStateToProps = createStructuredSelector({
  exposureLevel: selectRenewStudyFormExposureLevelValue(),
  campaignLength: selectRenewStudyFormCampaignLengthValue(),
  patientMessagingSuite: selectRenewStudyFormPatientMessagingSuiteValue(),
  callTracking: selectRenewStudyFormCallTrackingValue(),
  startDate: selectRenewStudyFormStartDateValue(),
  notes: selectRenewStudyFormNotesValue(),
  hasError: selectRenewStudyFormError(),
});

@reduxForm({ form: 'renewStudy', validate: formValidator })
@connect(mapStateToProps, null)

class RenewStudyForm extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    exposureLevel: PropTypes.number,
    campaignLength: PropTypes.number,
    patientMessagingSuite: PropTypes.bool,
    callTracking: PropTypes.bool,
    startDate: PropTypes.string,
    notes: PropTypes.string,
    hasError: PropTypes.bool,
    handleSubmit: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.onValueChange = this.onValueChange.bind(this);
  }

  onValueChange() {
    const { exposureLevel, campaignLength, patientMessagingSuite,
      callTracking, startDate, notes, hasError, handleSubmit } = this.props;
    const requestValues = {
      exposureLevel,
      campaignLength,
      patientMessagingSuite,
      callTracking,
      startDate,
      notes,
    };

    if (hasError) {
      return;
    }

    handleSubmit(requestValues);
  }

  render() {
    const exposureLevelOptions = [];
    const campaignLengthOptions = [];

    return (
      <form className="form-renew-study">
        <div className="renew-study">
          <div className="row form-group">
            <strong className="required col-sm-5">
              <label>EXPOSURE LEVEL</label>
            </strong>
            <div className="field col-sm-7">
              <Field
                name="exposureLevel"
                component={ReactSelect}
                placeholder="Select..."
                options={exposureLevelOptions}
                onChange={this.onValueChange}
              />
            </div>
          </div>
          <div className="row form-group">
            <strong className="required col-sm-5">
              <label>CAMPAIGN LENGTH</label>
            </strong>
            <div className="field col-sm-7">
              <Field
                name="campaignLength"
                component={ReactSelect}
                placeholder="Select..."
                options={campaignLengthOptions}
                onChange={this.onValueChange}
              />
            </div>
          </div>
          <div className="row form-group">
            <strong className="col-sm-5">
              <label>PATIENT MESSAGING SUITE: $247</label>
            </strong>
            <div className="field col-sm-7">
              <Field
                name="patientMessagingSuite"
                component={Toggle}
                onChange={this.onValueChange}
              />
            </div>
          </div>
          <div className="row form-group">
            <strong className="col-sm-5">
              <label>CALL TRACKING: $247</label>
            </strong>
            <div className="field col-sm-7">
              <Field
                name="callTracking"
                component={Toggle}
                onChange={this.onValueChange}
              />
            </div>
          </div>
          <div className="row form-group">
            <strong className="required col-sm-5">
              <label>START DATE</label>
            </strong>
            <div className="field col-sm-7">
              <Field
                name="startDate"
                component={DatePicker}
                className="form-control datepicker-input"
                onChange={this.onValueChange}
                initialDate={moment(new Date())}
              />
            </div>
          </div>
          <div className="row form-group">
            <strong className="col-sm-5">
              <label>NOTES</label>
            </strong>
            <div className="field col-sm-7">
              <Field
                name="notes"
                component={Input}
                componentClass="textarea"
                onChange={this.onValueChange}
              />
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default RenewStudyForm;
