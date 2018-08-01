import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { translate } from '../../../common/utilities/localization';

class RowItem extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    item: PropTypes.object,
    openStudyModal: PropTypes.func,
    editAdminClick: PropTypes.func,
  };

  render() {
    const { item, openStudyModal } = this.props;
    return (
      <tr>
        <td>
          {item.vendorName}
        </td>
        <td>
          {`${item.firstName} ${item.lastName}`}
        </td>
        <td>
          {item.email}
        </td>
        <td>
          <div className="btns-area pull-right">
            <div className="col pull-left">
              <a
                className="btn btn-primary btn-edit-site"
                onClick={() => {
                  openStudyModal(item.vendorId);
                }}
              >
                <span>{translate('client.page.vendor.admin.study')}</span>
              </a>
            </div>
            <div className="col pull-left">
              <a className="btn btn-primary btn-edit-site" onClick={() => { this.props.editAdminClick(item); }}>
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
