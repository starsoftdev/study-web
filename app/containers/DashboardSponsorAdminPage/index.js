/*
 *
 * DashboardSponsorAdminPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { DashboardSponsorAdminSearch } from './DashboardSponsorAdminSearch/index';
import { DashboardSponsorAdminTable } from './DashboardSponsorAdminTable';
import { fetchSponsors } from './actions';
import { selectDashboardSponsorAdminsSponsors } from './selectors';

export class DashboardSponsorAdminPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    fetchSponsors: PropTypes.func,
    sponsors: PropTypes.object,
  };

  componentWillMount() {
    this.props.fetchSponsors();
  }

  render() {
    console.log(123, this.props)
    return (
      <div className="container-fluid dashboard-sponsor-admin">
        <h2 className="main-heading">Sponsor Admins</h2>

        <DashboardSponsorAdminSearch />
        <DashboardSponsorAdminTable />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  sponsors: selectDashboardSponsorAdminsSponsors(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchSponsors: () => dispatch(fetchSponsors()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardSponsorAdminPage);
