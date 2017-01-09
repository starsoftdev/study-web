import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Helmet from 'react-helmet';
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/lib/Button';
import { map } from 'lodash';
import './styles.less';
import CenteredModal from '../../components/CenteredModal/index';
import EditUserForm from 'components/EditUserForm';
import ClientRolesList from 'components/ClientRolesList';
import { selectCurrentUserClientId, selectClientSites,
  selectClientRoles, selectSavedSite, selectSavedUser } from 'containers/App/selectors';
import { fetchClientSites, fetchClientRoles, saveSite, saveUser } from 'containers/App/actions';

export class DashboardPage extends Component { // eslint-disable-line react/prefer-stateless-function
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

    this.addFilter = this.addFilter.bind(this);
    this.closeAddSiteModal = this.closeAddSiteModal.bind(this);
    this.openFiltersModal = this.openFiltersModal.bind(this);
    this.closeFiltersModal = this.closeFiltersModal.bind(this);
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
      this.closeFiltersModal();
    }
  }

  addFilter() {
    console.log('add new filter');
  }

  closeAddSiteModal() {
    this.setState({ addSiteModalOpen: false });
  }

  openFiltersModal() {
    this.setState({ addUserModalOpen: true });
  }

  closeFiltersModal() {
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

  handleSiteQueryChange(event) {
    this.setState({
      siteName: event.target.value,
    });
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
      siteId: parseInt(userData.site, 10),
    };
    if (userData.site === '0') {
      userInput.clientRole = {
        purchase: userData.purchase || false,
        reward: userData.reward || false,
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
      <div className="dashboard-page container-fluid">
        <Helmet title="STUDYKIK DASHBOARD" />
        <div className="fixed-header clearfix">
          <h2 className="main-heading pull-left">STUDYKIK DASHBOARD</h2>
          <div className="filter-btns pull-right">
            <button type="button" className="btn btn-primary" onClick={this.openFiltersModal}>
              Filters
            </button>
            <Modal dialogComponentClass={CenteredModal} className="filter-modal" id="filter-modal" show={this.state.addUserModalOpen} onHide={this.closeFiltersModal}>
              <Modal.Header>
                <Modal.Title>Filters</Modal.Title>
                <a className="lightbox-close close" onClick={this.closeFiltersModal}>
                  <i className="icomoon-icon_close" />
                </a>
              </Modal.Header>
              <Modal.Body>
                <div className="holder clearfix">
                  <div className="form-lightbox">
                    <EditUserForm siteOptions={siteOptions} onSubmit={this.addUser} />
                  </div>
                </div>
              </Modal.Body>
            </Modal>
            <button type="button" className="btn btn-primary" onClick={this.addFilter}>
              Search
            </button>
          </div>
        </div>
        <section className="filters-section">
          <div className="filters-bar">
            <div className="filter-holder">
              <strong className="title">FILTERS</strong>
              <div className="filter-btns pull-right">
                <button type="button" className="btn btn-primary" onClick={this.saveFilters}>
                  Save Filters
                </button>
                <button type="button" className="btn btn-primary" onClick={this.clearFilters}>
                  Clear
                </button>
              </div>
              <form className="form-search clearfix" onSubmit={this.handleSubmit}>
                <div className="fields-holder pull-left">
                  <div className="search-area pull-left">
                    <div className="field">
                      <Button className="btn-enter" type="submit">
                        <i className="icomoon-icon_search2" />
                      </Button>
                      <input onChange={this.handleSiteQueryChange} type="text" className="form-control keyword-search" placeholder="Search Site Name..." />
                    </div>
                  </div>
                  <div className="search-area pull-left">
                    <div className="field">
                      <Button className="btn-enter" type="submit">
                        <i className="icomoon-icon_search2" />
                      </Button>
                      <input onChange={this.handleUserQueryChange} type="text" className="form-control keyword-search" placeholder="Search User Name..." />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="stats clearfix"></div>
          <div className="graph-area"></div>
          <div className="table-container">
            <section className="table-holder form-group client-roles-holder">
              <ClientRolesList filterMethod={this.state.roleFilterMethod} />
            </section>
          </div>
        </section>
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

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
