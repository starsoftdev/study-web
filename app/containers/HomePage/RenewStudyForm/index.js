import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm, change } from 'redux-form';
import moment from 'moment';
import { map, find } from 'lodash';

import Input from 'components/Input';
import ReactSelect from 'components/Input/ReactSelect';
import DatePicker from 'components/Input/DatePicker';
import Toggle from 'components/Input/Toggle';
import { selectRenewStudyFormError,
  selectRenewStudyFormExposureLevelValue,
  selectRenewStudyFormCampaignLengthValue,
  selectRenewStudyFormCondenseToTwoWeeksValue,
  selectRenewStudyFormPatientMessagingSuiteValue,
  selectRenewStudyFormCallTrackingValue,
  selectRenewStudyFormStartDateValue,
  selectRenewStudyFormNotesValue,
} from './selectors';
import { selectLevels } from 'containers/App/selectors';
import { selectSelectedLevelPrice } from 'containers/HomePage/selectors';
import { fetchLevelPrice, clearLevelPrice } from 'containers/HomePage/actions';
import { CAMPAIGN_LENGTH_LIST } from 'common/constants';
import formValidator from './validator';
import LoadingSpinner from 'components/LoadingSpinner';
import './styles.less';

const mapStateToProps = createStructuredSelector({
  levels: selectLevels(),
  selectedLevelPrice: selectSelectedLevelPrice(),
  exposureLevel: selectRenewStudyFormExposureLevelValue(),
  campaignLength: selectRenewStudyFormCampaignLengthValue(),
  condenseToTwoWeeks: selectRenewStudyFormCondenseToTwoWeeksValue(),
  patientMessagingSuite: selectRenewStudyFormPatientMessagingSuiteValue(),
  callTracking: selectRenewStudyFormCallTrackingValue(),
  startDate: selectRenewStudyFormStartDateValue(),
  notes: selectRenewStudyFormNotesValue(),
  hasError: selectRenewStudyFormError(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchLevelPrice: (id, indicationId) => dispatch(fetchLevelPrice(id, indicationId)),
    clearLevelPrice: () => dispatch(clearLevelPrice()),
  };
}

@reduxForm({ form: 'renewStudy', validate: formValidator })
@connect(mapStateToProps, mapDispatchToProps)

class RenewStudyForm extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    levels: PropTypes.array,
    selectedLevelPrice: PropTypes.object,
    exposureLevel: PropTypes.number,
    campaignLength: PropTypes.number,
    condenseToTwoWeeks: PropTypes.bool,
    patientMessagingSuite: PropTypes.bool,
    callTracking: PropTypes.bool,
    startDate: PropTypes.object,
    notes: PropTypes.string,
    hasError: PropTypes.bool,
    indicationId: PropTypes.number,
    fetchLevelPrice: PropTypes.func,
    clearLevelPrice: PropTypes.func,
    onSubmitValues: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.onExposureLevelChange = this.onExposureLevelChange.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const { levels, exposureLevel, campaignLength, condenseToTwoWeeks, patientMessagingSuite,
      callTracking, startDate, notes, hasError, onSubmitValues } = this.props;
    let condenseToTwoWeeksValue = null;

    if (newProps.campaignLength !== 1) {
      this.props.dispatch(change('renewStudy', 'condenseToTwoWeeks', false));
      condenseToTwoWeeksValue = false;
    } else {
      condenseToTwoWeeksValue = newProps.condenseToTwoWeeks || false;
    }

    if (hasError || !newProps.exposureLevel || !newProps.campaignLength || !newProps.startDate) {
      return onSubmitValues(null);
    }

    const foundExposureLevel = find(levels, { id: newProps.exposureLevel });

    if (newProps.exposureLevel !== exposureLevel ||
      newProps.campaignLength !== campaignLength ||
      newProps.condenseToTwoWeeks !== condenseToTwoWeeks ||
      newProps.patientMessagingSuite !== patientMessagingSuite ||
      newProps.callTracking !== callTracking ||
      newProps.startDate !== startDate ||
      newProps.notes !== notes) {
      const requestValues = {
        exposureLevel: foundExposureLevel,
        campaignLength: newProps.campaignLength,
        condenseToTwoWeeks: condenseToTwoWeeksValue,
        patientMessagingSuite: newProps.patientMessagingSuite || false,
        callTracking: newProps.callTracking || false,
        startDate: newProps.startDate.format('YYYY/MM/DD'),
        notes: newProps.notes || '',
      };

      return onSubmitValues(requestValues);
    }

    return true;
  }

  onExposureLevelChange(levelId) {
    const { indicationId, fetchLevelPrice, clearLevelPrice, dispatch } = this.props;

    if (!levelId) {
      clearLevelPrice();
    } else {
      fetchLevelPrice(levelId, indicationId);
    }

    dispatch(change('renewStudy', 'exposureLevel', levelId));
  }

  render() {
    const { levels, campaignLength, selectedLevelPrice } = this.props;
    const exposureLevelOptions = map(levels, levelIterator => ({ label: levelIterator.name, value: levelIterator.id }));
    const campaignLengthOptions = CAMPAIGN_LENGTH_LIST;

    return (
      <form className="form-renew-study">
        <div className="renew-study">
          <div className="row form-group">
            <strong className="required col-sm-5">
              <label>EXPOSURE LEVEL</label>
            </strong>
            <div className="field col-sm-6">
              <Field
                name="exposureLevel"
                component={ReactSelect}
                placeholder="Select..."
                options={exposureLevelOptions}
                onChange={this.onExposureLevelChange}
                disabled={selectedLevelPrice.fetching}
              />
            </div>
            <div className="field col-sm-1">
              {selectedLevelPrice.fetching &&
                (
                <span>
                  <LoadingSpinner showOnlyIcon size={20} className="fetching-level-price" />
                </span>
                )
              }
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
              />
            </div>
          </div>
          {campaignLength === 1 &&
            (
            <div className="row form-group">
              <strong className="col-sm-5">
                <label>CONDENSE TO 2 WEEKS</label>
              </strong>
              <div className="field col-sm-7">
                <Field
                  name="condenseToTwoWeeks"
                  component={Toggle}
                />
              </div>
            </div>
            )
          }
          <div className="row form-group">
            <strong className="col-sm-5">
              <label>PATIENT MESSAGING SUITE: $247</label>
            </strong>
            <div className="field col-sm-7">
              <Field
                name="patientMessagingSuite"
                component={Toggle}
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
              />
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default RenewStudyForm;
