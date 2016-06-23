import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import t from 'tcomb-form'

import { fetchSites, clearSites } from 'actions'

import {
  getModel as getFormType,
  options as formOptions
} from 'forms/SearchSites'

import ActivityIcon from 'components/ActivityIcon'
import LoadingResults from 'components/LoadingResults'

import './styles.less'

const TCombForm = t.form.Form

let NEW_FORM = {
  siteName: ''
}

class SearchSitesForm extends React.Component {
  static propTypes = {
    isFetching: PropTypes.bool,
    fetchSites: PropTypes.func,
    clearSites: PropTypes.func
  }

  constructor (props) {
    super(props)

    this.state = {
      options: formOptions,
      formData: NEW_FORM
    }
  }

  componentWillUnmount () {
    // Redux store keeps `sites` reducer, so need to clear them
    // Not sure we actually need this behavior
    this.props.clearSites()
  }

  handleSubmit (ev) {
    ev.preventDefault()
    const value = this.refs.form.getValue()

    if (value) {
      this.props.fetchSites(value)
    }
  }

  render () {
    const { formData } = this.state
    const { isFetching } = this.props
    return (
      <div className="sites-search">
        <div className="search-form">
          <form className="form-green" onSubmit={this.handleSubmit.bind(this)}>
            <TCombForm
              ref="form"
              type={getFormType(formData)}
              options={this.state.options}
              value={formData}
              />
            <div className="form-group">
              <button
                type="submit"
                className="btn btn-orange block"
                disabled={isFetching}
                >
                {isFetching
                  ? <span><ActivityIcon />Searching...</span>
                  : <span>Search Sites</span>
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.fetchingSites
})
const mapDispatchToProps = {
  fetchSites,
  clearSites
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchSitesForm)
