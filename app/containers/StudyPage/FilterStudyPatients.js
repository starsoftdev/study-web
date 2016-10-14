/**
 * Created by mike on 9/19/16.
 */

import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import Input from '../../components/Input/index';
import ReactSelect from '../../components/Input/ReactSelect';
import StudyActionButtons from './StudyActionButtons';

@reduxForm({ form: 'filterStudyPatients' })
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
            <Field component={Input}
                   type="search"
                   name="search"
                   className="keyword-search"
                   placeholder="Search Patients"
            />
            <label htmlFor="search">
              <i className="icomoon-icon_search2" />
            </label>
          </div>
        </div>
        <div className="select pull-left">
          <Field component={ReactSelect}
                 name="campaign"
                 className="field"
                 options={campaignOptions}
                 disabled={submitting || loading}
                 placeholder="Select Campaign"
          />
        </div>
        <div className="select pull-left">
          <Field component={ReactSelect}
                 name="source"
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

export default FilterStudyPatientsForm;
