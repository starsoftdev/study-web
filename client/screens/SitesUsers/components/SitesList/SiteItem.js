import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchSite } from 'actions'

import ActivityIcon from 'components/ActivityIcon'

class SiteItem extends Component {
  static propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    piFirstName: PropTypes.string,
    piLastName: PropTypes.string,
    phone: PropTypes.string,
    address: PropTypes.string,
    users: PropTypes.array,
    isFetching: PropTypes.bool,
    fetchSite: PropTypes.func
  }

  constructor (props) {
    super(props)
  }

  editSiteItem (ev) {
    ev.preventDefault()

    this.props.fetchSite(this.props.id)
  }

  render () {
    const { isFetching, users } = this.props

    return (
      <tr className="site-container">
        <td className="name">
          <span>{this.props.name}</span>
        </td>
        <td className="principal-investigator">
          <span>{this.props.piFirstName} {this.props.piLastName}</span>
        </td>
        <td className="phone">
          <span>{this.props.phone}</span>
        </td>
        <td className="address">
          <span>{this.props.address}</span>
        </td>
        <td className="assigned-users">
          <span>Assigned User</span>
        </td>
        <td className="action">
          <button type="button" className="btn btn-default btn-edit-site pull-right" onClick={this.editSiteItem.bind(this)} disabled={isFetching}>
            {isFetching
              ? <span><ActivityIcon /></span>
              : <span>Edit</span>
            }
          </button>
        </td>
      </tr>
    )
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.fetchingSite
})
const mapDispatchToProps = {
  fetchSite
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SiteItem)
