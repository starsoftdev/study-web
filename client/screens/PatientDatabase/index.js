import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap'
import ImportFileForm from 'forms/ImportFile'
import SearchPatientsFormPanel from './components/SearchPatientsFormPanel'
import PatientsList from './components/PatientsList'

import './styles.less'

export default class PatientDatabase extends Component {

  constructor (props) {
    super(props)
  }

  state = {
    importModalOpen: false,
  }

  openImportModal () {
    this.setState({ importModalOpen: true })
  }

  closeImportModal () {
    this.setState({ importModalOpen: false })
  }

  importFile () {
    console.log('Import file!!!')
    this.closeImportModal()
  }

  render () {
    return (
      <div className="patient-database-page">
        <div className="container">
          <div className="row form-group">
            <div className="col-sm-6">
              <h1>Patient Database</h1>
            </div>
            <div className="col-sm-6">
              <div className="additional-actions pull-right">
                <button type="button" className="btn btn-default btn-import" onClick={this.openImportModal.bind(this)}>
                  <i className="fa fa-upload" aria-hidden="true"></i>
                  <span>Import</span>
                </button>
                <Modal className="import-file" show={this.state.importModalOpen} onHide={this.closeImportModal.bind(this)}>
                  <Modal.Header closeButton>
                    <Modal.Title>Import File</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <ImportFileForm onSubmit={this.importFile.bind(this)} />
                  </Modal.Body>
                </Modal>
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
