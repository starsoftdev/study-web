import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import BillingForm from '../../components/BillingForm';

import './styles.less';

export class BillingPage extends Component {

  static propTypes = {
  };

  constructor(props) {
    super(props);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  componentWillReceiveProps(newProps) {
    console.log('componentWillReceiveProps', newProps);
  }

  onSubmitForm(data) {
    console.log('onSubmitForm', data);
  }

  render() {
    return (
      <main id="main">
        <section className="container order-area billing">
          <nav className="add-nav text-center">
            <ul className="list-inline">
              <li>
                <span className="number">1</span>
                <span className="text">SHOPPING CART</span>
              </li>
              <li className="active">
                <span className="number">2</span>
                <span className="text">BILLING</span>
              </li>
            </ul>
          </nav>
          <h1 className="main-heading text-center"><span className="text">BILLING &amp; PAYMENT</span></h1>
          <BillingForm onSubmit={this.onSubmitForm} />
        </section>
      </main>
    );
  }
}

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(BillingPage);
