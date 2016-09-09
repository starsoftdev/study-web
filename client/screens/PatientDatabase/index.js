import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap'
import ImportFileForm from 'forms/ImportFile'
import SearchPatientsFormPanel from './components/SearchPatientsFormPanel'
import PatientsList from './components/PatientsList'

class PatientDatabase extends Component {

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
      <div className="patient-database container-fluid">
        <div className="form-group">
          <h2 className="main-heading">Patient Database</h2>
        </div>
        <div className="form-group">
          <div className="additional-actions btns pull-right">
            <button type="button" className="btn btn-primary btn-blast">
              <i className="fa fa-comments-o" aria-hidden="true"></i>
              <span>Text/Email Blast</span>
            </button>
            <button type="button" className="btn btn-primary btn-import" onClick={this.openImportModal.bind(this)}>
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
            <button type="button" className="btn btn-primary btn-download">
              <i className="fa fa-download" aria-hidden="true"></i>
              <span>Download</span>
            </button>
          </div>
          <div className="clearfix"></div>
        </div>
        <div className="form-group">
          <SearchPatientsFormPanel />
        </div>
        <div className="form-group">
          <PatientsList />
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
