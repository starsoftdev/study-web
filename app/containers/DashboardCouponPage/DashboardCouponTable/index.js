import _ from 'lodash';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import RowItem from './RowItem';

export class DashboardCouponTable extends React.Component { // eslint-disable-line react/prefer-stateless-function
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

  render() {
    let coupon = this.props.coupon.details;

    if (this.props.couponSearchFormValues.coupon) {
      coupon = _.filter(coupon, (item) => (item.id === this.props.couponSearchFormValues.coupon));
    }

    if (this.props.paginationOptions.activeDirection && this.props.paginationOptions.activeSort) {
      const dir = ((this.props.paginationOptions.activeDirection === 'down') ? 'desc' : 'asc');
      coupon = _.orderBy(coupon, [(o) => (o[this.props.paginationOptions.activeSort])], [dir]);
    }

    return (
      <div className="table-responsive table-holder table-indication alt">
        <table className="table-manage-user table">
          <caption>&nbsp;</caption>

          <thead>
            <tr>
              <th onClick={this.sortBy} data-sort="number" className={`th ${(this.props.paginationOptions.activeSort === 'number') ? this.props.paginationOptions.activeDirection : ''}`}>Coupon<i className="caret-arrow" /></th>
              <th onClick={this.sortBy} data-sort="code" className={`th ${(this.props.paginationOptions.activeSort === 'code') ? this.props.paginationOptions.activeDirection : ''}`}>Code<i className="caret-arrow" /></th>
              <th onClick={this.sortBy} data-sort="type" className={`th ${(this.props.paginationOptions.activeSort === 'type') ? this.props.paginationOptions.activeDirection : ''}`}>Type<i className="caret-arrow" /></th>
              <th onClick={this.sortBy} data-sort="amount" className={`th ${(this.props.paginationOptions.activeSort === 'amount') ? this.props.paginationOptions.activeDirection : ''}`}>Amount<i className="caret-arrow" /></th>
              <th onClick={this.sortBy} data-sort="validFrom" className={`th ${(this.props.paginationOptions.activeSort === 'validFrom') ? this.props.paginationOptions.activeDirection : ''}`}>Valid From<i className="caret-arrow" /></th>
              <th onClick={this.sortBy} data-sort="validTo" className={`th ${(this.props.paginationOptions.activeSort === 'validTo') ? this.props.paginationOptions.activeDirection : ''}`}>Valid To<i className="caret-arrow" /></th>
              <th onClick={this.sortBy} data-sort="neverExpires" className={`th ${(this.props.paginationOptions.activeSort === 'neverExpires') ? this.props.paginationOptions.activeDirection : ''}`}>Never Expires<i className="caret-arrow" /></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              coupon.map((item, index) => (
                <RowItem key={index} item={item} editCoupon={this.props.editCoupon} deleteCoupon={this.props.deleteCoupon} editCouponProcess={this.props.editCouponProcess} />
              ))
            }
          </tbody>
        </table>
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
)(DashboardCouponTable);
