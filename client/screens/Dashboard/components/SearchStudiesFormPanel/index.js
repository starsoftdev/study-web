import _ from 'lodash'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchStudies, fetchSites } from 'actions'
import SearchStudiesForm from 'forms/SearchStudies'
import ActivityIcon from 'components/ActivityIcon'
import './styles.less'

class SearchStudiesFormPanel extends React.Component {
  static propTypes = {
    currentUser: PropTypes.object,
    fetchingStudies: PropTypes.bool,
    fetchingSites: PropTypes.bool,
    sites: PropTypes.array,
    fetchStudies: PropTypes.func,
    fetchSites: PropTypes.func,
  }

  constructor (props) {
    super(props)

    if (this.props.currentUser.userInfo.roleForClient) {
      this.props.fetchSites(this.props.currentUser, {})
    }
  }

  handleSubmit (searchFilter) {
    this.props.fetchStudies(searchFilter)
  }

  render () {
    const { sites, fetchingStudies, fetchingSites } = this.props
    let siteOptions = _.map(sites, siteIterator => {
      return {
        label: siteIterator.name,
        value: siteIterator.id,
      }
    })
    siteOptions.unshift({ label: 'All', value: 0 })
    const statusOptions = [ { label: 'All', value: 'All' }, { label: 'Active', value: 'Active' }, { label: 'Inactive', value: 'Inactive' } ]

    return (
      <SearchStudiesForm loading={fetchingSites} submitting={fetchingStudies} siteOptions={siteOptions} statusOptions={statusOptions} onSubmit={this.handleSubmit.bind(this)} />
    )
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.authorization.authData,
  fetchingStudies: state.fetchingStudies,
  fetchingSites: state.fetchingSites,
  sites: state.sites,
})
const mapDispatchToProps = {
  fetchStudies,
  fetchSites,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchStudiesFormPanel)
