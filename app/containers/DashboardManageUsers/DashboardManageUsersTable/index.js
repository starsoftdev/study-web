import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import RowItem from './RowItem';
import Modal from 'react-bootstrap/lib/Modal';
import CenteredModal from '../../../components/CenteredModal/index';
import { AddUserForm } from '../../DashboardManageUsers/DashboardManageUsersAddUserForm';

export class DashboardManageUsersTable extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
  }

  constructor(props) {
    super(props);

    this.state = {
      editUserModalOpen: false,
      editUserInitValues: {},
    };

    this.editUserClick = this.editUserClick.bind(this);

    this.closeEditUserModal = this.closeEditUserModal.bind(this);
    this.openEditUserModal = this.openEditUserModal.bind(this);
  }

  editUserClick(item) {
    console.log('editUserClick', item);
    this.setState({ editUserInitValues: {
      initialValues: {
        ...item,
      },
    } });
    this.openEditUserModal();
  }

  closeEditUserModal() {
    this.setState({ editUserModalOpen: false });
  }

  openEditUserModal() {
    this.setState({ editUserModalOpen: true });
  }

  render() {
    const admins = [
      { id: 1, firstName: 'Bruce', lastName: 'Wayne', email: 'bruce.wayne@wayneenterprise.com', phone: '(524) 999-1234', role: 'Admin' },
      { id: 1, firstName: 'Ray', lastName: 'Palmer', email: 'ray.palmer@palmertech.com', phone: '(524) 999-1234', role: 'AE' },
      { id: 1, firstName: 'Will', lastName: 'Graham', email: 'will.graham@wayneenterprise.com', phone: '(524) 999-1234', role: 'BD' },
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
              <th>Role<i className="caret-arrow"></i></th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {
            admins.map((item, index) => (
              <RowItem key={index} item={item} editUserClick={this.editUserClick} />
            ))
          }
          </tbody>
        </table>

        <Modal dialogComponentClass={CenteredModal} className="new-user" id="new-user" show={this.state.editUserModalOpen} onHide={this.closeEditUserModal}>
          <Modal.Header>
            <Modal.Title>EDIT USER</Modal.Title>
            <a className="lightbox-close close" onClick={this.closeEditUserModal}>
              <i className="icomoon-icon_close" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <div className="holder clearfix">
              <AddUserForm
                {...this.state.editUserInitValues}
                isEdit
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
)(DashboardManageUsersTable);
