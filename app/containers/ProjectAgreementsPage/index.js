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
import { translate } from '../../../common/utilities/localization';

export class ProjectAgreementsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet title={translate('portals.page.projectAgreementsPage.helmetTitle')} />
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
