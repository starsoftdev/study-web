import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Modal } from 'react-bootstrap';
import { map, cloneDeep } from 'lodash';

import CenteredModal from '../../components/CenteredModal/index';
import EditUserForm from '../../components/EditUserForm';
import { selectCurrentUserClientId, selectClientSites, selectClientRoles, selectSelectedUser,
  selectDeletedClientRole, selectSavedUser, selectSelectedUserDetailsForForm } from '../../containers/App/selectors';
import { clearSelectedUser, deleteClientRole, saveUser } from '../../containers/App/actions';
import ClientRoleItem from './ClientRoleItem';

class ClientRolesList extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    currentUserClientId: PropTypes.number,
    clientSites: PropTypes.object,
    clientRoles: PropTypes.object,
    filterMethod: PropTypes.func,
    selectedUser: PropTypes.object,
    selectedUserDetailsForForm: PropTypes.object,
    deletedClientRole: PropTypes.object,
    savedUser: PropTypes.object,
    clearSelectedUser: PropTypes.func,
    deleteClientRole: PropTypes.func,
    saveUser: PropTypes.func,
    currentUser: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.closeEditUserModal = this.closeEditUserModal.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteClientRole = this.deleteClientRole.bind(this);

    this.state = {
      sortBy: null,
      sortOrder: null,
    };
  }

  getColumnSortClassName(columnName) {
    if (this.state.sortBy === columnName) {
      if (this.state.sortOrder === 'asc') {
        return 'up';
      }

      return 'down';
    }

    return null;
  }

  getListItemSortByValue(item) {
    const sortBy = this.state.sortBy;
    if (sortBy === 'name') {
      return item.user.firstName;
    } else if (sortBy === 'email') {
      return item.user.email;
    } else if (sortBy === 'access') {
      const { name, canRedeemRewards, canPurchase } = item;
      let accessStr = '';
      const isSuperAdmin = (name === 'Super Admin');
      if (isSuperAdmin) {
        accessStr = 'ADMIN';
      } else if (canPurchase && canRedeemRewards) {
        accessStr = 'ALL ACCESS';
      } else if (canPurchase && !canRedeemRewards) {
        accessStr = 'PURCHASE';
      } else if (!canPurchase && canRedeemRewards) {
        accessStr = 'REWARDS';
      } else {
        accessStr = 'NO ACCESS';
      }
      return accessStr;
    }

    return null;
  }

  getSortedClientRoles() {
    const { clientRoles } = this.props;
    const listItems = cloneDeep(clientRoles.details);

    const nListItems = listItems.sort((a, b) => {
      if (a.name === 'Super Admin') {
        return -1;
      } else if (b.name === 'Super Admin') {
        return 1;
      }
      return 0;
    });

    if (!this.state.sortBy) {
      return nListItems;
    }

    const sortOrder = this.state.sortOrder;
    const sortedListItems = nListItems.sort((a, b) => {
      if (a.name === 'Super Admin') {
        return -1;
      } else if (b.name === 'Super Admin') {
        return 1;
      }
      if (this.getListItemSortByValue(a) < this.getListItemSortByValue(b)) {
        return (sortOrder === 'asc') ? -1 : 1;
      } else if (this.getListItemSortByValue(a) > this.getListItemSortByValue(b)) {
        return (sortOrder === 'asc') ? 1 : -1;
      }

      return 0;
    });

    return sortedListItems;
  }

  clickSortHandler(columnName) {
    if (this.state.sortBy !== columnName) {
      this.setState({
        sortBy: columnName,
        sortOrder: 'asc',
      });
    } else if (this.state.sortOrder === 'asc') {
      this.setState({
        sortOrder: 'des',
      });
    } else if (this.state.sortOrder === 'des') {
      this.setState({
        sortBy: null,
        sortOrder: null,
      });
    }
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
    };
    if (userData.isAdmin) {
      userInput.clientRole = {
        siteId: parseInt(userData.site, 10),
        canPurchase: userData.canPurchase || false,
        canRedeemRewards: userData.canRedeemRewards || false,
      };
    } else {
      userInput.clientRole = {
        siteId: parseInt(userData.site, 10),
      };
    }

    this.props.saveUser(currentUserClientId, selectedUser.details.id, userInput);
  }

  deleteClientRole() {
    const { selectedUser } = this.props;

    this.props.deleteClientRole(selectedUser.details.roleForClient.id);
  }

  render() {
    const { clientSites, selectedUserDetailsForForm, deletedClientRole, filterMethod, selectedUser, currentUser } = this.props;
    let bDisabled = true;
    if (currentUser && currentUser.roleForClient) {
      bDisabled = (currentUser.roleForClient.canPurchase || currentUser.roleForClient.canRedeemRewards || currentUser.roleForClient.name === 'Super Admin') ? null : true;
    }
    const sortedClientRoles = this.getSortedClientRoles();
    const clientRolesListContents = sortedClientRoles.filter(filterMethod).map((item, index) => (
      item.canPurchase || item.canRedeemRewards || item.name === 'Super Admin' ? <ClientRoleItem {...item} key={index} bDisabled={bDisabled} /> : null
    )
    );
    const siteOptions = map(clientSites.details, siteIterator => ({ label: siteIterator.name, value: siteIterator.id.toString() }));
    siteOptions.unshift({ label: 'All', value: '0' });
    let siteLocation = (selectedUser && selectedUser.details && selectedUser.details.roleForClient) ? selectedUser.details.roleForClient.site_id : null;
    let cPurchasable = false;
    let cRedeemable = false;
    if (selectedUser && selectedUser.details && selectedUser.details.roleForClient) {
      if (selectedUser.details.roleForClient.canPurchase || selectedUser.details.roleForClient.canRedeemRewards || selectedUser.details.roleForClient.name === 'Super Admin') {
        siteLocation = 0;
        cPurchasable = selectedUser.details.roleForClient.canPurchase;
        cRedeemable = selectedUser.details.roleForClient.canRedeemRewards;
      }
    }
    const editUserModalShown = this.editUserModalShouldBeShown();

    return (
      <div className="client-roles">
        <div className="row">
          <div className="col-sm-12">
            <div className="table-responsive">
              <table className="table">
                <caption>ADMINS</caption>
                <thead>
                  <tr>
                    <th className={this.getColumnSortClassName('name')} onClick={() => { this.clickSortHandler('name'); }}>
                      <span>NAME</span>
                      <i className="caret-arrow" />
                    </th>
                    <th className={this.getColumnSortClassName('email')} onClick={() => { this.clickSortHandler('email'); }}>
                      <span>EMAIL</span>
                      <i className="caret-arrow" />
                    </th>
                    <th className={this.getColumnSortClassName('access')} onClick={() => { this.clickSortHandler('access'); }}>
                      <span>ACCESS</span>
                      <i className="caret-arrow" />
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {sortedClientRoles.length > 0 && clientRolesListContents}
                </tbody>
              </table>
            </div>
            <Modal
              className="edit-user"
              id="edit-user"
              dialogComponentClass={CenteredModal}
              show={editUserModalShown}
              onHide={this.closeEditUserModal}
              backdrop
              keyboard
            >
              <Modal.Header>
                <Modal.Title>Edit User</Modal.Title>
                <a className="lightbox-close close" onClick={this.closeEditUserModal}>
                  <i className="icomoon-icon_close" />
                </a>
              </Modal.Header>
              <Modal.Body>
                <div className="holder clearfix">
                  <div className="form-lightbox">
                    <EditUserForm
                      initialValues={selectedUserDetailsForForm}
                      siteOptions={siteOptions}
                      deleting={deletedClientRole.deleting}
                      onDelete={this.deleteClientRole}
                      onSubmit={this.updateUser}
                      newSiteLocation={siteLocation}
                      Purchase={cPurchasable}
                      Redeem={cRedeemable}
                      isEdit
                    />
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </div>
        </div>
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
