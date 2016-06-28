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
        <div className="row">
          <div className="col-sm-12">
            <h3>Sites</h3>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>SITE NAME</th>
                    <th>PRINCIPAL INVESTIGATOR</th>
                    <th>SITE PHONE</th>
                    <th>SITE ADDRESS</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {listContents}
                </tbody>
              </table>
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
