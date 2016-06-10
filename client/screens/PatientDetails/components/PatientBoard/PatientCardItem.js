import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

export default class PatientCardItem extends Component {
  static propTypes = {
    item: PropTypes.object
  }
  render () {
    const { item } = this.props
    return (
      <li data-id={item.id} id={item.id}>
        <div><strong>{item.firstName + ' ' + item.lastName}</strong></div>
        <div>{item.email}</div>
        <div>{item.phone}</div>
      </li>
    )
  }
}
