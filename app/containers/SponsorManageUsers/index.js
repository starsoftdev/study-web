/*
 *
 * SponsorManageUsers
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

export class SponsorManageUsers extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        test
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SponsorManageUsers);
