import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import SiteItem from './SiteItem'

import './styles.less'

export default class SitesList extends Component {

  static propTypes = {
    sites: PropTypes.array
  }

  render () {
    const { sites } = this.props

    const listContents = sites.map((item, index) => (
      <SiteItem {...item} key={index} />
    ))

    if (sites.length > 0) {
      return (
        <div className="sites">
          <div className="container">
            <div className="row">
              {listContents}
            </div>
          </div>
        </div>
      )
    } else {
      return <div />
    }
  }
}

const mapStateToProps = (state) => ({
  sites: state.sites
})
const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SitesList)
