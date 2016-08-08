import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap'
import DocumentTitle from 'react-document-title'
import SearchPatientsFormPanel from './components/SearchPatientsFormPanel'
import PatientsList from './components/PatientsList'

import './styles.less'

export default class PatientDatabase extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    return (
      <DocumentTitle title="Patient Database">
        <div className="patient-database-page">
          <div className="container">
            <div className="row form-group">
              <div className="col-sm-12">
                <h1>Patient Database</h1>
              </div>
            </div>
            <div className="row form-group">
              <div className="col-sm-12">
                <SearchPatientsFormPanel />
              </div>
            </div>
            <div className="row form-group">
              <div className="col-sm-12">
                <PatientsList />
              </div>
            </div>
          </div>
        </div>
      </DocumentTitle>
    )
  }
}

const mapStateToProps = (state) => ({
})
const mapDispatchToProps = {
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientDatabase)
