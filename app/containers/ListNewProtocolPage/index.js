/*
 *
 * ListNewProtocolPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ComingSoon } from '../../components/ComingSoon';

import Helmet from 'react-helmet';

import {
  selectUserRoleType,
} from '../../containers/App/selectors';

export class ListNewProtocolPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    userRoleType: PropTypes.string,
  }

  render() {
    const { userRoleType } = this.props;
    return (
      <div>
        {
          userRoleType === 'sponsor' &&
          <div>
            <Helmet title="List New Protocol - StudyKIK" />
            <ComingSoon />
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  userRoleType: selectUserRoleType(),
});

function mapDispatchToProps() {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListNewProtocolPage);
