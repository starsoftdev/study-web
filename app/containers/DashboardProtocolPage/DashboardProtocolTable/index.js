import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import RowItem from './RowItem';

export class DashboardProtocolTable extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
  }

  render() {
    const protocols = [
      { id: 1, name: 'ALK-502' },
      { id: 2, name: 'A40910259' },
      { id: 3, name: 'Col Mig-302' },
    ];

    return (
      <div className="table-responsive table-holder table-indication alt">
        <table className="table-manage-user table">
          <caption>&nbsp;</caption>

          <thead>
            <tr>
              <th>Protocol<i className="caret-arrow"></i></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
            protocols.map((item, index) => (
              <RowItem key={index} item={item} />
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
)(DashboardProtocolTable);
