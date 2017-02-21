import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

class RowItem extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    item: PropTypes.object,
    editUserClick: PropTypes.func,
  };

  render() {
    return (
      <tr>
        <td>
          {`${this.props.item.firstName} ${this.props.item.lastName}`}
        </td>
        <td>
          {this.props.item.email}
        </td>
        <td>
          {this.props.item.phone}
        </td>
        <td>
          {this.props.item.role}
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
