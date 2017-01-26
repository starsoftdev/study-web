import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Helmet from 'react-helmet';
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/lib/Button';
import ReactSelect from 'components/Input/ReactSelect';
import { map } from 'lodash';
import { Field, reduxForm } from 'redux-form';
import CenteredModal from '../../components/CenteredModal/index';
import EditSiteForm from 'components/EditSiteForm';
import EditUserForm from 'components/EditUserForm';
import ClientSitesList from 'components/ClientSitesList';
import ClientRolesList from 'components/ClientRolesList';
import {
  selectCurrentUserClientId,
  selectClientSites,
  selectClientRoles,
  selectSavedSite,
  selectSavedUser,
} from 'containers/App/selectors';
import { fetchClientSites, fetchClientRoles, saveSite, saveUser } from 'containers/App/actions';

@reduxForm({ form: 'manageSiteUser' })
export class SitesUsersPage extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    currentUserClientId: PropTypes.number,
    clientSites: PropTypes.object,
    clientRoles: PropTypes.object,
    savedSite: PropTypes.object,
    savedUser: PropTypes.object,
    fetchClientSites: PropTypes.func,
    fetchClientRoles: PropTypes.func,
    saveSite: PropTypes.func,
    saveUser: PropTypes.func,
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
    if (searchQuery !== '') {
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
          const fullName = `${clientRole.user.firstName} ${clientRole.user.lastName}`;
          return (fullName.toUpperCase().includes(searchQuery.toUpperCase()));
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
    this.filterClientSites(this.state.siteName);
    this.filterClientRoles(this.state.userName);
  }

  handleSiteQueryChange(index) {
    const sel = parseInt(index);
    if (sel === 0) {
      this.setState({
        siteName: '',
      }, () => { this.filterClientSites(this.state.siteName); });
    } else {
      this.setState({
        siteName: this.props.clientSites.details[sel - 1].name,
      }, () => { this.filterClientSites(this.state.siteName); });
    }
  }

  handleUserQueryChange(event) {
    this.setState({
      userName: event.target.value,
    });
  }

  addSite(siteData) {
    const { currentUserClientId } = this.props;

    this.props.saveSite(currentUserClientId, null, siteData);
  }

  addUser(userData) {
    const { currentUserClientId } = this.props;
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

    this.props.saveUser(currentUserClientId, null, userInput);
  }

  render() {
    const { currentUserClientId, clientSites } = this.props;
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

    const siteOptions = map(clientSites.details, siteIterator => ({ label: siteIterator.name, value: siteIterator.id.toString() }));
    siteOptions.unshift({ label: 'All', value: '0' });

    return (
      <div className="sites-users-page">
        <div className="container-fluid">
          <Helmet title="Manage Sites / Users - StudyKIK" />
          <h2 className="main-heading">MANAGE SITES / USERS</h2>
          <div className="search-sites-users-panel form-group">
            <form className="form-search clearfix" onSubmit={this.handleSubmit}>
              <div className="fields-holder pull-left">
                <div className="search-area pull-left">
                  <div className="field">
                    <Button className="btn-enter" type="submit">
                      <i className="icomoon-icon_search2" />
                    </Button>
                    <input onChange={this.handleUserQueryChange} type="text" className="form-control keyword-search" placeholder="Search" />
                  </div>
                </div>
                <div className="search-area pull-left">
                  <div className="field">
                    <Field
                      name="siteLocation"
                      component={ReactSelect}
                      placeholder="Select Site Location"
                      options={siteOptions}
                      className="field"
                      onChange={this.handleSiteQueryChange}
                    />
                  </div>
                </div>
              </div>
              <section className="btns-area pull-right">
                <div className="col pull-right">
                  <button type="button" className="btn btn-primary" onClick={this.openAddUserModal}>
                    + Add User
                  </button>
                  <Modal dialogComponentClass={CenteredModal} className="new-user" id="new-user" show={this.state.addUserModalOpen} onHide={this.closeAddUserModal}>
                    <Modal.Header>
                      <Modal.Title>New User</Modal.Title>
                      <a className="lightbox-close close" onClick={this.closeAddUserModal}>
                        <i className="icomoon-icon_close" />
                      </a>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="holder clearfix">
                        <div className="form-lightbox">
                          <EditUserForm siteOptions={siteOptions} onSubmit={this.addUser} isEdit={false} />
                        </div>
                      </div>
                    </Modal.Body>
                  </Modal>
                </div>
                <div className="col pull-right">
                  <button type="button" className="btn btn-primary" onClick={this.openAddSiteModal}>
                    + Add Site Location
                  </button>
                  <Modal dialogComponentClass={CenteredModal} className="new-site" id="new-site" show={this.state.addSiteModalOpen} onHide={this.closeAddSiteModal}>
                    <Modal.Header>
                      <Modal.Title>New Site</Modal.Title>
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
            <ClientRolesList filterMethod={this.state.roleFilterMethod} />
          </section>
          <section className="table-holder form-group client-sites-holder">
            <ClientSitesList filterMethod={this.state.siteFilterMethod} />
          </section>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUserClientId: selectCurrentUserClientId(),
  clientSites: selectClientSites(),
  clientRoles: selectClientRoles(),
  savedSite: selectSavedSite(),
  savedUser: selectSavedUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchClientSites: (clientId, searchParams) => dispatch(fetchClientSites(clientId, searchParams)),
    fetchClientRoles: (clientId, searchParams) => dispatch(fetchClientRoles(clientId, searchParams)),
    saveSite: (clientId, id, data) => dispatch(saveSite(clientId, id, data)),
    saveUser: (clientId, id, data) => dispatch(saveUser(clientId, id, data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SitesUsersPage);
