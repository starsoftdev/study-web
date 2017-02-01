/*
 *
 * SponsorManageUsers
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import SponsorManageUsersSearch from 'containers/SponsorManageUsers/SponsorManageUsersSearch';
import SponsorManageUsersAdminsTable from 'containers/SponsorManageUsers/AdminsTable';
import SponsorManageUsersProtocolsTable from 'containers/SponsorManageUsers/ProtocolsTable';

export class SponsorManageUsers extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="container-fluid">
        <section className="manage-sponsor-user">
          <h2 className="main-heading">MANAGE USERS</h2>
          <SponsorManageUsersSearch />
          <SponsorManageUsersAdminsTable />
          <SponsorManageUsersProtocolsTable />
        </section>
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
