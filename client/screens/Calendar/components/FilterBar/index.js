import React, { Component, PropTypes } from 'react'
import Select from 'react-select'
import _ from 'lodash'

import 'react-select/less/default.less'

class FilterBar extends Component {
  static propTypes = {
    siteLocationOptions: PropTypes.array.isRequired,
    indicationOptions: PropTypes.array.isRequired,
    protocolOptions: PropTypes.array.isRequired,
    filter: PropTypes.object.isRequired,
    updateFilter: PropTypes.func.isRequired,
  }

  handleFilterChange = (field, ev) => {
    const newValue = ev ? ev.value : ''

    this.props.updateFilter (field, newValue)
  }

  render () {
    const {
      siteLocationOptions,
      indicationOptions,
      protocolOptions,
      filter,
    } = this.props

    return (
      <div className="filter-bar row">
        <div className="col-sm-3">
          <input className="search-box" type="text" placeholder="Search" onChange={(ev) => this.handleFilterChange('patientName', ev.target)} />
        </div>
        <div className="col-sm-3">
          <Select
            value={filter.siteLocation}
            options={siteLocationOptions}
            placeholder="--Select Site Location--"
            onChange={(ev) => this.handleFilterChange('siteLocation', ev)}
          />
        </div>
        <div className="col-sm-3">
          <Select
            value={filter.indication}
            options={indicationOptions}
            placeholder="--Select Indication--"
            onChange={(ev) => this.handleFilterChange('indication', ev)}
          />
        </div>
        <div className="col-sm-3">
          <Select
            value={filter.protocol}
            options={protocolOptions}
            placeholder="--Select Protocol--"
            onChange={(ev) => this.handleFilterChange('protocol', ev)}
          />
        </div>
      </div>
    )
  }
}

export default FilterBar
