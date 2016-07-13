import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import t from 'tcomb-form'
import { fetchSites, clearSites } from 'actions'

import {
  getModel as getFormType,
  options as formOptions
} from 'forms/SearchSites'

import ActivityIcon from 'components/ActivityIcon'
import './styles.less'

const TCombForm = t.form.Form

class SearchSitesForm extends React.Component {
  static propTypes = {
    currentUser: PropTypes.object,
    isFetching: PropTypes.bool,
    fetchSites: PropTypes.func,
    clearSites: PropTypes.func,
  }

  constructor (props) {
    super(props)
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
      this.props.fetchSites(this.props.currentUser, value)
    }
  }

  render () {
    const { isFetching } = this.props
    return (
      <div className="sites-search">
        <div className="search-form">
          <form className="form-green" onSubmit={this.handleSubmit.bind(this)}>
            <div className="input-group">
              <TCombForm ref="form" type={getFormType()} options={formOptions} />
              <span className="input-group-btn">
                <button type="submit" className="btn btn-default" disabled={isFetching}>
                  {isFetching
                    ? <span><ActivityIcon /></span>
                    : <span>Go</span>
                  }
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.authorization.authData,
  isFetching: state.fetchingSites,
})
const mapDispatchToProps = {
  fetchSites,
  clearSites,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchSitesForm)
