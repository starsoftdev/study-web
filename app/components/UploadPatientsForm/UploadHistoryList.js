/**
 *
 * UploadPatientsPreviewForm
 *
 */

import React, { PropTypes } from 'react';
import moment from 'moment-timezone';
import _ from 'lodash';

class UploadHistoryList extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    uploadHistory: PropTypes.object,
    revert: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {};

    this.renderHistoryTable = this.renderHistoryTable.bind(this);
  }

  renderHistoryTable() {
    const { uploadHistory, revert } = this.props;

    if (uploadHistory.details.length > 0) {
      return (
        <table className="history-table">
          <tbody>
            <tr key={_.uniqueId()}>
              <th>File Name</th>
              <th>User</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th></th>
            </tr>
            {
            uploadHistory.details.map((item) => {
              const date = moment(item.date);
              return (
                <tr key={_.uniqueId()}>
                  <td>{item.name}</td>
                  <td>{`${item.first_name} ${item.last_name}`}</td>
                  <td>{date.format('MM/DD/YY')}</td>
                  <td>{date.format('hh:mm A')}</td>
                  <td className="status">{item.status}</td>
                  <td>
                    <input
                      type="button"
                      disabled={item.status === 'reverted'}
                      value="Revert"
                      className="btn btn-gray-outline margin-right"
                      onClick={() => {
                        revert(item.bulk_upload_id);
                      }}
                    />
                  </td>
                </tr>
              );
            })
          }
          </tbody>
        </table>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className="upload-history">
        <div className="header">
          <span className="title">Upload history</span>
          <span className="tip">Upload sessions are kept for 90 days, but can only be deleted in the first 48 hours after upload. </span>
        </div>
        <div className="history-list">
          {this.renderHistoryTable()}
        </div>
      </div>
    );
  }
}

export default UploadHistoryList;
