import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm, change } from 'redux-form';
import moment from 'moment';

import Input from 'components/Input';
import ReactSelect from 'components/Input/ReactSelect';
import DatePicker from 'components/Input/DatePicker';
import Toggle from 'components/Input/Toggle';
import {
  selectRenewStudyFormCampaignLengthValue,
} from './selectors';
import { selectStudyLevels } from 'containers/App/selectors';
import { selectSelectedIndicationLevelPrice } from 'containers/HomePage/selectors';
import { CAMPAIGN_LENGTH_LIST } from 'common/constants';
import formValidator from './validator';
import LoadingSpinner from 'components/LoadingSpinner';
import './styles.less';

const mapStateToProps = createStructuredSelector({
  studyLevels: selectStudyLevels(),
  selectedIndicationLevelPrice: selectSelectedIndicationLevelPrice(),
  campaignLength: selectRenewStudyFormCampaignLengthValue(),
});

@reduxForm({ form: 'renewStudy', validate: formValidator })
@connect(mapStateToProps, null)

class RenewStudyForm extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    studyLevels: PropTypes.array,
    selectedIndicationLevelPrice: PropTypes.object,
    campaignLength: PropTypes.number,
  };

  componentWillReceiveProps(newProps) {
    if (newProps.campaignLength !== this.props.campaignLength) {
      if (newProps.campaignLength !== 1) {
        this.props.dispatch(change('renewStudy', 'condenseToTwoWeeks', false));
      }
    }
  }

  render() {
    const { studyLevels, campaignLength, selectedIndicationLevelPrice } = this.props;

    return (
      <form className="form-renew-study">
        <div className="renew-study">
          <div className="row form-group">
            <span className="required col-sm-5">
              <label>EXPOSURE LEVEL</label>
            </span>
            <div className="field col-sm-6">
              <Field
                name="exposureLevel"
                component={ReactSelect}
                placeholder="Select..."
                options={studyLevels}
                disabled={selectedIndicationLevelPrice.fetching}
              />
            </div>
            <div className="field col-sm-1">
              {selectedIndicationLevelPrice.fetching &&
                (
                <span>
                  <LoadingSpinner showOnlyIcon size={20} className="fetching-level-price" />
                </span>
                )
              }
            </div>
          </div>
          <div className="row form-group">
            <span className="required col-sm-5">
              <label>CAMPAIGN LENGTH</label>
            </span>
            <div className="field col-sm-7">
              <Field
                name="campaignLength"
                component={ReactSelect}
                placeholder="Select..."
                options={CAMPAIGN_LENGTH_LIST}
              />
            </div>
          </div>
          {campaignLength === 1 &&
            (
            <div className="row form-group">
              <span className="col-sm-5">
                <label>CONDENSE TO 2 WEEKS</label>
              </span>
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
            <span className="col-sm-5">
              <label>PATIENT MESSAGING SUITE: $247</label>
            </span>
            <div className="field col-sm-7">
              <Field
                name="patientMessagingSuite"
                component={Toggle}
              />
            </div>
          </div>
          <div className="row form-group">
            <span className="col-sm-5">
              <label>CALL TRACKING: $247</label>
            </span>
            <div className="field col-sm-7">
              <Field
                name="callTracking"
                component={Toggle}
              />
            </div>
          </div>
          <div className="row form-group">
            <span className="required col-sm-5">
              <label>START DATE</label>
            </span>
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
            <span className="col-sm-5">
              <label>NOTES</label>
            </span>
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
