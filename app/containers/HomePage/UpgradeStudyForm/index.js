import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, FieldArray, reduxForm, change } from 'redux-form';

import Input from 'components/Input';
import ReactSelect from 'components/Input/ReactSelect';
import Toggle from 'components/Input/Toggle';
import { selectStudyLevels, selectAvailPhoneNumbers } from 'containers/App/selectors';
import { selectSelectedIndicationLevelPrice } from 'containers/HomePage/selectors';
import { selectUpgradeStudyFormCallTrackingValue, selectUpgradeStudyFormLeadsCount } from './selectors';
import RenderLeads from 'components/RenderLeads';
import formValidator from './validator';
import LoadingSpinner from 'components/LoadingSpinner';
import './styles.less';

const mapStateToProps = createStructuredSelector({
  studyLevels: selectStudyLevels(),
  selectedIndicationLevelPrice: selectSelectedIndicationLevelPrice(),
  callTracking: selectUpgradeStudyFormCallTrackingValue(),
  leadsCount: selectUpgradeStudyFormLeadsCount(),
  availPhoneNumbers: selectAvailPhoneNumbers(),
});

@reduxForm({ form: 'upgradeStudy', validate: formValidator })
@connect(mapStateToProps, null)

class UpgradeStudyForm extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    studyLevels: PropTypes.array,
    selectedIndicationLevelPrice: PropTypes.object,
    callTracking: PropTypes.bool,
    leadsCount: PropTypes.number,
    availPhoneNumbers: PropTypes.array,
  };

  componentWillReceiveProps(newProps) {
    if (newProps.leadsCount === 0 && this.props.leadsCount === 1) {
      this.props.dispatch(change('upgradeStudy', 'callTracking', false));
    }
  }

  render() {
    const { studyLevels, selectedIndicationLevelPrice, callTracking, availPhoneNumbers } = this.props;

    return (
      <form className="form-upgrade-study">
        <div className="upgrade-study">
          <div className="row form-group">
            <strong className="required col-sm-5">
              <label>UPGRADE LEVEL</label>
            </strong>
            <div className="field col-sm-6">
              <Field
                name="level"
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
          {callTracking &&
            <FieldArray name="leads" component={RenderLeads} availPhoneNumbers={availPhoneNumbers} />
          }
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

export default UpgradeStudyForm;
