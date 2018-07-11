import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Modal from 'react-bootstrap/lib/Modal';
import CenteredModal from '../../../components/CenteredModal/index';
import { AddSponsorAdminForm } from '../DashboardSponsorAdminSearch/AddSponsorAdminForm';

class RowItem extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    item: PropTypes.object,
    sponsorsWithoutAdmin: PropTypes.object,
    usersByRoles: PropTypes.object,
    editUserProcess: PropTypes.object,
    editSponsorAdmin: PropTypes.func,
    deleteSponsorAdmin: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      addSponsorAdminModalOpen: false,
    };

    this.closeAddSponsorAdminModal = this.closeAddSponsorAdminModal.bind(this);
    this.openAddSponsorAdminModal = this.openAddSponsorAdminModal.bind(this);
    this.editSponsor = this.editSponsor.bind(this);
    this.deleteSponsor = this.deleteSponsor.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if ((!newProps.editUserProcess.saving && this.props.editUserProcess.saving) ||
      (!newProps.editUserProcess.deleting && this.props.editUserProcess.deleting)) {
      this.closeAddSponsorAdminModal();
    }
  }

  closeAddSponsorAdminModal() {
    this.setState({ addSponsorAdminModalOpen: false });
  }

  openAddSponsorAdminModal() {
    this.setState({ addSponsorAdminModalOpen: true });
  }

  editSponsor(params) {
    this.props.editSponsorAdmin(params);
  }

  deleteSponsor(params) {
    this.props.deleteSponsorAdmin({ id: params });
  }

  render() {
    const initialValues = {
      initialValues: {
        ...this.props.item,
        sponsor: this.props.item.id,
        firstName: this.props.item.first_name,
        lastName: this.props.item.last_name,
        bd: this.props.item.bd_user_id,
      },
    };

    return (
      <tr>
        <td>
          {this.props.item.name}
        </td>
        <td>
          {`${this.props.item.first_name} ${this.props.item.last_name}`}
        </td>
        <td>
          {this.props.item.email}
        </td>
        <td>
          {`${this.props.item.bd_user_first_name || ''} ${this.props.item.bd_user_last_name || ''}`}
        </td>
        <td>
          <a className="btn btn-primary btn-edit-site pull-right" onClick={this.openAddSponsorAdminModal}>
            <span>Edit</span>
          </a>
        </td>

        <Modal dialogComponentClass={CenteredModal} className="new-user" id="new-user" show={this.state.addSponsorAdminModalOpen} onHide={this.closeAddSponsorAdminModal}>
          <Modal.Header>
            <Modal.Title>Edit Sponsor Admin</Modal.Title>
            <a className="lightbox-close close" onClick={this.closeAddSponsorAdminModal}>
              <i className="icomoon-icon_close" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <div className="holder clearfix">
              <AddSponsorAdminForm
                {...initialValues}
                isEdit
                sponsorsWithoutAdmin={this.props.sponsorsWithoutAdmin}
                usersByRoles={this.props.usersByRoles}
                onSubmit={this.editSponsor}
                onDelete={this.deleteSponsor}
                deleting={this.props.editUserProcess.deleting}
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
