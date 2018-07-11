import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Modal from 'react-bootstrap/lib/Modal';

import CenteredModal from '../../../components/CenteredModal/index';
import EditSponsorUserForm from '../EditSponsorUserForm';
import { selectEditUserProcess } from '../selectors';
import { translate } from '../../../../common/utilities/localization';

class adminsRowItem extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    item: PropTypes.object,
    editUser: PropTypes.func,
    protocols: PropTypes.array,
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
    const options = [];
    _.forEach(this.props.protocols, (protocol) => {
      options.push({
        id: protocol.id,
        name: protocol.number,
        value: true,
        studies: protocol.studies,
      });
    });

    const componentValues = [{ isAdmin: true }];

    _.forEach(options, (item) => {
      if (item.value) {
        componentValues.push(item);
      }
    });

    const initialValues = {
      initialValues: {
        firstName: this.props.item.first_name,
        lastName: this.props.item.last_name,
        id: this.props.item.id,
        email: this.props.item.email,
        protocols: componentValues,
      },
    };

    const isAllowToEdit = (this.props.item.name !== 'Super Admin' && (this.props.currentUser.roleForSponsor.name === 'Super Admin' || this.props.currentUser.roleForSponsor.name === 'Admin'));

    return (
      <tr>
        <td>
          {`${this.props.item.first_name} ${this.props.item.last_name}`}
        </td>
        <td className="col2">
          {this.props.item.email}
        </td>
        <td className="col7">
          { (this.props.item.name !== 'Super Admin') &&
            <a disabled={!isAllowToEdit} className="btn btn-primary btn-edit-site pull-right" onClick={() => (!isAllowToEdit ? null : this.openAddUserModal())}>
              <span>{translate('client.component.adminsRowItem.edit')}</span>
            </a>
          }
        </td>

        <Modal dialogComponentClass={CenteredModal} className="new-user" id="new-user" show={this.state.addUserModalOpen} onHide={this.closeAddUserModal}>
          <Modal.Header>
            <Modal.Title>{translate('client.component.adminsRowItem.editUser')}</Modal.Title>
            <a className="lightbox-close close" onClick={this.closeAddUserModal}>
              <i className="icomoon-icon_close" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <div className="holder clearfix">
              <EditSponsorUserForm {...initialValues} isEdit item={this.props.item} onSubmit={this.editLocalUser} onDelete={this.deleteLocalUser} protocolOptions={options} isAdmin />
            </div>
          </Modal.Body>
        </Modal>
      </tr>
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

export default connect(mapStateToProps, mapDispatchToProps)(adminsRowItem);
