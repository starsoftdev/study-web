import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap'
import AddNewCardPanel from '../components/AddNewCard'
import CardsList from './components/CardsList'

class PaymentInformation extends Component {
  constructor (props) {
    super(props)
  }

  state = {
    addNewCardModalOpen: false,
  }

  openAddNewCardModal () {
    this.setState({ addNewCardModalOpen: true })
  }

  closeAddNewCardModal () {
    this.setState({ addNewCardModalOpen: false })
  }

  render () {
    return (
      <div className="payment-information container-fluid">
        <div className="form-group">
          <h2 className="main-heading">Payment Information</h2>
        </div>
        <div className="form-group">
          <div className="additional-actions btns pull-right">
            <button type="button" className="btn btn-primary btn-add-new-card" onClick={this.openAddNewCardModal.bind(this)}>
              <i className="fa fa-plus" aria-hidden="true"></i>
              <span>Add New Card</span>
            </button>
            <Modal className="add-new-card" bsSize="large" show={this.state.addNewCardModalOpen} onHide={this.closeAddNewCardModal.bind(this)}>
              <Modal.Header closeButton>
                <Modal.Title>Add New Card</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <AddNewCardPanel closeModal={this.closeAddNewCardModal.bind(this)} />
              </Modal.Body>
            </Modal>
          </div>
          <div className="clearfix"></div>
        </div>
        <div className="form-group">
          <CardsList />
        </div>
      </div>
    )
  }
}

export default connect(null, null)(PaymentInformation)
