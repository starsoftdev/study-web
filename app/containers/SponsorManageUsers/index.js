/*
 *
 * SponsorManageUsers
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Helmet from 'react-helmet';
import SponsorManageUsersSearch from '../../containers/SponsorManageUsers/SponsorManageUsersSearch';
import SponsorManageUsersAdminsTable from '../../containers/SponsorManageUsers/AdminsTable';
import SponsorManageUsersProtocolsTable from '../../containers/SponsorManageUsers/ProtocolsTable';
import { fetchProtocols } from '../../containers/App/actions';
import { selectCurrentUser, selectProtocols } from '../../containers/App/selectors';
import { fetchManageSponsorUsersData, editSponsorUser, deleteSponsorUser, editProtocol } from '../../containers/SponsorManageUsers/actions';
import { selectManageSponsorUsersData, selectEditSponsorUserFormValues, selectEditProtocolFormValues } from '../../containers/SponsorManageUsers/selectors';

export class SponsorManageUsers extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    currentUser: React.PropTypes.object,
    fetchManageSponsorUsersData: React.PropTypes.func,
    manageSponsorUsersData: React.PropTypes.object,
    formValues: React.PropTypes.object,
    protocols: React.PropTypes.object,
    editSponsorUser: React.PropTypes.func,
    deleteSponsorUser: React.PropTypes.func,
    editProtocolFormValues: React.PropTypes.object,
    editProtocol: React.PropTypes.func,
    fetchProtocols: React.PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.updateData = this.updateData.bind(this);
    this.editUser = this.editUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.editSponsorProtocol = this.editSponsorProtocol.bind(this);
  }

  componentWillMount() {
    this.props.fetchProtocols();
    this.updateData();
  }

  updateData() {
    const { currentUser } = this.props;

    this.props.fetchManageSponsorUsersData({ sponsorRoleId: currentUser.roleForSponsor.id });
  }

  editUser(isNew) {
    const params = {
      isNew,
      userData: {
        firstName: this.props.formValues.firstName,
        lastName: this.props.formValues.lastName,
        email: this.props.formValues.email,
        id: this.props.formValues.id,
      },
      protocols: this.props.formValues.protocols,
      sponsorRoleId: parseInt(this.props.currentUser.roleForSponsor.id),
    };
    this.props.editSponsorUser(params);
  }

  deleteUser() {
    const params = {
      userData: {
        firstName: this.props.formValues.firstName,
        lastName: this.props.formValues.lastName,
        email: this.props.formValues.email,
        id: this.props.formValues.id,
      },
      sponsorRoleId: parseInt(this.props.currentUser.roleForSponsor.id),
    };
    this.props.deleteSponsorUser(params);
  }

  editSponsorProtocol() {
    const params = {
      iwrs: this.props.editProtocolFormValues.iwrs || '',
      irb: this.props.editProtocolFormValues.irb || '',
      file: this.props.editProtocolFormValues.file,
      id: this.props.editProtocolFormValues.id,
      sponsorRoleId: parseInt(this.props.currentUser.roleForSponsor.id),
    };
    this.props.editProtocol(params);
  }

  render() {
    const protocols = this.props.protocols.details;

    return (
      <div className="container-fluid sponsor-portal">
        <Helmet title="Manage Users - StudyKIK" />
        <section className="manage-sponsor-user">
          <h2 className="main-heading">MANAGE USERS</h2>
          <SponsorManageUsersSearch
            editUser={this.editUser}
            formValues={this.props.formValues}
            updateData={this.updateData}
            protocols={protocols}
          />
          <SponsorManageUsersAdminsTable
            manageSponsorUsersData={this.props.manageSponsorUsersData}
            editUser={this.editUser}
            deleteUser={this.deleteUser}
            protocols={protocols}
          />
          <SponsorManageUsersProtocolsTable
            manageSponsorUsersData={this.props.manageSponsorUsersData}
            editUser={this.editUser}
            deleteUser={this.deleteUser}
            editProtocol={this.editSponsorProtocol}
          />
        </section>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
  manageSponsorUsersData: selectManageSponsorUsersData(),
  formValues: selectEditSponsorUserFormValues(),
  editProtocolFormValues: selectEditProtocolFormValues(),
  protocols: selectProtocols(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchManageSponsorUsersData: searchParams => dispatch(fetchManageSponsorUsersData(searchParams)),
    editSponsorUser: params => dispatch(editSponsorUser(params)),
    deleteSponsorUser: params => dispatch(deleteSponsorUser(params)),
    editProtocol: params => dispatch(editProtocol(params)),
    fetchProtocols: () => dispatch(fetchProtocols()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SponsorManageUsers);
