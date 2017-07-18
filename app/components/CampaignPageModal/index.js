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
import { Field, reduxForm, change } from 'redux-form';
import Collapse from 'react-bootstrap/lib/Collapse';
import Button from 'react-bootstrap/lib/Button';
import DatePicker from '../../components/Input/DatePicker';
import ReactSelect from '../../components/Input/ReactSelect';
import Input from '../Input/index';
import Toggle from '../../components/Input/Toggle';
import LoadingSpinner from '../LoadingSpinner';
import { selectValues } from '../../common/selectors/form.selector';
import { selectDashboardCampaigns, selectDashboardEditCampaignProcess } from '../../containers/HomePage/AdminDashboard/selectors';
import { fetchCampaignsByStudy, editCampaign } from '../../containers/HomePage/AdminDashboard/actions';

const formName = 'campaignPageForm';

@reduxForm({
  form: formName,
})
@connect(mapStateToProps, mapDispatchToProps)

export class CampaignPageModal extends React.Component {
  static propTypes = {
    study: PropTypes.object,
    studyCampaigns: PropTypes.object,
    updateCampaignProcess: PropTypes.object,
    fetchCampaignsByStudy: PropTypes.func,
    submitForm: PropTypes.func,
    formValues: PropTypes.object,
    levels: PropTypes.array,
    isOnTop: React.PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    openModal: PropTypes.bool.isRequired,
    change: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.campaignChanged = this.campaignChanged.bind(this);
    this.submitCampaignForm = this.submitCampaignForm.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.openModal && !this.props.openModal && this.props.study.study_id) {
      this.props.fetchCampaignsByStudy(this.props.study.study_id);
    }
    if (newProps.studyCampaigns.details && newProps.studyCampaigns.details.length > 0 &&
      this.props.studyCampaigns.details !== newProps.studyCampaigns.details) {
      this.campaignChanged(newProps.studyCampaigns.details[0].id, newProps.studyCampaigns.details);
    }
  }

  campaignChanged(e, studyCampaigns = this.props.studyCampaigns.details) {
    const foundCampaign = _.find(studyCampaigns, (item) => (item.id === e));
    if (foundCampaign) {
      const { change } = this.props;
      change('campaign_id', foundCampaign.id);
      change('datefrom', foundCampaign.dateFrom);
      change('dateto', foundCampaign.dateTo);
      change('custom_patient_goal', foundCampaign.customPatientGoal);
      change('level_id', foundCampaign.level_id);
      change('patient_qualification_suite', foundCampaign.patientQualificationSuite);
    }
  }

  submitCampaignForm(e) {
    e.preventDefault();
    const { formValues, study, submitForm } = this.props;
    const submitValues = {
      dateFrom: formValues.datefrom,
      dateTo: formValues.dateto,
      campaignId: +formValues.campaign_id,
      levelId: formValues.level_id,
      patientQualificationSuite: formValues.patient_qualification_suite || false,
      studyId: +study.study_id,
    };
    if (formValues.custom_patient_goal) {
      submitValues.customPatientGoal = +formValues.custom_patient_goal;
    }
    submitForm(submitValues);
  }

  render() {
    const { openModal, onClose, levels, studyCampaigns, formValues, updateCampaignProcess } = this.props;
    const exposureLevelOptions = levels.map(level => ({ value: level.id, label: level.name }));

    const campaignOptions = studyCampaigns.details.map(c => {
      if (c.isCurrent) {
        return { label: `${c.orderNumber} - Current`, value: c.id };
      }
      return { label: c.orderNumber, value: c.id };
    });

    const dateFrom = formValues.datefrom ? moment(formValues.datefrom) : null;
    const dateTo = formValues.dateto ? moment(formValues.dateto) : null;
    const minDate = (studyCampaigns.details.length > 1) ? moment(studyCampaigns.details[1].dateTo).add(1, 'days') : null;
    let isLatest = false;
    if (formValues.campaign_id && studyCampaigns.details.length > 0) {
      const latestCampaign = studyCampaigns.details.filter(c => c.id === formValues.campaign_id)[0];
      if (latestCampaign) {
        isLatest = latestCampaign.orderNumber === studyCampaigns.details.length;
      }
    }

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
              onSubmit={this.submitCampaignForm}
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
                      name="datefrom"
                      component={DatePicker}
                      className={`form-control datepicker-input ${isLatest ? '' : 'disabled'}`}
                      initialDate={dateFrom}
                      isDisabled={!isLatest}
                      minDate={minDate}
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
                      name="dateto"
                      component={DatePicker}
                      className={`form-control datepicker-input ${isLatest ? '' : 'disabled'}`}
                      initialDate={dateTo}
                      isDisabled={!isLatest}
                      minDate={moment(formValues.datefrom).add(1, 'days')}
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-phone">CUSTOM GOAL</label>
                  </strong>
                  <div className="field">
                    <Field
                      type="number"
                      name="custom_patient_goal"
                      component={Input}
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-first-name">PQS</label>
                  </strong>
                  <div className="field">
                    <Field
                      name="patient_qualification_suite"
                      component={Toggle}
                      className="field"
                      onChange={(e) => { change('patientQualificationSuite', e.toString()); }}
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
  studyCampaigns: selectDashboardCampaigns(),
  updateCampaignProcess: selectDashboardEditCampaignProcess(),
  formValues: selectValues(formName),
});
function mapDispatchToProps(dispatch) {
  return {
    change: (name, value) => dispatch(change(formName, name, value)),
    fetchCampaignsByStudy: (id) => dispatch(fetchCampaignsByStudy(id)),
    submitForm: (values) => dispatch(editCampaign(values)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CampaignPageModal);
