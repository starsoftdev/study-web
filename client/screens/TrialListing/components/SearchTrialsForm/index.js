import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import t from 'tcomb-form'

import { fetchStudies, clearStudies } from 'actions'

import {
  getModel as getFormType,
  options as formOptions
} from 'forms/SearchTrials'

import ActivityIcon from 'components/ActivityIcon'
import LoadingResults from 'components/LoadingResults'

import './styles.less'

const TCombForm = t.form.Form

let NEW_FORM = {
  postalCode: '',
  distance: '8000',
  studyType: '0',
}

class SearchTrialsForm extends React.Component {
  static propTypes = {
    isFetching: PropTypes.bool,
    fetchStudies: PropTypes.func,
    clearStudies: PropTypes.func,
  }

  constructor (props) {
    super(props)

    this.state = {
      options: formOptions,
      formData: NEW_FORM,
    }
  }

  componentWillUnmount () {
    // Redux store keeps `studies` reducer, so need to clear them
    // Not sure we actually need this behavior
    this.props.clearStudies()
  }

  handleSubmit (ev) {
    ev.preventDefault()
    const value = this.refs.form.getValue()

    if (value) {
      this.props.fetchStudies(value)
    }
  }

  render () {
    const { formData } = this.state
    const { isFetching } = this.props
    return (
      <div className="study-search">
        <h1>INSTANTLY SEARCH FOR A CLINICAL TRIAL!</h1>
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
                  : <span>Find Studies!</span>
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
  isFetching: state.fetchingStudies,
})
const mapDispatchToProps = {
  fetchStudies,
  clearStudies,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchTrialsForm)
