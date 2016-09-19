/**
 * Created by mike on 9/18/16.
 */

'use strict'

import classNames from 'classnames'

import React from "react"

class StudyStatus extends React.Component {
  static propTypes = {
    study: React.PropTypes.object.isRequired
  }

  componentDidMount() {
    this.state = {
      mouseOver: false
    }
    this.onFocus = this.onFocus.bind(this)
    this.onBlur = this.onBlur.bind(this)
  }

  onFocus() {
    this.setState({
      mouseOver: true
    })
  }

  onBlur() {
    this.setState({
      mouseOver: false
    })
  }


  render() {
    const {study} = this.props
    return (
      <tr className={classNames({"tr-active": true})} onFocus={this.onFocus} onBlur={this.onBlur}>
        <td>{study.id}</td>
        <td>{study.name}</td>
        <td>Long Beach, CA </td>
        <td>Mo</td>
        <td>YM12345</td>
        <td>On <span className="counter-circle">2</span></td>
        <td><span className="inactive">Inactive</span></td>
        <td>01/01/16</td>
        <td>02/02/16</td>
        <td>
          <div className="btns-slide">
            <div className="btns">
              <a href="/studies/1" className="btn btn-default">View Patients</a>
              <a href="#renew-study" className="btn btn-primary lightbox-opener">Renew</a>
              <a href="#upgrade-study" className="btn btn-danger lightbox-opener">Upgrade</a>
              <a href="#edit-info" className="btn btn-info lightbox-opener">Edit</a>
            </div>
          </div>
        </td>
      </tr>
    )
  }
}

export default StudyStatus
