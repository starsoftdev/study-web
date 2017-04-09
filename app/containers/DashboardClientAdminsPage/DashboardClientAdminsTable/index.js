import { forEach, map, sumBy } from 'lodash';
import React, { PropTypes } from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CenteredModal from '../../../components/CenteredModal/index';
import AddMessagingNumberForm from '../AddMessagingNumberForm';
import EditClientAdminsForm from '../EditClientAdminsForm';
import EditMessagingNumberForm from './EditMessagingNumber';
import RowItem from './RowItem';

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


  editAdminClick(item) {
    const filteredClientSites = this.props.clientSites.details.filter((element) => (
      element.client_id === item.client_id
    ));
    const initRewards = {};
    map(filteredClientSites, (site) => {
      initRewards[`site-${site.id}`] = sumBy(site.rewards, 'points');
    });
    this.setState({ editClientAdminInitValues: {
      initialValues: {
        ...item,
        ...initRewards,
        clientSites: filteredClientSites,
        bd: item.bd_user_id,
        ae: item.ae_user_id,
      },
    } });
    this.openAddSponsorModal();
  }

  editMessagingClick(item) {
    const filteredClientSites = this.props.clientSites.details.filter((element) => (
      element.client_id === item.client_id
    ));
    this.setState({ editClientMessagingNumberValues: {
      clientSites: filteredClientSites,
      phoneNumber: this.props.availPhoneNumbers,
    } });
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
          phone_id: params[`site-${data.id}`],
        });
      }
    });
    this.props.editMessagingNumber(nValues);
  }

  addMessagingNumber(params) {
    this.props.addMessagingNumber(params);
  }

  render() {
    const { clientAdmins, clientSites } = this.props;

    let messagingNumberOptions = [];
    if (this.props.availPhoneNumbers.details) {
      messagingNumberOptions = map(this.props.availPhoneNumbers.details, cardIterator => ({
        label: cardIterator.phoneNumber,
        value: cardIterator.id,
      }));
    }

    return (
      <div className="table-holder">
        <table className="table-manage-user table client-admins">
          <caption>Admins</caption>

          <thead>
            <tr>
              <th>Company<i className="caret-arrow" /></th>
              <th>Name<i className="caret-arrow" /></th>
              <th>Email<i className="caret-arrow" /></th>
              <th>BD<i className="caret-arrow" /></th>
              <th>AE<i className="caret-arrow" /></th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {
              clientAdmins.details.map((item, index) => (
                <RowItem key={index} item={item} editAdminClick={this.editAdminClick} editMessagingClick={this.editMessagingClick} clientSites={clientSites} />
            ))
          }
          </tbody>
        </table>

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
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardClientAdminsTable);
