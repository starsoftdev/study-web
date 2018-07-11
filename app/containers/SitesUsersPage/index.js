import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Helmet from 'react-helmet';
import _, { map } from 'lodash';
import { Field, reduxForm, change } from 'redux-form';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import { normalizePhoneForServer } from '../../../app/common/helper/functions';

import ReactSelect from '../../components/Input/ReactSelect';
import CenteredModal from '../../components/CenteredModal/index';
import EditSiteForm from '../../components/EditSiteForm';
import EditUserForm from '../../components/EditUserForm';
import ClientSitesList from '../../components/ClientSitesList';
import ClientRolesList from '../../components/ClientRolesList';

import {
  selectCurrentUserClientId,
  selectSites,
  selectSavedSite,
  selectSavedUser,
  selectCurrentUser,
} from '../../containers/App/selectors';
import { fetchClientSites, fetchClientRoles, saveSite, saveUser } from '../../containers/App/actions';
import { translate } from '../../../common/utilities/localization';

const formName = 'manageSiteUser';

@reduxForm({ form: formName })
export class SitesUsersPage extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    change: PropTypes.func.isRequired,
    currentUserClientId: PropTypes.number,
    sites: PropTypes.arrayOf(PropTypes.object),
    savedSite: PropTypes.object,
    savedUser: PropTypes.object,
    fetchClientSites: PropTypes.func,
    fetchClientRoles: PropTypes.func,
    saveSite: PropTypes.func,
    saveUser: PropTypes.func,
    currentUser: React.PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      addSiteModalOpen: false,
      addUserModalOpen: false,
      roleFilterMethod: () => true,
      siteFilterMethod: () => true,
      siteName: '',
      userName: '',
    };

    this.openAddSiteModal = this.openAddSiteModal.bind(this);
    this.closeAddSiteModal = this.closeAddSiteModal.bind(this);
    this.openAddUserModal = this.openAddUserModal.bind(this);
    this.closeAddUserModal = this.closeAddUserModal.bind(this);
    this.filterClientRoles = this.filterClientRoles.bind(this);
    this.filterClientSites = this.filterClientSites.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSiteQueryChange = this.handleSiteQueryChange.bind(this);
    this.handleUserQueryChange = this.handleUserQueryChange.bind(this);
    this.addSite = this.addSite.bind(this);
    this.addUser = this.addUser.bind(this);
  }

  componentWillMount() {
    const { currentUserClientId } = this.props;
    if (currentUserClientId) {
      this.props.fetchClientSites(currentUserClientId, {});
      this.props.fetchClientRoles(currentUserClientId, {});
    }
  }

  componentDidMount() {
    const { change, currentUser } = this.props;
    let bDisabled = true;
    if (currentUser && currentUser.roleForClient) {
      bDisabled = (currentUser.roleForClient.canPurchase || currentUser.roleForClient.canRedeemRewards || currentUser.roleForClient.name === 'Super Admin') ? null : true;
      if (bDisabled) {
        const nLocation = currentUser.roleForClient.site_id ? currentUser.roleForClient.site_id.toString() : null;
        change('siteLocation', nLocation);
        this.handleSiteQueryChange(currentUser.roleForClient.site_id);
      }
    }
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.savedSite.saving && this.props.savedSite.saving) {
      this.closeAddSiteModal();
    }
    if (!newProps.savedUser.saving && this.props.savedUser.saving) {
      this.closeAddUserModal();
    }
  }

  openAddSiteModal() {
    this.setState({ addSiteModalOpen: true });
  }

  closeAddSiteModal() {
    this.setState({ addSiteModalOpen: false });
  }

  openAddUserModal() {
    this.setState({ addUserModalOpen: true });
  }

  closeAddUserModal() {
    this.setState({ addUserModalOpen: false });
  }

  filterClientSites(searchQuery) {
    if (searchQuery !== '' && searchQuery) {
      this.setState({
        siteFilterMethod: (clientSite) => clientSite.name.toUpperCase().includes(searchQuery.toUpperCase()),
      });
    } else {
      this.setState({
        siteFilterMethod: () => true,
      });
    }
  }

  filterClientRoles(searchQuery) {
    if (searchQuery !== '') {
      this.setState({
        roleFilterMethod: (clientRole) => {
          if (clientRole.user) {
            const fullName = `${clientRole.user.firstName} ${clientRole.user.lastName}`;
            return fullName.toUpperCase().includes(searchQuery.toUpperCase());
          }
          return false;
        },
      });
    } else {
      this.setState({
        roleFilterMethod: () => true,
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    // this.filterClientSites(this.state.siteName);
    this.setState({
      userName: this.userName,
    }, () => {
      this.filterClientRoles(this.state.userName);
    });
  }

  handleSiteQueryChange(index) {
    const sel = parseInt(index !== null ? index : 0);
    let sName = _.find(this.props.sites, { id: parseInt(index) });
    sName = (sName && sName.name) ? sName.name : null;
    if (sel === 0) {
      this.setState({
        siteName: '',
      }, () => { this.filterClientSites(sName); });
    } else {
      this.setState({
        siteName: (this.props.sites[sel - 1] && this.props.sites[sel - 1].name) ? this.props.sites[sel - 1].name : null,
      }, () => { this.filterClientSites(sName); });
    }
  }

  handleUserQueryChange(event) {
    this.userName = event.target.value;
  }

  addSite(siteData) {
    const { currentUserClientId } = this.props;
    const params = siteData;
    params.timezone = siteData.timezoneUnparsed;
    params.phoneNumber = normalizePhoneForServer(params.phoneNumber);

    this.props.saveSite(currentUserClientId, null, params);
  }

  addUser(userData) {
    const { currentUserClientId, saveUser } = this.props;
    const userInput = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
    };
    userInput.clientRole = {
      siteId: parseInt(userData.site, 10),
      canPurchase: userData.purchase || false,
      canRedeemRewards: userData.reward || false,
    };

    saveUser(currentUserClientId, null, userInput);
  }

  render() {
    const { currentUserClientId, sites, currentUser } = this.props;
    if (!currentUserClientId) {
      return (
        <div className="sites-users-page">
          <div className="container-fluid">
            <Helmet title="Manage Sites/Users" />
            <section className="no-items">
              <h4>You don't have permission to manage sites and users</h4>
            </section>
          </div>
        </div>
      );
    }
    let bDisabled = true;
    let cEditPurchasable = false;
    let cEditRedeemable = false;
    if (currentUser && currentUser.roleForClient) {
      bDisabled = (currentUser.roleForClient.canPurchase || currentUser.roleForClient.canRedeemRewards || currentUser.roleForClient.name === 'Super Admin' || currentUser.roleForClient.name === 'Admin') ? null : true;
    }
    const siteOptions = map(sites, siteIterator => ({ label: siteIterator.name, value: siteIterator.id.toString() }));
    siteOptions.unshift({ label: translate('client.page.sitesUsers.siteLocationAllOption'), value: '0' });

    if (currentUser.roleForClient) {
      if (currentUser.roleForClient.canPurchase) {
        cEditPurchasable = true;
      }

      if (currentUser.roleForClient.canRedeemRewards) {
        cEditRedeemable = true;
      }
    }

    return (
      <div className="sites-users-page">
        <div className="container-fluid">
          <Helmet title="Manage Sites / Users - StudyKIK" />
          <h2 className="main-heading">{translate('client.page.sitesUsers.mainHeading')}</h2>
          <div className="search-sites-users-panel form-group">
            <form action="#" className="form-search clearfix" onSubmit={this.handleSubmit}>
              <div className="fields-holder pull-left">
                <div className="search-area pull-left no-left-padding">
                  <div className="field">
                    <Button className="btn-enter" type="submit">
                      <i className="icomoon-icon_search2" />
                    </Button>
                    <input
                      name="query"
                      onChange={this.handleUserQueryChange}
                      type="text"
                      className="form-control keyword-search"
                      placeholder={translate('client.page.sitesUsers.placeholderSearch')}
                    />
                  </div>
                </div>
                <div className="search-area pull-left">
                  <div className="field">
                    <Field
                      name="siteLocation"
                      component={ReactSelect}
                      placeholder={translate('client.page.sitesUsers.placeholderSiteLocation')}
                      options={siteOptions}
                      disabled={bDisabled}
                      className="field"
                      onChange={this.handleSiteQueryChange}
                    />
                  </div>
                </div>
              </div>
              <section className="btns-area pull-right">
                <div className="col pull-right">
                  <button type="button" className="btn btn-primary" onClick={this.openAddUserModal} disabled={bDisabled}>
                    {translate('client.page.sitesUsers.btnAddUser')}
                  </button>
                  <Modal dialogComponentClass={CenteredModal} className="new-user" id="new-user" show={this.state.addUserModalOpen} onHide={this.closeAddUserModal}>
                    <Modal.Header>
                      <Modal.Title>{translate('client.page.sitesUsers.addUserModalTitle')}</Modal.Title>
                      <a className="lightbox-close close" onClick={this.closeAddUserModal}>
                        <i className="icomoon-icon_close" />
                      </a>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="holder clearfix">
                        <div className="form-lightbox">
                          <EditUserForm
                            siteOptions={siteOptions}
                            onSubmit={this.addUser}
                            isEdit={false}
                            EditPurchase={cEditPurchasable}
                            EditRedeem={cEditRedeemable}
                          />
                        </div>
                      </div>
                    </Modal.Body>
                  </Modal>
                </div>
                <div className="col pull-right">
                  <button type="button" className="btn btn-primary" onClick={this.openAddSiteModal} disabled={bDisabled}>
                    {translate('client.page.sitesUsers.btnAddSiteLocatio')}
                  </button>
                  <Modal dialogComponentClass={CenteredModal} className="new-site" id="new-site" show={this.state.addSiteModalOpen} onHide={this.closeAddSiteModal}>
                    <Modal.Header>
                      <Modal.Title>{translate('client.page.sitesUsers.addSiteLocationModalTitle')}</Modal.Title>
                      <a className="lightbox-close close" onClick={this.closeAddSiteModal}>
                        <i className="icomoon-icon_close" />
                      </a>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="holder clearfix edit-site-holder">
                        <EditSiteForm onSubmit={this.addSite} />
                      </div>
                    </Modal.Body>
                  </Modal>
                </div>
              </section>
            </form>
          </div>
          <section className="table-holder form-group client-roles-holder">
            <ClientRolesList filterMethod={this.state.roleFilterMethod} currentUser={currentUser} />
          </section>
          <section className="table-holder form-group client-sites-holder">
            <ClientSitesList filterMethod={this.state.siteFilterMethod} userFilterQuery={this.state.userName} currentUser={currentUser} />
          </section>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUserClientId: selectCurrentUserClientId(),
  sites: selectSites(),
  savedSite: selectSavedSite(),
  savedUser: selectSavedUser(),
  currentUser: selectCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    change: (name, value) => dispatch(change(formName, name, value)),
    fetchClientSites: (clientId, searchParams) => dispatch(fetchClientSites(clientId, searchParams)),
    fetchClientRoles: (clientId, searchParams) => dispatch(fetchClientRoles(clientId, searchParams)),
    saveSite: (clientId, id, data) => dispatch(saveSite(clientId, id, data)),
    saveUser: (clientId, id, data) => dispatch(saveUser(clientId, id, data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SitesUsersPage);
