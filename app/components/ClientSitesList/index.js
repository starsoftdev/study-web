import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Modal } from 'react-bootstrap';
import { map } from 'lodash';

import EditSiteForm from 'components/EditSiteForm';
import EditUserForm from 'components/EditUserForm';
import { selectCurrentUserClientId, selectClientSites, selectSelectedSite,
  selectSelectedSiteDetailsForForm, selectSelectedUser, selectSelectedUserDetailsForForm,
  selectDeletedUser, selectSavedSite, selectSavedUser } from 'containers/App/selectors';
import { clearSelectedSite, clearSelectedUser,
  deleteUser, saveSite, saveUser } from 'containers/App/actions';
import ClientSiteItem from './ClientSiteItem';
import './styles.less';

class ClientSitesList extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    currentUserClientId: PropTypes.number,
    clientSites: PropTypes.object,
    selectedSite: PropTypes.object,
    selectedSiteDetailsForForm: PropTypes.object,
    selectedUser: PropTypes.object,
    selectedUserDetailsForForm: PropTypes.object,
    deletedUser: PropTypes.object,
    savedSite: PropTypes.object,
    savedUser: PropTypes.object,
    clearSelectedSite: PropTypes.func,
    clearSelectedUser: PropTypes.func,
    deleteUser: PropTypes.func,
    saveSite: PropTypes.func,
    saveUser: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.closeEditSiteModal = this.closeEditSiteModal.bind(this);
    this.closeEditUserModal = this.closeEditUserModal.bind(this);
    this.updateSite = this.updateSite.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  editSiteModalShouldBeShown() {
    const { selectedSite } = this.props;
    const displayed = (selectedSite.details) ? true: false; // eslint-disable-line

    return displayed;
  }

  editUserModalShouldBeShown() {
    const { selectedUser } = this.props;
    const displayed = (selectedUser.details && !selectedUser.details.roleForClient) ? true : false; // eslint-disable-line

    return displayed;
  }

  closeEditSiteModal() {
    this.props.clearSelectedSite();
  }

  closeEditUserModal() {
    this.props.clearSelectedUser();
  }

  updateSite(siteData) {
    const { currentUserClientId, selectedSite } = this.props;

    this.props.saveSite(currentUserClientId, selectedSite.details.id, siteData);
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

  deleteUser() {
    const { selectedUser } = this.props;

    this.props.deleteUser(selectedUser.details.id);
  }

  render() {
    const { clientSites, selectedSiteDetailsForForm, selectedUserDetailsForForm, deletedUser } = this.props;
    const clientSitesListContents = clientSites.details.map((item, index) => (
      <ClientSiteItem {...item} key={index} />
    ));
    let siteOptions = map(clientSites.details, siteIterator => ({ label: siteIterator.name, value: siteIterator.id.toString() }));
    siteOptions.unshift({ label: 'All', value: '0' });

    const editSiteModalShown = this.editSiteModalShouldBeShown();
    const editUserModalShown = this.editUserModalShouldBeShown();

    if (clientSites.details.length > 0) {
      return (
        <div className="row">
          <div className="col-sm-12">
            <div className="table-responsive">
              <table className="table table-striped">
                <caption>SITE LOCATIONS</caption>
                <thead>
                  <tr>
                    <th>SITE NAME</th>
                    <th>PRINCIPAL INVESTIGATOR</th>
                    <th>SITE PHONE</th>
                    <th>SITE ADDRESS</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {clientSitesListContents}
                </tbody>
              </table>
            </div>
            <Modal className="edit-site" show={editSiteModalShown} onHide={this.closeEditSiteModal}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Site</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <EditSiteForm
                  initialValues={selectedSiteDetailsForForm}
                  onSubmit={this.updateSite}
                />
              </Modal.Body>
            </Modal>
            <Modal className="edit-user" show={editUserModalShown} onHide={this.closeEditUserModal}>
              <Modal.Header closeButton>
                <Modal.Title>Edit User</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <EditUserForm
                  initialValues={selectedUserDetailsForForm}
                  siteOptions={siteOptions}
                  deleting={deletedUser.deleting}
                  onDelete={this.deleteUser}
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
        <h3>No matching sites found!</h3>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUserClientId: selectCurrentUserClientId(),
  clientSites: selectClientSites(),
  selectedSite: selectSelectedSite(),
  selectedSiteDetailsForForm: selectSelectedSiteDetailsForForm(),
  selectedUser: selectSelectedUser(),
  selectedUserDetailsForForm: selectSelectedUserDetailsForForm(),
  deletedUser: selectDeletedUser(),
  savedSite: selectSavedSite(),
  savedUser: selectSavedUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    clearSelectedSite: () => dispatch(clearSelectedSite()),
    clearSelectedUser: () => dispatch(clearSelectedUser()),
    deleteUser: (id) => dispatch(deleteUser(id)),
    saveSite: (clientId, id, data) => dispatch(saveSite(clientId, id, data)),
    saveUser: (clientId, id, data) => dispatch(saveUser(clientId, id, data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientSitesList);
