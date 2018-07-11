import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Modal } from 'react-bootstrap';
import { map, cloneDeep } from 'lodash';

import { normalizePhoneDisplay, normalizePhoneForServer } from '../../../app/common/helper/functions';
import CenteredModal from '../../components/CenteredModal/index';
import EditSiteForm from '../../components/EditSiteForm';
import EditUserForm from '../../components/EditUserForm';
import { selectCurrentUserClientId, selectClientSites, selectSelectedSite,
  selectSelectedSiteDetailsForForm, selectSelectedUser, selectSelectedUserDetailsForForm,
  selectDeletedUser, selectSavedSite, selectSavedUser } from '../../containers/App/selectors';
import { clearSelectedSite, clearSelectedUser,
  deleteUser, saveSite, saveUser } from '../../containers/App/actions';
import ClientSiteItem from './ClientSiteItem';
import { formatTimezone } from '../../utils/time';
import { translate } from '../../../common/utilities/localization';

class ClientSitesList extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    currentUserClientId: PropTypes.number,
    currentUser: PropTypes.object,
    sites: PropTypes.object,
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
    filterMethod: PropTypes.func,
    userFilterQuery: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.closeEditSiteModal = this.closeEditSiteModal.bind(this);
    this.closeEditUserModal = this.closeEditUserModal.bind(this);
    this.updateSite = this.updateSite.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);

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
      return item.name;
    } else if (sortBy === 'phoneNumber') {
      return item.phoneNumber;
    } else if (sortBy === 'address') {
      return item.address;
    } else if (sortBy === 'timezone') {
      return item.timezone;
    }

    return null;
  }

  getSortedClientSites() {
    const { sites } = this.props;
    const listItems = cloneDeep(sites.details);

    if (!this.state.sortBy) {
      return listItems;
    }

    const sortOrder = this.state.sortOrder;
    const sortedListItems = listItems.sort((a, b) => {
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
    const params = siteData;
    params.timezone = siteData.timezoneUnparsed;
    params.phoneNumber = normalizePhoneForServer(params.phoneNumber);

    this.props.saveSite(currentUserClientId, selectedSite.details.id, params);
  }

  updateUser(userData) {
    const { currentUserClientId, selectedUser, saveUser } = this.props;
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

    saveUser(currentUserClientId, selectedUser.details.id, userInput);
  }

  deleteUser() {
    const { selectedUser } = this.props;

    this.props.deleteUser(selectedUser.details.id);
  }

  render() {
    const { selectedSiteDetailsForForm, selectedUserDetailsForForm, deletedUser, filterMethod, userFilterQuery, currentUser } = this.props;
    let bDisabled = true;
    if (currentUser && currentUser.roleForClient) {
      bDisabled = (currentUser.roleForClient.canPurchase || currentUser.roleForClient.canRedeemRewards || currentUser.roleForClient.name === 'Super Admin' || currentUser.roleForClient.name === 'Admin') ? null : true;
    }
    const sortedClientSites = this.getSortedClientSites().filter(filterMethod);
    const clientSitesListContents = sortedClientSites.map((item, index) => (
      <ClientSiteItem {...item} key={index} userFilter={userFilterQuery} bDisabled={bDisabled} />
    ));
    const siteOptions = map(sortedClientSites, siteIterator => ({ label: siteIterator.name, value: siteIterator.id.toString() }));
    siteOptions.unshift({ label: translate('client.page.sitesUsers.siteLocationAllOption'), value: '0' });

    const editSiteModalShown = this.editSiteModalShouldBeShown();
    const editUserModalShown = this.editUserModalShouldBeShown();

    if (selectedSiteDetailsForForm) {
      selectedSiteDetailsForForm.timezoneUnparsed = selectedSiteDetailsForForm.timezoneUnparsed ? selectedSiteDetailsForForm.timezoneUnparsed : selectedSiteDetailsForForm.timezone;
      selectedSiteDetailsForForm.timezone = formatTimezone(selectedSiteDetailsForForm.timezone, selectedSiteDetailsForForm.city);
      selectedSiteDetailsForForm.phoneNumber = normalizePhoneDisplay(selectedSiteDetailsForForm.phoneNumber);
    }

    return (
      <div className="client-sites">
        <div className="row">
          <div className="col-sm-12">
            <div className="table-responsive">
              <table className="table">
                <caption>{translate('client.component.clientSitesList.caption')}</caption>
                <thead>
                  <tr>
                    <th className={this.getColumnSortClassName('name')} onClick={() => { this.clickSortHandler('name'); }}>
                      <span>{translate('client.component.clientSitesList.tableName')}</span>
                      <i className="caret-arrow" />
                    </th>
                    <th className={this.getColumnSortClassName('phoneNumber')} onClick={() => { this.clickSortHandler('phoneNumber'); }}>
                      <span>{translate('client.component.clientSitesList.tablePhone')}</span>
                      <i className="caret-arrow" />
                    </th>
                    <th className={this.getColumnSortClassName('address')} onClick={() => { this.clickSortHandler('address'); }}>
                      <span>{translate('client.component.clientSitesList.tableAddress')}</span>
                      <i className="caret-arrow" />
                    </th>
                    <th className={this.getColumnSortClassName('timezone')} onClick={() => { this.clickSortHandler('timezone'); }}>
                      <span>{translate('client.component.clientSitesList.tableTimeZone')}</span>
                      <i className="caret-arrow" />
                    </th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {sortedClientSites.length > 0 && clientSitesListContents}
                </tbody>
              </table>
            </div>
            <Modal dialogComponentClass={CenteredModal} className="edit-site" id="edit-site" show={editSiteModalShown} onHide={this.closeEditSiteModal}>
              <Modal.Header>
                <Modal.Title>{translate('client.component.clientSitesList.editSiteLocationModalTitle')}</Modal.Title>
                <a className="lightbox-close close" onClick={this.closeEditSiteModal}>
                  <i className="icomoon-icon_close" />
                </a>
              </Modal.Header>
              <Modal.Body>
                <div className="holder clearfix">
                  <EditSiteForm
                    initialValues={selectedSiteDetailsForForm}
                    onSubmit={this.updateSite}
                    isEdit
                  />
                </div>
              </Modal.Body>
            </Modal>
            <Modal dialogComponentClass={CenteredModal} className="edit-user" id="edit-user" show={editUserModalShown} onHide={this.closeEditUserModal}>
              <Modal.Header>
                <Modal.Title>{translate('client.component.clientSitesList.editUserModalTitle')}</Modal.Title>
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
                      deleting={deletedUser.deleting}
                      onDelete={this.deleteUser}
                      onSubmit={this.updateUser}
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
  sites: selectClientSites(),
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
