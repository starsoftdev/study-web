import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Modal from 'react-bootstrap/lib/Modal';
import CenteredModal from '../../../components/CenteredModal/index';
import { EditMessagingNumberModalForm } from './EditMessagingNumberModalForm';

class RowItem extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    item: PropTypes.object,
    editMessagingNumber: PropTypes.func,
    deleteMessagingNumber: PropTypes.func,
    editMessagingNumberProcess: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      editModalOpen: false,
    };

    this.closeEditModal = this.closeEditModal.bind(this);
    this.openEditModal = this.openEditModal.bind(this);
    this.editMessagingNumber = this.editMessagingNumber.bind(this);
    this.deleteMessagingNumber = this.deleteMessagingNumber.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if ((!newProps.editMessagingNumberProcess.saving && this.props.editMessagingNumberProcess.saving) ||
      (!newProps.editMessagingNumberProcess.deleting && this.props.editMessagingNumberProcess.deleting)
    ) {
      this.closeEditModal();
    }
  }

  closeEditModal() {
    this.setState({ editModalOpen: false });
  }

  openEditModal() {
    this.setState({ editModalOpen: true });
  }

  editMessagingNumber(params) {
    this.props.editMessagingNumber(params);
  }

  deleteMessagingNumber(params) {
    this.props.deleteMessagingNumber(params);
  }

  render() {
    const initialValues = {
      id: this.props.item.id,
      number: this.props.item.phone_number,
      name: this.props.item.name,
      study: this.props.item.study_id || '',
      site: this.props.item.site_name || '',
    };
    return (
      <tr>
        <td>
          {this.props.item.phone_number}
        </td>
        <td>
          {this.props.item.study_id || ''}
        </td>
        <td>
          {this.props.item.site_name || ''}
        </td>
        <td>
          {this.props.item.name}
        </td>
        <td>
          <a className="btn btn-primary btn-edit-site pull-right" onClick={this.openEditModal}>
            <span>Edit</span>
          </a>
        </td>

        <Modal
          dialogComponentClass={CenteredModal}
          className="new-user"
          id="new-user"
          show={this.state.editModalOpen}
          onHide={this.closeEditModal}
        >
          <Modal.Header>
            <Modal.Title>Edit</Modal.Title>
            <a className="lightbox-close close" onClick={this.closeEditModal}>
              <i className="icomoon-icon_close" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <div className="holder clearfix">
              <EditMessagingNumberModalForm
                initialValues={initialValues}
                onSubmit={this.editMessagingNumber}
                onDelete={this.deleteMessagingNumber}
                saving={this.props.editMessagingNumberProcess.saving}
                deleting={this.props.editMessagingNumberProcess.deleting}
              />
            </div>
          </Modal.Body>
        </Modal>
      </tr>
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

export default connect(mapStateToProps, mapDispatchToProps)(RowItem);
