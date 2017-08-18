import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectDashboardAvailableNumber } from '../../selectors';
import RowItem from './RowItem';

export class DashboardAvailableNumbersTable extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    availableNumber: PropTypes.object,
  }

  render() {
    if (!this.props.availableNumber) {
      return null;
    }

    const availableNumbers = this.props.availableNumber.details;
    return (
      <div className="table-responsive table-holder table-indication alt">
        <table className="table-manage-user table">
          <caption>&nbsp;</caption>
          <colgroup>
            <col style={{ width: '30%' }} />
            <col style={{ width: '40%' }} />
            <col style={{ width: 'auto' }} />
          </colgroup>
          <thead>
            <tr>
              <th>Number<div>&nbsp;</div></th>
              <th>
                Capabilities
                <div style={{ display: 'flex' }}>
                  <span style={{ flex: 1 }}>Voice</span>
                  <span style={{ flex: 1 }}>SMS</span>
                  <span style={{ flex: 1 }}>MMS</span>
                </div>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              availableNumbers.map((item, index) => (
                <RowItem
                  key={index}
                  item={item}
                />
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  availableNumber: selectDashboardAvailableNumber(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardAvailableNumbersTable);
