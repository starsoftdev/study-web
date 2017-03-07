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
import { fetchSponsors, fetchSponsorsWithoutAdmin, fetchUsersByRoles, addSponsorAdmin, editSponsorAdmin, deleteSponsorAdmin, setActiveSort } from './actions';
import {
  selectDashboardSponsorAdminsSponsors,
  selectDashboardSponsorAdminsSponsorsWithoutAdmin,
  selectDashboardSponsorAdminsUsersByRoles,
  selectDashboardEditUserProcess,
  selectPaginationOptions,
  selectDashboardSponsorAdminSearchFormValues,
} from './selectors';

export class DashboardSponsorAdminPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    fetchSponsors: PropTypes.func,
    sponsors: PropTypes.object,
    fetchSponsorsWithoutAdmin: PropTypes.func,
    sponsorsWithoutAdmin: PropTypes.object,
    fetchUsersByRoles: PropTypes.func,
    usersByRoles: PropTypes.object,
    addSponsorAdmin: PropTypes.func,
    editUserProcess: PropTypes.object,
    editSponsorAdmin: PropTypes.func,
    deleteSponsorAdmin: PropTypes.func,
    paginationOptions: PropTypes.object,
    sponsorAdminSearchFormValues: PropTypes.object,
    setActiveSort: PropTypes.func,
  };

  componentWillMount() {
    this.props.fetchSponsors();
    this.props.fetchSponsorsWithoutAdmin();
    this.props.fetchUsersByRoles();
  }

  render() {
    return (
      <div className="container-fluid dashboard-sponsor-admin">
        <h2 className="main-heading">Sponsor Admins</h2>

        <DashboardSponsorAdminSearch
          sponsorsWithoutAdmin={this.props.sponsorsWithoutAdmin}
          usersByRoles={this.props.usersByRoles}
          addSponsorAdmin={this.props.addSponsorAdmin}
          editUserProcess={this.props.editUserProcess}
        />
        <DashboardSponsorAdminTable
          sponsors={this.props.sponsors}
          sponsorsWithoutAdmin={this.props.sponsorsWithoutAdmin}
          usersByRoles={this.props.usersByRoles}
          editUserProcess={this.props.editUserProcess}
          editSponsorAdmin={this.props.editSponsorAdmin}
          deleteSponsorAdmin={this.props.deleteSponsorAdmin}
          paginationOptions={this.props.paginationOptions}
          sponsorAdminSearchFormValues={this.props.sponsorAdminSearchFormValues}
          setActiveSort={this.props.setActiveSort}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  sponsors: selectDashboardSponsorAdminsSponsors(),
  sponsorsWithoutAdmin: selectDashboardSponsorAdminsSponsorsWithoutAdmin(),
  usersByRoles: selectDashboardSponsorAdminsUsersByRoles(),
  editUserProcess: selectDashboardEditUserProcess(),
  paginationOptions: selectPaginationOptions(),
  sponsorAdminSearchFormValues: selectDashboardSponsorAdminSearchFormValues(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchSponsors: () => dispatch(fetchSponsors()),
    fetchSponsorsWithoutAdmin: () => dispatch(fetchSponsorsWithoutAdmin()),
    fetchUsersByRoles: () => dispatch(fetchUsersByRoles()),
    addSponsorAdmin: (payload) => dispatch(addSponsorAdmin(payload)),
    editSponsorAdmin: (payload) => dispatch(editSponsorAdmin(payload)),
    deleteSponsorAdmin: (payload) => dispatch(deleteSponsorAdmin(payload)),
    setActiveSort: (sort, direction) => dispatch(setActiveSort(sort, direction)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardSponsorAdminPage);
