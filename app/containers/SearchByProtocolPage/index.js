/*
 *
 * SearchByProtocolPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectSearchByProtocolPage from './selectors';
import ComingSoon from '../../components/ComingSoon';

export class SearchByProtocolPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <ComingSoon />
      </div>
    );
  }
}

const mapStateToProps = selectSearchByProtocolPage();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchByProtocolPage);
