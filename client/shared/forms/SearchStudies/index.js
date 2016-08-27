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
      <form onSubmit={handleSubmit}>
        <div className="search-studies">
          <div className="row">
            <div className="col-sm-3">
              <input className="form-control search-name" type="text" disabled={submitting || loading} placeholder="Search Name" {...name} />
            </div>
            <div className="col-sm-3">
              <Select
                {...site}
                options={siteOptions}
                placeholder="Select..."
                disabled={submitting || loading}
                onBlur={() => { site.onBlur(site) }}
                />
            </div>
            <div className="col-sm-3">
              <Select
                {...status}
                options={statusOptions}
                placeholder="Select..."
                disabled={submitting || loading}
                onBlur={() => { status.onBlur(status) }}
                />
            </div>
            <div className="col-sm-3">
              <button type="submit" className="btn btn-success btn-search">Search</button>
            </div>
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
