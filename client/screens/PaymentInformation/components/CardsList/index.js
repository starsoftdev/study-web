import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchCards } from 'actions'
import CardItem from './CardItem'
import ActivityIcon from 'components/ActivityIcon'

class CardsList extends Component {
  static propTypes = {
    currentUser: PropTypes.object.isRequired,
    fetchingCards: PropTypes.bool,
    cards: PropTypes.object,
    fetchCards: PropTypes.func,
  }

  constructor (props) {
    super(props)
    this.props.fetchCards(this.props.currentUser.userInfo.roleForClient.client.stripeCustomerId)
  }

  render () {
    const {
      fetchingCards,
      cards,
      } = this.props

    if (fetchingCards) {
      return (
        <span><ActivityIcon /></span>
      )
    }

    if (!cards || !cards.data || cards.data.length === 0) {
      return (
        <span>No cards found!</span>
      )
    }

    const cardsListContents = cards.data.map((item, index) => (
      <CardItem {...item} key={index} />
    ))

    return (
      <div className="table-responsive cards-list">
        <table className="table">
          <caption>MANAGE PAYMENT METHODS</caption>
          <thead>
          <tr>
            <th>CARD TYPE</th>
            <th>NAME ON CARD</th>
            <th>LAST 4 DIGITS ON CARD</th>
            <th>EXPIRATION DATE</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
            {cardsListContents}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.authorization.authData,
  fetchingCards: state.fetchingCards,
  cards: state.cards,
})
const mapDispatchToProps = {
  fetchCards,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardsList)
