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
import { selectCurrentUser } from '../../containers/App/selectors';
import { fetchManageSponsorUsersData, editSponsorUser, deleteSponsorUser, editProtocol } from '../../containers/SponsorManageUsers/actions';
import { selectManageSponsorUsersData, selectEditSponsorUserFormValues, selectEditProtocolFormValues, selectProtocols } from '../../containers/SponsorManageUsers/selectors';
import { translate } from '../../../common/utilities/localization';

export class SponsorManageUsers extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    currentUser: React.PropTypes.object,
    fetchManageSponsorUsersData: React.PropTypes.func,
    manageSponsorUsersData: React.PropTypes.object,
    formValues: React.PropTypes.object,
    protocols: React.PropTypes.array,
    editSponsorUser: React.PropTypes.func,
    deleteSponsorUser: React.PropTypes.func,
    editProtocolFormValues: React.PropTypes.object,
    editProtocol: React.PropTypes.func,
    fetchProtocols: React.PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      adminFilterMethod: () => true,
      protocolFilterMethod: () => true,
      adminName: '',
    };

    this.updateData = this.updateData.bind(this);
    this.editUser = this.editUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.editSponsorProtocol = this.editSponsorProtocol.bind(this);
    this.filterAdmins = this.filterAdmins.bind(this);
    this.filterProtocols = this.filterProtocols.bind(this);
  }

  componentWillMount() {
    const { currentUser, fetchProtocols } = this.props;
    if (currentUser.roleForSponsor) {
      fetchProtocols(currentUser.roleForSponsor.id);
      this.updateData();
    }
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
      id: this.props.editProtocolFormValues.protocolId,
      sponsorRoleId: parseInt(this.props.currentUser.roleForSponsor.id),
    };
    this.props.editProtocol(params);
  }

  filterAdmins(searchQuery) {
    if (searchQuery !== '') {
      this.setState({
        adminFilterMethod: (admin) => {
          const fullName = `${admin.first_name} ${admin.last_name}`;
          return fullName.toUpperCase().includes(searchQuery.toUpperCase()) || admin.email.toUpperCase().includes(searchQuery.toUpperCase());
        },
        adminName: searchQuery,
      });
    } else {
      this.setState({
        adminFilterMethod: () => true,
        adminName: '',
      });
    }
  }

  filterProtocols(searchQuery) {
    if (searchQuery !== '' && searchQuery) {
      this.setState({
        protocolFilterMethod: (protocol) => protocol.protocolNumber.toUpperCase().includes(searchQuery.toUpperCase())
        ,
      });
    } else {
      this.setState({
        protocolFilterMethod: () => true,
      });
    }
  }

  render() {
    const protocols = this.props.protocols;
    return (
      <div className="container-fluid sponsor-portal">
        <Helmet title="Manage Users - StudyKIK" />
        <section className="manage-sponsor-user">
          <h2 className="main-heading">{translate('client.page.patientDatabase.mainHeading')}</h2>
          <SponsorManageUsersSearch
            editUser={this.editUser}
            formValues={this.props.formValues}
            updateData={this.updateData}
            protocols={protocols}
            currentUser={this.props.currentUser}
            filterAdmins={(searchQuery) => { this.filterAdmins(searchQuery); }}
            filterProtocols={(searchQuery) => { this.filterProtocols(searchQuery); }}
          />
          <SponsorManageUsersAdminsTable
            manageSponsorUsersData={this.props.manageSponsorUsersData}
            editUser={this.editUser}
            deleteUser={this.deleteUser}
            protocols={protocols}
            currentUser={this.props.currentUser}
            filterMethod={this.state.adminFilterMethod}
          />
          <SponsorManageUsersProtocolsTable
            manageSponsorUsersData={this.props.manageSponsorUsersData}
            editUser={this.editUser}
            deleteUser={this.deleteUser}
            editProtocol={this.editSponsorProtocol}
            protocols={protocols}
            currentUser={this.props.currentUser}
            filterMethod={this.state.protocolFilterMethod}
            userFilterQuery={this.state.adminName}
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
    fetchProtocols: (sponsorRoleId) => dispatch(fetchProtocols(null, sponsorRoleId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SponsorManageUsers);
