/*
 *
 * DashboardCouponPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Helmet from 'react-helmet';
import { DashboardCouponSearch } from './DashboardCouponSearch/index';
import { DashboardCouponTable } from './DashboardCouponTable';

import { fetchCoupon, addCoupon, editCoupon, deleteCoupon, setActiveSort } from './actions';
import { selectDashboardCoupon, selectDashboardEditCouponProcess, selectDashboardCouponSearchFormValues, selectPaginationOptions } from './selectors';

export class DashboardCouponPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    fetchCoupon: PropTypes.func,
    coupon: PropTypes.object,
    addCoupon: PropTypes.func,
    editCoupon: PropTypes.func,
    deleteCoupon: PropTypes.func,
    editCouponProcess: PropTypes.object,
    couponSearchFormValues: PropTypes.object,
    setActiveSort: PropTypes.func,
    paginationOptions: PropTypes.object,
  };

  componentWillMount() {
    this.props.fetchCoupon();
  }

  render() {
    return (
      <div className="container-fluid dashboard-coupon">
        <Helmet title="Coupon - StudyKIK" />
        <h2 className="main-heading">Coupon</h2>

        <DashboardCouponSearch
          coupon={this.props.coupon}
          addCoupon={this.props.addCoupon}
          editCouponProcess={this.props.editCouponProcess}
        />
        <DashboardCouponTable
          coupon={this.props.coupon}
          editCouponProcess={this.props.editCouponProcess}
          editCoupon={this.props.editCoupon}
          deleteCoupon={this.props.deleteCoupon}
          couponSearchFormValues={this.props.couponSearchFormValues}
          setActiveSort={this.props.setActiveSort}
          paginationOptions={this.props.paginationOptions}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  coupon: selectDashboardCoupon(),
  editCouponProcess: selectDashboardEditCouponProcess(),
  couponSearchFormValues: selectDashboardCouponSearchFormValues(),
  paginationOptions: selectPaginationOptions(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchCoupon: () => dispatch(fetchCoupon()),
    addCoupon: (payload) => dispatch(addCoupon(payload)),
    editCoupon: (payload) => dispatch(editCoupon(payload)),
    deleteCoupon: (payload) => dispatch(deleteCoupon(payload)),
    setActiveSort: (sort, direction) => dispatch(setActiveSort(sort, direction)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardCouponPage);
