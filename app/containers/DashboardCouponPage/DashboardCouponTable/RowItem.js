import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Modal from 'react-bootstrap/lib/Modal';
import CenteredModal from '../../../components/CenteredModal/index';
import { AddCouponForm } from '../DashboardCouponSearch/AddCouponForm';

class RowItem extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    item: PropTypes.object,
    editCoupon: PropTypes.func,
    deleteCoupon: PropTypes.func,
    editCouponProcess: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      addCouponModalOpen: false,
    };

    this.closeAddCouponModal = this.closeAddCouponModal.bind(this);
    this.openAddCouponModal = this.openAddCouponModal.bind(this);
    this.editCoupon = this.editCoupon.bind(this);
    this.deleteCoupon = this.deleteCoupon.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if ((!newProps.editCouponProcess.saving && this.props.editCouponProcess.saving) ||
      (!newProps.editCouponProcess.deleting && this.props.editCouponProcess.deleting)
    ) {
      this.closeAddCouponModal();
    }
  }

  closeAddCouponModal() {
    this.setState({ addCouponModalOpen: false });
  }

  openAddCouponModal() {
    this.setState({ addCouponModalOpen: true });
  }

  editCoupon(params) {
    this.props.editCoupon(params);
  }

  deleteCoupon(params) {
    this.props.deleteCoupon(params);
  }

  render() {
    const initialValues = {
      initialValues: {
        number: this.props.item.number,
        id: this.props.item.id,
      },
    };

    return (
      <tr>
        <td>
          {this.props.item.number}
        </td>
        <td>
          {this.props.item.code}
        </td>
        <td>
          {this.props.item.type}
        </td>
        <td>
          {this.props.item.amount}
        </td>
        <td>
          {this.props.item.validFrom}
        </td>
        <td>
          {this.props.item.validTo}
        </td>
        <td>
          {this.props.item.number}
        </td>
        <td>
          <a className="btn btn-primary btn-edit-site pull-right" onClick={this.openAddCouponModal}>
            <span>Edit</span>
          </a>
        </td>

        <Modal dialogComponentClass={CenteredModal} className="new-user" id="new-user" show={this.state.addCouponModalOpen} onHide={this.closeAddCouponModal}>
          <Modal.Header>
            <Modal.Title>Edit Coupon</Modal.Title>
            <a className="lightbox-close close" onClick={this.closeAddCouponModal}>
              <i className="icomoon-icon_close" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <div className="holder clearfix">
              <AddCouponForm
                {...initialValues}
                isEdit
                onSubmit={this.editCoupon}
                onDelete={this.deleteCoupon}
                saving={this.props.editCouponProcess.saving}
                deleting={this.props.editCouponProcess.deleting}
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
