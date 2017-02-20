import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import RowItem from './RowItem';
import Modal from 'react-bootstrap/lib/Modal';
import CenteredModal from '../../../components/CenteredModal/index';
import EditClientAdminsForm from '../EditClinetAdminsForm';
import AddMessagingNumberForm from '../AddMessagingNumberForm';

export class DashboardClientAdminsTable extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
  }

  constructor(props) {
    super(props);

    this.state = {
      editClientAdminModalOpen: false,
      addMessagingNumberModalOpen: false,
      editClientAdminInitValues: {},
    };

    this.editAdminClick = this.editAdminClick.bind(this);
    this.addMessagingNumberClick = this.addMessagingNumberClick.bind(this);

    this.closeEditAdminModal = this.closeEditAdminModal.bind(this);
    this.openAddSponsorModal = this.openAddSponsorModal.bind(this);

    this.closeAddMessagingNumberModal = this.closeAddMessagingNumberModal.bind(this);
    this.openAddMessagingNumberModal = this.openAddMessagingNumberModal.bind(this);
  }

  editAdminClick(item) {
    console.log('editAdminClick', item);
    this.setState({ editClientAdminInitValues: {
      initialValues: {
        ...item,
      },
    } });
    this.openAddSponsorModal();
  }

  addMessagingNumberClick() {
    console.log('addMessagingNumberClick');
    this.closeEditAdminModal();
    this.openAddMessagingNumberModal();
  }

  closeEditAdminModal() {
    this.setState({ editClientAdminModalOpen: false });
  }

  openAddSponsorModal() {
    this.setState({ editClientAdminModalOpen: true });
  }

  closeAddMessagingNumberModal() {
    this.setState({ addMessagingNumberModalOpen: false });
    this.openAddSponsorModal();
  }

  openAddMessagingNumberModal() {
    this.setState({ addMessagingNumberModalOpen: true });
  }

  render() {
    const admins = [
      { id: 1, firstName: 'Bruce', lastName: 'Wayne', email: 'bruce.wayne@wayneenterprise.com', phone: '(524) 999-1234', messaging_number: '(524) 999-1234', bd: 'Kobe Byant', ae: 'Michael Grimm' },
      { id: 1, firstName: 'Ray', lastName: 'Palmer', email: 'ray.palmer@palmertech.com', phone: '(524) 999-1234', messaging_number: '(524) 999-1234', bd: 'Bianca Ryan', ae: 'Cas Haley' },
      { id: 1, firstName: 'Will', lastName: 'Graham', email: 'will.graham@wayneenterprise.com', phone: '(524) 999-1234', messaging_number: '(524) 999-1234', bd: 'Terry Fator', ae: 'Eli Mattson' },
    ];

    return (
      <div className="table-holder">
        <table className="table-manage-user table client-admins">
          <caption>Admins</caption>

          <thead>
            <tr>
              <th>Name<i className="caret-arrow"></i></th>
              <th>Email<i className="caret-arrow"></i></th>
              <th>Phone<i className="caret-arrow"></i></th>
              <th>MESSAGING NUMBER <i className="caret-arrow"></i></th>
              <th>BD<i className="caret-arrow"></i></th>
              <th>AE<i className="caret-arrow"></i></th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {
            admins.map((item, index) => (
              <RowItem key={index} item={item} editAdminClick={this.editAdminClick} />
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
                addMessagingNumberClick={this.addMessagingNumberClick}
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
              <AddMessagingNumberForm />
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
