/**
 * Created by mike on 9/19/16.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import Input from '../../components/Input/index';
import ReactSelect from '../../components/Input/ReactSelect';
import StudyActionButtons from './StudyActionButtons';

import { fetchPatients } from './actions';

@reduxForm({ form: 'filterStudyPatients' })
  

class FilterStudyPatientsForm extends Component {

  static propTypes = {
    campaignOptions: PropTypes.array.isRequired,
    sourceOptions: PropTypes.array.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    fetchPatients: PropTypes.func.isRequired,
    campaign: PropTypes.number,
    source: PropTypes.number,
    siteId: PropTypes.number.isRequired,
    studyId: PropTypes.number.isRequired,
  };
  static defaultProps = {
    submitting: false,
    loading: false,
  };
  constructor(props) {
    super(props);
    this.searchPatient = this.searchPatient.bind(this);
  }
  componentWillMount() {

  }

  searchPatient(event) {
    const { fetchPatients, siteId, studyId, campaign, source } = this.props;
    fetchPatients(studyId, siteId, event.target.value, campaign, source);
  }
  render() {
    const {
      campaignOptions,
      sourceOptions,
      handleSubmit,
      submitting,
      loading,
    } = this.props;
    return (
      <form className="form-search clearfix" onSubmit={handleSubmit}>
        <StudyActionButtons />
        <div className="search-area pull-left">
          <div className="field">
            <Field
              component={Input}
              type="search"
              name="search"
              className="keyword-search"
              placeholder="Search Patients"
              onChange={this.searchPatient}
            />
            <label htmlFor="search">
              <i className="icomoon-icon_search2" />
            </label>
          </div>
        </div>
        <div className="select pull-left">
          <Field
            name="campaign"
            component={ReactSelect}
            className="field"
            options={campaignOptions}
            disabled={submitting || loading}
            placeholder="Select Campaign"
          />
        </div>
        <div className="select pull-left">
          <Field
            name="source"
            component={ReactSelect}
            className="field"
            options={sourceOptions}
            disabled={submitting || loading}
            placeholder="Select Source"
          />
        </div>
      </form>
    );
  }
}
const selector = formValueSelector('filterStudyPatients');

const mapStateToProps = (state) => (
  {
    campaignOptions: state.studyPage.campaigns.map(campaign => {
      const returnObj = {};
      returnObj.value = campaign.id;
      returnObj.label = moment(campaign.dateFrom).format('MMMM Do YYYY');
      return returnObj;
    }),
    campaign: selector(state, 'campaign'),
    source: selector(state, 'source'),
    studyId: state.studyPage.studyId,
    siteId: state.studyPage.siteId,
  }
);

function mapDispatchToProps(dispatch) {
  return {
    fetchPatients: (studyId, siteId, text, campaignId, sourceId) => dispatch(fetchPatients(studyId, siteId, text, campaignId, sourceId)),
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(FilterStudyPatientsForm);

