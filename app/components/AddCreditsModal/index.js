/**
*
* AddCreditsModal
*
*/

import React from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ReactSelect from 'components/Input/ReactSelect';
import { Field, reduxForm } from 'redux-form';

import CenteredModal from '../../components/CenteredModal/index';
import ShoppingCartForm from 'components/ShoppingCartForm';
import { fetchSites, addCredits, getCreditsPrice } from 'containers/App/actions';
import { selectSiteLocations, selectCurrentUser, selectAddCredits, selectCreditsPrice } from 'containers/App/selectors';

@reduxForm({ form: 'addCredits', validate: null })
@connect(mapStateToProps)
class AddCreditsModal extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    showModal: React.PropTypes.bool,
    siteLocations: React.PropTypes.array,
    fetchSites: React.PropTypes.func,
    closeModal: React.PropTypes.func,
    addCredits: React.PropTypes.func,
    currentUser: React.PropTypes.object,
    addCreditsOperation: React.PropTypes.object,
    getCreditsPrice: React.PropTypes.func,
    creditsPrice: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.incQuantity = this.incQuantity.bind(this);
    this.decQuantity = this.decQuantity.bind(this);
    this.addCreditsSubmit = this.addCreditsSubmit.bind(this);
    this.handleSiteLocationChoose = this.handleSiteLocationChoose.bind(this);

    this.state = {
      site: null,
      quantity: 1,
      credits: 0,
      total: 0,
      price: 0,
    };
  }

  componentDidMount() {
    this.props.fetchSites();
    this.props.getCreditsPrice();
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.addCreditsOperation.adding && this.props.addCreditsOperation.adding) {
      this.props.closeModal();
    }
    if (newProps.creditsPrice.price && !this.props.creditsPrice.price) {
      this.setState({
        quantity: 1,
        credits: newProps.creditsPrice.attributes.amount,
        price: newProps.creditsPrice.price,
      });
    }
  }

  handleSiteLocationChoose(e) {
    this.setState({
      site: e,
    });
  }

  incQuantity() {
    if (this.state.quantity < 999) {
      this.setState({
        quantity: this.state.quantity + 1,
        credits: (this.state.quantity + 1) * this.props.creditsPrice.attributes.amount,
        total: (this.state.quantity + 1) * this.props.creditsPrice.price,
      });
    }
  }

  decQuantity() {
    if (this.state.quantity > 1) {
      this.setState({
        quantity: this.state.quantity - 1,
        credits: (this.state.quantity - 1) * this.props.creditsPrice.attributes.amount,
        total: (this.state.quantity - 1) * this.props.creditsPrice.price,
      });
    }
  }

  addCreditsSubmit(cartValues) {
    const data = {
      quantity: this.state.quantity,
      totalAmount: this.state.quantity * this.props.creditsPrice.price,
      cardId: cartValues.creditCard,
      username: this.props.currentUser.username,
      userId: this.props.currentUser.id,
      site: this.state.site,
    };

    this.props.addCredits(this.props.currentUser.roleForClient.client.stripeCustomerId, data);
  }


  render() {
    const { siteLocations } = this.props;
    const products = [
      {
        title: '100 Credits',
        quantity: this.state.quantity,
        price: this.state.price,
        total: this.state.quantity * this.props.creditsPrice.price,
      },
    ];
    return (
      <div>
        <Modal
          className="add-credits"
          id="add-credits"
          dialogComponentClass={CenteredModal}
          show={this.props.showModal}
          onHide={this.props.closeModal}
          backdrop
          keyboard
        >
          <Modal.Header>
            <Modal.Title>Add Credits</Modal.Title>
            <a className="lightbox-close close" onClick={this.props.closeModal}>
              <i className="icomoon-icon_close" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <div className="holder clearfix">
              <div className="form-study">
                <div className="pull-left col">
                  <div className="scroll jcf--scrollable">
                    <div className="holder-inner">
                      <div className="form-fields">

                        <div className="field-row">
                          <strong className="label required"><label>Site Location</label></strong>
                          <Field
                            name="siteLocation"
                            component={ReactSelect}
                            placeholder="Select Site Location"
                            options={siteLocations}
                            className="field"
                            onChange={this.handleSiteLocationChoose}
                          />
                        </div>

                        <div className="field-row overflow">
                          <span className="message">
                            Location selection will appear on invoice for accounting purposes.
                            Credits are added to all accounts.
                          </span>
                        </div>

                        <div className="field-row">
                          <strong className="label required"><label htmlFor="quantity">QUANTITY</label></strong>
                          <div className="field">
                            <span className="jcf-number parent-active">
                              <input type="number" value={this.state.quantity} id="quantity" className="form-control jcf-real-element field-active" readOnly />
                              <span className="jcf-btn-inc" onClick={this.incQuantity} />
                              <span className="jcf-btn-dec" onClick={this.decQuantity} />
                            </span>
                          </div>
                        </div>

                        <div className="field-row">
                          <strong className="label"><label htmlFor="credits">CREDITS</label></strong>
                          <div className="field">
                            <input className="form-control" value={this.state.credits} type="text" id="credits" name="credits" disabled />
                          </div>
                        </div>

                        <div className="field-row">
                          <strong className="label"><label htmlFor="price">PRICE</label></strong>
                          <div className="field">
                            <input className="form-control" value={`$${(this.state.quantity * this.props.creditsPrice.price) / 100}`} type="text" id="price" name="price" disabled />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pull-left col">
                  <ShoppingCartForm showCards noBorder onSubmit={this.addCreditsSubmit} addOns={products} />
                </div>
              </div>

            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  siteLocations : selectSiteLocations(),
  currentUser: selectCurrentUser(),
  addCreditsOperation: selectAddCredits(),
  creditsPrice: selectCreditsPrice(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchSites:       () => dispatch(fetchSites()),
    addCredits: (customerId, data) => dispatch(addCredits(customerId, data)),
    getCreditsPrice: () => dispatch(getCreditsPrice()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCreditsModal);
