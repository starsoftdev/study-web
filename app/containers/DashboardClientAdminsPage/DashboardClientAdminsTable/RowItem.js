import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

class RowItem extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    item: PropTypes.object,
    editAdminClick: PropTypes.func,
    editMessagingClick: PropTypes.func,
  };

  render() {
    return (
      <tr>
        <td>
          {this.props.item.client_name}
        </td>
        <td>
          {`${this.props.item.first_name} ${this.props.item.last_name}`}
        </td>
        <td>
          {this.props.item.email}
        </td>
        <td>
          {this.props.item.bd_user_first_name} {this.props.item.bd_user_last_name}
        </td>
        <td>
          <div className="btns-area row pull-right">
            <div className="col pull-left">
              <a className="btn btn-primary btn-edit-site" onClick={() => { this.props.editMessagingClick(this.props.item); }}>
                <span>Messaging Number</span>
              </a>
            </div>
            <div className="col pull-left">
              <a className="btn btn-primary btn-edit-site" onClick={() => { this.props.editAdminClick(this.props.item); }}>
                <span>Edit</span>
              </a>
            </div>
          </div>
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
