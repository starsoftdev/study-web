/*
 *
 * PaymentInformationPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

export class PaymentInformationPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <div className="container-fluid">

        <section className="payment-information">
          <h2 className="main-heading">PAYMENT INFORMATION</h2>
        </section>
      </div>

    );
  }
}

const mapStateToProps = createStructuredSelector({

});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentInformationPage);

