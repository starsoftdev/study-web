import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { translate } from '../../../common/utilities/localization';

class RowItem extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    item: PropTypes.object,
    openStudyModal: PropTypes.func,
  };

  render() {
    return (
      <tr>
        <td>
          {this.props.item.company_name}
        </td>
        <td>
          {`${this.props.item.first_name} ${this.props.item.last_name}`}
        </td>
        <td>
          {this.props.item.email}
        </td>
        <td>
          <div className="btns-area pull-right">
            <div className="col pull-left">
              <a className="btn btn-primary btn-edit-site" onClick={() => { this.props.openStudyModal(this.props.item); }}>
                <span>{translate('client.page.vendor.admin.study')}</span>
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
