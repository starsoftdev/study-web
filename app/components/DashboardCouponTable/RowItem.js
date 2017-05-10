import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { createStructuredSelector } from 'reselect';

class RowItem extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    item: PropTypes.any,
    showEditCouponModal: PropTypes.func,
    editCouponProcess: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.showEditCouponModal = this.showEditCouponModal.bind(this);
  }

  showEditCouponModal() {
    const { item } = this.props;

    this.props.showEditCouponModal({
      id: item.id,
    });
  }

  render() {
    const { item } = this.props;
    const validFrom = (item.validFrom) ? moment(item.validFrom).format('MM/DD/YY') : null;
    const validTo = (item.validTo) ? moment(item.validTo).format('MM/DD/YY') : null;
    const neverExpires = (!item.validTo) ? 'true' : 'false';

    return (
      <tr>
        <td>
          {item.id}
        </td>
        <td>
          {item.code}
        </td>
        <td>
          {item.type}
        </td>
        <td>
          {item.amountOff || item.percentOff}
        </td>
        <td>
          {validFrom}
        </td>
        <td>
          {validTo}
        </td>
        <td>
          {neverExpires}
        </td>
        <td>
          <a className="btn btn-primary btn-edit-site pull-right" onClick={this.showEditCouponModal}>
            <span>Edit</span>
          </a>
        </td>
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
