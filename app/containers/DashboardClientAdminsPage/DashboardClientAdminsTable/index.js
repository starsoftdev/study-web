import { forEach, map, sumBy, orderBy } from 'lodash';
import React, { PropTypes } from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import InfiniteScroll from 'react-infinite-scroller';
import LoadingSpinner from '../../../components/LoadingSpinner';

import CenteredModal from '../../../components/CenteredModal/index';
import AddMessagingNumberForm from '../AddMessagingNumberForm';
import EditClientAdminsForm from '../EditClientAdminsForm';
import EditMessagingNumberForm from './EditMessagingNumber';
import RowItem from './RowItem';
import { normalizePhoneForServer } from '../../../common/helper/functions';
import {
  selectDashboardClientAdmins,
  selectPaginationOptions,
  // selectSearchQuery,
} from '../selectors';

import { fetchSites } from '../actions';

export class DashboardClientAdminsTable extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    clientAdmins: PropTypes.object,
    editClientAdmin: PropTypes.func,
    deleteClientAdmin: PropTypes.func,
    usersByRoles: PropTypes.object,
    editUserProcess: PropTypes.object,
    paginationOptions: PropTypes.object,
    clientAdminSearchFormValues: PropTypes.object,
    setActiveSort: PropTypes.func,
    clientSites: PropTypes.object,
    availPhoneNumbers: PropTypes.object,
    editMessagingNumber: PropTypes.func,
    editMessagingProcess: PropTypes.object,
    addMessagingNumber: PropTypes.func,
    addMessagingProcess: PropTypes.object,
    loadMore: PropTypes.func,
    searchParam: PropTypes.object,
    fetchSites: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.state = {
      editClientAdminModalOpen: false,
      addMessagingNumberModalOpen: false,
      editMessagingNumberModalOpen: false,
      editClientAdminInitValues: {},
      editClientMessagingNumberValues: {},
    };

    this.editAdminClick = this.editAdminClick.bind(this);
    this.addMessagingNumberClick = this.addMessagingNumberClick.bind(this);

    this.closeEditAdminModal = this.closeEditAdminModal.bind(this);
    this.openAddSponsorModal = this.openAddSponsorModal.bind(this);

    this.closeAddMessagingNumberModal = this.closeAddMessagingNumberModal.bind(this);
    this.openAddMessagingNumberModal = this.openAddMessagingNumberModal.bind(this);
    this.editClientAdmin = this.editClientAdmin.bind(this);
    this.deleteClientAdmin = this.deleteClientAdmin.bind(this);
    this.openEditMessagingNumber = this.openEditMessagingNumber.bind(this);
    this.closeEditMessagingNumber = this.closeEditMessagingNumber.bind(this);
    this.editMessagingClick = this.editMessagingClick.bind(this);
    this.updateMessagingNumber = this.updateMessagingNumber.bind(this);
    this.addMessagingNumber = this.addMessagingNumber.bind(this);

    this.sortBy = this.sortBy.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if ((!newProps.editUserProcess.saving && this.props.editUserProcess.saving) ||
      (!newProps.editUserProcess.deleting && this.props.editUserProcess.deleting)) {
      this.closeEditAdminModal();
    }
    if ((!newProps.editMessagingProcess.saving && this.props.editMessagingProcess.saving) ||
      (!newProps.editMessagingProcess.deleting && this.props.editMessagingProcess.deleting)) {
      this.closeEditMessagingNumber();
    }
    if ((!newProps.addMessagingProcess.saving && this.props.addMessagingProcess.saving) ||
      (!newProps.addMessagingProcess.deleting && this.props.addMessagingProcess.deleting)) {
      this.closeAddMessagingNumberModal();
    }
  }

  componentWillUnmount() {
    const defaultSort = 'name';
    this.props.setActiveSort(defaultSort, null);
  }

  editAdminClick(item) {
    this.setState({ editClientAdminInitValues: {
      initialValues: {
        ...item,
        bd: item.bd_user_id,
        ae: item.ae_user_id,
      },
    } });

    this.props.fetchSites(item.client_id);
    this.openAddSponsorModal();
  }

  editMessagingClick(item) {
    this.props.fetchSites(item.client_id);
    this.openEditMessagingNumber();
  }

  addMessagingNumberClick() {
    this.closeEditMessagingNumber();
    this.openAddMessagingNumberModal();
  }

  closeEditAdminModal() {
    this.setState({ editClientAdminModalOpen: false });
  }

  openAddSponsorModal() {
    this.setState({ editClientAdminModalOpen: true });
  }

  openEditMessagingNumber() {
    this.setState({ editMessagingNumberModalOpen: true });
  }

  closeEditMessagingNumber() {
    this.setState({ editMessagingNumberModalOpen: false });
  }

  closeAddMessagingNumberModal() {
    this.setState({ addMessagingNumberModalOpen: false });
    // this.openAddSponsorModal();
    this.openEditMessagingNumber();
  }

  openAddMessagingNumberModal() {
    this.setState({ addMessagingNumberModalOpen: true });
  }
  editClientAdmin(params) {
    const nValues = [];
    forEach(this.props.clientSites.details, (site) => {
      if (params[`site-${site.id}`]) {
        const initRewardPoints = sumBy(site.rewards, 'points');
        if (initRewardPoints !== parseInt(params[`site-${site.id}`])) {
          nValues.push({
            site_id: site.id,
            siteName: site.name,
            points: parseInt(params[`site-${site.id}`]) - initRewardPoints,
            balance: parseInt(params[`site-${site.id}`]),
            user_id: params.user_id,
          });
        }
      }
    });
    const nParams = {
      ...params,
      rewardValues: nValues,
    };
    this.props.editClientAdmin(nParams);
  }

  deleteClientAdmin(params) {
    this.props.deleteClientAdmin({ id: params });
  }

  updateMessagingNumber(params) {
    const nValues = [];
    forEach(this.props.clientSites.details, (data) => {
      if (params[`site-${data.id}`] || params[`site-${data.id}`] === null) {
        nValues.push({
          site_id: data.id,
          twilio_number_id: params[`site-${data.id}`],
          phoneNumber: normalizePhoneForServer(params[`site-phoneNumber-${data.id}`]),
        });
      }
    });
    this.props.editMessagingNumber(nValues);
  }

  addMessagingNumber(params) {
    this.props.addMessagingNumber(params);
  }

  sortBy(ev) {
    ev.preventDefault();
    let sort = ev.currentTarget.dataset.sort;
    let direction = 'up';


    if (ev.currentTarget.className && ev.currentTarget.className.indexOf('up') !== -1) {
      direction = 'down';
    } else if (ev.currentTarget.className && ev.currentTarget.className.indexOf('down') !== -1) {
      direction = null;
      sort = null;
    }

    this.props.setActiveSort(sort, direction);
  }

  render() {
    const { clientSites } = this.props;
    if (!this.props.clientAdmins) {
      return null;
    }


    let messagingNumberOptions = [];
    if (this.props.availPhoneNumbers.details) {
      messagingNumberOptions = map(this.props.availPhoneNumbers.details, cardIterator => ({
        label: cardIterator.phoneNumber,
        value: cardIterator.id,
      }));
    }

    let clientAdmins = this.props.clientAdmins.details;

    if (this.props.paginationOptions.activeDirection && this.props.paginationOptions.activeSort) {
      const dir = ((this.props.paginationOptions.activeDirection === 'down') ? 'desc' : 'asc');

      if (this.props.paginationOptions.activeSort === 'name') {
        clientAdmins = orderBy(clientAdmins, [(o) => (`${o.first_name} ${o.last_name}`)], [dir]);
      } else if (this.props.paginationOptions.activeSort === 'bd_name') {
        clientAdmins = orderBy(clientAdmins, [(o) => (`${o.bd_user_first_name} ${o.bd_user_last_name}`)], [dir]);
      } else if (this.props.paginationOptions.activeSort === 'ae_name') {
        clientAdmins = orderBy(clientAdmins, [(o) => (`${o.ae_user_first_name} ${o.ae_user_last_name}`)], [dir]);
      } else {
        clientAdmins = orderBy(clientAdmins, [(o) => (o[this.props.paginationOptions.activeSort])], [dir]);
      }
    }

    return (
      <div className="table-holder">
        <InfiniteScroll
          pageStart={0}
          loadMore={this.props.loadMore}
          initialLoad={false}
          hasMore={this.props.paginationOptions.hasMoreItems}
          loader={null}
        >

          <table className="table-manage-user table client-admins">
            <caption>Admins</caption>

            <thead>
              <tr>
                <th onClick={this.sortBy} data-sort="client_name" className={`th ${(this.props.paginationOptions.activeSort === 'client_name') ? this.props.paginationOptions.activeDirection : ''}`}>Company<i className="caret-arrow" /></th>
                <th onClick={this.sortBy} data-sort="name" className={`th ${(this.props.paginationOptions.activeSort === 'name') ? this.props.paginationOptions.activeDirection : ''}`}>Name<i className="caret-arrow" /></th>
                <th onClick={this.sortBy} data-sort="email" className={`th ${(this.props.paginationOptions.activeSort === 'email') ? this.props.paginationOptions.activeDirection : ''}`}>Email<i className="caret-arrow" /></th>
                <th onClick={this.sortBy} data-sort="bd_name" className={`th ${(this.props.paginationOptions.activeSort === 'bd_name') ? this.props.paginationOptions.activeDirection : ''}`}>BD<i className="caret-arrow" /></th>
                <th onClick={this.sortBy} data-sort="ae_name" className={`th ${(this.props.paginationOptions.activeSort === 'ae_name') ? this.props.paginationOptions.activeDirection : ''}`}>AE<i className="caret-arrow" /></th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {
                clientAdmins.map((item, index) => (
                  <RowItem key={index} item={item} editAdminClick={this.editAdminClick} editMessagingClick={this.editMessagingClick} clientSites={clientSites} />
              ))
            }
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="6">
                  {this.props.clientAdmins.fetching && <div className="text-center"><LoadingSpinner showOnlyIcon /></div>}
                </td>
              </tr>
            </tfoot>

          </table>
        </InfiniteScroll>


        <Modal dialogComponentClass={CenteredModal} className="new-user" id="new-user" show={this.state.editClientAdminModalOpen} onHide={this.closeEditAdminModal}>
          <Modal.Header>
            <Modal.Title>EDIT CLIENT ADMIN</Modal.Title>
            <a className="lightbox-close close" onClick={this.closeEditAdminModal}>
              <i className="icomoon-icon_close" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <div className="holder clearfix">
              <EditClientAdminsForm
                {...this.state.editClientAdminInitValues}
                clientSites={this.props.clientSites}
                usersByRoles={this.props.usersByRoles}
                addMessagingNumberClick={this.addMessagingNumberClick}
                onSubmit={this.editClientAdmin}
                onDelete={this.deleteClientAdmin}
                deleting={this.props.editUserProcess.deleting}
              />
            </div>
          </Modal.Body>
        </Modal>

        <Modal dialogComponentClass={CenteredModal} className="new-user" id="new-user" show={this.state.addMessagingNumberModalOpen} onHide={this.closeAddMessagingNumberModal}>
          <Modal.Header>
            <Modal.Title>ADD MESSAGING NUMBER</Modal.Title>
            <a className="lightbox-close close" onClick={this.closeAddMessagingNumberModal}>
              <i className="icomoon-icon_close" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <div className="holder clearfix">
              <AddMessagingNumberForm
                onSubmit={this.addMessagingNumber}
              />
            </div>
          </Modal.Body>
        </Modal>

        <Modal dialogComponentClass={CenteredModal} className="new-user" id="new-user" show={this.state.editMessagingNumberModalOpen} onHide={this.closeEditMessagingNumber}>
          <Modal.Header>
            <Modal.Title>MESSAGING NUMBER</Modal.Title>
            <a className="lightbox-close close" onClick={this.closeEditMessagingNumber}>
              <i className="icomoon-icon_close" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <div className="holder clearfix">
              <EditMessagingNumberForm
                {...this.state.editClientMessagingNumberValues}
                clientSites={this.props.clientSites}
                messagingNumberOptions={messagingNumberOptions}
                onSubmit={this.updateMessagingNumber}
                addMessagingNumberClick={this.addMessagingNumberClick}
              />
            </div>
          </Modal.Body>
        </Modal>

      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  clientAdmins: selectDashboardClientAdmins(),
  paginationOptions: selectPaginationOptions(),
  // searchParam: selectSearchQuery(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchSites:(clientId) => dispatch(fetchSites(clientId)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardClientAdminsTable);
