import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import t from 'tcomb-form'

import { fetchUsers, clearUsers } from 'actions'

import {
  getModel as getFormType,
  options as formOptions
} from 'forms/SearchUsers'

import ActivityIcon from 'components/ActivityIcon'
import LoadingResults from 'components/LoadingResults'

import './styles.less'

const TCombForm = t.form.Form

class SearchUsersForm extends React.Component {
  static propTypes = {
    isFetching: PropTypes.bool,
    fetchUsers: PropTypes.func,
    clearUsers: PropTypes.func
  }

  constructor (props) {
    super(props)
  }

  componentWillUnmount () {
    // Redux store keeps `users` reducer, so need to clear them
    // Not sure we actually need this behavior
    this.props.clearUsers()
  }

  handleSubmit (ev) {
    ev.preventDefault()
    const value = this.refs.form.getValue()

    if (value) {
      this.props.fetchUsers(value)
    }
  }

  render () {
    const { isFetching } = this.props
    return (
      <div className="users-search">
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
  isFetching: state.fetchingUsers
})
const mapDispatchToProps = {
  fetchUsers,
  clearUsers
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchUsersForm)
