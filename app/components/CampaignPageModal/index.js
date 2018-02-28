/**
 * Created by Younes on 13/07/16.
 */

import _ from 'lodash';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Form from 'react-bootstrap/lib/Form';
import Moment from 'moment-timezone';
import { extendMoment } from 'moment-range';
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
import { selectDashboardCampaigns, selectDashboardEditCampaignProcess, selectDashboardDeleteCampaignProcess } from '../../containers/HomePage/AdminDashboard/selectors';
import { fetchCampaignsByStudy, editCampaign, deleteCampaign } from '../../containers/HomePage/AdminDashboard/actions';

const moment = extendMoment(Moment);
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
    deleteCampaignProcess: PropTypes.object,
    fetchCampaignsByStudy: PropTypes.func,
    submitForm: PropTypes.func,
    deleteCampaign: PropTypes.func,
    five9List: PropTypes.object,
    formValues: PropTypes.object,
    levels: PropTypes.array,
    isOnTop: React.PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    openModal: PropTypes.bool.isRequired,
    change: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      five9List: [],
      selectedCampaign: 0,
      isCampaignHasPatients: false,
    };

    this.campaignChanged = this.campaignChanged.bind(this);
    this.submitCampaignForm = this.submitCampaignForm.bind(this);
    this.deleteCampaignClick = this.deleteCampaignClick.bind(this);
    this.onClose = this.onClose.bind(this);
    this.five9ValueChanged = this.five9ValueChanged.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.openModal && !this.props.openModal && this.props.study.study_id) {
      this.props.fetchCampaignsByStudy(this.props.study.study_id);
      this.setState({ selectedCampaign : 0, isCampaignHasPatients: true });
    }
    // TODO re-enable Five9 when we figure out how to integrate it with the new web app code-base
    if (newProps.studyCampaigns.details && newProps.studyCampaigns.details.length > 0 &&
      this.props.studyCampaigns.details !== newProps.studyCampaigns.details && newProps.studyCampaigns.details[this.state.selectedCampaign]) {
      this.campaignChanged(newProps.studyCampaigns.details[this.state.selectedCampaign].id, newProps.studyCampaigns.details);
      this.five9ValueChanged();
    }

    if (newProps.five9List.details.length && !this.state.five9List.length) {
      this.setState({ five9List: newProps.five9List.details });
    }

    if (newProps.formValues.five_9_value && this.state.five9List.length) {
      const five9List = this.state.five9List;
      const index = _.findIndex(five9List, (l) => l.name === newProps.formValues.five_9_value);
      if (index === -1 && newProps.formValues.five_9_value !== null) {
        five9List.push({ name: newProps.formValues.five_9_value });
        this.setState({ five9List });
      }
    }

    if ((newProps.study && !this.props.study) || (newProps.study && this.props.study && newProps.study.study_id !== this.props.study.study_id)) {
      this.five9ValueChanged(newProps.study.five_9_value);
    }
  }

  componentDidUpdate(prevProps) {
    const { studyCampaigns, openModal } = this.props;
    // when campaigns have been loaded we need select first campaign by default
    if ((prevProps.studyCampaigns.fetching && !studyCampaigns.fetching) || (!prevProps.openModal && openModal && studyCampaigns.details.length > 0)) {
      this.campaignChanged(studyCampaigns.details.sort((a, b) => a.orderNumber - b.orderNumber)[0].id);
    }
  }

  onClose() {
    const { onClose } = this.props;
    this.setState({ five9List: [] }, () => {
      change('five_9_value', null);
      onClose();
    });
  }

  campaignChanged(e, studyCampaigns = this.props.studyCampaigns.details) {
    const campaignIndex = studyCampaigns.findIndex(item => (item.id === e));
    if (campaignIndex !== undefined && campaignIndex >= 0) {
      const foundCampaign = studyCampaigns[campaignIndex];
      this.setState({ selectedCampaign : campaignIndex, isCampaignHasPatients: (!!((foundCampaign.patients && foundCampaign.patients.length > 0))) });
      const { change } = this.props;
      change('campaign_id', foundCampaign.id);
      change('datefrom', moment(foundCampaign.dateFrom).tz(this.props.study.timezone));
      change('dateto', moment(foundCampaign.dateTo).tz(this.props.study.timezone));
      change('custom_patient_goal', foundCampaign.customPatientGoal);
      change('level_id', foundCampaign.level_id);
      change('patient_qualification_suite', foundCampaign.patientQualificationSuite);
      change('five_9_value', foundCampaign.five9value);
    }
  }

  five9ValueChanged(five9value) {
    this.props.change('five_9_value', five9value);
  }

  submitCampaignForm(e) {
    e.preventDefault();
    const { formValues, study, submitForm, levels } = this.props;
    const submitValues = {
      dateFrom: formValues.datefrom,
      dateTo: formValues.dateto,
      campaignId: +formValues.campaign_id,
      levelId: formValues.level_id,
      patientQualificationSuite: formValues.patient_qualification_suite || false,
      studyId: +study.study_id,
      five9value: formValues.five_9_value || null,
    };
    const customPatientGoal = parseInt(formValues.custom_patient_goal);
    if (customPatientGoal) {
      submitValues.customPatientGoal = customPatientGoal;
    } else {
      submitValues.customPatientGoal = null;
    }
    const level = _.find(levels, { id: formValues.level_id });
    const campaignInfo = {
      campaignLength: moment.range(formValues.datefrom, formValues.dateto).diff('months'),
      levelName: level.name,
    };
    submitForm(submitValues, campaignInfo);
  }

  deleteCampaignClick() {
    const { formValues, study } = this.props;
    this.props.deleteCampaign({
      studyId: study.study_id,
      campaignId: formValues.campaign_id,
    });
  }

  render() {
    const { openModal, levels, studyCampaigns, formValues, updateCampaignProcess, deleteCampaignProcess, study } = this.props;
    const exposureLevelOptions = levels.map(level => ({ value: level.id, label: level.name }));
    const timezone = (study && study.timezone) ? study.timezone : 'utc';
    let currentCampaignOrderNumber = -1;
    const campaignOptions = studyCampaigns.details.sort((a, b) => b.orderNumber - a.orderNumber).map(c => {
      if (c.isCurrent) {
        currentCampaignOrderNumber = c.orderNumber;
        return { label: `${c.orderNumber} - Current`, value: c.id };
      }
      return { label: c.orderNumber, value: c.id };
    });
    const dateFrom = formValues.datefrom ? moment(formValues.datefrom).tz(timezone) : undefined;
    const dateTo = formValues.dateto ? moment(formValues.dateto).tz(timezone) : undefined;
    let fromMinDate = null;
    let toMaxDate = null;
    let isFutureCampaign = false;
    const campaignIndex = studyCampaigns.details.findIndex(item => (item.id === formValues.campaign_id));
    if (campaignIndex !== undefined && campaignIndex >= 0) {
      // if campaign is not the first, then it has a previous campaign, we set the max date accordingly
      if (campaignIndex > 0) {
        toMaxDate = moment(studyCampaigns.details[campaignIndex - 1].dateFrom).utc();
      }
      // if campaign is not the last, then it has a next campaign, we set the min date accordingly
      if (campaignIndex < studyCampaigns.details.length - 1) {
        fromMinDate = moment(studyCampaigns.details[campaignIndex + 1].dateTo).utc();
      }
      isFutureCampaign = studyCampaigns.details[campaignIndex].orderNumber > currentCampaignOrderNumber;
    }


    const five9Options = this.state.five9List.map(item => ({ value: item.name, label: item.name }));

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
                <strong className="title">Campaign</strong>
                <a className="btn-right-arrow" onClick={this.onClose}><i className="glyphicon glyphicon-menu-right" /></a>
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
                      clearable={false}
                      backspaceRemoves={false}
                      deleteRemoves={false}
                      openOnFocus
                      openOnClick
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
                      clearable={false}
                      backspaceRemoves={false}
                      deleteRemoves={false}
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
                      className={'form-control datepicker-input'}
                      initialDate={dateFrom}
                      minDate={fromMinDate}
                      maxDate={moment(formValues.dateto).subtract(1, 'days')}
                      canNotSetTBD={!isFutureCampaign}
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
                      className={'form-control datepicker-input'}
                      initialDate={dateTo}
                      minDate={moment(formValues.datefrom).add(1, 'days')}
                      maxDate={toMaxDate}
                      title="Choose End Date"
                      canNotSetTBD={!isFutureCampaign}
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
                <div className="field-row">
                  <strong className="label">
                    <label>FIVE 9 LIST</label>
                  </strong>
                  <div className="field">
                    <Field
                      name="five_9_value"
                      component={ReactSelect}
                      placeholder="Select list name on Five9"
                      searchPlaceholder=""
                      searchable
                      options={five9Options}
                      customSearchIconClass="icomoon-icon_search2"
                      onChange={(e) => { change('five9value', e ? e.toString() : null); }}
                    />
                  </div>
                </div>

                <div className="field-row text-right">
                  <div className={classNames('btn btn-gray upload-btn', { disabled: this.state.isCampaignHasPatients })} onClick={() => (!this.state.isCampaignHasPatients ? this.deleteCampaignClick() : null)}>
                    {deleteCampaignProcess.deleting
                      ? <span><LoadingSpinner showOnlyIcon size={20} className="saving-user" /></span>
                      : <span>Delete</span>
                    }
                  </div>
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
  deleteCampaignProcess: selectDashboardDeleteCampaignProcess(),
  formValues: selectValues(formName),
});
function mapDispatchToProps(dispatch) {
  return {
    change: (name, value) => dispatch(change(formName, name, value)),
    fetchCampaignsByStudy: (id) => dispatch(fetchCampaignsByStudy(id)),
    submitForm: (values, campaignInfo) => dispatch(editCampaign(values, campaignInfo)),
    deleteCampaign: (values) => dispatch(deleteCampaign(values)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CampaignPageModal);
