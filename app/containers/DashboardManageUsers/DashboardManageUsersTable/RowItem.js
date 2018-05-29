import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { normalizePhoneDisplay } from '../../../../app/common/helper/functions';
class RowItem extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    item: PropTypes.object,
    editUserClick: PropTypes.func,
  };

  getRoleName = (roleName) => {
    if (roleName === 'sm') {
      return 'Ad Operation';
    }
    if (roleName === 'ae') {
      return 'Call Center';
    }
    if (roleName === 'bd') {
      return 'Business Development';
    }
    return roleName;
  }

  render() {
    return (
      <tr>
        <td>
          {`${this.props.item.first_name} ${this.props.item.last_name}`}
        </td>
        <td>
          {this.props.item.email}
        </td>
        <td>
          {normalizePhoneDisplay(this.props.item.phone)}
        </td>
        <td className="text-uppercase">
          {this.getRoleName(this.props.item.role_name)}
        </td>
        <td>
          <a className="btn btn-primary btn-edit-site pull-right" onClick={() => { this.props.editUserClick(this.props.item); }}>
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
