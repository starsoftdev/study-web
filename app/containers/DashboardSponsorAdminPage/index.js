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
import { fetchSponsors, fetchSponsorsWithoutAdmin } from './actions';
import { selectDashboardSponsorAdminsSponsors, selectDashboardSponsorAdminsSponsorsWithoutAdmin } from './selectors';

export class DashboardSponsorAdminPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    fetchSponsors: PropTypes.func,
    sponsors: PropTypes.object,
    fetchSponsorsWithoutAdmin: PropTypes.func,
    sponsorsWithoutAdmin: PropTypes.object,
  };

  componentWillMount() {
    this.props.fetchSponsors();
    this.props.fetchSponsorsWithoutAdmin();
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
  sponsorsWithoutAdmin: selectDashboardSponsorAdminsSponsorsWithoutAdmin(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchSponsors: () => dispatch(fetchSponsors()),
    fetchSponsorsWithoutAdmin: () => dispatch(fetchSponsorsWithoutAdmin()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardSponsorAdminPage);
