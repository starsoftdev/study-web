import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Modal } from 'react-bootstrap';
import { map } from 'lodash';

import EditUserForm from 'components/EditUserForm';
import { selectCurrentUserClientId, selectClientSites, selectClientRoles, selectSelectedUser,
  selectDeletedClientRole, selectSavedUser, selectSelectedUserDetailsForForm } from 'containers/App/selectors';
import { clearSelectedUser, deleteClientRole, saveUser } from 'containers/App/actions';
import ClientRoleItem from './ClientRoleItem';
import './styles.less';

class ClientRolesList extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    currentUserClientId: PropTypes.number,
    clientSites: PropTypes.object,
    clientRoles: PropTypes.object,
    selectedUser: PropTypes.object,
    selectedUserDetailsForForm: PropTypes.object,
    deletedClientRole: PropTypes.object,
    savedUser: PropTypes.object,
    clearSelectedUser: PropTypes.func,
    deleteClientRole: PropTypes.func,
    saveUser: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.closeEditUserModal = this.closeEditUserModal.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteClientRole = this.deleteClientRole.bind(this);
  }

  editUserModalShouldBeShown() {
    const { selectedUser } = this.props;
    const displayed = (selectedUser.details && selectedUser.details.roleForClient) ? true: false; // eslint-disable-line

    return displayed;
  }

  closeEditUserModal() {
    this.props.clearSelectedUser();
  }

  updateUser(userData) {
    const { currentUserClientId, selectedUser } = this.props;
    const userInput = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      siteId: parseInt(userData.site, 10),
    };
    if (userData.site === '0') {
      userInput.clientRole = {
        purchase: userData.purchase || false,
        reward: userData.reward || false,
      };
    }

    this.props.saveUser(currentUserClientId, selectedUser.details.id, userInput);
  }

  deleteClientRole() {
    const { selectedUser } = this.props;

    this.props.deleteClientRole(selectedUser.details.roleForClient.id);
  }

  render() {
    const { clientSites, clientRoles, selectedUserDetailsForForm, deletedClientRole } = this.props;
    const clientRolesListContents = clientRoles.details.map((item, index) => (
      <ClientRoleItem {...item} key={index} />
    ));
    const siteOptions = map(clientSites.details, siteIterator => ({ label: siteIterator.name, value: siteIterator.id.toString() }));
    siteOptions.unshift({ label: 'All', value: '0' });

    const editUserModalShown = this.editUserModalShouldBeShown();

    if (clientRoles.details.length > 0) {
      return (
        <div className="row">
          <div className="col-sm-12">
            <div className="table-responsive">
              <table className="table table-striped">
                <caption>ADMINS</caption>
                <thead>
                  <tr>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>ACCESS</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {clientRolesListContents}
                </tbody>
              </table>
            </div>
            <Modal className="edit-user" show={editUserModalShown} onHide={this.closeEditUserModal}>
              <Modal.Header closeButton>
                <Modal.Title>Edit User</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <EditUserForm
                  initialValues={selectedUserDetailsForForm}
                  siteOptions={siteOptions}
                  deleting={deletedClientRole.deleting}
                  onDelete={this.deleteClientRole}
                  onSubmit={this.updateUser}
                />
              </Modal.Body>
            </Modal>
          </div>
        </div>
      );
    }

    return (
      <div>
        <h3>No matching admins found!</h3>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUserClientId: selectCurrentUserClientId(),
  clientSites: selectClientSites(),
  clientRoles: selectClientRoles(),
  selectedUser: selectSelectedUser(),
  selectedUserDetailsForForm: selectSelectedUserDetailsForForm(),
  deletedClientRole: selectDeletedClientRole(),
  savedUser: selectSavedUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    clearSelectedUser: () => dispatch(clearSelectedUser()),
    deleteClientRole: (id) => dispatch(deleteClientRole(id)),
    saveUser: (clientId, id, data) => dispatch(saveUser(clientId, id, data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientRolesList);
