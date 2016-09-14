import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import Select from 'react-select'
import 'react-select/less/default.less'
import './styles.less'
export const fields = [ 'name', 'site', 'status' ]

class SearchStudiesForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    siteOptions: PropTypes.array.isRequired,
    statusOptions: PropTypes.array.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
  }

  constructor (props) {
    super(props)
  }

  render () {
    const {
      fields: { name, site, status },
      siteOptions,
      statusOptions,
      handleSubmit,
      submitting,
      loading,
      } = this.props

    return (
      <form className="form-search clearfix" onSubmit={handleSubmit}>
        <button type="submit" className="btn btn-primary pull-right">+ List New Study</button>
        <div className="fields-holder">
          <div className="search-area pull-left">
            <div className="field">
              <input type="search" id="search" className="form-control keyword-search" placeholder="Search" />
              <label htmlFor="search"><i className="icon-icon_search2"></i></label>
            </div>
          </div>
          <div className="pull-left custom-select">
            <Select
              {...site}
              options={siteOptions}
              placeholder="Select Site Location"
              disabled={submitting || loading}
              onBlur={() => { site.onBlur(site) }}
              />
          </div>
          <div className="pull-left custom-select">
            <Select
              {...status}
              options={statusOptions}
              placeholder="Select Study Status"
              disabled={submitting || loading}
              onBlur={() => { status.onBlur(status) }}
              />
          </div>
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: 'searchStudies',
  fields
})(SearchStudiesForm)
