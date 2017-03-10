import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import RowItem from './RowItem';

export class DashboardIndicationTable extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    indications: PropTypes.object,
    levels: PropTypes.object,
  }

  componentDidMount() {
  }

  render() {
    const { indications, levels } = this.props;

    return (
      <div className="table-responsive table-holder table-indication alt">
        <table className="table-manage-user table">
          <caption>&nbsp;</caption>

          <thead>
            <tr>
              <th>Indication<i className="caret-arrow"></i></th>
              <th>TIER <i className="caret-arrow"></i></th>
              {
                levels.details.map((level) =>
                  <th>{level.name} <i className="caret-arrow"></i></th>
                )
              }
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
            indications.details.map((item, index) => (
              <RowItem key={index} item={item} levels={levels} />
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
