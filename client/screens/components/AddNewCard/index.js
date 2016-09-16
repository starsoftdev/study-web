import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { saveCard } from 'actions'
import AddNewCardForm from 'forms/AddNewCard'

class AddNewCardPanel extends Component {

  static propTypes = {
    currentUser: PropTypes.object.isRequired,
    savingCard: PropTypes.bool,
    saveCard: PropTypes.func,
    closeModal: PropTypes.func,
  }

  constructor (props) {
    super(props)
  }

  saveCard (params) {
    this.props.saveCard(this.props.currentUser.userInfo.roleForClient.client.stripeCustomerId, params)
    this.props.closeModal()
  }

  render () {
    return (
      <div className="add-new-card-panel">
        <AddNewCardForm submitting={this.props.savingCard} onSubmit={this.saveCard.bind(this)} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.authorization.authData,
  savingCard: state.savingCard,
})

const mapDispatchToProps = {
  saveCard,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddNewCardPanel)

