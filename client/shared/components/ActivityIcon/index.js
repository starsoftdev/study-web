import React, { Component, PropTypes } from 'react'

// This component will be used inside buttons as compared to LoadingResults

export default class ActivityIcon extends Component {
  render () {
    return <span><i className="fa fa-repeat fa-spin" />&nbsp;</span>
  }
}
