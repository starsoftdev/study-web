/**
 * Created by mike on 9/19/16.
 */

import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import Select from 'react-select';
import StudyActionButtons from './StudyActionButtons';
import sanitizeProps from '../../utils/sanitizeProps';

import 'react-select/less/default.less';

class FilterStudyPatientsForm extends Component {
  static propTypes = {
    campaignOptions: PropTypes.array.isRequired,
    sourceOptions: PropTypes.array.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    submitting: false,
    loading: false,
  };

  constructor(props) {
    super(props);
    this.renderSelectCampaign = this.renderSelectCampaign.bind(this);
    this.renderSelectSource = this.renderSelectSource.bind(this);
  }


  renderSelectCampaign(campaign) {
    const {
      submitting,
      loading,
    } = this.props;
    const campaignProps = sanitizeProps(campaign);
    return (
      <Select
        {...campaignProps}
        options={campaign.data}
        placeholder="Select Campaign"
        disabled={submitting || loading}
        onBlur={campaign.onBlur}
      />
    );
  }

  renderSelectSource(source) {
    const {
      submitting,
      loading,
    } = this.props;
    const sourceProps = sanitizeProps(source);
    return (
      <Select
        {...sourceProps}
        options={source.data}
        placeholder="Select Source"
        disabled={submitting || loading}
        onBlur={source.onBlur}
      />
    );
  }

  render() {
    const {
      campaignOptions,
      sourceOptions,
      handleSubmit,
    } = this.props;
    return (
      <form className="form-search clearfix" onSubmit={handleSubmit}>
        <StudyActionButtons />
        <div className="search-area pull-left">
          <div className="field">
            <Field component="input" type="search" name="search" className="form-control keyword-search" placeholder="Search Patients" />
            <label htmlFor="search">
              <i className="icomoon-icon_search2" />
            </label>
          </div>
        </div>
        <div className="select pull-left">
          <Field component={this.renderSelectCampaign} data={campaignOptions} name="campaign" />
        </div>
        <div className="select pull-left">
          <Field component={this.renderSelectSource} data={sourceOptions} name="source" />
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'filterStudyPatients',
})(FilterStudyPatientsForm);
