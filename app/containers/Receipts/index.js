/*
 *
 * Receipts
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import selectReceipts from './selectors';
import './styles.less';

export class Receipts extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
      <Helmet
        title="Receipts"
        meta={[
          { name: 'description', content: 'Description of Receipts' },
        ]}
      />
      </div>
    );
  }
}

const mapStateToProps = selectReceipts();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Receipts);
