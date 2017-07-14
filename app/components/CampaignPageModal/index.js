/**
 * Created by Younes on 13/07/16.
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Form from 'react-bootstrap/lib/Form';

import moment from 'moment';
import _ from 'lodash';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm, change, blur } from 'redux-form';
import Collapse from 'react-bootstrap/lib/Collapse';
import Button from 'react-bootstrap/lib/Button';
import DatePicker from '../../components/Input/DatePicker';
import ReactSelect from '../../components/Input/ReactSelect';
import Input from '../Input/index';
import LoadingSpinner from '../LoadingSpinner';
import { selectSyncErrorBool, selectValues } from '../../common/selectors/form.selector';
import { selectStudyCampaigns } from '../../containers/HomePage/AdminDashboard/selectors';
import formValidator from './validator';

const formName = 'campaignPageForm';

function mapDispatchToProps(dispatch) {
  return {
    change: (name, value) => dispatch(change(formName, name, value)),
    blur: (field, value) => dispatch(blur(formName, field, value)),
  };
}

@reduxForm({
  form: formName,
  validate: formValidator,
})
@connect(null, mapDispatchToProps)

export class CampaignPageModal extends React.Component {
  static propTypes = {
    study: PropTypes.object,
    formValues: PropTypes.object,
    studyCampaigns: PropTypes.object,
    updateCampaignProcess: PropTypes.object,
    levels: PropTypes.array,
    isOnTop: React.PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    openModal: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func,
    change: PropTypes.func.isRequired,
    blur: React.PropTypes.func.isRequired,
  };

  /* campaignChanged(e) {
    const foundCampaign = _.find(this.props.studyCampaigns.details, (item) => (item.id === e));
    if (foundCampaign) {
      const { change } = this.props;
      change('campaign_datefrom', foundCampaign.datefrom);
      change('campaign_dateto', foundCampaign.dateto);
      change('custom_patient_goal', foundCampaign.custom_patient_goal);
      change('level_id', foundCampaign.level_id);
      // change('patient_qualification_suite', foundCampaign.patient_qualification_suite);
    }
  }*/

  render() {
    const { openModal, onClose, levels, handleSubmit, study } = this.props;
    const exposureLevelOptions = levels.map(level => ({ value: level.id, label: level.name }));
    const campaignOptions = [];
    const campaignDateFrom = null;
    const campaignDateTo = null;
    const updateCampaignProcess = { saving: false };
    console.log(study);

    /* let campaignOptions = studyCampaigns.details.map((c, i) => {
      if (i === 0) {
        return { label: '1', value: c.id };
      } else if (c.is_current) {
        return { label: 'Current', value: c.id };
      }
      return { label: (i + 1), value: c.id };
    });

    campaignOptions = campaignOptions.reverse();

    const campaignDateFrom = formValues.campaign_datefrom ? moment(formValues.campaign_datefrom) : null;
    const campaignDateTo = formValues.campaign_dateto ? moment(formValues.campaign_dateto) : null;*/

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
                <strong className="title">Campaigns</strong>
                <a className="btn-right-arrow" onClick={onClose}><i className="glyphicon glyphicon-menu-right" /></a>
              </div>
            </div>
            <Form
              className="holder landing-holder"
              onSubmit={handleSubmit}
              noValidate="novalidate"
            >
              <div className="frame">
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-phone">CAMPAIGN</label>
                  </strong>
                  <div className="field">
                    <Field
                      name="campaign_id"
                      component={ReactSelect}
                      placeholder="Select Campaign"
                      searchPlaceholder="Search"
                      searchable
                      options={campaignOptions}
                      onChange={(e) => { this.campaignChanged(e); }}
                      customSearchIconClass="icomoon-icon_search2"
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-phone">EXPOSURE LEVEL</label>
                  </strong>
                  <div className="field">
                    <Field
                      name="level_id"
                      component={ReactSelect}
                      placeholder="Select Exposure Level"
                      searchPlaceholder="Search"
                      searchable
                      options={exposureLevelOptions}
                      customSearchIconClass="icomoon-icon_search2"
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-phone">START DATE</label>
                  </strong>
                  <div className="field">
                    <Field
                      id="start-date"
                      name="campaign_datefrom"
                      component={DatePicker}
                      className="form-control datepicker-input"
                      initialDate={campaignDateFrom}
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-phone">END DATE</label>
                  </strong>
                  <div className="field">
                    <Field
                      id="end-date"
                      name="campaign_dateto"
                      component={DatePicker}
                      className="form-control datepicker-input"
                      initialDate={campaignDateTo}
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-phone">CUSTOM GOAL</label>
                  </strong>
                  <div className="field">
                    <Field
                      type="text"
                      name="custom_patient_goal"
                      component={Input}
                    />
                  </div>
                </div>

                <div className="field-row text-right">
                  <Button type="submit" bsStyle="primary" className="fixed-small-btn">
                    {updateCampaignProcess.saving
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

const mapStateToProps = createStructuredSelector({
  formError: selectSyncErrorBool(formName),
  newList: selectValues(formName),
  studyCampaigns: selectStudyCampaigns(),
});

export default connect(mapStateToProps, mapDispatchToProps)(CampaignPageModal);
