import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { removeCard } from 'actions'
import ActivityIcon from 'components/ActivityIcon'

class CardItem extends Component {
  static propTypes = {
    currentUser: PropTypes.object.isRequired,
    id: PropTypes.string,
    brand: PropTypes.string,
    name: PropTypes.string,
    last4: PropTypes.string,
    exp_month: PropTypes.number,
    exp_year: PropTypes.number,
    isRemoving: PropTypes.bool,
    removeCard: PropTypes.func,
  }

  constructor (props) {
    super(props)
  }

  removeCard () {
    this.props.removeCard(this.props.currentUser.userInfo.roleForClient.client.stripeCustomerId, this.props.id)
  }

  render () {
    const { brand, name, last4, exp_month, exp_year, isRemoving } = this.props
    const expMonthStr = (exp_month < 10)? '0' + exp_month: exp_month.toString() //eslint-disable-line
    const expYearStr = exp_year.toString() //eslint-disable-line
    let brandClassName = ''

    switch (brand) {
      case 'Visa':
        brandClassName = 'brand visa'
        break
      case 'American Express':
        brandClassName = 'brand american-express'
        break
      case 'MasterCard':
        brandClassName = 'brand mastercard'
        break
      case 'Discover':
        brandClassName = 'brand discover'
        break
      case 'JCB':
        brandClassName = 'brand jcb'
        break
      case 'Diners Club':
        brandClassName = 'brand diners-club'
        break
      default:
        brandClassName = 'brand unknown'
    }

    return (
      <tr className="card-container">
        <td className="card-type">
          <span className={brandClassName}></span>
        </td>
        <td className="name-on-card">
          <span>{name}</span>
        </td>
        <td className="last-4-digits">
          <span>{last4}</span>
        </td>
        <td className="expiration-date">
          <span>{expMonthStr}/{expYearStr}</span>
        </td>
        <td className="action">
          <button className="btn btn-primary btn-remove-card pull-right" onClick={this.removeCard.bind(this)} disabled={isRemoving}>
            {isRemoving
              ? <span><ActivityIcon /></span>
              : <span>Remove</span>
            }
          </button>
        </td>
      </tr>
    )
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.authorization.authData,
  isRemoving: state.removingCard,
})
const mapDispatchToProps = {
  removeCard,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardItem)
