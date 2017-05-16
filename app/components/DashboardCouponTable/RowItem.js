import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, change } from 'redux-form';
import moment from 'moment';
import { createStructuredSelector } from 'reselect';
import Money from '../../components/Money';
import Checkbox from '../../components/Input/Checkbox';

class RowItem extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    item: PropTypes.any,
    showEditCouponModal: PropTypes.func,
    editCouponProcess: PropTypes.object,
    change: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.showEditCouponModal = this.showEditCouponModal.bind(this);
  }

  componentDidMount() {
    if (this.props.item && this.props.item.validTo === null) {
      this.props.change(`isActive-${this.props.item.id}`, true);
    } else {
      this.props.change(`isActive-${this.props.item.id}`, false);
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.item && newProps.item.validTo === null) {
      this.props.change(`isActive-${newProps.item.id}`, true);
    } else {
      this.props.change(`isActive-${newProps.item.id}`, false);
    }
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
    const type = (item.type === 'amount') ? 'Amount' : 'Percentage';

    return (
      <tr>
        <td>
          {item.description}
        </td>
        <td>
          {item.code}
        </td>
        <td>
          {type}
        </td>
        <td>
          {item.amountOff
            ? <Money value={item.amountOff / 100} />
            : item.percentOff
          }
        </td>
        <td>
          {validFrom}
        </td>
        <td>
          {validTo}
        </td>
        <td>
          <Field
            name={`isActive-${item.id}`}
            type="checkbox"
            disabled
            component={Checkbox}
          />
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
    change: (field, value) => dispatch(change('DashboardCoupon.CouponList', field, value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RowItem);
