/**
 * Created by mike on 9/19/16.
 */

import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import Select from 'react-select'
import sanitizeProps from '../../../utils/sanitizeProps'
import 'react-select/less/default.less'

export const fields = [ 'name', 'campaign', 'source' ]

class FilterStudyPatientsForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    campaignOptions: PropTypes.array.isRequired,
    sourceOptions: PropTypes.array.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    submitting: false,
    loading: false
  }

  render () {
    const {
      fields: { name, campaign, source },
      campaignOptions,
      sourceOptions,
      handleSubmit,
      submitting,
      loading
    } = this.props
    const nameProp = sanitizeProps(name)

    return (
      <form className="form-search clearfix" onSubmit={handleSubmit}>
        <div className="fields-holder">
          <div className="search-area pull-left">
            <div className="field">
              <input type="search" id="search" className="form-control keyword-search" placeholder="Search" {...nameProp} />
              <label htmlFor="search"><i className="icon-icon_search2" /></label>
            </div>
          </div>
          <div className="pull-left custom-select">
            <Select
              {...campaign}
              options={campaignOptions}
              placeholder="Select Campaign"
              disabled={submitting || loading}
              onBlur={() => { campaign.onBlur(campaign) }}
            />
          </div>
          <div className="pull-left custom-select">
            <Select
              {...source}
              options={sourceOptions}
              placeholder="Select Source"
              disabled={submitting || loading}
              onBlur={() => { source.onBlur(source) }}
            />
          </div>
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: 'filterStudyPatients',
  fields
})(FilterStudyPatientsForm)
