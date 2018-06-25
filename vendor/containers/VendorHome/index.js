/*
 * VendorHome
 *
 */

import React, { Component } from 'react';
import { Link } from 'react-router';

export class VendorHome extends Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <div>
        <div>Vendor Home</div>
        <div><Link to={'/app/vendor/study/1'}>Go to study page</Link></div>
      </div>
    );
  }
}

export default VendorHome;
