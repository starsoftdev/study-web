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
              <div className="col-sm-6">
                <h1>Patient Database</h1>
              </div>
              <div className="col-sm-6">
                <div className="additional-actions pull-right">
                  <button type="button" className="btn btn-default btn-import">
                    <i className="fa fa-upload" aria-hidden="true"></i>
                    <span>Import</span>
                  </button>
                  <button type="button" className="btn btn-default btn-download">
                    <i className="fa fa-download" aria-hidden="true"></i>
                    <span>Download</span>
                  </button>
                </div>
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
