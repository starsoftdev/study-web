/*
 *
 * SearchByProtocolPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import selectSearchByProtocolPage from './selectors';
import ComingSoon from '../../components/ComingSoon';

export class SearchByProtocolPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet title="Find Out How Many Sites Are Listing Your Protocol - StudyKIK" />
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
