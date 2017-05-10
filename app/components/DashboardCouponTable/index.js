import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import RowItem from './RowItem';
import AddCouponForm from '../../components/DashboardCouponSearch/AddCouponForm';

export class DashboardCouponTable extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    coupon: PropTypes.object,
    editCoupon: PropTypes.func,
    deleteCoupon: PropTypes.func,
    setActiveSort: PropTypes.func,
    editCouponProcess: PropTypes.object,
    couponSearchFormValues: PropTypes.object,
    paginationOptions: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.sortBy = this.sortBy.bind(this);
    this.closeEditCouponModal = this.closeEditCouponModal.bind(this);
    this.editCoupon = this.editCoupon.bind(this);
    this.deleteCoupon = this.deleteCoupon.bind(this);

    this.showEditCouponModal = this.showEditCouponModal.bind(this);

    this.state = {
      item: null,
      editCouponModalOpen: false,
    };
  }

  componentWillUnmount() {
    const defaultSort = 'number';
    this.props.setActiveSort(defaultSort, null);
  }

  sortBy(ev) {
    ev.preventDefault();
    let sort = ev.currentTarget.dataset.sort;
    let direction = 'up';


    if (ev.currentTarget.className && ev.currentTarget.className.indexOf('up') !== -1) {
      direction = 'down';
    } else if (ev.currentTarget.className && ev.currentTarget.className.indexOf('down') !== -1) {
      direction = null;
      sort = null;
    }

    this.props.setActiveSort(sort, direction);
  }

  showEditCouponModal(initialValues) {
    for (const coupon of this.props.coupon.details) {
      if (coupon.id === initialValues.id) {
        this.setState({ item: coupon, editCouponModalOpen: true });
        // this.setState({ editCouponModalOpen: true })
      }
    }
  }

  closeEditCouponModal() {
    this.setState({ item: null, editCouponModalOpen: false });
    // this.setState({ editCouponModalOpen: false });
  }

  editCoupon(props) {
    const data = props;
    data.id = this.state.item.id;
    this.props.editCoupon(data);
  }

  deleteCoupon(params) {
    this.props.deleteCoupon(params);
  }

  render() {
    const { paginationOptions } = this.props;
    let coupon = this.props.coupon.details;

    if (this.props.couponSearchFormValues.coupon) {
      coupon = _.filter(coupon, (item) => (item.id === this.props.couponSearchFormValues.coupon));
    }

    if (this.props.paginationOptions.activeDirection && this.props.paginationOptions.activeSort) {
      const dir = ((this.props.paginationOptions.activeDirection === 'down') ? 'desc' : 'asc');
      coupon = _.orderBy(coupon, [(o) => (o[this.props.paginationOptions.activeSort])], [dir]);
    }
    // console.log('initialValues', this.state.item);

    return (
      <div className="table-responsive table-holder table-indication alt">
        <table className="table-manage-user table">
          <caption>&nbsp;</caption>

          <thead>
            <tr>
              <th onClick={this.sortBy} data-sort="number" className={`th ${(paginationOptions.activeSort === 'number') ? paginationOptions.activeDirection : ''}`}>
                Coupon<i className="caret-arrow" />
              </th>
              <th onClick={this.sortBy} data-sort="code" className={`th ${(paginationOptions.activeSort === 'code') ? paginationOptions.activeDirection : ''}`}>
                Code<i className="caret-arrow" />
              </th>
              <th onClick={this.sortBy} data-sort="type" className={`th ${(paginationOptions.activeSort === 'type') ? paginationOptions.activeDirection : ''}`}>
                Type<i className="caret-arrow" />
              </th>
              <th onClick={this.sortBy} data-sort="amount" className={`th ${(paginationOptions.activeSort === 'amount') ? paginationOptions.activeDirection : ''}`}>
                Amount<i className="caret-arrow" />
              </th>
              <th onClick={this.sortBy} data-sort="validFrom" className={`th ${(paginationOptions.activeSort === 'validFrom') ? paginationOptions.activeDirection : ''}`}>
                Valid From<i className="caret-arrow" />
              </th>
              <th onClick={this.sortBy} data-sort="validTo" className={`th ${(paginationOptions.activeSort === 'validTo') ? paginationOptions.activeDirection : ''}`}>
                Valid To<i className="caret-arrow" />
              </th>
              <th onClick={this.sortBy} data-sort="neverExpires" className={`th ${(paginationOptions.activeSort === 'neverExpires') ? paginationOptions.activeDirection : ''}`}>
                Never Expires<i className="caret-arrow" />
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              coupon.map((item, index) => (
                <RowItem key={index} item={item} editCouponProcess={this.props.editCouponProcess} showEditCouponModal={this.showEditCouponModal} />
              ))
            }
          </tbody>
        </table>
        <AddCouponForm
          isEdit
          show={this.state.editCouponModalOpen}
          initialValues={this.state.item}
          onHide={this.closeEditCouponModal}
          onShow={this.showEditCouponModal}
          handleSubmit={this.editCoupon}
          onDelete={this.deleteCoupon}
          saving={this.props.editCouponProcess.saving}
          deleting={this.props.editCouponProcess.deleting}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardCouponTable);
