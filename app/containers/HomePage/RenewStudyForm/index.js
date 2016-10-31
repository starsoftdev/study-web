import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm, change } from 'redux-form';
import moment from 'moment';
import { map } from 'lodash';

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
import { selectLevels } from 'containers/App/selectors';
import { CAMPAIGN_LENGTH_LIST } from 'common/constants';
import formValidator from './validator';
import './styles.less';

const mapStateToProps = createStructuredSelector({
  levels: selectLevels(),
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
    dispatch: PropTypes.func.isRequired,
    levels: PropTypes.array,
    exposureLevel: PropTypes.number,
    campaignLength: PropTypes.number,
    patientMessagingSuite: PropTypes.bool,
    callTracking: PropTypes.bool,
    startDate: PropTypes.object,
    notes: PropTypes.string,
    hasError: PropTypes.bool,
    onSubmitValues: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.onExposureLevelChange = this.onExposureLevelChange.bind(this);
    this.onCampaignLengthChange = this.onCampaignLengthChange.bind(this);
    this.onPatientMessagingSuiteChange = this.onPatientMessagingSuiteChange.bind(this);
    this.onCallTrackingChange = this.onCallTrackingChange.bind(this);
    this.onStartDateChange = this.onStartDateChange.bind(this);
    this.onNotesChange = this.onNotesChange.bind(this);
  }

  onExposureLevelChange(value) {
    this.props.dispatch(change('renewStudy', 'exposureLevel', value));
    setTimeout(this.submitValues.bind(this), 0);
  }

  onCampaignLengthChange(value) {
    this.props.dispatch(change('renewStudy', 'campaignLength', value));
    setTimeout(this.submitValues.bind(this), 0);
  }

  onPatientMessagingSuiteChange(value) {
    this.props.dispatch(change('renewStudy', 'patientMessagingSuite', value));
    setTimeout(this.submitValues.bind(this), 0);
  }

  onCallTrackingChange(value) {
    this.props.dispatch(change('renewStudy', 'callTracking', value));
    setTimeout(this.submitValues.bind(this), 0);
  }

  onStartDateChange(value) {
    this.props.dispatch(change('renewStudy', 'startDate', value));
    setTimeout(this.submitValues.bind(this), 0);
  }

  onNotesChange(value) {
    this.props.dispatch(change('renewStudy', 'notes', value));
    setTimeout(this.submitValues.bind(this), 0);
  }

  submitValues() {
    const { exposureLevel, campaignLength, patientMessagingSuite,
      callTracking, startDate, notes, hasError, onSubmitValues } = this.props;

    if (hasError) {
      return;
    }

    const requestValues = {
      exposureLevel,
      campaignLength,
      patientMessagingSuite,
      callTracking,
      startDate: startDate.format('YYYY/MM/DD'),
      notes,
    };

    onSubmitValues(requestValues);
  }

  render() {
    const { levels } = this.props;
    const exposureLevelOptions = map(levels, levelIterator => ({ label: levelIterator.name, value: levelIterator.id }));
    const campaignLengthOptions = CAMPAIGN_LENGTH_LIST;

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
                onChange={this.onExposureLevelChange}
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
                onChange={this.onCampaignLengthChange}
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
                onChange={this.onPatientMessagingSuiteChange}
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
                onChange={this.onCallTrackingChange}
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
                onChange={this.onStartDateChange}
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
                onChange={this.onNotesChange}
              />
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default RenewStudyForm;
