import _ from 'lodash';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';
import Modal from 'react-bootstrap/lib/Modal';
import ReactSelect from '../../../components/Input/ReactSelect';
import CenteredModal from '../../../components/CenteredModal/index';
import { AddCouponForm } from './AddCouponForm';

@reduxForm({ form: 'dashboardCouponForm' })

export class DashboardCouponSearch extends React.Component {
  static propTypes = {
    coupon: PropTypes.object,
    addCoupon: PropTypes.func,
    editCouponProcess: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.state = {
      addCouponModalOpen: false,
    };

    this.closeAddCouponModal = this.closeAddCouponModal.bind(this);
    this.openAddCouponModal = this.openAddCouponModal.bind(this);
    this.addCoupon = this.addCoupon.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.editCouponProcess.saving && this.props.editCouponProcess.saving) {
      this.closeAddCouponModal();
    }
  }

  closeAddCouponModal() {
    this.setState({ addCouponModalOpen: false });
  }

  openAddCouponModal() {
    this.setState({ addCouponModalOpen: true });
  }

  addCoupon(params) {
    this.props.addCoupon(params);
  }

  render() {
    const options = [];
    _.forEach(this.props.coupon.details, (item) => {
      options.push({
        label: item.number, value: item.id,
      });
    });

    return (
      <form action="#" className="form-search clearfix">
        <div className="btns-area row pull-right">
          <div className="col pull-left">
            <a className="btn btn-primary lightbox-opener" onClick={this.openAddCouponModal}>
              Add Coupon
            </a>
          </div>
        </div>
        <div className="fields-holder">
          <div className="pull-left col custom-select">
            <div className="has-feedback ">
              <Field
                name="coupon"
                component={ReactSelect}
                placeholder="Select Coupon"
                options={options}
              />
            </div>
          </div>
        </div>

        <Modal dialogComponentClass={CenteredModal} className="new-user" id="new-user" show={this.state.addCouponModalOpen} onHide={this.closeAddCouponModal}>
          <Modal.Header>
            <Modal.Title>Add Coupon</Modal.Title>
            <a className="lightbox-close close" onClick={this.closeAddCouponModal}>
              <i className="icomoon-icon_close" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <div className="holder clearfix">
              <AddCouponForm
                onSubmit={this.addCoupon}
                saving={this.props.editCouponProcess.saving}
              />
            </div>
          </Modal.Body>
        </Modal>
      </form>
    );
  }
}

const mapStateToProps = createStructuredSelector({
});
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardCouponSearch);
