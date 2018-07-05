/*
 * VendorHome
 *
 */

import React, { Component } from 'react';
import { Link } from 'react-router';

export class VendorStudyPage extends Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <div>
        <div>Vendor Study Page</div>
        <div><Link to={'/app/vendor'}>Go to home page</Link></div>
      </div>
    );
  }
}

export default VendorStudyPage;
