import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Modal from 'react-bootstrap/lib/Modal';
import CenteredModal from '../../../components/CenteredModal/index';
import EditSponsorUserForm from '../../../containers/SponsorManageUsers/EditSponsorUserForm';
import { selectEditUserProcess } from '../selectors';
import { translate } from '../../../../common/utilities/localization';

class ExpandedItem extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    item: PropTypes.object,
    editUser: PropTypes.func,
    protocolOptions: PropTypes.array,
    deleteUser: PropTypes.func,
    currentUser: React.PropTypes.object,
    editUserProcess: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      addUserModalOpen: false,
    };

    this.closeAddUserModal = this.closeAddUserModal.bind(this);
    this.openAddUserModal = this.openAddUserModal.bind(this);
    this.editLocalUser = this.editLocalUser.bind(this);
    this.deleteLocalUser = this.deleteLocalUser.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if ((!newProps.editUserProcess.saving && this.props.editUserProcess.saving)) {
      this.closeAddUserModal();
    }
  }

  closeAddUserModal() {
    this.setState({ addUserModalOpen: false });
  }

  openAddUserModal() {
    this.setState({ addUserModalOpen: true });
  }

  editLocalUser() {
    this.props.editUser(false);
  }

  deleteLocalUser() {
    this.props.deleteUser();
  }

  render() {
    const componentValues = [{ isAdmin: false }];

    _.forEach(this.props.protocolOptions, (item) => {
      if (item.value) {
        componentValues.push(item);
      }
    });

    const initialValues = {
      initialValues: {
        firstName: this.props.item.user.firstName,
        lastName: this.props.item.user.lastName,
        email: this.props.item.user.email,
        id: this.props.item.user.id,
        protocols: componentValues,
      },
    };

    const isAllowToEdit = (this.props.currentUser.roleForSponsor.name === 'Super Admin' || this.props.currentUser.roleForSponsor.name === 'Admin');

    return (
      <div className="assigned-user">
        <span>{this.props.item.user.firstName} {this.props.item.user.lastName}</span>
        <span className="edit-assigned-user">
          <a disabled={!isAllowToEdit} className="btn btn-primary right edit lightbox-opener" onClick={() => (!isAllowToEdit ? null : this.openAddUserModal())}><i className="icomoon-icon_pencil-edit" /></a>
        </span>

        <Modal dialogComponentClass={CenteredModal} className="new-user" id="new-user" show={this.state.addUserModalOpen} onHide={this.closeAddUserModal}>
          <Modal.Header>
            <Modal.Title>{translate('client.component.expandedItem.editUser')}</Modal.Title>
            <a className="lightbox-close close" onClick={this.closeAddUserModal}>
              <i className="icomoon-icon_close" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <div className="holder clearfix">
              <EditSponsorUserForm {...initialValues} isEdit item={this.props.item} onSubmit={this.editLocalUser} protocolOptions={this.props.protocolOptions} onDelete={this.deleteLocalUser} isAdmin={false} />
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  editUserProcess: selectEditUserProcess(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpandedItem);
