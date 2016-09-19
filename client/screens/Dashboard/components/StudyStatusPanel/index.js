import _ from 'lodash'
import React, { PropTypes } from 'react'
import StudyStatus from '../../components/StudyStatus'

import './styles.less'

class StudyStatusPanel extends React.Component {
  static propTypes = {
    studies: PropTypes.array,
    submitting: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
  }

  render () {
    const {
      studies,
      submitting,
      loading,
    } = this.props

    return (
      <section className="table-holder">
        <header>
          <h2 className="pull-left">STUDY STATUS</h2>
          <div className="text-right text-uppercase links">
            <span className="active">ACTIVE <span className="number">13</span></span>
            <span className="inactive">INACTIVE <span className="number">11</span></span>
            <span className="counter">TOTAL <span className="number">24</span></span>
          </div>
        </header>
        <table className="table">
          <thead>
          <tr>
            <th># <i className="icon-double-triangle"></i></th>
            <th>Indication <i className="icon-double-triangle"></i> </th>
            <th>Location <i className="icon-double-triangle"></i></th>
            <th>Sponsor <i className="icon-double-triangle"></i></th>
            <th>Protocol <i className="icon-double-triangle"></i></th>
            <th>
              <a href="#" data-toggle="tooltip" data-placement="top" title="" className="icon-credit" data-original-title="Patient Messaging Suite"></a>
              <i className="icon-double-triangle"></i>
            </th>
            <th>Status <i className="icon-double-triangle"></i></th>
            <th><span className="small-block">Start</span> Date <i className="icon-double-triangle"></i></th>
            <th><span className="small-block">End</span> Date  <i className="icon-double-triangle"></i></th>
            <th>&nbsp;</th>
          </tr>
          </thead>
          <tbody>
          {studies.map(study => {
            <StudyStatus study={study} />
          })}
          <tr className="tr-active">
            <td>2</td>
            <td>Bipolar Study</td>
            <td>Long Beach, CA </td>
            <td>Mo</td>
            <td>YM12345</td>
            <td className="off">Off</td>
            <td>Active</td>
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
          </tbody>
        </table>
      </section>
  )
  }
  }

export default StudyStatusPanel
