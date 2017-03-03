import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import RowItem from './RowItem';

export class DashboardIndicationTable extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    indications: PropTypes.object,
  }

  componentDidMount() {
  }

  render() {
    const { indications } = this.props;
    console.log('++++', indications);
    const indications1 = [
      { id: 1, name: 'Acne', tier: '4', ruby: '4', diamond: '100', platinum: '60', gold: '40', silver: '20', bronze: '5' },
      { id: 2, name: 'Ring Worm', tier: '4', ruby: '30', diamond: '10', platinum: '50', gold: '60', silver: '5', bronze: '10' },
      { id: 3, name: 'Back Pain', tier: '1', ruby: '50', diamond: '100', platinum: '60', gold: '40', silver: '50', bronze: '30' },
      { id: 4, name: 'Leg Pain', tier: '4', ruby: '4', diamond: '100', platinum: '60', gold: '40', silver: '20', bronze: '5' },
    ];

    return (
      <div className="table-responsive table-holder table-indication alt">
        <table className="table-manage-user table">
          <caption>&nbsp;</caption>

          <thead>
            <tr>
              <th>Indication<i className="caret-arrow"></i></th>
              <th>TIER <i className="caret-arrow"></i></th>
              <th>RUBY <i className="caret-arrow"></i></th>
              <th>DIAMOND <i className="caret-arrow"></i></th>
              <th>PLATINUM <i className="caret-arrow"></i></th>
              <th>GOLD <i className="caret-arrow"></i></th>
              <th>SILVER <i className="caret-arrow"></i></th>
              <th>BRONZE <i className="caret-arrow"></i></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
            indications1.map((item, index) => (
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
)(DashboardIndicationTable);
