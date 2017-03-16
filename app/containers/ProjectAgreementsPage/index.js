/*
 *
 * ProjectAgreementsPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import selectProjectAgreementsPage from './selectors';
import ComingSoon from '../../components/ComingSoon';

export class ProjectAgreementsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet title="Receipts & Project Agreements - StudyKIK" />
        <ComingSoon />
      </div>
    );
  }
}

const mapStateToProps = selectProjectAgreementsPage();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectAgreementsPage);
