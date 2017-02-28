import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Modal from 'react-bootstrap/lib/Modal';
import CenteredModal from '../../../components/CenteredModal/index';
import { AddSponsorAdminForm } from '../DashboardSponsorAdminSearch/AddSponsorAdminForm';

class RowItem extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    item: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      addSponsorAdminModalOpen: false,
    };

    this.closeAddSponsorAdminModal = this.closeAddSponsorAdminModal.bind(this);
    this.openAddSponsorAdminModal = this.openAddSponsorAdminModal.bind(this);
  }

  closeAddSponsorAdminModal() {
    this.setState({ addSponsorAdminModalOpen: false });
  }

  openAddSponsorAdminModal() {
    this.setState({ addSponsorAdminModalOpen: true });
  }

  render() {
    const initialValues = {
      initialValues: {
        ...this.props.item,
        sponsorAdmin: this.props.item.name,
        id: this.props.item.id,
      },
    };

    return (
      <tr>
        <td>
          {this.props.item.company}
        </td>
        <td>
          {this.props.item.name}
        </td>
        <td>
          {this.props.item.email}
        </td>
        <td>
          {this.props.item.bd}
        </td>
        <td>
          {this.props.item.ae}
        </td>
        <td>
          <a className="btn btn-primary btn-edit-site pull-right" onClick={this.openAddSponsorAdminModal}>
            <span>Edit</span>
          </a>
        </td>

        <Modal dialogComponentClass={CenteredModal} className="new-user" id="new-user" show={this.state.addSponsorAdminModalOpen} onHide={this.closeAddSponsorAdminModal}>
          <Modal.Header>
            <Modal.Title>Edit SponsorAdmin</Modal.Title>
            <a className="lightbox-close close" onClick={this.closeAddSponsorAdminModal}>
              <i className="icomoon-icon_close" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <div className="holder clearfix">
              <AddSponsorAdminForm
                {...initialValues}
                isEdit
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
